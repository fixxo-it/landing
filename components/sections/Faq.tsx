"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import Reveal, { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Group = { tab: string; items: [string, string][] };

/* Answer shape, held to across every entry below: the direct answer is the
   first sentence, the proof is the second, and there is no third. A parent
   opening a row wants the answer, not a warm-up to it. */

const GROUPS: Group[] = [
  {
    tab: "Trust & safety",
    items: [
      [
        "How are FamCare caregivers verified?",
        "Nobody becomes bookable until every check clears. Application screening, two interviews, Aadhaar and identity verification, address verification, criminal background checks, reference checks, classroom and practical training, then a skill assessment.",
      ],
      [
        "Can I see who is coming before they arrive?",
        "Yes, the moment your booking is confirmed. Profile, photo, verification status and experience are in the app, and you can track the arrival live.",
      ],
      [
        "What happens in an emergency?",
        "The FamCare concierge answers 24/7 from inside the app. Every visit also carries accident cover and emergency medical assistance at no extra cost.",
      ],
    ],
  },
  {
    tab: "Training",
    items: [
      [
        "What training does a caregiver complete?",
        "Newborn and infant care, feeding and sleep routines, hygiene, emergency response, and parent communication. Every module is taught in-centre and closed by a practical assessment an instructor watches.",
      ],
      [
        "Is training refreshed over time?",
        "Yes, twice a year. Background checks are re-run every six months and refresher modules are required to stay bookable.",
      ],
    ],
  },
  {
    tab: "Booking",
    items: [
      [
        "How quickly can someone reach me?",
        "About 10 minutes in Whitefield and Varthur — that is the median for an instant booking, not a best case. Visits can also be scheduled up to 30 days ahead.",
      ],
      [
        "Can I cancel or reschedule?",
        "Free of charge until the caregiver is dispatched. After dispatch a small cancellation fee applies.",
      ],
    ],
  },
  {
    tab: "Caregivers",
    items: [
      [
        "Can I request the same caregiver again?",
        "Yes, and you do not have to ask. FamCare Match™ learns who your child bonds with and prioritises them on your next bookings.",
      ],
      [
        "What if my child does not settle with a caregiver?",
        "Tell us in the app and your next booking goes to someone else. We also stop matching you with that caregiver.",
      ],
    ],
  },
  {
    tab: "Pricing & payments",
    items: [
      [
        "Is there a visit or platform fee?",
        "No. The price shown before you confirm is the price you pay — no visit charge, no surge pricing, no hidden fees.",
      ],
      [
        "When am I charged?",
        "In-app, the moment you confirm the booking. Repeat bookings with a matched caregiver are discounted automatically.",
      ],
    ],
  },
  {
    tab: "Service area",
    items: [
      [
        "Where is FamCare available?",
        "Whitefield and Varthur, Bengaluru, today. We are expanding across east Bengaluru through the year.",
      ],
      [
        "Can I request my area?",
        "Yes. Drop your locality in the app and we will notify you the moment caregivers are bookable near you.",
      ],
    ],
  },
];

export default function Faq() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);

  const select = (i: number) => {
    setTab(i);
    setOpen(0);
  };


  return (
    /* trimmed bottom padding: the CTA below opens with its own top padding, so
       the two together left too much white between "Still have questions?" and
       the closing headline */
    <Section id="faq" className="pb-14 lg:pb-20">
      {/* grid-cols-1 is load-bearing, not decorative: with no track set below
         `lg`, an implicit column sizes itself to its widest content instead of
         the viewport — the longest accordion question was stretching this
         column, and the page under it, out to that width. Tailwind's grid-cols
         utilities use minmax(0,1fr), which is what actually clamps it. */}
      <div className="grid w-full grid-cols-1 gap-1 lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)] lg:items-stretch">
        {/* left panel — headline and the filter. No horizontal padding of its
            own any more: it sits at Container's own gutter, same inset as the
            footer, rather than stacking a second inset on top of it. */}
        <Reveal className="flex flex-col rounded-[20px] bg-white py-6 sm:py-8">
          {/* the page's standard heading ramp rather than the outsized one the
              full-bleed sections use: this one shares its panel with the filter
              and the contact line, so it has to leave them room */}
          {/* mobile size matched to "Book in 4 steps" so the page's oversized
              headings all read at the same scale on a phone */}
          <h2 className="font-display text-h1 font-semibold text-ink lg:text-h2-lg">
            Questions? Good.
            <br />
            Ask us anything.
          </h2>

          {/* the filter actually drives the list on the right — one row,
             scrolling natively on mobile rather than wrapping, so six tabs
             never cost the panel a second line. Desktop has room for all six
             without scrolling, so the overflow is switched off there. */}
          <div className="mt-8 flex gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GROUPS.map((g, i) => (
              <button
                key={g.tab}
                type="button"
                onClick={() => select(i)}
                aria-pressed={i === tab}
                className={cn(
                  "relative shrink-0 rounded-full px-6 py-3 text-xs uppercase tracking-[0.08em] transition-colors duration-200",
                  i === tab
                    ? "font-semibold text-white"
                    : "font-medium text-ink",
                )}
              >
                {i === tab && (
                  <motion.span
                    layoutId="faq-tab"
                    transition={{ duration: 0.35, ease: EASE }}
                    /* brand teal now, not the lime highlight — the selected tab
                       is a state, not the "live" marker the lime is elsewhere */
                    className="absolute inset-0 rounded-full bg-teal"
                  />
                )}
                {i !== tab && (
                  <span className="absolute inset-0 rounded-full border border-ink/30 bg-white/60" />
                )}
                <span className="relative z-10 whitespace-nowrap">{g.tab}</span>
              </button>
            ))}
          </div>

          {/* desktop only — pinned to the bottom of this column by mt-auto.
             The mobile copy lives after the accordion instead, see below. */}
          <div className="mt-10 hidden lg:mt-auto lg:block lg:pt-14">
            <p className="font-display text-h3 font-semibold text-ink">Still have questions?</p>
            <a
              href="mailto:support@famcare.co.in"
              className="mt-3 inline-block font-display text-lg font-semibold text-teal underline decoration-teal/30 underline-offset-4 transition-colors duration-200 hover:decoration-teal"
            >
              Mail us &rarr; support@famcare.co.in
            </a>
          </div>
        </Reveal>

        {/* right panel — one row per question, split by white hairlines */}
        <Reveal
          delay={0.1}
          className="overflow-hidden rounded-[20px] bg-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              /* the row rules were white, which read as separators against the
                 old grey panel — on white they have to invert to the hairline */
              className="divide-y divide-line"
            >
              {GROUPS[tab].items.map(([q, a], i) => {
                const isOpen = open === i;
                return (
                  <div key={q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className={cn(
                          "group flex w-full items-start justify-between gap-8 px-6 pt-6 text-left transition-[padding] duration-300 sm:px-8",
                          isOpen ? "pb-3" : "pb-6",
                        )}
                      >
                        <span className="text-lg font-semibold leading-snug text-ink lg:text-xl">
                          {q}
                        </span>
                        {/* + folds into − : the vertical stroke rotates out. One
                            SVG rather than two absolutely-positioned divs — a
                            sub-pixel bar centred with a transform rounds
                            differently per axis and throws the cross off-centre;
                            a single viewBox keeps both strokes on the same grid. */}
                        <svg
                          viewBox="0 0 20 20"
                          className="mt-1 h-5 w-5 shrink-0 text-ink-faint transition-colors duration-200 group-hover:text-ink"
                          aria-hidden
                        >
                          <line
                            x1="3" y1="10" x2="17" y2="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <motion.line
                            x1="10" y1="3" x2="10" y2="17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            style={{ transformOrigin: "10px 10px" }}
                          />
                        </svg>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] px-6 pb-6 text-[15px] leading-relaxed text-ink-muted sm:px-8 lg:text-base">
                            {a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </Reveal>

        {/* mobile only — the desktop copy lives inside the left panel instead,
           pinned to its bottom. Here it closes out the section instead of
           sitting between the filter and the accordion. */}
        <div className="mt-8 lg:hidden">
          <p className="font-display text-h3 font-semibold text-ink">Still have questions?</p>
          <a
            href="mailto:support@famcare.co.in"
            className="mt-3 inline-block font-display text-lg font-semibold text-teal underline decoration-teal/30 underline-offset-4 transition-colors duration-200 hover:decoration-teal"
          >
            Mail us &rarr; support@famcare.co.in
          </a>
        </div>
      </div>
    </Section>
  );
}
