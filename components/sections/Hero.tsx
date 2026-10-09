'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Section';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';
import { openAppOrStore } from '@/components/DownloadModal';
import RotatingWord from '@/components/motion/RotatingWord';
import SplitText from '@/components/motion/SplitText';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

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
  const reduced = useSafeReducedMotion();
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

  /* the clip is decoration, so it waits until the page has finished loading
     rather than competing with the JS bundle and the poster for bandwidth —
     on a phone that megabyte of video was holding up everything else */
  const [videoSrc, setVideoSrc] = useState<string>();
  useEffect(() => {
    const start = () => setVideoSrc('/video/hero.mp4');
    if (document.readyState === 'complete') {
      start();
      return;
    }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  /* above the fold, so this plays on load rather than on scroll. The delay
     lets the header land first, so the page assembles top-down. The entrances
     are CSS (.hero-rise etc. in globals.css) so they run before hydration. */
  const rise = (delayMs: number) => ({ animationDelay: `${delayMs}ms` });

  return (
    /* full-bleed, a full screen tall; the header is absolutely placed over its
       top, so the clip runs to the top edge with the bar floating on it */
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] scroll-mt-24 items-end overflow-hidden bg-teal-dark"
    >
      {/* oversized top and bottom so the parallax drift never uncovers an edge */}
      <motion.div
        style={{ y: mediaY }}
        className="absolute inset-x-0 -bottom-16 -top-16"
      >
        {/* The first frame of the clip, served through next/image so it arrives
            as a sized AVIF/WebP with a preload hint in the head — it is what
            paints the hero, and it paints before the video has a single byte.
            `priority` because this is the LCP element. */}
        <Image
          src="/img/hero-poster.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* decorative: it carries no information the headline does not, so it
            is muted, loops, and stays out of the a11y tree. No `poster` of its
            own — the image above is the poster. */}
        <video
          ref={handleVideoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="none"
          aria-hidden
          onCanPlay={() => setPlaying(true)}
          onLoadedData={() => setPlaying(true)}
          onPlaying={() => setPlaying(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out',
            playing ? 'opacity-100' : 'opacity-0'
          )}
        />
      </motion.div>

      {/* scrim: white type has to hold up over every frame of the clip — heaviest
          in the bottom-left corner where the copy sits */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/75"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent"
      />

      <Container className="relative pb-24 pt-40 lg:pb-32">
        <motion.div
          style={{ y: copyY, opacity: fade }}
          className="flex max-w-4xl flex-col items-start text-left"
        >
          <h1 className="font-display text-[min(3.25rem,calc((100vw-3.5rem)/6.75))] font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-[3.25rem] lg:text-[5.75rem] lg:leading-[1.02]">
            {/* "Get" and the rotating word stay on one line at every width —
                the font shrinks on mobile so this fits rather than the line
                wrapping and splitting the two apart */}
            <span className="whitespace-nowrap">
              <SplitText text="Get" onMount delay={0.35} />{' '}
              <span className="hero-pop relative inline-block">
                <RotatingWord
                  words={ROTATING_WORDS}
                  className="relative text-white"
                />
              </span>
            </span>
            <br />
            <SplitText text="in 10 mins" onMount delay={0.7} step={0.09} />
          </h1>

          <div className="flex flex-col items-start">
            <p
              style={rise(500)}
              className="hero-rise mt-6 max-w-[480px] text-lg leading-relaxed text-white/85 lg:text-xl"
            >
              Trained, background-checked caregivers you can actually trust
            </p>

            <div
              style={rise(600)}
              className="hero-rise mt-9 flex flex-wrap items-center gap-3"
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
                variant="ghost"
                size="md"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
