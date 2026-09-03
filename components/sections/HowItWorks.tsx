"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import Reveal, { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/* how long each screen holds before the next one slides in */
const DWELL = 2.2;

/* one caption per phone screen — the stepper shows the live one under its dot */
const STEPS = [
  "Tell us what you need (30 sec)",
  "Select a service",
  "Confirm & pay (2 min)",
  "They arrive (~10 min)",
];
const SCREENS = STEPS.length;

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduced = useReducedMotion();
  const running = inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % SCREENS), DWELL * 1000);
    return () => clearTimeout(id);
  }, [active, running]);

  return (
    /* no bg on the section itself — a solid fill would put back the hard edge
       the mask below exists to remove. The extra padding is the price of the
       dissolve: content has to start below where the wash finishes. */
    <Section
      id="how-it-works"
      className="relative isolate overflow-hidden pt-40 pb-40 lg:pt-52 lg:pb-52"
    >
      {/* flat brand teal, hard edge top and bottom — the fade mask existed to
          blend a photo's crop into the white sections either side, and a solid
          fill has no seam to hide. Grain still sits on top, or the fill reads
          too flat next to every other section's textured ground. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-teal">
        <div className="grain pointer-events-none absolute inset-0" />
      </div>

      {/* heading left, phone right. Both tracks size to their content and the
          pair is then centred as a unit — a 1fr text column would be wider than
          the headline, so the ink would sit right of the page centre even
          though the grid itself was centred. */}
      <div
        ref={ref}
        className="relative mx-auto grid w-full max-w-[1200px] items-center justify-items-center gap-12 lg:grid-cols-[auto_auto] lg:justify-center lg:gap-24 xl:gap-32"
      >
        <div className="flex w-full flex-col items-start text-left lg:items-center lg:justify-self-center lg:text-center">
          <Reveal
            as="h2"
            /* nowrap keeps it on one line; the sizes below are the largest that
               still fit the left column at each breakpoint. max-w is in ch, so
               it scales with the font size — bumping the mobile size does not
               reopen the overflow risk nowrap is guarding against. */
            className="whitespace-nowrap font-display text-h1 font-semibold text-white lg:text-[4.5rem] lg:leading-[1.04] lg:tracking-[-0.032em]"
          >
            Book in 4 steps
          </Reveal>

          <Reveal delay={0.15} className="mt-10 w-full max-w-[420px] lg:mx-auto">
            <Stepper active={active} running={running} />
          </Reveal>
        </div>

        <Reveal>
          <PhoneMockup active={active} />
        </Reveal>
      </div>
    </Section>
  );
}

/* ── stepper ────────────────────────────────────────────────────────────── */

/* Numbered dot then a bar, three times over. The bar belonging to the live
   screen fills across its dwell, so the row reads as a timer running 1 → 2 → 3
   and back to 1 in step with the phone. Keyed on `active` so the fills remount
   at their start value — otherwise the wrap from 3 back to 1 would leave the
   first bar already full and animate nothing. */
function Stepper({ active, running }: { active: number; running: boolean }) {
  return (
    <>
      {/* mobile: one step on screen at a time, rather than the full four-dot
         row — there is no room to show all four without shrinking the type */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="font-display text-lg font-semibold text-white"
          >
            {active + 1}. {STEPS[active]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* the caption is absolutely placed, so switching steps never reflows the
         row — and the padding below reserves its space */}
      <div className="relative hidden pb-12 lg:block">
        <div className="flex items-center gap-2.5">
        {Array.from({ length: SCREENS }, (_, i) => (
          <div key={i} className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="relative shrink-0">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full border text-[11px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-colors duration-300",
                  /* a circle turns lime with teal type the moment the travelling
                     dot reaches it — the same colour the dot itself carries, so
                     the number reads as "this is where the pulse landed" rather
                     than a second, unrelated cue. */
                  i <= active
                    ? "border-lime bg-lime text-teal"
                    : "border-white/60 bg-white/70 text-ink/70",
                )}
                aria-hidden
              >
                {i + 1}
              </span>

              {/* every caption starts at its own dot's left edge, so the label
                  always reads as hanging off that number */}
              <AnimatePresence mode="wait">
                {i === active && (
                  <span className="absolute left-0 top-10 block whitespace-nowrap">
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="block font-display text-lg font-semibold text-white"
                    >
                      {STEPS[i]}
                    </motion.span>
                  </span>
                )}
              </AnimatePresence>
            </span>
            {/* the rail is white the whole way across; what the travelling dot
                leaves behind it is the same pattern at full strength over a
                dimmed one, so a dot brightens as the line reaches it rather
                than changing colour. Both copies share a grid, so the bright
                dots land exactly on the dim ones they replace. */}
            <span className="relative block h-[3px] min-w-0 flex-1">
              <span
                aria-hidden
                /* 3px of dot to 3px of gap: the period is what sets how many
                   dots land on a segment, and an even split is the densest the
                   rail goes before the dots start reading as a dashed line */
                className="absolute inset-0 block [background-image:repeating-linear-gradient(to_right,rgba(255,255,255,0.4)_0_3px,transparent_3px_6px)]"
              />
              {i <= active && (
                <motion.span
                  aria-hidden
                  key={`fill-${active}`}
                  /* width, not scaleX: a scaled pattern would stretch its dots
                     and drift off the white rail underneath. Growing the box
                     leaves the background anchored to the left edge, so the
                     pattern is revealed rather than distorted. */
                  className="absolute left-0 top-0 block h-full [background-image:repeating-linear-gradient(to_right,#fff_0_3px,transparent_3px_6px)]"
                  initial={{ width: i < active ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={
                    i === active && running
                      ? { duration: DWELL, ease: "linear" }
                      : { duration: 0.3, ease: EASE }
                  }
                />
              )}
              {i === active && (
                <motion.span
                  aria-hidden
                  key={`dot-${active}`}
                  /* left carries the travel and x re-centres the dot on it, so
                     it starts and ends centred on its own dot rather than
                     half a width past them */
                  /* both offsets live here, not in classes: motion writes
                     `transform` inline and would drop a -translate-y utility */
                  style={{ x: "-50%", y: "-50%" }}
                  className="absolute top-1/2 block h-2.5 w-2.5 rounded-full bg-[#E4FF5C] shadow-[0_0_8px_rgba(228,255,92,0.7)]"
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={
                    running
                      ? { duration: DWELL, ease: "linear" }
                      : { duration: 0.3, ease: EASE }
                  }
                />
              )}
            </span>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

/* ── phone ──────────────────────────────────────────────────────────────── */

/* one real screenshot per screen, shown edge to edge — each already carries
   its own status bar and chrome, so no drawn chrome sits between it and the
   phone frame. */
const SCREEN_IMAGES: string[] = [
  "/img/home.png",
  "/img/selectservice.png",
  "/img/confirmpay.png",
  "/img/assign.png",
];

function PhoneMockup({ active }: { active: number }) {
  return (
    <div className="relative h-[600px] w-[296px] shrink-0 text-left">
      {/* soft halo lifts the dark chassis off the teal ground */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-teal-light/10 blur-3xl" />
      <div className="absolute inset-0 rounded-[52px] bg-neutral-900 p-[11px] shadow-[0_44px_90px_-30px_rgba(0,0,0,0.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={SCREEN_IMAGES[active]}
                alt=""
                aria-hidden
                fill
                sizes="296px"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-2 left-1/2 h-[5px] w-[108px] -translate-x-1/2 rounded-full bg-black/80" />
        </div>
        <div className="absolute left-1/2 top-[22px] h-[28px] w-[100px] -translate-x-1/2 rounded-full bg-neutral-900" />
      </div>
      {/* side buttons */}
      <div className="absolute -left-[3px] top-[112px] h-[26px] w-[3px] rounded-l-sm bg-neutral-800" />
      <div className="absolute -left-[3px] top-[164px] h-[46px] w-[3px] rounded-l-sm bg-neutral-800" />
      <div className="absolute -left-[3px] top-[224px] h-[46px] w-[3px] rounded-l-sm bg-neutral-800" />
      <div className="absolute -right-[3px] top-[188px] h-[70px] w-[3px] rounded-r-sm bg-neutral-800" />
    </div>
  );
}

