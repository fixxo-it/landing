"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion";
import { Section } from "@/components/ui/Section";
import Reveal, { DURATION, EASE, RISE, IN_VIEW } from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import BenefitIcon from "@/components/join/BenefitIcon";
import { JELLY_GREEN } from "@/components/ui/jelly";
import { cn } from "@/lib/cn";

const CAREGIVER_FORM_URL = "/join";

/* ── illustrations ─────────────────────────────────────────────────────── */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[510px]">
      {/* offset ghost card, same stacked look as the bento visuals */}
      <span className="absolute -bottom-3 left-1/2 h-full w-[88%] -translate-x-1/2 rounded-3xl border border-white bg-white" />
      <div className="relative overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-float sm:p-9 before:absolute before:inset-x-9 before:top-0 before:h-14 before:rounded-full before:bg-gradient-to-b before:from-white/90 before:to-transparent before:blur-md before:content-[''] before:pointer-events-none">
        <Image
          src="/img/Grainy.jpg"
          alt=""
          aria-hidden
          fill
          sizes="510px"
          className="object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

function VisualHiring() {
  return (
    <Shell>
      <div className="flex items-center gap-[18px]">
        <span className="relative h-[66px] w-[66px] shrink-0 overflow-hidden rounded-full bg-teal-light/25">
          <Image
            src="/img/candidate.png"
            alt=""
            aria-hidden
            fill
            sizes="66px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[21px] font-semibold text-ink">Neha</span>
          <span className="block text-[16px] text-ink-faint">Whitefield · 4 yrs experience</span>
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {["Patience", "Calm communication", "Cleanliness", "Empathy"].map((t) => (
          <span
            key={t}
            className="rounded-full bg-teal/[0.07] px-[15px] py-1.5 text-[16px] font-medium text-teal"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-[18px] text-[16px]">
        <span className="text-ink-faint">Interview rounds</span>
        <span className="font-semibold text-ink">2 of 2 cleared</span>
      </div>
    </Shell>
  );
}

function VisualIdentity() {
  return (
    <Shell>
      <div className="flex gap-[18px]">
        <span className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full bg-teal-light/20">
          <Image
            src="/img/candidate.png"
            alt=""
            aria-hidden
            fill
            sizes="84px"
            className="object-cover"
          />
        </span>
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <span className="block truncate text-[21px] font-semibold text-ink">Neha</span>
          <span className="block truncate text-[16px] text-ink-faint">
            Whitefield · Application #FC-2481
          </span>
        </span>
      </div>
      <div className="mt-6 space-y-3">
        {["Government ID", "Address proof", "Background check"].map((t) => (
          <span key={t} className="flex items-center justify-between text-[16px]">
            <span className="text-ink-muted">{t}</span>
            <span className="flex items-center gap-1.5 font-semibold text-teal">
              Verified
              <Check className="h-[21px] w-[21px]" />
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
      <p className="text-[16px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
        Training modules
      </p>
      <div className="mt-6 space-y-[21px]">
        {modules.map(([name, value]) => (
          <span key={name} className="block">
            <span className="mb-[9px] flex items-center justify-between text-[16px]">
              <span className="font-medium text-ink">{name}</span>
              <span className="text-ink-faint">{value === 1 ? "Done" : "In progress"}</span>
            </span>
            <span className="block h-[9px] w-full rounded-full bg-ink/[0.06]">
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
      <div className="flex items-center gap-6">
        <span className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-lime/30">
          <span className="font-display text-[27px] font-bold text-teal">94</span>
        </span>
        <span>
          <span className="block text-[21px] font-semibold text-ink">Skill assessment</span>
          <span className="block text-[16px] text-ink-faint">Practical, observed in-centre</span>
        </span>
      </div>
      <div className="mt-6 space-y-3 border-t border-line pt-[18px]">
        {["Feeding & sleep routine", "Emergency response drill", "Parent handover"].map((t) => (
          <span key={t} className="flex items-center gap-3 text-[16px] text-ink-muted">
            <Check className="h-[21px] w-[21px] shrink-0 text-teal" />
            {t}
          </span>
        ))}
      </div>
      <span className="relative mt-6 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-teal py-3 text-[16px] font-semibold text-white">
        <span
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url(/img/Grainy.jpg)" }}
        />
        <Check className="relative z-10 h-[21px] w-[21px]" />
        <span className="relative z-10">Certified to book</span>
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

const STEP_ICONS = ["heart", "shield", "training", "growth"];

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
      <div className="flex flex-col items-start gap-8 text-left lg:flex-row lg:items-end lg:justify-between">
        <Reveal
          as="h2"
          delay={0.05}
          className="font-display text-[2.5rem] font-bold leading-[1.08] tracking-[-0.03em] lg:text-[3.75rem] lg:leading-[1.05] text-balance text-ink"
        >
          We hire for character
          <br />
          We train for care
        </Reveal>
        <Reveal delay={0.15}>
          <Button
            href={CAREGIVER_FORM_URL}
            label="JOIN AS A CAREGIVER"
            variant="solid"
            size="md"
            className="text-sm uppercase tracking-[-0.01em]"
          />
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-16 lg:mt-24 lg:grid-cols-2">
        {/* sticky illustration — desktop only; mobile renders it inside each step */}
        <div className="hidden lg:block">
          <div className="sticky top-[10vh] flex h-[80vh] items-center justify-center">
            {/* the reveal wraps the panel rather than the sticky element above
                it: motion writes a transform, and a transformed sticky ancestor
                would stop the panel pinning to the viewport */}
            <Reveal
              className={cn(
                "relative isolate flex h-[630px] max-h-full w-full items-center justify-center overflow-hidden rounded-card p-6",
                JELLY_GREEN,
              )}
            >
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
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

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
      initial={{ opacity: 0, y: RISE }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE }}
      transition={{ duration: DURATION, ease: EASE }}
      className="relative flex gap-5 pb-16 last:pb-0 lg:min-h-[70vh] lg:pb-0"
    >
      {!isLast && (
        <span className="absolute bottom-0 left-5 top-12 w-px -translate-x-1/2 bg-line">
          <motion.span
            style={{ scaleY: fill }}
            className="block h-full w-full origin-top bg-teal"
          />
        </span>
      )}

      {/* the glossy lime jelly glyphs from the join page; steps not yet
          reached are held back to a faint tint */}
      <span
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center transition-[opacity,filter] duration-300 motion-reduce:transition-none",
          !on && "opacity-50 saturate-50",
        )}
      >
        <BenefitIcon name={STEP_ICONS[index]} className="h-12 w-12" />
      </span>

      <div
        className={cn(
          "min-w-0 flex-1 pt-1 transition-opacity duration-300 motion-reduce:transition-none",
          index === active ? "opacity-100" : "lg:opacity-40",
        )}
      >
        <h3 className="font-display text-h3 font-bold text-ink lg:text-3xl">{step.title}</h3>
        <p className="mt-3 max-w-[420px] text-base leading-relaxed text-ink-muted">{step.body}</p>
        <div className="mt-6 lg:hidden">
          <Visual />
        </div>
      </div>
    </motion.li>
  );
}
