import { NextRequest, NextResponse } from 'next/server';
import { backendUrl } from '../../chat/backend';
import { SLUG_RE } from '@/lib/winback';

/* The campaign as the form shows it: copy, questions and the call slots still
   open. Never cached: a slot that has just been taken must not be offered. */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const headers = { 'Cache-Control': 'no-store' };
  const url = SLUG_RE.test(slug) ? backendUrl(`/v1/winback/${slug}`) : null;
  if (!url)
    return NextResponse.json({ error: 'not_open' }, { status: 404, headers });
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (res.status === 404)
      return NextResponse.json({ error: 'not_open' }, { status: 404, headers });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return NextResponse.json(await res.json(), { headers });
  } catch (err) {
    console.error(
      '[winback] could not load campaign:',
      err instanceof Error ? err.message : 'unknown'
    );
    return NextResponse.json(
      { error: 'unavailable' },
      { status: 502, headers }
    );
  }
}
