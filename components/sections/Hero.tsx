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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handleVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node && !node.paused && node.readyState >= 3) setPlaying(true);
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

  /* phones are stricter about autoplay than desktops: iOS only lets a clip
     play unprompted if it is muted and inline as properties, not just as
     JSX attributes, and a src that arrives after mount is not always picked
     up by `autoPlay`. So once the src is in, set both and start it by hand.
     Where autoplay is refused outright (Low Power Mode, data saver), the
     first touch or scroll counts as the gesture that lets it start, and it
     resumes when the tab comes back into view. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const play = () => {
      if (video.paused) video.play().catch(() => {});
    };
    const gestures = ['touchstart', 'pointerdown', 'scroll'] as const;
    const onGesture = () => {
      play();
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') play();
    };

    video.play().catch(() => {
      gestures.forEach((g) =>
        window.addEventListener(g, onGesture, { passive: true })
      );
    });
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [videoSrc]);

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
          /* revealed only once frames are actually moving: where autoplay is
             blocked the clip still loads, and showing it then put the OS play
             button over the hero on phones. Until it plays, the poster stays. */
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={cn(
            'hero-video pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out',
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

      {/* on a phone the copy sits low, just clear of the bottom edge, so the
          clip has the screen above it; from `sm` up it keeps its old inset */}
      <Container className="relative pb-10 pt-32 sm:pb-24 sm:pt-40 lg:pb-32">
        <motion.div
          style={{ y: copyY, opacity: fade }}
          className="flex max-w-4xl flex-col items-start text-left"
        >
          <h1 className="font-display text-[min(2.5rem,calc((100vw-3.5rem)/7.5))] font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-[3.25rem] lg:text-[5.75rem] lg:leading-[1.02]">
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
              className="hero-rise mt-4 max-w-[480px] text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg lg:text-xl"
            >
              Trained, background-checked caregivers you can actually trust
            </p>

            <div
              style={rise(600)}
              className="hero-rise mt-6 flex flex-wrap items-center gap-3 sm:mt-9"
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
