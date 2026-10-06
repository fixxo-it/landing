'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Container } from '@/components/ui/Section';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';
import { openAppOrStore } from '@/components/DownloadModal';
import { DURATION, EASE, RISE } from '@/components/motion/Reveal';
import RotatingWord from '@/components/motion/RotatingWord';
import SplitText from '@/components/motion/SplitText';
import Tilt from '@/components/motion/Tilt';

/* "Baby Care" leads the loop, then the same beat other sections carry —
   the specific things a visit covers, so the headline itself demonstrates
   what "care" means rather than just naming it */
const ROTATING_WORDS = [
  'Baby Care',
  'Pram walk',
  'Indoor play',
  'Freshen up',
  'Feed time',
];

export default function Hero() {
  /* only feeds the scroll-linked transforms below, which start at the same
     value either way, so server and client markup still match */
  const reduced = useReducedMotion();
  /* the clip only takes over once it can actually play — until then the still
     underneath is the hero, so there is never an empty frame to look at */
  const [playing, setPlaying] = useState(false);

  /* the video can reach HAVE_FUTURE_DATA before this ref callback ever runs —
     a fast/cached load wins the race against React attaching onCanPlay, and
     that canplay event fires once and is gone. Checking readyState here
     catches that case; the JSX handlers below cover the normal, slower one. */
  const handleVideoRef = useCallback((node: HTMLVideoElement | null) => {
    if (node && node.readyState >= 3) setPlaying(true);
  }, []);

  /* as you scroll past, the copy drifts up faster than the video, so the hero
     peels away in layers */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -140]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.35]);

  /* above the fold, so this plays on load rather than on scroll. The delay
     lets the header land first, so the page assembles top-down. */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  };
  const item = {
    hidden: { opacity: 0, y: RISE },
    show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative scroll-mt-24 pb-16 pt-10 lg:pb-24 lg:pt-16"
    >
      <div>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_620px]">
            <motion.div
              style={{ y: copyY, opacity: fade }}
              className="order-2 lg:order-1"
            >
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div
                  variants={item}
                  className="mb-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[-0.02em] text-teal-dark"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  Live in Whitefield, Varthur &amp; Mahadevapura, Bengaluru
                </motion.div>
              </motion.div>

              <h1 className="max-w-[23ch] font-display text-[min(3.25rem,calc((100vw-3.5rem)/6.75))] font-bold leading-[1.04] tracking-[-0.02em] text-ink sm:text-[3.25rem] lg:text-[5.25rem] lg:leading-[1.02]">
                {/* "Get" and the rotating word stay on one line at every width —
                    the font shrinks on mobile so this fits rather than the line
                    wrapping and splitting the two apart */}
                <span className="whitespace-nowrap">
                  <SplitText text="Get" onMount delay={0.35} />{' '}
                  <motion.span
                    className="relative inline-block"
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                      rotate: -6,
                    }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 180,
                      damping: 14,
                      delay: 0.55,
                    }}
                  >
                    {/* the one lime moment in the hero — a swipe of it behind
                        the rotating word, overshooting the letters */}
                    <span
                      aria-hidden
                      className="brush-highlight absolute -inset-x-2 -inset-y-1 bg-[#E4FF5C]"
                    />
                    <RotatingWord
                      words={ROTATING_WORDS}
                      className="relative text-teal"
                    />
                  </motion.span>
                </span>
                <br />
                <SplitText text="in 10 mins" onMount delay={0.7} step={0.09} />
              </h1>

              <motion.div variants={container} initial="hidden" animate="show">
                <motion.p
                  variants={item}
                  className="mt-6 max-w-[480px] text-lg leading-relaxed text-ink-muted lg:text-xl"
                >
                  Professionally trained, background-verified caregivers
                </motion.p>

                <motion.div
                  variants={item}
                  className="mt-9 flex flex-wrap items-center gap-3"
                >
                  <Button
                    href="#book"
                    label="BOOK A CAREGIVER NOW"
                    variant="solid"
                    size="md"
                    onClick={(e) => {
                      e.preventDefault();
                      openAppOrStore();
                    }}
                  />
                  <Button
                    href="#safety-360"
                    label="WHY CHOOSE US?"
                    variant="secondary"
                    size="md"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: mediaY }}
              className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  rotate: 4,
                  clipPath: 'inset(12% 12% 12% 12% round 120px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  clipPath: 'inset(0% 0% 0% 0% round 28px)',
                }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.25 }}
              >
                <Tilt max={8}>
                  {/* the frame is shorter than the clip's native 3:4 by 10% of the
                      height, and object-bottom anchors the crop to the top edge */}
                  <div className="relative aspect-[5/6] overflow-hidden rounded-card bg-teal shadow-float">
                    {/* The first frame of the clip, served through next/image so it
                        arrives as a sized AVIF/WebP with a preload hint in the head —
                        it is what paints the hero, and it paints before the video has
                        a single byte. `priority` because this is the LCP element. */}
                    <Image
                      src="/img/hero-poster.jpg"
                      alt=""
                      aria-hidden
                      fill
                      priority
                      sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 100vw"
                      className="object-cover object-bottom"
                    />

                    {/* decorative: it carries no information the headline does not,
                        so it is muted, loops, and stays out of the a11y tree.
                        No `poster` of its own — the image above is the poster. */}
                    <video
                      ref={handleVideoRef}
                      src="/video/hero.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      webkit-playsinline="true"
                      preload="auto"
                      aria-hidden
                      onCanPlay={() => setPlaying(true)}
                      onLoadedData={() => setPlaying(true)}
                      onPlaying={() => setPlaying(true)}
                      className={cn(
                        'absolute inset-0 h-full w-full object-cover object-bottom transition-opacity duration-700 ease-out',
                        playing ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </div>
                </Tilt>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
