"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/* Copy rule for this section: say what the family gets, never how it is built.
   No models, no detection methods, nothing a competitor could lift. */

export default function Safety360() {
  return (
    <Section id="safety">
      <SectionHeading title="Never alone" size="lg" />

      <Stagger className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12">
        <BentoCard
          className="lg:col-span-6"
          title="Cleared before they knock"
          body="Six independent checks stand between an application and your front door, and they are re-run while the caregiver is with us."
          visual={<VerificationVisual />}
        />
        <BentoCard
          className="lg:col-span-6"
          title="Eyes on the visit"
          body="Your caregiver's location, and a live look at your child, both a tap away."
          visual={<WatchVisual />}
        />
        <BentoCard
          className="lg:col-span-7"
          title="Someone is always watching over it"
          body="Every visit is watched over while it happens. When something needs attention, a trained person is already on it."
          visual={<OversightVisual />}
        />
        <BentoCard
          className="lg:col-span-5"
          title="Help in one tap under 90 seconds"
          body="One press reaches our response team and your emergency contacts at the same moment."
          visual={<SosVisual />}
        />
      </Stagger>
    </Section>
  );
}

/* Every tile is the same shape: fixed-height visual, then caption — so the
   captions of neighbouring cards sit on the same baseline. */
function BentoCard({
  className,
  title,
  body,
  visual,
}: {
  className?: string;
  title: React.ReactNode;
  body: string;
  visual: React.ReactNode;
}) {
  return (
    <StaggerItem className={className}>
      <div className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-ink/[0.02]">
        <div className="relative h-[340px] shrink-0 overflow-hidden lg:h-[400px]">{visual}</div>
        <div className="px-8 pb-8 pt-6">
          <h3 className="font-display text-h3 font-semibold text-ink lg:text-3xl">{title}</h3>
          <p className="mt-2 max-w-[420px] text-sm leading-relaxed text-ink-muted">{body}</p>
        </div>
      </div>
    </StaggerItem>
  );
}

/* Every tile's visual is the same construction: one floating slice of the app,
   done as glass — translucent, blurred, with a specular streak near the top
   edge — over a shared teal ground, so the four tiles read as one set rather
   than four separate screenshots on flat white. */
function Plate({
  children,
  width = "max-w-[240px]",
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-teal px-8">
      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-float before:absolute before:inset-x-6 before:top-0 before:h-10 before:rounded-full before:bg-gradient-to-b before:from-white/90 before:to-transparent before:blur-md before:content-[''] before:pointer-events-none",
          width,
        )}
      >
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

/* ── the six layers ─────────────────────────────────────────────────────── */

/* the real in-app verification status screen, on the same glass plate as
   every other tile — a live screenshot carries the actual checks and their
   copy, which the drawn six-row list above was only standing in for */
function VerificationVisual() {
  return (
    <Plate width="max-w-[330px]">
      {/* cropped tight to the card itself — the source screenshot carried a
         wide margin of its own app background around it */}
      <Image
        src="/img/6layerverification-crop.png"
        alt=""
        aria-hidden
        width={376}
        height={316}
        className="block h-auto w-full rounded-lg"
      />
    </Plate>
  );
}

/* ── tracking + look-in ─────────────────────────────────────────────────── */

/* the real in-app geofence alert, on the same glass plate as every other
   tile — a live screenshot in place of the drawn tracking mock */
function WatchVisual() {
  return (
    <Plate width="max-w-[320px]">
      <Image
        src="/img/geofencing.png"
        alt=""
        aria-hidden
        width={320}
        height={297}
        className="block h-auto w-full rounded-2xl"
      />
    </Plate>
  );
}

/* ── oversight ──────────────────────────────────────────────────────────── */

const OVERSIGHT: [string, string][] = [
  ["Live oversight", "Every active visit stays in view"],
  ["Early warning", "We notice when a visit changes"],
  ["Fast escalation", "The right person picks it up"],
  ["Location safety", "Arrival and safe-zone cover"],
];

/* the rows take turns being live, so the tile reads as something being watched
   rather than a static list */
function OversightVisual() {
  const [live, setLive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const running = inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLive((n) => (n + 1) % OVERSIGHT.length), 2200);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div ref={ref} className="h-full">
      <Plate width="max-w-[300px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">Real people, real time</span>
          <span className="rounded-full bg-teal/[0.08] px-2 py-1 text-[10px] font-semibold text-teal">
            On watch
          </span>
        </div>

        <div className="mt-4 space-y-2 border-t border-line pt-4">
          {OVERSIGHT.map(([title, note], i) => (
            <span
              key={title}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors duration-500",
                live === i ? "bg-teal-tint" : "bg-transparent",
              )}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                {live === i && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60 motion-reduce:hidden" />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full transition-colors duration-500",
                    live === i ? "bg-teal" : "bg-ink/15",
                  )}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-ink">{title}</span>
                <span className="block text-[10px] text-ink-faint">{note}</span>
              </span>
            </span>
          ))}
        </div>

        <p className="mt-4 border-t border-line pt-3 text-[10px] leading-relaxed text-ink-faint">
          Risks are surfaced early, escalated quickly, and closed by a real person.
        </p>
      </Plate>
    </div>
  );
}

/* ── SOS ────────────────────────────────────────────────────────────────── */

/* the real in-app SOS confirmation, on the same glass plate as every other
   tile — a live screenshot of the alert itself in place of the drawn badge */
function SosVisual() {
  return (
    <Plate width="max-w-[280px]">
      <Image
        src="/img/sos.png"
        alt=""
        aria-hidden
        width={280}
        height={251}
        className="block h-auto w-full rounded-2xl"
      />
    </Plate>
  );
}
