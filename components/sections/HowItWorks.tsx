'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import Reveal, { EASE } from '@/components/motion/Reveal';
import SplitText from '@/components/motion/SplitText';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

/* one real screenshot per screen, shown edge to edge — each already carries
   its own status bar and chrome, so no drawn chrome sits between it and the
   phone frame. */
const SCREEN_IMAGES: string[] = [
  '/img/home.png',
  '/img/selectservice.png',
  '/img/confirmpay.png',
  '/img/assign.png',
];
const SCREENS = SCREEN_IMAGES.length;

/* how long each screen holds before the next one appears */
const DWELL = 2.4;

export default function HowItWorks() {
  const reduced = useSafeReducedMotion();
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: '-25% 0px' });
  const running = inView && !reduced;

  /* the screens only cycle while the phone is actually on screen */
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % SCREENS),
      DWELL * 1000
    );
    return () => clearTimeout(id);
  }, [active, running]);

  /* the teal ground opens out as the section arrives: it starts as an inset,
     heavily rounded card and grows to full bleed by the time its top edge
     reaches the top of the screen */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: arrive } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  const inset = useTransform(arrive, [0, 1], [reduced ? 0 : 8, 0]);
  const radius = useTransform(arrive, [0, 1], [reduced ? 0 : 120, 0]);
  const clipPath = useTransform(
    [inset, radius] as const,
    ([i, r]: number[]) => `inset(${i}% ${i}% 0% ${i}% round ${r}px)`
  );

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative isolate scroll-mt-24 overflow-hidden"
    >
      {/* flat brand teal with grain on top, or the fill reads too flat next to
          every other section's textured ground */}
      <motion.div
        aria-hidden
        style={{ clipPath }}
        className="absolute inset-0 -z-10 bg-teal-dark"
      >
        <Image
          src="/img/Grainy.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="grain pointer-events-none absolute inset-0" />
      </motion.div>

      <div
        ref={stageRef}
        className="relative flex flex-col items-center gap-10 px-6 py-28 lg:gap-14 lg:py-40"
      >
        {/* two slow light blobs so the teal has depth rather than reading flat */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-[10%] -z-10 h-[50vw] max-h-[700px] w-[50vw] max-w-[700px] animate-aurora rounded-full bg-teal-light/20 blur-[120px] motion-reduce:animate-none"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[10%] bottom-0 -z-10 h-[40vw] max-h-[600px] w-[40vw] max-w-[600px] animate-aurora-slow rounded-full bg-[#0E7A82]/50 blur-[120px] motion-reduce:animate-none"
        />

        <Reveal
          as="h2"
          className="text-center font-display text-[2.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-white lg:text-[4.5rem] lg:leading-[1.03]"
        >
          <SplitText text="Book in 3 taps" />
        </Reveal>

        <Reveal>
          <PhoneMockup active={active} />
        </Reveal>
      </div>
    </section>
  );
}

/* ── phone ──────────────────────────────────────────────────────────────── */

/* Sized off the viewport height so the heading and phone fit one screen
   together; everything inside is in percentages of the 296×600 design it
   was drawn at, so it scales as one piece. */
function PhoneMockup({ active }: { active: number }) {
  return (
    <div className="relative aspect-[296/600] h-[min(760px,calc(100svh-15rem))] shrink-0">
      {/* soft halo lifts the dark chassis off the teal ground */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-teal-light/10 blur-3xl" />
      <div className="absolute inset-0 rounded-[17.5%/8.7%] bg-neutral-900 p-[3.7%] shadow-[0_44px_90px_-30px_rgba(0,0,0,0.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-[15.3%/7.3%] bg-white">
          {/* each screen appears over the last: it fades up from slightly
              small and soft, so the swap reads as the app moving forward */}
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={SCREEN_IMAGES[active]}
                alt=""
                aria-hidden
                fill
                sizes="380px"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-[1.4%] left-1/2 h-[0.85%] w-[36.5%] -translate-x-1/2 rounded-full bg-black/80" />
        </div>
        <div className="absolute left-1/2 top-[3.7%] h-[4.7%] w-[34%] -translate-x-1/2 rounded-full bg-neutral-900" />
      </div>
      {/* side buttons */}
      <div className="absolute -left-[1%] top-[18.7%] h-[4.3%] w-[1%] rounded-l-sm bg-neutral-800" />
      <div className="absolute -left-[1%] top-[27.3%] h-[7.7%] w-[1%] rounded-l-sm bg-neutral-800" />
      <div className="absolute -left-[1%] top-[37.3%] h-[7.7%] w-[1%] rounded-l-sm bg-neutral-800" />
      <div className="absolute -right-[1%] top-[31.3%] h-[11.7%] w-[1%] rounded-r-sm bg-neutral-800" />
    </div>
  );
}
