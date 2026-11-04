import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { backendUrl, clientIp, proxyKey, sameOrigin } from '../backend';

/* A typed visitor question -> sutram /website-chatbot/ask.

   This route is the first filter: same-origin only, a per-instance IP limit,
   Vercel BotID, small JSON bodies and a validated shape. The real limits (per IP,
   global, daily Gemini cap) are enforced in sutram, in Redis, across every
   server; an in-memory map here is per serverless instance and can't be the
   wall on its own. */

const MAX_BODY_BYTES = 4096;
const MESSAGE_MAX = 500;
const PREVIOUS_MAX = 3;
const PREVIOUS_LEN = 300;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const LIMIT = 10;
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // Keep the map bounded on a long-lived instance.
    for (const [k, v] of hits)
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const fail = (status: number, error: string) =>
  NextResponse.json(
    { error },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return fail(403, 'forbidden');
  if (!(req.headers.get('content-type') ?? '').includes('application/json'))
    return fail(415, 'json_only');

  const url = backendUrl('/website-chatbot/ask');
  const key = proxyKey();
  if (!url || !key) return fail(503, 'unavailable');

  const ip = clientIp(req);
  if (limited(ip || 'unknown')) return fail(429, 'rate_limited');

  // Vercel BotID (see instrumentation-client.ts): scripts, headless browsers
  // and bot farms are turned away here, before sutram or Gemini see anything.
  // Outside Vercel production (local dev) it lets everything through.
  const verdict = await checkBotId();
  if (verdict.isBot) return fail(403, 'bot');

  const raw = await req.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES)
    return fail(413, 'too_large');

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'bad_json');
  }
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message || message.length > MESSAGE_MAX) return fail(400, 'bad_message');

  const previous = Array.isArray(body.previous_questions)
    ? body.previous_questions
        .filter(
          (q): q is string => typeof q === 'string' && q.trim().length > 0
        )
        .slice(-PREVIOUS_MAX)
        .map((q) => q.trim().slice(0, PREVIOUS_LEN))
    : [];
  const sessionId =
    typeof body.session_id === 'string' && UUID_RE.test(body.session_id)
      ? body.session_id
      : undefined;
  const page =
    typeof body.page === 'string' && body.page.startsWith('/')
      ? body.page.slice(0, 200)
      : undefined;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Website-Chatbot-Key': key,
        ...(ip ? { 'X-Website-Chatbot-Client-Ip': ip } : {}),
      },
      body: JSON.stringify({
        message,
        previous_questions: previous,
        session_id: sessionId,
        page,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
    if (res.status === 403) return fail(403, 'off');
    if (!res.ok) return fail(502, 'upstream');
    const data = await res.json();
    // Pass on only the fields the widget renders.
    return NextResponse.json(
      {
        answer: String(data.answer ?? ''),
        source: String(data.source ?? ''),
        actions: Array.isArray(data.actions) ? data.actions : [],
        limited: Boolean(data.limited),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return fail(504, 'timeout');
  }
}
