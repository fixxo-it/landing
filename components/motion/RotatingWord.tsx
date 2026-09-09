"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

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
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [words.length, reduced]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const word = reduced ? words[0] : words[index];

  return (
    <span className={cn("relative inline-grid overflow-hidden align-top", className)}>
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">{longest}</span>
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
