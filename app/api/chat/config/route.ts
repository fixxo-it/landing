import { NextResponse } from 'next/server';
import { backendUrl, proxyKey } from '../backend';

/* What the chat widget needs to render: on/off, its text, the support
   contacts and the quick replies with their stored answers. Everything here
   is public copy; the manual, instructions, model and limits never leave
   sutram.

   Cached for 60 s (Next's data cache, plus the CDN through Cache-Control), so
   page views cost sutram about one request a minute and an admin change shows
   up within a minute. Any failure means "no widget", never a broken one. */

const OFF = { enabled: false };
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

export async function GET() {
  const url = backendUrl('/website-chatbot/config');
  const key = proxyKey();
  if (!url || !key) return NextResponse.json(OFF, { headers: CACHE_HEADERS });

  try {
    const res = await fetch(url, {
      headers: { 'X-Website-Chatbot-Key': key },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return NextResponse.json(OFF, { headers: CACHE_HEADERS });
    const data = await res.json();
    return NextResponse.json(data?.enabled ? data : OFF, {
      headers: CACHE_HEADERS,
    });
  } catch {
    // Not cached: the next page view tries again.
    return NextResponse.json(OFF, { headers: { 'Cache-Control': 'no-store' } });
  }
}
