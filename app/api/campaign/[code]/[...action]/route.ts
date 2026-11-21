import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { backendUrl, clientIp, sameOrigin } from '../../../chat/backend';
import { CODE_RE, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/campaign';

/* The QR campaign page's calls, in front of sutram (/otp and /campaigns/{code}).
   The FamCare login token from /otp/verify is kept in an httpOnly cookie on this
   site and added to sutram calls here; the browser never sees it.

     POST otp/send      {mobile}             → sutram /otp/send
     POST otp/verify    {mobile, otp}        → sutram /otp/verify (sets the cookie)
     POST logout                             → clears the cookie
     GET  me                                 → /campaigns/{code}/me
     POST location      {latitude, longitude}
     POST checkout      {placement?, amount_paise?, latitude?, longitude?, accepted_terms}
     POST verify        {order_id, payment_id, signature}
     GET  purchase/{id}
     POST dev-bypass    {purchase_id}        (developer accounts only, sutram checks) */

const MAX_BODY_BYTES = 2048;
const BACKEND_TIMEOUT_MS = 15_000;
const UUID_RE = /^[0-9a-f-]{36}$/;

/* A first filter per serverless instance; sutram holds the real per-phone limits. */
const LIMIT = 60;
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

const GENERIC = 'Something went wrong. Please refresh the page and try again.';
const fail = (status: number, message: string, code = 'error') =>
  NextResponse.json(
    { success: false, code, message },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );

async function readBody(
  req: NextRequest
): Promise<Record<string, unknown> | null> {
  const raw = await req.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return null;
  try {
    const body = raw ? JSON.parse(raw) : {};
    return body && typeof body === 'object' && !Array.isArray(body)
      ? body
      : null;
  } catch {
    return null;
  }
}

async function callSutram(
  req: NextRequest,
  path: string,
  init: { method: 'GET' | 'POST'; body?: unknown; auth?: boolean }
) {
  const url = backendUrl(path);
  if (!url) {
    console.error('[campaign] BACKEND_API_URL is not set');
    return { res: null, data: null };
  }
  const headers: Record<string, string> = { 'X-Forwarded-For': clientIp(req) };
  if (init.body !== undefined) headers['Content-Type'] = 'application/json';
  if (init.auth) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return { res: new Response(null, { status: 401 }), data: null };
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    method: init.method,
    headers,
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

/* sutram's campaign refusals carry a person-safe `detail` and a stable `code`. */
function relay(res: Response | null, data: Record<string, unknown> | null) {
  if (!res)
    return fail(
      503,
      'This offer is not open yet. Please try again soon.',
      'unavailable'
    );
  if (res.status === 401) {
    const out = fail(401, 'Please verify your number again.', 'login');
    out.cookies.delete(SESSION_COOKIE);
    return out;
  }
  if (res.ok)
    return NextResponse.json(data ?? {}, {
      headers: { 'Cache-Control': 'no-store' },
    });
  if (res.status === 429)
    return fail(
      429,
      'Too many tries. Please wait a minute and try again.',
      'rate_limited'
    );
  const detail = data?.detail;
  if (res.status < 500 && typeof detail === 'string')
    return fail(res.status, detail, String(data?.code ?? 'error'));
  return fail(502, GENERIC);
}

const digits = (v: unknown) =>
  typeof v === 'string' ? v.replace(/\D/g, '') : '';

async function handle(
  req: NextRequest,
  { params }: { params: Promise<{ code: string; action: string[] }> }
) {
  const { code, action } = await params;
  const path = (action ?? []).join('/');
  if (!CODE_RE.test(code))
    return fail(404, "We couldn't find this offer.", 'not_found');
  if (req.method === 'POST') {
    if (!sameOrigin(req)) return fail(403, GENERIC);
    if (!(req.headers.get('content-type') ?? '').includes('application/json'))
      return fail(415, GENERIC);
  }
  if (limited(clientIp(req) || 'unknown'))
    return fail(
      429,
      'Too many requests from your network. Please try again later.',
      'rate_limited'
    );

  try {
    if (req.method === 'GET' && path === 'me') {
      const { res, data } = await callSutram(req, `/campaigns/${code}/me`, {
        method: 'GET',
        auth: true,
      });
      return relay(res, data);
    }
    if (
      req.method === 'GET' &&
      action[0] === 'purchase' &&
      UUID_RE.test(action[1] ?? '') &&
      action.length === 2
    ) {
      const { res, data } = await callSutram(
        req,
        `/campaigns/${code}/purchases/${action[1]}`,
        {
          method: 'GET',
          auth: true,
        }
      );
      return relay(res, data);
    }
    if (req.method !== 'POST') return fail(405, GENERIC);

    const body = await readBody(req);
    if (!body) return fail(400, GENERIC);

    switch (path) {
      case 'otp/send': {
        // Each send costs an SMS: keep bots out (Vercel BotID; open outside Vercel).
        try {
          const verdict = await checkBotId();
          if (verdict.isBot) return fail(403, GENERIC);
        } catch (err) {
          console.error(
            '[campaign] bot check failed:',
            err instanceof Error ? err.message : 'unknown'
          );
        }
        const mobile = digits(body.mobile);
        if (!/^[6-9]\d{9}$/.test(mobile))
          return fail(
            400,
            'Please enter a valid 10-digit mobile number.',
            'mobile'
          );
        const { res, data } = await callSutram(req, '/otp/send', {
          method: 'POST',
          body: { mobile },
        });
        if (res?.ok && data?.attendance_approval_required)
          return fail(403, 'This number cannot be used here.', 'mobile');
        return relay(res, res?.ok ? { sent: true } : data);
      }
      case 'otp/verify': {
        const mobile = digits(body.mobile);
        const otp = digits(body.otp);
        if (!/^[6-9]\d{9}$/.test(mobile) || otp.length !== 4)
          return fail(400, 'Please enter the 4-digit code we sent you.', 'otp');
        const { res, data } = await callSutram(req, '/otp/verify', {
          method: 'POST',
          body: { mobile, otp },
        });
        if (!res) return relay(res, data);
        if (!res.ok) {
          const detail = typeof data?.detail === 'string' ? data.detail : '';
          return fail(
            400,
            detail || 'That code did not work. Please try again.',
            'otp'
          );
        }
        const token =
          (typeof data?.access_token === 'string' && data.access_token) ||
          (typeof data?.token === 'string' && data.token) ||
          '';
        if (!token) return fail(403, 'This number cannot be used here.', 'otp');
        const out = NextResponse.json(
          { verified: true },
          { headers: { 'Cache-Control': 'no-store' } }
        );
        out.cookies.set(SESSION_COOKIE, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/api/campaign',
          maxAge: SESSION_MAX_AGE,
        });
        return out;
      }
      case 'logout': {
        const out = NextResponse.json({ ok: true });
        out.cookies.set(SESSION_COOKIE, '', {
          path: '/api/campaign',
          maxAge: 0,
        });
        return out;
      }
      case 'location':
      case 'checkout':
      case 'verify': {
        const { res, data } = await callSutram(
          req,
          `/campaigns/${code}/${path}`,
          {
            method: 'POST',
            body,
            auth: true,
          }
        );
        return relay(res, data);
      }
      case 'dev-bypass': {
        const id = typeof body.purchase_id === 'string' ? body.purchase_id : '';
        if (!UUID_RE.test(id)) return fail(400, GENERIC);
        const { res, data } = await callSutram(
          req,
          `/campaigns/${code}/purchases/${id}/dev-bypass`,
          {
            method: 'POST',
            body: {},
            auth: true,
          }
        );
        return relay(res, data);
      }
      default:
        return fail(404, GENERIC, 'not_found');
    }
  } catch (err) {
    // no request details here: these logs should never hold someone's number
    console.error(
      '[campaign] request failed:',
      path,
      err instanceof Error ? err.message : 'unknown'
    );
    return fail(502, GENERIC);
  }
}

export { handle as GET, handle as POST };
