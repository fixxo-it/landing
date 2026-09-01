"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Per-character cadence. Slow enough to read along with, fast enough that the
   headline is complete before anyone has finished looking at the image. */
const SPEED = 45;

/* Types `text` out one character at a time.

   The full string is always in the DOM — a hidden copy holds the final box open
   so the paragraph and buttons below never shift as lines are added, and it is
   what a crawler or a screen reader gets. The animated copy is decorative and
   hidden from the accessibility tree. */
export default function Typewriter({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;

    const step = (i: number) => {
      setCount(i);
      if (i < text.length) timer = setTimeout(() => step(i + 1), SPEED);
    };

    timer = setTimeout(() => step(1), delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay, reduced]);

  const done = reduced || count >= text.length;

  return (
    /* both copies share one grid cell, so the visible one is laid out on top of
       the reserved box rather than next to it */
    <span className={className}>
      <span className="grid">
        <span className="invisible col-start-1 row-start-1">{text}</span>

        <span className="col-start-1 row-start-1" aria-hidden>
          {reduced ? text : text.slice(0, count)}
          {/* the caret keeps its width once typing ends so the last word does
              not shift sideways as it fades */}
          <span
            className={[
              "ml-[0.08em] inline-block h-[0.78em] w-[0.06em] translate-y-[0.02em] rounded-[1px] bg-current align-middle",
              done ? "opacity-0 transition-opacity duration-500" : "animate-caret",
            ].join(" ")}
          />
        </span>
      </span>
    </span>
  );
}
