'use client';

import { useEffect, useState } from 'react';
import { CTA } from '@/components/monthly/styles';
import { cn } from '@/lib/cn';
import { utmFrom, type Campaign, type Day } from '@/lib/winback';

/* Same panel, field and label treatment as the monthly waitlist, so the forms on
   the site read as one family. */
const PANEL =
  'relative isolate overflow-hidden rounded-[32px] bg-white p-6 shadow-float ring-1 ring-teal/10 sm:p-9';
const FIELD =
  'w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-teal focus:ring-2 focus:ring-teal/15';
const LABEL = 'mb-2 block text-sm font-semibold text-teal-dark';
const REQUIRED = <span className="text-[#c0392b]">*</span>;

function Pill({
  on,
  disabled,
  onClick,
  children,
}: {
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200',
        on
          ? 'border-teal-dark bg-teal-dark text-white shadow-pill'
          : 'border-line bg-white text-ink-muted hover:border-teal/40 hover:text-teal',
        disabled &&
          'cursor-not-allowed border-line bg-[#f3f4f4] text-ink-faint line-through hover:border-line hover:text-ink-faint'
      )}
    >
      {children}
    </button>
  );
}

export default function CallForm({ initial }: { initial: Campaign }) {
  const [campaign, setCampaign] = useState(initial);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [dayDate, setDayDate] = useState(initial.days[0]?.date ?? '');
  const [slotKey, setSlotKey] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ when: string; thanks: string } | null>(
    null
  );

  const { content, questions, days } = campaign;
  const day: Day | undefined = days.find((d) => d.date === dayDate) ?? days[0];

  /* One visit counted per page load, by where the link came from. */
  useEffect(() => {
    const source = utmFrom(window.location.search).utm_source ?? '';
    fetch(`/api/winback/${initial.slug}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source }),
    }).catch(() => undefined);
  }, [initial.slug]);

  const refreshSlots = async () => {
    try {
      const res = await fetch(`/api/winback/${initial.slug}`, {
        cache: 'no-store',
      });
      if (!res.ok) return;
      const fresh = (await res.json()) as Campaign;
      setCampaign(fresh);
      setDayDate(fresh.days[0]?.date ?? '');
    } catch {
      // keep what is on screen
    }
    setSlotKey('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const phone = mobile.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    if (name.trim().length < 2) return setError('Please enter your name');
    if (!/^[6-9]\d{9}$/.test(phone))
      return setError('Please enter a valid 10-digit mobile number');
    for (const q of questions) {
      if (q.required && !(answers[q.id] ?? '').trim())
        return setError(`Please answer: ${q.label}`);
    }
    if (!day || !slotKey)
      return setError('Please pick a day and a time for your call');
    if (!consent) return setError('Please tick the box so we can call you');
    setSending(true);
    try {
      const res = await fetch(`/api/winback/${initial.slug}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          answers,
          slot_date: day.date,
          slot_key: slotKey,
          consent,
          utm: utmFrom(window.location.search),
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        if (
          data.code === 'slot_full' ||
          data.code === 'bad_slot' ||
          data.code === 'full_today'
        )
          await refreshSlots();
        throw new Error(
          data.message || 'Something went wrong. Please try again'
        );
      }
      setDone({
        when: data.slot?.label ?? '',
        thanks: data.thank_you ?? content.thank_you,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again'
      );
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className={cn(PANEL, 'text-center')} role="status">
        <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16" aria-hidden>
          <circle cx="32" cy="32" r="30" fill="#014D4F" />
          <path
            d="M19 33l9 9 17-18"
            fill="none"
            stroke="#fff"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="mt-5 font-glyphic text-3xl text-ink">You are all set</h1>
        {done.when && (
          <p className="mt-2 text-lg font-semibold text-teal-dark">
            {done.when}
          </p>
        )}
        <p className="mt-3 text-base text-ink-muted">{done.thanks}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={PANEL} noValidate>
      <h1 className="font-glyphic text-3xl text-ink sm:text-4xl">
        {content.headline}
      </h1>
      <p className="mt-2 text-base text-ink-muted">{content.subheadline}</p>

      <div className="mt-7 space-y-6">
        {questions.map((q) => (
          <div key={q.id}>
            <span className={LABEL} id={`q-${q.id}`}>
              {q.label} {q.required && REQUIRED}
            </span>
            {q.type === 'choice' ? (
              <div
                role="radiogroup"
                aria-labelledby={`q-${q.id}`}
                className="flex flex-wrap gap-2"
              >
                {q.options.map((o) => (
                  <Pill
                    key={o.value}
                    on={answers[q.id] === o.value}
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [q.id]: o.value }))
                    }
                  >
                    {o.label}
                  </Pill>
                ))}
              </div>
            ) : (
              <textarea
                aria-labelledby={`q-${q.id}`}
                rows={2}
                maxLength={300}
                className={FIELD}
                value={answers[q.id] ?? ''}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                }
              />
            )}
          </div>
        ))}

        <div>
          <span className={LABEL} id="when">
            When should we call? {REQUIRED}
          </span>
          {days.length === 0 ? (
            <p className="rounded-2xl bg-teal-tint px-4 py-3 text-sm text-teal-dark">
              All call slots are taken for now. Please check back soon.
            </p>
          ) : (
            <>
              <div
                role="radiogroup"
                aria-label="Day"
                className="mb-3 flex flex-wrap gap-2"
              >
                {days.map((d) => (
                  <Pill
                    key={d.date}
                    on={day?.date === d.date}
                    onClick={() => {
                      setDayDate(d.date);
                      setSlotKey('');
                    }}
                  >
                    {d.label}
                  </Pill>
                ))}
              </div>
              <div
                role="radiogroup"
                aria-labelledby="when"
                className="flex flex-wrap gap-2"
              >
                {day?.slots.map((s) => (
                  <Pill
                    key={s.key}
                    on={slotKey === s.key}
                    disabled={!s.available}
                    onClick={() => setSlotKey(s.key)}
                  >
                    {s.label}
                  </Pill>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <label htmlFor="wb-name" className={LABEL}>
            Your name {REQUIRED}
          </label>
          <input
            id="wb-name"
            className={FIELD}
            autoComplete="name"
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="wb-mobile" className={LABEL}>
            Mobile number {REQUIRED}
          </label>
          <input
            id="wb-mobile"
            className={FIELD}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            maxLength={16}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* honeypot: people never see this field */}
        <div
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <label className="flex items-start gap-3 text-sm text-ink-muted">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[#014D4F]"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>{content.consent_text}</span>
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-2xl bg-[#fdeceb] px-4 py-3 text-sm font-medium text-[#a3281c]"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending || days.length === 0}
          className={cn(CTA, 'w-full')}
        >
          {sending ? 'Sending…' : content.submit_label}
        </button>
      </div>
    </form>
  );
}
