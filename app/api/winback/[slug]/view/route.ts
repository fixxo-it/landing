import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, clientIp, sameOrigin } from '../../../chat/backend';
import { SLUG_RE } from '@/lib/winback';

/* Counts one visit, by source, for the campaign's funnel. Best effort: it never
   shows the visitor an error. */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ok = NextResponse.json(
    { success: true },
    { headers: { 'Cache-Control': 'no-store' } }
  );
  if (!sameOrigin(req) || !SLUG_RE.test(slug)) return ok;
  const url = backendUrl(`/v1/winback/${slug}/view`);
  if (!url) return ok;
  let source = '';
  try {
    const body = await req.json();
    source = typeof body?.source === 'string' ? body.source.slice(0, 40) : '';
  } catch {
    // no body: count it without a source
  }
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIp(req),
      },
      body: JSON.stringify({ source }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // a missed count is not worth an error
  }
  return ok;
}
