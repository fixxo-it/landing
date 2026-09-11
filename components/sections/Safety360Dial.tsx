"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/Section";
import { DURATION, EASE, IN_VIEW } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/* The order they arrive in as you scroll, and the order they stack in on
   mobile: top-left, top-right, bottom-left, bottom-right. Every pillar shares
   the one drawn tracker pulse as its ground — no files to load, one brand
   lime instead of four tints of a stray green, and the four badges read as a
   set rather than three photos and an outlier. */
type Pillar = {
  name: string;
  body: string;
  icon: string;
};

const PILLARS: Pillar[] = [
  {
    name: "Trust",
    body: "Identity checks, police verification and behaviour scores.",
    icon: "M12 3 4.5 6v6c0 4.4 3.2 8.5 7.5 9.5 4.3-1 7.5-5.1 7.5-9.5V6L12 3Zm-3 8.8 2.2 2.2L15 9.8",
  },
  {
    name: "Care",
    body: "No-phone caregiving, live care logs, and a family support line that actually picks up.",
    icon: "M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z",
  },
  {
    name: "Technology",
    body: "AI risk detection, live tracking and instant escalation.",
    icon: "M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2 2m-7 7-2 2m0-11 2 2m7 7 2 2M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  },
  {
    name: "Quality",
    body: "Reviewed after every visit. Fall below 4.2★ and you're paused. No exceptions, no warnings.",
    icon: "M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6M17 3v3.5h-3.5M7 21v-3.5h3.5",
  },
];

/* the tail of the pin is spent holding the finished stage, so the section never
   releases while the last pillar has only just arrived */
const HOLD = 0.18;

export default function Safety360Dial() {
  const reduced = useReducedMotion();
  const pinned = !reduced;

  const wrapRef = useRef<HTMLElement>(null);
  /* reduced motion gets the finished stage outright — no pin, no sequence */
  const [revealed, setRevealed] = useState(reduced ? PILLARS.length : 0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  /* the scrollbar is the sequence: progress maps onto how many pillars have
     landed, so scrolling back up takes them off again in reverse */
  const count = useTransform(scrollYProgress, [0, 1 - HOLD], [0, PILLARS.length]);

  useMotionValueEvent(count, "change", (v) => {
    const n = Math.min(PILLARS.length, Math.max(0, Math.ceil(v)));
    setRevealed((was) => (was === n ? was : n));
  });

  return (
    <section
      ref={wrapRef}
      id="safety-360"
      /* The mobile spine gets its own, shorter pin: a four-item list has less
         to sit through than the desktop board's wired sequence, so giving it
         the same 250vh left a long stretch of nothing after the last item had
         already landed, before the section let go. 170vh is enough travel for
         four reveals and a short settle, not enough to feel stuck. */
      className={cn("relative scroll-mt-24", pinned && "h-[170vh] lg:h-[250vh]")}
    >
      <div
        className={cn(
          pinned ? "py-0" : "py-20",
          /* pt is on the flex box, not the heading — padding on the centring
             parent carves out a reserved top band, so the centred content can
             never land closer to the nav than that band even on a short
             viewport where it would otherwise centre flush under it.

             Top-aligned on mobile rather than centred: the spine can run right
             up to the edge of a short phone screen, and centring it would crop
             the heading against the nav just as readily as it crops the last
             item at the bottom. Top alignment means only ever the bottom, never
             the title. The desktop board is a fixed diagram rather than a
             growing list, so it keeps the centring. */
          pinned &&
            "sticky top-0 flex h-screen items-start overflow-hidden pt-24 lg:items-center lg:pt-28",
        )}
      >
        <Container className="w-full">
          <SectionHeading size="lg" title="Safety360™" />

          <Stage revealed={reduced ? PILLARS.length : revealed} reduced={reduced} />
          <Spine revealed={reduced ? PILLARS.length : revealed} />
        </Container>
      </div>
    </section>
  );
}

/* ── the stage ──────────────────────────────────────────────────────────── */

/* Everything is laid out against this box. Fixing the aspect ratio is what lets
   the SVG traces and the HTML cards share one coordinate system: a percentage
   in CSS and a unit in the viewBox then land on the same pixel. */
const W = 1080;
const H = 600;

/* Each pillar card is centred on its column line, not fenced by it — at the
   widest card variant (2xl, 380px) it hangs 130px past COL.left/COl.right on
   either side. Desktop got away with that because the page still had gutter
   left outside the 1080 box; scaled all the way down to a phone there is none
   to spare, so the scale basis below has to include this margin itself
   rather than borrow it from whatever happens to surround the section. */
const CANVAS_MARGIN = 140;
const CANVAS_W = W + CANVAS_MARGIN * 2;

/* The three numbers the whole board is derived from. The hub is 260 square and
   centred, so its edges fall at 410/670 across and 170/430 down; every trace
   leaves one of those edges and every card is anchored to a trace end. Changing
   a value here moves the wires and the cards together — they cannot drift apart
   because neither one carries its own copy of the geometry. */
const HUB = 260;
/* how far out the chips sit — horizontally from the hub's side, vertically from
   its top and bottom edge */
const COL = { left: 60, right: W - 60 };
const ROW = { top: 78, bottom: H - 78 };

/* right-angled circuit traces, drawn from the tile outwards. Quadratic corners
   rather than arcs — one control point per turn, and the radius comes out the
   same on every bend. */
/* Routed off the hub's top and bottom edges rather than its sides: a wire
   leaving sideways runs at the same height as the copy hanging under each chip,
   and crossed straight through it. Going up and over keeps every segment in the
   band between the chips and the hub, which is empty. */
const R = 24;
const hubTop = (H - HUB) / 2;
const hubBottom = (H + HUB) / 2;

/* out of the hub edge, turn the corner, then run flat into the chip. Each one
   ends at its column's centre line, where the badge sits on top of it — so the
   wire terminates against an opaque edge at any board width rather than
   stopping short of it at some and overshooting at others. */
/* `dir` is the way the vertical leg travels: +1 up out of the hub's top edge,
   -1 down out of its bottom. It stops one radius short of the turn. */
const trace = (x: number, toX: number, fromY: number, toY: number, dir: 1 | -1) =>
  `M${x} ${fromY} V${toY + R * dir} Q${x} ${toY} ${x + R * Math.sign(toX - x)} ${toY} H${toX}`;

/* how far the vertical legs sit either side of centre. They have to leave the
   hub's top or bottom edge, so this cannot exceed half the hub — at 100 they
   run out of its corners, which is as far apart as this routing allows. */
const LEG = 100;

const TRACES = [
  trace(W / 2 - LEG, COL.left, hubTop, ROW.top, 1),
  trace(W / 2 + LEG, COL.right, hubTop, ROW.top, 1),
  trace(W / 2 - LEG, COL.left, hubBottom, ROW.bottom, -1),
  trace(W / 2 + LEG, COL.right, hubBottom, ROW.bottom, -1),
];

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;

/* half of the badge's h-20 — see the note on SLOTS. This has to track the badge
   class: it is what puts the badge's centre on the wire, not its top edge. */
const HALF_BADGE = -40;

/* Each card is anchored by its badge, not by its own top edge: the badge is
   what the wire runs into, and it is the one part of the group whose centre has
   to land on the trace end exactly.

   The top pair hangs down from the badge, so it is pinned by `top` and pulled up
   half a badge. The bottom pair stacks upwards (flex-col-reverse) with the badge
   last, so it is pinned by `bottom` and pushed down half a badge instead. Both
   offsets are half of h-14 — CSS pixels, same as the badge, so the badge centre
   stays on the anchor at every board width even though the anchor itself is a
   percentage. That is also what keeps the copy clear of the wire: the horizontal
   run sits in the badge's band, and the text is a full badge away from it.

   Inline styles rather than arbitrary Tailwind values: these are derived at
   runtime, and the JIT only sees class names it can read in the source. */
const top = { top: pct(ROW.top, H), marginTop: HALF_BADGE };
const bottom = { bottom: pct(H - ROW.bottom, H), marginBottom: HALF_BADGE };

const SLOTS = [
  { at: { left: pct(COL.left, W), ...top }, stack: "flex-col", from: -24 },
  { at: { left: pct(COL.right, W), ...top }, stack: "flex-col", from: 24 },
  { at: { left: pct(COL.left, W), ...bottom }, stack: "flex-col-reverse", from: -24 },
  { at: { left: pct(COL.right, W), ...bottom }, stack: "flex-col-reverse", from: 24 },
];

function Stage({ revealed, reduced }: { revealed: number; reduced: boolean | null }) {
  const boardRef = useRef<HTMLDivElement>(null);
  const boardIn = useInView(boardRef, IN_VIEW);

  return (
    /* Every child on the board is either a percentage of this box or a fixed
       pixel size (badge, card, hub type) tuned to look right at the box's
       native 1080×600. Rather than a different, simplified layout for narrow
       screens, the whole board renders at that native size always and this
       wrapper scales the result down to fit — position and size shrink
       together, so mobile is a smaller copy of the exact same board rather
       than a rearranged one. `container-type` turns this box into the query
       context the scale below reads its width from. */
    <div
      className="relative mx-auto mt-12 hidden w-full max-w-[1440px] [container-type:inline-size] lg:block"
      style={{ aspectRatio: `${CANVAS_W} / ${H}` }}
    >
      {/* The board fades up as a whole when the section arrives; the pillars on
          it are then driven by scroll, so this is the one beat they share.
          The rise only ever writes `transform: translateY(...)` here — the
          responsive scale lives one level down so the two never fight over
          the same CSS property. */}
      <motion.div
        ref={boardRef}
        initial={{ opacity: 0, y: 24 }}
        animate={boardIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: DURATION, ease: EASE }}
        className="absolute inset-0"
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: W,
            height: H,
            /* right-to-left: the board is inset by the margin first, then the
               whole thing — inset included — is scaled to the box */
            transform: `scale(calc(100cqw / ${CANVAS_W}px)) translateX(${CANVAS_MARGIN}px)`,
          }}
        >
        {/* soft ground, so the board is not floating on bare white */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.07] blur-3xl"
        />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          {TRACES.map((d, i) => (
            <g key={d}>
              {/* The draw-in is a mask, not the stroke itself: animating
                  pathLength makes framer write its own strokeDasharray, which
                  would overwrite the dotted pattern and leave a solid line.
                  Masking keeps the dots and still wipes them on. */}
              <mask id={`trace-${i}`} maskUnits="userSpaceOnUse">
                <motion.path
                  d={d}
                  fill="none"
                  stroke="white"
                  /* wide enough to clear the stroke it is revealing */
                  strokeWidth={8}
                  strokeLinecap="round"
                  /* pathLength 1 normalises every trace, so they all draw in
                     over the same beat however long they actually are */
                  pathLength={1}
                  initial={false}
                  animate={{ pathLength: i < revealed ? 1 : 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
              </mask>

              {/* the unlit board is always there — the live trace draws over it */}
              <path
                d={d}
                fill="none"
                stroke="rgba(228,255,92,0.25)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <path
                d={d}
                fill="none"
                stroke="#E4FF5C"
                strokeWidth={1.5}
                strokeLinecap="round"
                mask={`url(#trace-${i})`}
              />
              {/* the travelling pulse — only once the trace itself has finished
                  drawing in, and never for reduced motion. `d` runs hub → card,
                  so keyPoints walks it back to front: the dot reads as leaving
                  each card and arriving at FamCare, not the other way round. */}
              {i < revealed && !reduced && (
                <circle r={4} fill="#06555B">
                  <animateMotion
                    dur="1s"
                    begin="0.55s"
                    repeatCount="indefinite"
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear"
                    path={d}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.08;0.9;1"
                    dur="1s"
                    begin="0.55s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}
        </svg>

        <Hub />

        {PILLARS.map((p, i) => (
          <PillarCard key={p.name} pillar={p} index={i} on={i < revealed} />
        ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── the spine ──────────────────────────────────────────────────────────── */

/* Same four beats, straightened out: the corners of a phone cannot hold four
   labels and a paragraph at phone width without shrinking the type past
   reading size.

   Driven by the same scroll-linked count as the desktop board rather than each
   item watching its own arrival — pinned in place the same way, so the list
   populates one pillar at a time while the section holds still, instead of
   scrolling past four items that all happen to enter the screen together. */
function Spine({ revealed }: { revealed: number }) {
  return (
    <ol className="relative mt-6 lg:hidden">
      <span aria-hidden className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-line" />
      {PILLARS.map((p, i) => (
        <SpineItem key={p.name} pillar={p} on={i < revealed} />
      ))}
    </ol>
  );
}

function SpineItem({
  pillar,
  on,
}: {
  pillar: (typeof PILLARS)[number];
  on: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative flex gap-5 pb-7 last:pb-0"
    >
      {/* same lime tracker badge as the desktop board — one circular pulse
         glyph rather than a different flat icon per breakpoint */}
      <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full shadow-card">
        <Radar />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-inset ring-white/70"
        />
        <Glyph
          d={pillar.icon}
          className="relative h-5 w-5 text-teal"
        />
      </span>
      <span className="pt-2">
        <span className="block font-display text-h3 font-semibold text-ink">{pillar.name}</span>
        <span className="mt-2 block max-w-[38ch] text-sm leading-relaxed text-ink-muted">
          {pillar.body}
        </span>
      </span>
    </motion.li>
  );
}

/* the tile every trace runs back to — square and centred, so its edges sit
   exactly where the traces start */
function Hub() {
  return (
    <div
      style={{ height: pct(HUB, H), width: pct(HUB, W) }}
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      {/* the clip path lives in a zero-size svg purely to host the <defs> —
          both the fill and the grain below reference it by id so the two
          layers share exactly one outline */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="safety-shield" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.02 L0.88,0.16 L0.88,0.48 C0.88,0.74 0.72,0.9 0.5,0.99 C0.28,0.9 0.12,0.74 0.12,0.48 L0.12,0.16 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative h-full w-full" style={{ clipPath: "url(#safety-shield)" }}>
        <div className="absolute inset-0 bg-teal" />
        <Image
          src="/img/Grainy.jpg"
          alt=""
          aria-hidden
          fill
          sizes={`${HUB}px`}
          className="object-cover mix-blend-overlay opacity-40"
        />
      </div>

      {/* the inner outline — same shield path as the clip above, scaled down
          around its own centre so it reads as a second, inset border rather
          than tracing the outer edge */}
      <svg viewBox="0 0 100 100" fill="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <path
          d="M50,2 L88,16 L88,48 C88,74 72,90 50,99 C28,90 12,74 12,48 L12,16 Z"
          stroke="#E4FF5C"
          strokeWidth={2}
          style={{ transform: "scale(0.86)", transformOrigin: "50% 50%" }}
        />
      </svg>

      <span className="absolute flex flex-col items-center whitespace-nowrap px-2 text-center font-display text-[2.8rem] font-semibold leading-[1.1] tracking-tight text-white">
        <span>Fam</span>
        <span>Care</span>
      </span>
    </div>
  );
}

function PillarCard({
  pillar,
  index,
  on,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
  on: boolean;
}) {
  const slot = SLOTS[index];

  return (
    /* The centring lives on this static wrapper, not on the animated child:
       motion writes `transform` inline, which drops any -translate-x class set
       alongside it — the card would sit a half-width right of its trace end. */
    <span
      style={slot.at}
      className="absolute block w-[280px] -translate-x-1/2 xl:w-[340px] 2xl:w-[380px]"
    >
      <motion.span
        animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: slot.from }}
        transition={{ duration: 0.45, delay: on ? 0.2 : 0, ease: EASE }}
        className={cn("flex items-center gap-4", slot.stack)}
      >
        <span
          className={cn(
            "relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full transition-shadow duration-300",
            on ? "shadow-pill" : "shadow-card",
          )}
        >
          <Radar />
          {/* no wash: the photo carries the badge. The rim is what marks a pillar
              as landed now that there is no teal to fade in — it was the only
              other thing the wash was doing. */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-inset transition-colors duration-300",
              on ? "ring-white/70" : "ring-white/30",
            )}
          />
          {/* teal reads clearly against the lime ground — the white-plus-shadow
              treatment this replaced was for sitting on an unknown photo,
              which the drawn radar ground no longer is */}
          <Glyph
            d={pillar.icon}
            className="relative h-7 w-7 text-teal"
          />
        </span>

        <span className="flex flex-col gap-2 text-left">
          {/* matched to the bento tiles in "Never alone", so the two safety
              sections read as one pair rather than two scales */}
          <span className="block font-display text-h3 font-semibold text-ink 2xl:text-3xl">
            {pillar.name}
          </span>
          <span className="block text-sm leading-relaxed text-ink-muted 2xl:text-[15px]">
            {pillar.body}
          </span>
        </span>
      </motion.span>
    </span>
  );
}

/* ── the tracker pulse ──────────────────────────────────────────────────── */

/* Drawn rather than filmed: it replaces the badge video on Trust, so the beat
   costs nothing to load and it is the brand lime instead of whatever green the
   footage happened to be.

   The ground is banded rather than a smooth blend — one lime, stepped down
   through opacity 100/80/60/40/20/0 from the centre out — over a white base,
   so the badge reads as rings even at rest and the rim genuinely fades to
   white rather than to a paler green. The `animate-radar` rings on top are the
   same idea in motion: the same lime, only opacity moving, so the ring in
   flight matches the ring pattern underneath it.

   Three rings on a shared 2.4s loop, offset by a third each, so one is always
   leaving the centre while another is dissolving at the rim — the sweep reads as
   continuous. Each ring scales from 0 to fill the badge exactly, which is why
   they carry no translate: the animation writes `transform`, and a centring
   translate class on the same element would be dropped the moment it starts. */
const RING_DELAYS = ["0s", "0.8s", "1.6s"];

/* rgba, not the hex + Tailwind opacity slash: six hard-edged stops need six
   exact alpha values, and building that many bg-lime/NN-derived strings by
   hand is easier to get wrong than writing the alpha into the colour once. */
const LIME = "228,255,92";

function Radar() {
  return (
    <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full bg-white">
      <span
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center," +
            `rgba(${LIME},1) 0%, rgba(${LIME},1) 16%,` +
            `rgba(${LIME},0.8) 16%, rgba(${LIME},0.8) 32%,` +
            `rgba(${LIME},0.6) 32%, rgba(${LIME},0.6) 48%,` +
            `rgba(${LIME},0.4) 48%, rgba(${LIME},0.4) 64%,` +
            `rgba(${LIME},0.2) 64%, rgba(${LIME},0.2) 82%,` +
            `rgba(${LIME},0) 82%, rgba(${LIME},0) 100%)`,
        }}
      />
      {RING_DELAYS.map((delay) => (
        <span
          key={delay}
          style={{ animationDelay: delay }}
          className="absolute inset-0 rounded-full border-2 border-lime bg-transparent animate-radar motion-reduce:animate-none"
        />
      ))}
      {/* the core the rings leave from — sits under the glyph as a soft lift, so
          the badge still reads as live in the gap between two rings */}
      {/* the grid wrapper does the centring and the child does the breathing —
          same reason as the rings: the animation owns `transform` */}
      <span className="absolute inset-0 grid place-items-center">
        <span className="h-8 w-8 rounded-full bg-lime-light/55 blur-md animate-radar-dot motion-reduce:animate-none" />
      </span>
    </span>
  );
}

function Glyph({ d, className }: { d: string; className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
