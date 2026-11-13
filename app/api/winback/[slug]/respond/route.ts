import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { backendUrl, clientIp, sameOrigin } from '../../../chat/backend';
import { SLUG_RE } from '@/lib/winback';

/* The call-back form's submission: the first filter in front of sutram, where the
   response and its support ticket are created (POST /v1/winback/{slug}/respond).
   A visitor only sees success once sutram has confirmed the save. Sutram's own
   refusals (slot taken, bad answer...) come back with their code and message. */

const MAX_BODY_BYTES = 4096;
const BACKEND_TIMEOUT_MS = 10_000;

/* A first filter, per serverless instance, not a hard wall: sutram holds the real
   per-IP and per-phone limits. Generous because many Indian mobile users share one
   carrier IP. */
const LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits)
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const fail = (status: number, message: string, code = 'error') =>
  NextResponse.json(
    { success: false, code, message },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const generic =
    'Something went wrong. Please refresh the page and try again.';
  if (!sameOrigin(req) || !SLUG_RE.test(slug)) return fail(403, generic);
  if (!(req.headers.get('content-type') ?? '').includes('application/json'))
    return fail(415, generic);
  if (limited(clientIp(req) || 'unknown'))
    return fail(
      429,
      'Too many requests from your network. Please try again later.',
      'rate_limited'
    );

  // Vercel BotID (see instrumentation-client.ts). If the check itself breaks, carry on:
  // a lost customer costs more than one bot getting through.
  try {
    const verdict = await checkBotId();
    if (verdict.isBot) return fail(403, generic);
  } catch (err) {
    console.error(
      '[winback] bot check failed:',
      err instanceof Error ? err.message : 'unknown'
    );
  }

  const raw = await req.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES)
    return fail(413, generic);
  let body: Record<string, unknown> | null = null;
  try {
    body = JSON.parse(raw);
  } catch {
    // handled just below
  }
  if (!body || typeof body !== 'object' || Array.isArray(body))
    return fail(400, generic);
  // honeypot: bots fill every field, people never see this one
  if (body.website) return NextResponse.json({ success: true });

  const url = backendUrl(`/v1/winback/${slug}/respond`);
  if (!url) {
    console.error('[winback] BACKEND_API_URL is not set');
    return fail(
      503,
      'This is not open yet. Please try again soon.',
      'unavailable'
    );
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIp(req),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok)
      return NextResponse.json(
        { ...data, success: true },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    if (res.status === 429)
      return fail(
        429,
        'Too many requests. Please try again later.',
        'rate_limited'
      );
    // sutram's own refusals carry a person-safe message and a stable code
    if (typeof data?.message === 'string' && res.status < 500)
      return fail(res.status, data.message, String(data.code ?? 'error'));
    throw new Error(`status ${res.status}`);
  } catch (err) {
    // no details here: these logs should never hold someone's number
    console.error(
      '[winback] could not save response:',
      err instanceof Error ? err.message : 'unknown'
    );
    return fail(
      502,
      'Could not save your details. Please try again shortly.',
      'unavailable'
    );
  }
}
