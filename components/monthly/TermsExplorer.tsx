'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

/* The full monthly-plan terms, kept in substance with "FamCare Monthly Care
   Plans" (updated 03 November 2026). Each topic is one number and one sentence;
   the fine print opens only when asked for. The rules that can cost money stay
   visible at all times. **bold** marks what to notice. */
type Term = { title: string; value: string; summary: string; points: string[] };

const WATCH = [
  'Cancelling **during the 3-month lock-in** forfeits the **₹18,000 deposit**',
  'Not resuming **within 7 days after a pause** ends the agreement and **forfeits the deposit**',
  'Withdrawing a cancellation notice to continue service costs **₹3,000**',
];

const TERMS: Term[] = [
  {
    title: 'Plan & payments',
    value: '₹35,999',
    summary: 'A month + taxes, with an ₹18,000 refundable deposit. First payment: ₹53,999 + taxes',
    points: [
      '10 hours a day on 26 agreed service days per monthly cycle',
      'Timings, dates and offs are confirmed before service begins, subject to local availability',
      '6 or 12 month agreement. Renewal payments are due at least 5 days before each new cycle',
      'Extra days beyond the 26 need a separately paid on-demand booking, subject to availability',
    ],
  },
  {
    title: 'Trial',
    value: '₹4,499',
    summary: '3 days, 10 hours a day, with up to 3 caregivers to meet',
    points: [
      'Paid separately, not adjusted against the monthly fee or deposit',
      'Starts immediately if a caregiver is free, otherwise within a week of payment',
      'Like the first caregiver? Keep them from Day 2. Trying all three is optional',
      'If none of the three suits you, a fresh trial pack is needed',
    ],
  },
  {
    title: 'Lock-in, notice & deposit',
    value: '3 months',
    summary: 'Minimum lock-in, then 1 month’s notice. Deposit back after your last service',
    points: [
      'The lock-in runs 3 months from your monthly start date, after the trial',
      'After it, give one month’s notice. Monthly fees remain payable during notice',
      'Deposit refunded within 7 working days of your last service, after dues and agreed deductions',
    ],
  },
  {
    title: 'Pauses',
    value: '₹3,999 or ₹6,999',
    summary: 'One 7-day pause and one 15-day pause',
    points: [
      'Each pause can be used once across the whole agreement, booked in the app',
      'Pause days extend your cycle, lock-in and agreement end dates automatically',
      'Service restarts automatically the day after a pause ends',
    ],
  },
  {
    title: 'Backup & attendance',
    value: '₹0',
    summary: 'For backup cover of up to 10 hours on leave days',
    points: [
      'Backup or replacement caregivers cover leave on agreed service days, at no extra charge. They may differ from your primary caregiver',
      'Mark an absence in the app to request backup. Caregivers can dispute an absence they disagree with',
      'If FamCare cannot deliver, a replacement, service credit or refund is documented for you',
    ],
  },
];

function Rich({ t }: { t: string }) {
  return (
    <>
      {t.split('**').map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function TermsExplorer({ updated }: { updated: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h3 className="font-glyphic text-[2.25rem] leading-[1.1] text-ink lg:text-[3rem]">The full terms, at a glance</h3>
        <p className="mt-3 text-ink-muted">Everything in your agreement, one topic at a time</p>

        {/* always visible: the rules that can cost you */}
        <div className="mt-8 rounded-[20px] bg-[#FFF4ED] p-5">
          <p className="font-semibold text-[#C2410C]">Know this before you sign up</p>
          <ul className="mt-3 space-y-3 text-[15px] leading-snug text-ink-muted">
            {WATCH.map((w) => (
              <li key={w}>
                <Rich t={w} />
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-ink-faint">{updated}</p>
      </div>

      <ul className="divide-y divide-line border-y border-line self-start">
        {TERMS.map((t, i) => {
          const on = open === i;
          return (
            <li key={t.title}>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : i)}
                className="group flex w-full items-center gap-5 py-6 text-left"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink-muted">{t.title}</span>
                  <span className="mt-1 block font-glyphic text-[1.75rem] leading-tight text-teal-dark lg:text-[2.25rem]">{t.value}</span>
                  <span className="mt-1 block text-ink-muted">{t.summary}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-teal transition-[transform,background-color,color] duration-300 group-hover:bg-teal-dark group-hover:text-white',
                    on && 'rotate-45',
                  )}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="list-disc space-y-2 pb-6 pl-5 pr-14 leading-relaxed text-ink-muted marker:text-teal">
                      {t.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
