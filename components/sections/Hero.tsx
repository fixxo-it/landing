"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { openAppOrStore } from "@/components/DownloadModal";
import { DURATION, EASE, RISE } from "@/components/motion/Reveal";
import Typewriter from "@/components/motion/Typewriter";

export default function Hero() {
  const reduced = useReducedMotion();
  /* the clip only takes over once it can actually play — until then the still
     underneath is the hero, so there is never an empty frame to look at */
  const [playing, setPlaying] = useState(false);

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
            <motion.div
              variants={item}
              className="mb-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-dark"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live in Whitefield &amp; Varthur, Bengaluru
            </motion.div>

            <motion.h1
              variants={item}
              /* capped so the headline keeps its three-line shape now that the
                 container runs nearly full-bleed. text-balance is off here: the
                 typewriter would rebalance the lines on nearly every character
                 and the words would jump around as they arrived. */
              className="max-w-[13ch] font-display text-h1 font-semibold text-ink lg:text-h1-lg"
            >
              {/* starts once the headline's own rise has landed */}
              <Typewriter text="On demand baby care you can trust" delay={0.75} />
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-[480px] text-lg leading-relaxed text-ink-muted lg:text-xl"
            >
              Professionally trained, background-verified caregivers at your door in{" "}
              <span className="font-semibold italic text-teal">10 minutes</span>.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href="#book"
                label="BOOK A CAREGIVER NOW"
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
                src="/video/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                onCanPlay={() => setPlaying(true)}
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
