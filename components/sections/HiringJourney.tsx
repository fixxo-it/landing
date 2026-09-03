"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal, { DURATION, EASE, RISE, IN_VIEW } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/* ── illustrations ─────────────────────────────────────────────────────── */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[340px]">
      {/* offset ghost card, same stacked look as the bento visuals */}
      <span className="absolute -bottom-2 left-1/2 h-full w-[88%] -translate-x-1/2 rounded-2xl border border-white bg-white" />
      <div className="relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-float before:absolute before:inset-x-6 before:top-0 before:h-10 before:rounded-full before:bg-gradient-to-b before:from-white/90 before:to-transparent before:blur-md before:content-[''] before:pointer-events-none">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

function VisualHiring() {
  return (
    <Shell>
      <div className="flex items-center gap-3">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-teal-light/25">
          <Image src="/img/candidate.png" alt="" aria-hidden fill sizes="44px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink">Neha</span>
          <span className="block text-[11px] text-ink-faint">Whitefield · 4 yrs experience</span>
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Patience", "Calm communication", "Cleanliness", "Empathy"].map((t) => (
          <span key={t} className="rounded-full bg-teal/[0.07] px-2.5 py-1 text-[11px] font-medium text-teal">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px]">
        <span className="text-ink-faint">Interview rounds</span>
        <span className="font-semibold text-ink">2 of 2 cleared</span>
      </div>
    </Shell>
  );
}

function VisualIdentity() {
  return (
    <Shell>
      <div className="flex gap-3">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-teal-light/20">
          <Image src="/img/candidate.png" alt="" aria-hidden fill sizes="56px" className="object-cover" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <span className="block truncate text-sm font-semibold text-ink">Neha</span>
          <span className="block truncate text-[11px] text-ink-faint">Whitefield · Application #FC-2481</span>
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {["Government ID", "Address proof", "Background check"].map((t) => (
          <span key={t} className="flex items-center justify-between text-[11px]">
            <span className="text-ink-muted">{t}</span>
            <span className="flex items-center gap-1 font-semibold text-teal">
              Verified
              <Check className="h-3.5 w-3.5" />
            </span>
          </span>
        ))}
      </div>
    </Shell>
  );
}

function VisualTraining() {
  const modules: [string, number][] = [
    ["Baby care", 1],
    ["Hygiene", 1],
    ["Emergencies", 0.82],
    ["Parent communication", 0.64],
  ];
  return (
    <Shell>
      <p className="text-eyebrow font-semibold uppercase text-ink-faint">Training modules</p>
      <div className="mt-4 space-y-3.5">
        {modules.map(([name, value]) => (
          <span key={name} className="block">
            <span className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="font-medium text-ink">{name}</span>
              <span className="text-ink-faint">{value === 1 ? "Done" : "In progress"}</span>
            </span>
            <span className="block h-1.5 w-full rounded-full bg-ink/[0.06]">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: value }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                className="block h-full origin-left rounded-full bg-teal"
              />
            </span>
          </span>
        ))}
      </div>
    </Shell>
  );
}

function VisualAssessment() {
  return (
    <Shell>
      <div className="flex items-center gap-4">
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-lime/30">
          <span className="font-display text-lg font-bold text-teal">94</span>
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">Skill assessment</span>
          <span className="block text-[11px] text-ink-faint">Practical, observed in-centre</span>
        </span>
      </div>
      <div className="mt-4 space-y-2 border-t border-line pt-3">
        {["Feeding & sleep routine", "Emergency response drill", "Parent handover"].map((t) => (
          <span key={t} className="flex items-center gap-2 text-[11px] text-ink-muted">
            <Check className="h-3.5 w-3.5 shrink-0 text-teal" />
            {t}
          </span>
        ))}
      </div>
      <span className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-teal py-2 text-[11px] font-semibold text-white">
        <Check className="h-3.5 w-3.5" />
        Certified to book
      </span>
    </Shell>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

const ICON_PATHS = [
  /* person */ "M15.5 8.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0",
  /* face scan */ "M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8m8 0h2.5A1.5 1.5 0 0 1 20 5.5V8m0 8v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16m5-4.5h.01M15 11.5h.01M9.5 15a3.5 3.5 0 0 0 5 0",
  /* cap */ "M12 4 2.5 9 12 14l9.5-5L12 4Zm-6 7v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11",
  /* clipboard check */ "M9 4h6v2H9V4Zm-1 1H6.5A1.5 1.5 0 0 0 5 6.5v12A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 17.5 5H16m-6.5 7.5 2 2 4-4",
];

const STEPS = [
  {
    title: "Careful hiring",
    body: "We shortlist for temperament first: patience, calm communication, cleanliness and empathy, across two interview rounds.",
    Visual: VisualHiring,
  },
  {
    title: "Verified identity",
    body: "Government ID, address and criminal background verification are completed before a caregiver is ever shown to a family.",
    Visual: VisualIdentity,
  },
  {
    title: "Mandatory training",
    body: "Classroom and hands-on training in baby care, hygiene, emergency response and parent communication.",
    Visual: VisualTraining,
  },
  {
    title: "Practical assessment",
    body: "Skills are demonstrated, observed and certified in-centre. Only then does a caregiver become bookable.",
    Visual: VisualAssessment,
  },
];

/* ── section ───────────────────────────────────────────────────────────── */

export default function HiringJourney() {
  const [active, setActive] = useState(0);
  const ActiveVisual = STEPS[active].Visual;

  return (
    <Section id="caregivers">
      <SectionHeading
        size="lg"
        title={
          <>
            We hire for character.
            <br />
            We train for care.
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-x-16 lg:mt-24 lg:grid-cols-2">
        {/* sticky illustration — desktop only; mobile renders it inside each step */}
        <div className="hidden lg:block">
          <div className="sticky top-[15vh] flex h-[70vh] items-center justify-center">
            {/* the reveal wraps the panel rather than the sticky element above
                it: motion writes a transform, and a transformed sticky ancestor
                would stop the panel pinning to the viewport */}
            <Reveal className="relative isolate flex h-[420px] w-full items-center justify-center overflow-hidden rounded-card border border-line bg-white">
              <Image
                src="/img/testimonialsbg.jpg"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <ActiveVisual />
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </div>

        <ol>
          {STEPS.map((step, i) => (
            <Step
              key={step.title}
              index={i}
              step={step}
              active={active}
              isLast={i === STEPS.length - 1}
              onActivate={setActive}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Step({
  index,
  step,
  active,
  isLast,
  onActivate,
}: {
  index: number;
  step: (typeof STEPS)[number];
  active: number;
  isLast: boolean;
  onActivate: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();

  /* zero-height band at the viewport middle: whichever step crosses it wins */
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  /* the arrival is a separate, wider trigger — the step fades up as it comes
     onto the screen, well before it reaches the band that lights it */
  const revealed = useInView(ref, IN_VIEW);

  /* the connector below this step fills as the step scrolls past centre —
     no measuring, so it survives resize and font swaps */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  const on = index <= active;
  const { Visual } = step;

  return (
    <motion.li
      ref={ref}
      /* each step arrives on its own as you reach it, rather than the whole
         list appearing at once when the section's top edge enters */
      initial={{ opacity: 0, y: reduced ? 0 : RISE }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : RISE }}
      transition={{ duration: DURATION, ease: EASE }}
      className="relative flex gap-5 pb-16 last:pb-0 lg:min-h-[70vh] lg:pb-0"
    >
      {!isLast && (
        <span className="absolute bottom-0 left-5 top-12 w-px -translate-x-1/2 bg-line">
          <motion.span
            style={{ scaleY: reduced ? 1 : fill }}
            className="block h-full w-full origin-top bg-teal"
          />
        </span>
      )}

      {/* same photo-backed chip as the Safety 360° board, so the two step
          sequences on the page are cut from one material */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl">
        <Image
          src="/img/book3taps.jpg"
          alt=""
          aria-hidden
          fill
          sizes="40px"
          className="object-cover"
        />
        {/* the glyph is white, so the wash has to be dark enough to carry it:
            brand teal once the step is reached, a neutral scrim before */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 backdrop-blur-[2px] transition-colors duration-300 motion-reduce:transition-none",
            on ? "bg-[#E4FF5C]/90" : "bg-ink/45",
          )}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-inset ring-white/40"
        />
        <svg
          className={cn("relative h-5 w-5 transition-colors duration-300", on ? "text-teal" : "text-white")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d={ICON_PATHS[index]} />
        </svg>
      </span>

      <div
        className={cn(
          "pt-1 transition-opacity duration-300 motion-reduce:transition-none",
          index === active ? "opacity-100" : "lg:opacity-40",
        )}
      >
        <h3 className="font-display text-h3 font-semibold text-ink lg:text-3xl">{step.title}</h3>
        <p className="mt-3 max-w-[420px] text-base leading-relaxed text-ink-muted">{step.body}</p>
        <div className="mt-6 lg:hidden">
          <Visual />
        </div>
      </div>
    </motion.li>
  );
}
