"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { openDownloadModal } from "@/components/DownloadModal";

/* The card is an allowlist now, not a latch: it rides along only while one of
   these sections is on screen and leaves as soon as the last one does. Add a
   section id here to have the card show over it too. */
const SECTIONS = [
  /* "Book in 3 taps" */ "#how-it-works",
];

export default function DownloadQr() {
  const [dismissed, setDismissed] = useState(false);
  const [inSection, setInSection] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const targets = SECTIONS.map((sel) => document.querySelector(sel)).filter(
      (el): el is Element => el !== null,
    );
    if (!targets.length) return;

    /* a Set rather than a boolean per entry: with more than one section in the
       list, two of them can overlap the viewport at once and the last callback
       to fire would otherwise win */
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setInSection(visible.size > 0);
      },
      { threshold: 0 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    /* md and up only — a QR is useless on the phone you would scan it with */
    <AnimatePresence>
      {inSection && !dismissed && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.2 } }}
          /* the 1s wait is a first-impression beat only — coming back after a
             scroll up should feel immediate */
          transition={{ duration: 0.5, ease: EASE, delay: shown.current ? 0 : 1 }}
          onAnimationStart={() => {
            shown.current = true;
          }}
          className="fixed bottom-6 right-6 z-50 hidden md:block"
        >
          <div className="relative flex items-center gap-5 rounded-2xl bg-white/80 p-3 pr-7 shadow-float ring-1 ring-line backdrop-blur-md">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss download prompt"
              className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-ink/60 shadow-float ring-1 ring-line transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* the card itself opens the full-size code, for anyone who cannot
                scan a 96px one across a desk */}
            <button
              type="button"
              onClick={openDownloadModal}
              className="flex items-center gap-5 text-left"
            >
              <span className="block shrink-0 rounded-xl bg-white p-1.5 ring-1 ring-line">
                <Image
                  src="/img/download-qr.jpeg"
                  alt="QR code to download the FamCare app"
                  width={96}
                  height={96}
                  quality={100}
                  className="block h-24 w-24"
                />
              </span>

              {/* stacked as two blocks rather than left to wrap: at this size the
                  break has to be certain, and a max-width in ch would still move
                  with the font */}
              <p className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                <span className="block">Book</span>
                <span className="block">Now</span>
              </p>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
