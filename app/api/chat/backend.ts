import type { NextRequest } from 'next/server';

/* Shared by the two chat routes. The browser never talks to sutram or Gemini:
   these server routes hold WEBSITE_CHATBOT_PROXY_KEY (server-only, never
   NEXT_PUBLIC_*) and are the only callers sutram accepts. */

export function backendUrl(path: string): string | null {
  const base = process.env.BACKEND_API_URL;
  if (!base) return null;
  const root = base.replace(/\/$/, '');
  return root.endsWith('/api') ? `${root}${path}` : `${root}/api${path}`;
}

export function proxyKey(): string | null {
  return process.env.WEBSITE_CHATBOT_PROXY_KEY || null;
}

/* The visitor's IP. On Vercel, x-real-ip and x-forwarded-for are set by the
   platform and overwrite whatever the client sent. cf-connecting-ip is NOT
   read: it is only trustworthy behind Cloudflare, and on Vercel any client
   can set it to dodge the rate limit. */
export function clientIp(req: NextRequest): string {
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return '';
}

/* Browsers send Origin on every POST; it must be this site. Scripts can forge
   it, so this is a filter, never the only protection on a route. */
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  if (!origin || !host) return false;
  try {
    if (new URL(origin).host !== host) return false;
  } catch {
    return false;
  }
  const site = req.headers.get('sec-fetch-site');
  return !site || site === 'same-origin';
}
