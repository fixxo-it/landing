'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  /** Use thousands separators (e.g. 2,400). */
  separator?: boolean;
}

function format(n: number, decimals: number, separator: boolean) {
  const fixed = n.toFixed(decimals);
  if (!separator) return fixed;
  const [int, dec] = fixed.split('.');
  const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec ? `${withSep}.${dec}` : withSep;
}

/**
 * Animates a number from 0 to `value` the first time it scrolls into view.
 * Honors prefers-reduced-motion by snapping straight to the final value.
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  durationMs = 1400,
  separator = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, durationMs, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {format(display, decimals, separator)}
      {suffix}
    </span>
  );
}
