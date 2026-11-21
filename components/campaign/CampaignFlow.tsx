'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CTA, GHOST } from '@/components/monthly/styles';
import { cn } from '@/lib/cn';
import { BUSINESS } from '@/lib/site-content';
import {
  bonusFor,
  dateLabel,
  rupees,
  type Checkout,
  type Me,
  type PublicCampaign,
  type PurchaseResult,
} from '@/lib/campaign';

/* Scan → offer → phone + OTP → (area) → review → Razorpay → done.
   Everything the customer reads comes from the campaign; the fallbacks here
   only cover fields the admin left empty. */

const PANEL =
  'relative isolate overflow-hidden rounded-[32px] bg-white p-6 shadow-float ring-1 ring-teal/10 sm:p-9';
const FIELD =
  'w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-teal focus:ring-2 focus:ring-teal/15';
const LABEL = 'mb-2 block text-sm font-semibold text-teal-dark';
const NOTE = 'text-sm text-ink-muted';
const ERROR = 'rounded-2xl bg-[#fdecea] px-4 py-3 text-sm text-[#a5281b]';

type Step =
  | 'offer'
  | 'phone'
  | 'otp'
  | 'location'
  | 'blocked'
  | 'review'
  | 'processing'
  | 'done';

type ApiError = { status: number; code: string; message: string };

async function call<T>(code: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api/campaign/${code}/${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers:
      body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw {
      status: res.status,
      code: String(data?.code ?? 'error'),
      message: String(
        data?.message ?? 'Something went wrong. Please try again.'
      ),
    } as ApiError;
  }
  return data as T;
}

const errMsg = (e: unknown) =>
  (e as ApiError)?.message ?? 'Something went wrong. Please try again.';

/* Razorpay Checkout, loaded only when someone presses Pay. */
type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
type RazorpayInstance = {
  open: () => void;
  on: (ev: string, cb: (r: unknown) => void) => void;
};
declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => RazorpayInstance;
  }
}
function loadRazorpay(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    s.onload = () => resolve(!!window.Razorpay);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const CLOSED_COPY: Record<string, string> = {
  ended: 'This offer has ended.',
  sold_out: 'This offer is fully claimed.',
  paused: 'This offer is paused right now. Please check back soon.',
  not_started: 'This offer hasn’t started yet.',
  unavailable: 'This offer is not open yet.',
};

export default function CampaignFlow({
  campaign: c,
  placement,
}: {
  campaign: PublicCampaign;
  placement: string | null;
}) {
  const topup = c.topup;
  const pack = c.pack;
  const [step, setStep] = useState<Step>('offer');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // amount (top-ups)
  const options = topup?.amount_options_paise ?? [];
  const [amount, setAmount] = useState<number | null>(
    topup?.preset_amount_paise ?? options[0] ?? null
  );
  const [custom, setCustom] = useState('');
  const [customOn, setCustomOn] = useState(
    !!topup && options.length === 0 && topup.allow_custom_amount
  );

  // login
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [resendIn, setResendIn] = useState(0);
  const [me, setMe] = useState<Me | null>(null);

  // area + pay
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [notServed, setNotServed] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [order, setOrder] = useState<Checkout | null>(null);
  const [result, setResult] = useState<PurchaseResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const payAmount = useMemo(() => {
    if (pack) return pack.price_paise;
    if (customOn) {
      const r = Number(custom.replace(/[,\s₹]/g, ''));
      return Number.isFinite(r) && r > 0 ? Math.round(r * 100) : null;
    }
    return amount;
  }, [pack, customOn, custom, amount]);

  const extra =
    topup && payAmount && (me ? me.bonus_available : true)
      ? bonusFor(topup.bonus_rules, payAmount)
      : 0;

  /* This number already had the offer's extra: hide every "+₹ extra" and
     say so instead. Known after the OTP, or on load for someone still logged
     in on this site from an earlier top-up. */
  const extraUsed =
    !!topup && topup.bonus_rules.length > 0 && !!me && !me.bonus_available;

  useEffect(() => {
    if (!topup || topup.bonus_rules.length === 0 || c.state !== 'live') return;
    let alive = true;
    call<Me>(c.code, 'me')
      .then((m) => alive && setMe(m))
      .catch(() => undefined); // not logged in here yet: nothing to show
    return () => {
      alive = false;
    };
    // once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const amountProblem = (() => {
    if (!topup || payAmount == null)
      return topup ? 'Please choose an amount.' : '';
    if (!customOn) return '';
    if (payAmount % 100) return 'Please enter a whole rupee amount.';
    if (topup.min_amount_paise && payAmount < topup.min_amount_paise)
      return `The minimum is ${rupees(topup.min_amount_paise)}.`;
    if (topup.max_amount_paise && payAmount > topup.max_amount_paise)
      return `The maximum is ${rupees(topup.max_amount_paise)}.`;
    return '';
  })();

  /* After login (or with a login from earlier), decide the next step. */
  const afterLogin = (m: Me) => {
    setMe(m);
    if (!m.eligible) return setStep('blocked');
    if (m.needs_location && !coords) return setStep('location');
    setStep('review');
  };

  const start = async () => {
    setError('');
    if (amountProblem) return setError(amountProblem);
    setBusy(true);
    try {
      afterLogin(await call<Me>(c.code, 'me'));
    } catch (e) {
      if ((e as ApiError).status === 401) setStep('phone');
      else setError(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const sendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');
    setBusy(true);
    try {
      await call(c.code, 'otp/send', { mobile });
      setOtp('');
      setResendIn(30);
      setStep('otp');
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await call(c.code, 'otp/verify', { mobile, otp });
      afterLogin(await call<Me>(c.code, 'me'));
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  const changeNumber = async () => {
    await call(c.code, 'logout', {}).catch(() => undefined);
    setMe(null);
    setCoords(null);
    setMobile('');
    setOtp('');
    setError('');
    setStep('phone');
  };

  const useLocation = () => {
    setError('');
    setNotServed(false);
    if (!navigator.geolocation)
      return setError('Your browser cannot share location.');
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const here = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        try {
          const r = await call<{ serviceable: boolean }>(
            c.code,
            'location',
            here
          );
          if (r.serviceable) {
            setCoords(here);
            setStep('review');
          } else {
            setNotServed(true);
          }
        } catch (err) {
          setError(errMsg(err));
        } finally {
          setBusy(false);
        }
      },
      () => {
        setBusy(false);
        setError(
          'Please allow location access, or open this page on the phone you will book from.'
        );
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const finish = async (purchaseId: string, first?: PurchaseResult) => {
    let r = first;
    setStep('processing');
    for (let i = 0; i < 20 && (!r || r.status !== 'fulfilled'); i++) {
      await new Promise((res) => setTimeout(res, 3000));
      try {
        r = await call<PurchaseResult>(c.code, `purchase/${purchaseId}`);
      } catch {
        // keep waiting; the webhook or the background check will finish it
      }
    }
    if (r) setResult(r);
    setStep(r?.status === 'fulfilled' ? 'done' : 'processing');
  };

  const pay = async () => {
    setError('');
    if (!accepted) return setError('Please accept the terms to continue.');
    setBusy(true);
    try {
      const o = await call<Checkout>(c.code, 'checkout', {
        placement,
        amount_paise: topup ? payAmount : undefined,
        accepted_terms: true,
        ...(coords ?? {}),
      });
      setOrder(o);
      if (o.order_id.startsWith('DEV_')) {
        // Developer account on live keys: no real payment (sutram made no order).
        setBusy(false);
        return setError(
          'Developer account: no real payment. Use the developer button below.'
        );
      }
      if (!(await loadRazorpay()) || !window.Razorpay) {
        setBusy(false);
        return setError(
          'Could not open the payment page. Please check your connection and try again.'
        );
      }
      const rzp = new window.Razorpay({
        key: o.key_id,
        order_id: o.order_id,
        amount: o.amount_paise,
        currency: o.currency,
        name: o.name,
        description: o.description,
        prefill: o.prefill,
        theme: { color: '#014D4F' },
        modal: {
          ondismiss: () => {
            setBusy(false);
            setError(
              'Payment not completed. No money was taken. You can try again.'
            );
          },
        },
        handler: async (resp: RazorpayResponse) => {
          try {
            const r = await call<PurchaseResult>(c.code, 'verify', {
              order_id: resp.razorpay_order_id,
              payment_id: resp.razorpay_payment_id,
              signature: resp.razorpay_signature,
            });
            if (r.status === 'fulfilled') {
              setResult(r);
              setStep('done');
            } else {
              await finish(o.purchase_id, r);
            }
          } catch {
            await finish(o.purchase_id);
          } finally {
            setBusy(false);
          }
        },
      });
      rzp.on('payment.failed', () => {
        setError(
          'The payment did not go through. If money left your account, your bank returns it automatically within 5 days.'
        );
      });
      rzp.open();
    } catch (err) {
      setBusy(false);
      setError(errMsg(err));
    }
  };

  const devComplete = async () => {
    if (!order) return;
    setBusy(true);
    try {
      setResult(
        await call<PurchaseResult>(c.code, 'dev-bypass', {
          purchase_id: order.purchase_id,
        })
      );
      setStep('done');
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  /* ── Offer card (shown on every step but the last) ─────────────────── */

  const offerCard = (
    <div className="rounded-[28px] bg-teal-dark p-6 text-white sm:p-8">
      <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-lime">
        FamCare{c.placement ? ` · ${c.placement.name}` : ''}
      </p>
      <h1 className="mt-3 font-glyphic text-[2rem] leading-[1.1] sm:text-[2.4rem]">
        {c.headline}
      </h1>
      {c.subheadline && (
        <p className="mt-3 text-base text-white/80">{c.subheadline}</p>
      )}
      {pack && (
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-4xl font-bold text-lime">
            {rupees(pack.price_paise)}
          </span>
          <span className="text-sm text-white/70">one time, incl. GST</span>
        </div>
      )}
      {(c.highlights.length > 0 || pack) && (
        <ul className="mt-5 space-y-2 text-sm text-white/90">
          {pack && (
            <li className="flex gap-2">
              <span className="text-lime">✓</span>
              {pack.visits} booking{pack.visits === 1 ? '' : 's'}
              {pack.session_hours
                ? `, up to ${pack.session_hours} hr each`
                : ''}
              {pack.services.length ? ` · ${pack.services.join(', ')}` : ''}
            </li>
          )}
          {pack && (
            <li className="flex gap-2">
              <span className="text-lime">✓</span>Use within{' '}
              {pack.validity_days} days
            </li>
          )}
          {c.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-lime">✓</span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  /* ── Closed ─────────────────────────────────────────────────────────── */

  if (c.state !== 'live') {
    return (
      <div className="space-y-5">
        {offerCard}
        <div className={PANEL}>
          <p className="text-lg font-semibold text-ink">
            {(c.state === 'ended' && c.ended_message) ||
              CLOSED_COPY[c.state] ||
              CLOSED_COPY.unavailable}
          </p>
          {c.state === 'not_started' && c.starts_at && (
            <p className={cn(NOTE, 'mt-2')}>
              It opens on {dateLabel(c.starts_at)}.
            </p>
          )}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {c.fallback ? (
              <Link href={`/c/${c.fallback.code}`} className={CTA}>
                {c.fallback.headline}
              </Link>
            ) : (
              <Link href="/" className={CTA}>
                See FamCare
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Done ───────────────────────────────────────────────────────────── */

  if (step === 'done' && result) {
    const total = result.amount_paise + result.bonus_paise;
    return (
      <div ref={topRef} className={PANEL}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-2xl text-teal-dark">
          ✓
        </div>
        {result.kind === 'wallet_topup' ? (
          <>
            <h1 className="mt-5 font-glyphic text-3xl text-ink">
              {rupees(total)} added to your FamCare Wallet
            </h1>
            <dl className="mt-5 space-y-2 text-base">
              <div className="flex justify-between">
                <dt className="text-ink-muted">You paid</dt>
                <dd className="font-semibold text-ink">
                  {rupees(result.amount_paise)}
                </dd>
              </div>
              {result.bonus_paise > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Extra from FamCare</dt>
                  <dd className="font-semibold text-ink">
                    {rupees(result.bonus_paise)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="text-ink-muted">Wallet balance now</dt>
                <dd className="font-semibold text-teal-dark">
                  {rupees(result.wallet_balance_paise)}
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h1 className="mt-5 font-glyphic text-3xl text-ink">
              {result.pass?.plan_name ?? c.name} is ready
            </h1>
            <p className="mt-3 text-base text-ink-muted">
              {result.pass?.visits_total} booking
              {result.pass?.visits_total === 1 ? '' : 's'}
              {result.pass?.expires_at
                ? `, use by ${dateLabel(result.pass.expires_at)}`
                : ''}
              . Paid {rupees(result.amount_paise)} incl. GST.
            </p>
          </>
        )}
        <p className="mt-4 text-base text-ink">
          {result.success_message ||
            `Open the FamCare app and log in with the number ending ${me?.phone_last4 ?? ''}. It's used automatically when you book.`}
        </p>
        <a href={BUSINESS.appUrl} className={cn(CTA, 'mt-7 w-full')}>
          Open the FamCare app
        </a>
      </div>
    );
  }

  /* ── Steps ──────────────────────────────────────────────────────────── */

  return (
    <div ref={topRef} className="space-y-5">
      {offerCard}

      <div className={PANEL}>
        {step === 'offer' && (
          <div className="space-y-5">
            {topup && (
              <div>
                <span className={LABEL}>How much would you like to add?</span>
                <div className="grid grid-cols-1 gap-2.5">
                  {options.map((a) => {
                    const b = extraUsed ? 0 : bonusFor(topup.bonus_rules, a);
                    const on = !customOn && amount === a;
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          setCustomOn(false);
                          setAmount(a);
                        }}
                        className={cn(
                          'flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all',
                          on
                            ? 'border-teal-dark bg-teal-tint ring-2 ring-teal/20'
                            : 'border-line hover:border-teal/40'
                        )}
                      >
                        <span className="text-lg font-semibold text-ink">
                          {rupees(a)}
                        </span>
                        {b > 0 && (
                          <span className="rounded-full bg-lime px-3 py-1 text-sm font-semibold text-teal-dark">
                            +{rupees(b)} extra
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {topup.allow_custom_amount && (
                    <div
                      className={cn(
                        'rounded-2xl border px-4 py-3 transition-all',
                        customOn
                          ? 'border-teal-dark ring-2 ring-teal/20'
                          : 'border-line'
                      )}
                    >
                      <label className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-ink">
                          ₹
                        </span>
                        <input
                          inputMode="numeric"
                          className="w-full bg-transparent text-lg text-ink outline-none placeholder:text-base placeholder:text-ink-faint"
                          placeholder={`Other amount${
                            topup.min_amount_paise
                              ? ` (${rupees(topup.min_amount_paise)}+)`
                              : ''
                          }`}
                          value={custom}
                          onFocus={() => setCustomOn(true)}
                          onChange={(e) => {
                            setCustomOn(true);
                            setCustom(
                              e.target.value.replace(/[^\d]/g, '').slice(0, 7)
                            );
                          }}
                        />
                      </label>
                      {customOn &&
                        payAmount &&
                        !extraUsed &&
                        bonusFor(topup.bonus_rules, payAmount) > 0 && (
                          <p className="mt-1 text-sm font-semibold text-teal">
                            +{rupees(bonusFor(topup.bonus_rules, payAmount))}{' '}
                            extra
                          </p>
                        )}
                    </div>
                  )}
                </div>
                <p className={cn(NOTE, 'mt-3')}>
                  Wallet money is for FamCare bookings only. It can&apos;t be
                  withdrawn as cash.
                  {topup.bonus_rules.length > 0 &&
                  topup.bonus_once_per_phone &&
                  !extraUsed
                    ? ' The extra is once per phone number.'
                    : ''}
                </p>
                {extraUsed && me && (
                  <p className="mt-2 rounded-xl bg-teal-tint px-3 py-2 text-sm font-semibold text-teal-dark">
                    Extra used: the number ending {me.phone_last4} has already
                    had this offer&apos;s extra. You can still add money.
                  </p>
                )}
              </div>
            )}
            {error && <p className={ERROR}>{error}</p>}
            <button
              type="button"
              disabled={busy}
              onClick={start}
              className={cn(CTA, 'w-full')}
            >
              {busy ? 'Please wait…' : 'Continue'}
            </button>
          </div>
        )}

        {step === 'phone' && (
          <form onSubmit={sendOtp} className="space-y-5">
            <div>
              <label htmlFor="cmp-mobile" className={LABEL}>
                Your mobile number
              </label>
              <p className={cn(NOTE, 'mb-3')}>
                Use the number you&apos;ll book with. It&apos;s your FamCare
                login, and {pack ? 'the pack' : 'the money'} is added to it.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-ink-muted">
                  +91
                </span>
                <input
                  id="cmp-mobile"
                  className={FIELD}
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  required
                />
              </div>
            </div>
            {error && <p className={ERROR}>{error}</p>}
            <button
              disabled={busy || mobile.length !== 10}
              className={cn(CTA, 'w-full')}
            >
              {busy ? 'Sending…' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verifyOtp} className="space-y-5">
            <div>
              <label htmlFor="cmp-otp" className={LABEL}>
                Enter the 4-digit code sent to +91 {mobile}
              </label>
              <input
                id="cmp-otp"
                className={cn(FIELD, 'text-center text-2xl tracking-[0.6em]')}
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                required
                autoFocus
              />
              <div className="mt-3 flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-teal underline"
                >
                  Change number
                </button>
                <button
                  type="button"
                  disabled={resendIn > 0 || busy}
                  onClick={() => sendOtp()}
                  className="text-teal underline disabled:text-ink-faint disabled:no-underline"
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend code'}
                </button>
              </div>
            </div>
            {error && <p className={ERROR}>{error}</p>}
            <button
              disabled={busy || otp.length !== 4}
              className={cn(CTA, 'w-full')}
            >
              {busy ? 'Checking…' : 'Verify'}
            </button>
          </form>
        )}

        {step === 'location' && (
          <div className="space-y-5">
            <div>
              <span className={LABEL}>Where do you need care?</span>
              <p className={NOTE}>
                We check that our caregivers reach your home before you pay.
                Please do this from home, or wherever you&apos;ll book care for.
              </p>
            </div>
            {notServed ? (
              <div className="space-y-4">
                <p className={ERROR}>
                  We don&apos;t serve this area yet. No payment was taken.
                </p>
                <Link href="/" className={cn(GHOST, 'w-full')}>
                  See where FamCare works
                </Link>
              </div>
            ) : (
              <>
                {error && <p className={ERROR}>{error}</p>}
                <button
                  type="button"
                  disabled={busy}
                  onClick={useLocation}
                  className={cn(CTA, 'w-full')}
                >
                  {busy ? 'Checking…' : 'Use my current location'}
                </button>
              </>
            )}
          </div>
        )}

        {step === 'blocked' && me && (
          <div className="space-y-5">
            <p className="text-lg font-semibold text-ink">{me.message}</p>
            <p className={NOTE}>
              Logged in as the number ending {me.phone_last4}.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {c.fallback ? (
                <Link href={`/c/${c.fallback.code}`} className={CTA}>
                  {c.fallback.headline}
                </Link>
              ) : (
                <a href={BUSINESS.appUrl} className={CTA}>
                  Open the FamCare app
                </a>
              )}
              <button type="button" onClick={changeNumber} className={GHOST}>
                Use another number
              </button>
            </div>
          </div>
        )}

        {step === 'review' && me && (
          <div className="space-y-5">
            <p className="text-lg font-semibold text-ink">Check and pay</p>
            <dl className="space-y-2 rounded-2xl bg-teal-tint p-4 text-base">
              <div className="flex justify-between">
                <dt className="text-ink-muted">You pay</dt>
                <dd className="font-semibold text-ink">{rupees(payAmount)}</dd>
              </div>
              {topup ? (
                <>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Added to your wallet</dt>
                    <dd className="font-semibold text-ink">
                      {rupees(payAmount)}
                    </dd>
                  </div>
                  {extra > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">Extra from FamCare</dt>
                      <dd className="font-semibold text-teal">
                        +{rupees(extra)}
                      </dd>
                    </div>
                  )}
                  {extraUsed && (
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">Extra from FamCare</dt>
                      <dd className="font-semibold text-ink-muted">
                        Already used
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-line pt-2">
                    <dt className="text-ink-muted">Wallet after this</dt>
                    <dd className="font-semibold text-teal-dark">
                      {rupees(
                        me.wallet_balance_paise + (payAmount ?? 0) + extra
                      )}
                    </dd>
                  </div>
                </>
              ) : (
                pack && (
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">You get</dt>
                    <dd className="text-right font-semibold text-ink">
                      {pack.visits} booking{pack.visits === 1 ? '' : 's'},{' '}
                      {pack.validity_days} days
                    </dd>
                  </div>
                )
              )}
            </dl>
            {extraUsed && (
              <p className={NOTE}>
                Extra used: this number has already had this offer&apos;s extra,
                so this top-up has none.
              </p>
            )}
            <p className={NOTE}>
              For the number ending {me.phone_last4}.{' '}
              <button
                type="button"
                onClick={changeNumber}
                className="text-teal underline"
              >
                Not you?
              </button>
            </p>

            {c.terms && (
              <details className="rounded-2xl border border-line px-4 py-3 text-sm text-ink-muted">
                <summary className="cursor-pointer font-semibold text-teal-dark">
                  Offer terms
                </summary>
                <p className="mt-2 whitespace-pre-line">{c.terms}</p>
              </details>
            )}
            <label className="flex items-start gap-3 text-sm text-ink">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-teal-dark"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                I agree to the offer terms, the{' '}
                <Link
                  href="/terms-and-conditions"
                  className="text-teal underline"
                  target="_blank"
                >
                  Terms
                </Link>{' '}
                and the{' '}
                <Link
                  href="/refund-policy"
                  className="text-teal underline"
                  target="_blank"
                >
                  Refund policy
                </Link>
                .
                {topup
                  ? ' Wallet money is only for FamCare services and is not withdrawable as cash.'
                  : ''}
              </span>
            </label>
            {error && <p className={ERROR}>{error}</p>}
            <button
              type="button"
              disabled={busy}
              onClick={pay}
              className={cn(CTA, 'w-full')}
            >
              {busy
                ? 'Opening payment…'
                : c.button_label || `Pay ${rupees(payAmount)}`}
            </button>
            {me.dev_bypass && order && (
              <button
                type="button"
                disabled={busy}
                onClick={devComplete}
                className="w-full text-center text-sm text-ink-faint underline"
              >
                Developer: complete without paying
              </button>
            )}
            <p className="text-center text-xs text-ink-faint">
              Payments are processed securely by Razorpay.
            </p>
          </div>
        )}

        {step === 'processing' && (
          <div className="space-y-4 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-teal/20 border-t-teal-dark" />
            <p className="text-lg font-semibold text-ink">
              Payment received, adding it now
            </p>
            <p className={NOTE}>
              This usually takes under a minute. You can close this page: it
              will be in your account and we&apos;ll notify you in the app.
              Please don&apos;t pay again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
