'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { EASE } from '@/components/motion/Reveal';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';
import { cn } from '@/lib/cn';

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

/* The orange "Save 30% per month" burst from the campaign artwork. It
   springs in, then the star turns slowly behind text that stays upright. */
const POINTS = 18;
const STAR = Array.from({ length: POINTS * 2 }, (_, i) => {
  const r = i % 2 ? 37 : 50;
  const a = (Math.PI * i) / POINTS - Math.PI / 2;
  // rounded so the server and browser print identical points
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

export function Starburst({ className }: { className?: string }) {
  const reduced = useSafeReducedMotion();
  return (
    <motion.div
      initial={{ scale: 0, rotate: -40 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.9 }}
      className={cn('relative aspect-square', className)}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-[0_18px_30px_rgba(240,100,20,0.35)]"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        <polygon points={STAR} fill="#F5641A" />
      </motion.svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none text-white">
        <span className="text-[1.05em] font-bold">Save</span>
        <span className="text-[2.3em] font-bold leading-[1]">30%</span>
        <span className="mt-[0.1em] text-[0.8em] font-semibold">per month</span>
      </div>
    </motion.div>
  );
}

/* A rupee amount that counts up from zero the first time it scrolls in. */
export function CountUp({ to, className, delay = 0 }: { to: number; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useSafeReducedMotion();
  const [v, setV] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(0, to, { duration: 1.6, delay, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, reduced, to, delay]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {inr(v)}
    </span>
  );
}
