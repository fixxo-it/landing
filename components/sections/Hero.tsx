"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { openAppOrStore } from "@/components/DownloadModal";
import { DURATION, EASE, RISE } from "@/components/motion/Reveal";
import RotatingWord from "@/components/motion/RotatingWord";

/* "Baby Care" leads the loop, then the same beat other sections carry —
   the specific things a visit covers, so the headline itself demonstrates
   what "care" means rather than just naming it */
const ROTATING_WORDS = ["Baby Care", "Pram walk", "Indoor play", "Freshen up", "Feed time"];

export default function Hero() {
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

  /* above the fold, so this plays on load rather than on scroll. The delay
     lets the header land first, so the page assembles top-down. */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : RISE },
    show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
  };

  return (
    <section id="top" className="scroll-mt-24 pb-16 pt-10 lg:pb-24 lg:pt-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_620px]">
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
            <motion.h1
              variants={item}
              /* capped so the headline keeps its three-line shape now that the
                 container runs nearly full-bleed */
              className="max-w-[23ch] font-display text-[2.35rem] font-semibold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[3.25rem] sm:leading-[1.06] lg:text-[5rem] lg:leading-[1.04] lg:tracking-[-0.032em]"
            >
              {/* "Get" and the rotating word stay on one line at every width —
                  the font shrinks on mobile so this fits rather than the line
                  wrapping and splitting the two apart */}
              <span className="whitespace-nowrap">
                Get{" "}
                <span className="relative inline-block">
                  {/* same swipe as "Caregiver" in Services — a layer of its own so
                      the paint can overshoot the word rather than stop dead at it */}
                  <span
                    aria-hidden
                    className="brush-highlight absolute -inset-x-2 -inset-y-1 bg-[#E4FF5C]"
                  />
                  <RotatingWord words={ROTATING_WORDS} className="relative text-teal" />
                </span>
              </span>
              <br />
              in 10 mins
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-[480px] text-lg leading-relaxed text-ink-muted lg:text-xl"
            >
              Professionally trained, background-verified caregivers
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
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

            {/* replaces the empty space under the buttons with actual proof */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2"
          >
            {/* the frame is shorter than the clip's native 3:4 by 10% of the
                height, and object-bottom anchors the crop to the top edge */}
            <div className="relative aspect-[5/6] overflow-hidden rounded-card bg-teal-tint">
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
                  No `poster` of its own — the image above is the poster, and a
                  second copy of the same still would only be a second
                  download. It cross-fades in over that still on canplay. */}
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
                  "absolute inset-0 h-full w-full object-cover object-bottom transition-opacity duration-700 ease-out",
                  playing ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
