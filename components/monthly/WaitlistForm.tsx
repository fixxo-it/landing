'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Select from '@/components/join/Select';
import { AGES, BENGALURU_AREAS, NEAR_AREAS, NOT_LISTED, OTHER, STARTS } from '@/lib/waitlist-options';
import { CTA } from '@/components/monthly/styles';
import { cn } from '@/lib/cn';
import { EASE } from '@/components/motion/Reveal';

const AREAS = [...NEAR_AREAS, OTHER];

/* same panel, field and label treatment as the caregiver application, so
   the two forms on the site read as one family */
const PANEL = 'relative isolate overflow-hidden rounded-[32px] bg-white shadow-float ring-1 ring-teal/10';
const FIELD =
  'w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-teal focus:ring-2 focus:ring-teal/15';
const LABEL = 'mb-2 block text-sm font-semibold text-teal-dark';
const REQUIRED = <span className="text-[#c0392b]">*</span>;

/* one choice, picked by tapping a pill */
function Pills({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={cn(
              'rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200',
              on ? 'border-teal-dark bg-teal-dark text-white shadow-pill' : 'border-line bg-white text-ink-muted hover:border-teal/40 hover:text-teal'
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export default function WaitlistForm() {
  const [f, setF] = useState({ name: '', mobile: '', area: '', childAge: '', start: '', website: '' });
  const [otherArea, setOtherArea] = useState('');
  const area = f.area === OTHER ? otherArea : f.area;
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!f.name.trim()) return setError('Please enter your name');
    if (!/^[6-9]\d{9}$/.test(f.mobile)) return setError('Please enter a valid 10-digit mobile number');
    if (!area || !f.childAge || !f.start) return setError("Please choose your area, your child's age and when you'd like to start");
    setSending(true);
    try {
      const res = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, area }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again');
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={cn(PANEL, 'p-10 text-center lg:p-16')}
        >
          <motion.svg viewBox="0 0 64 64" className="mx-auto h-20 w-20" aria-hidden initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}>
            <circle cx="32" cy="32" r="30" fill="#014D4F" />
            <motion.path
              d="M19 33l9 9 17-18"
              fill="none"
              stroke="#fff"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.svg>
          <h3 className="mt-6 font-glyphic text-3xl text-ink lg:text-[2.75rem]">You&rsquo;re on the list</h3>
          <p className="mx-auto mt-3 max-w-md text-lg text-ink-muted">
            We&rsquo;ll call you on {f.mobile} when a monthly slot opens in {area === NOT_LISTED ? 'your area' : area}
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} className={cn(PANEL, 'p-6 sm:p-10 lg:p-14')}>
          <h3 className="font-glyphic text-3xl text-ink lg:text-[2.75rem]">Join the waitlist</h3>
          <p className="mt-2 text-ink-muted">Fields marked {REQUIRED} are required</p>

          {/* honeypot: hidden from people, filled by bots */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website')(e.target.value)} className="hidden" aria-hidden />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <label>
              <span className={LABEL}>Your name {REQUIRED}</span>
              <input className={FIELD} value={f.name} onChange={(e) => set('name')(e.target.value)} placeholder="Full name" autoComplete="name" />
            </label>
            <label>
              <span className={LABEL}>Mobile number {REQUIRED}</span>
              <input
                className={FIELD}
                value={f.mobile}
                onChange={(e) => set('mobile')(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit number"
                inputMode="numeric"
                autoComplete="tel-national"
              />
            </label>
          </div>

          <div className="mt-8 space-y-7">
            <div>
              <span className={LABEL}>Your area {REQUIRED}</span>
              <Pills label="Your area" options={AREAS} value={f.area} onChange={set('area')} />
              {f.area === OTHER && (
                <div className="mt-3 md:max-w-[calc(50%-0.75rem)]">
                  <Select value={otherArea} onChange={setOtherArea} options={BENGALURU_AREAS} placeholder="Select your area in Bengaluru" searchable />
                </div>
              )}
            </div>
            <div>
              <span className={LABEL}>Your child&rsquo;s age {REQUIRED}</span>
              <Pills label="Child's age" options={AGES} value={f.childAge} onChange={set('childAge')} />
            </div>
            <div>
              <span className={LABEL}>When would you like to start? {REQUIRED}</span>
              <Pills label="Start" options={STARTS} value={f.start} onChange={set('start')} />
            </div>
          </div>

          {error && <p className="mt-6 rounded-xl bg-[#fdecea] px-4 py-3 text-sm font-medium text-[#a12b1f]">{error}</p>}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ink-muted">
              Free, and no commitment. We&rsquo;ll only use your details to contact you about monthly care
            </p>
            <button type="submit" disabled={sending} className={CTA}>
              <span>
                {sending ? 'Joining...' : 'Join the waitlist'}
              </span>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
