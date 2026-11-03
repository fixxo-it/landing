'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

/* how long each word holds before the next one slides in */
const INTERVAL = 1100;

/* Cycles through `words` forever, one sliding in as the last one slides out.
   The invisible longest-word copy reserves the box at its widest, so the
   highlight swipe wrapping this (sized to 100% of that box) never resizes
   mid-rotation and the line it sits on never reflows. */
export default function RotatingWord({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const reduced = useSafeReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [words.length, reduced]);

  const word = reduced ? words[0] : words[index];

  return (
    <span
      className={cn(
        /* padded past the word and pulled back by the same amount, so
           descenders and tight tracking have room inside the clip */
        'relative -mx-[0.08em] -mb-[0.25em] inline-grid overflow-hidden px-[0.08em] pb-[0.25em] align-top',
        className
      )}
    >
      {/* every word reserves the box: most letters is not always most width */}
      {words.map((w) => (
        <span
          key={w}
          aria-hidden
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
