'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

type Variant = 'primary' | 'secondary' | 'onDark' | 'solid' | 'ghost';
type Size = 'sm' | 'md';

export const BASE =
  'group relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-[-0.02em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0';

export const PHOTO_TEAL = 'bg-teal-dark';

/* lime jelly pill with teal type: lime rim, inner glow and drop shadow, matching the dark-green CTAs — no gloss layer */
export const VARIANTS: Record<Variant, string> = {
  primary:
    'border border-[#A9C91F] bg-gradient-to-b from-[#EBFF7A] to-[#DDF74A] text-teal shadow-[0_10px_18px_-8px_rgba(120,150,10,0.7),inset_0_0_14px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(110,140,0,0.3)] hover:brightness-105',
  secondary:
    'border border-line bg-white text-ink-muted hover:border-teal/40 hover:text-teal',
  onDark: 'bg-white text-teal hover:bg-teal-tint',
  /* outline on a dark teal ground — the quiet partner to an onDark pill */
  ghost:
    'border border-white/30 bg-white/5 text-white backdrop-blur hover:border-white/60 hover:bg-white/10',
  /* the nav and hero CTAs use it: the dark-green jelly pill used across the join page: brand-green rim, a
     lighter translucent core and a white gloss band along the top. */
  solid:
    'border border-[#013A3C] bg-gradient-to-b from-[#0E7A82] to-[#014D4F] text-white shadow-[0_10px_18px_-8px_rgba(1,77,79,0.7),inset_0_0_14px_rgba(120,220,215,0.35),inset_0_-3px_6px_rgba(0,30,32,0.4)] hover:brightness-110',
};

/* h-11 / h-12 only — two button heights across the whole page */
const SIZES: Record<Size, string> = {
  sm: 'h-11 px-6 text-sm',
  md: 'h-12 px-7 text-base',
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        'h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none',
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export default function Button({
  href,
  label,
  variant = 'primary',
  size = 'sm',
  className,
  onClick,
  target,
}: {
  href: string;
  label: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /* when present the anchor is intercepted — the href stays as the no-JS
     fallback destination */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: '_blank';
}) {
  /* magnetic: the pill leans toward the cursor while it is over it, then
     springs home. Driven by motion values, so the CSS hover lift in BASE is
     superseded by the inline transform rather than fighting it. */
  const reduced = useSafeReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 16, mass: 0.4 });
  const tx = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 16,
    mass: 0.4,
  });
  const ty = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 16,
    mass: 0.4,
  });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(dx * 0.3);
    my.set(dy * 0.4);
    tx.set(dx * 0.12);
    ty.set(dy * 0.15);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    tx.set(0);
    ty.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={cn(
        BASE.replace('transition-[transform,', 'transition-['),
        VARIANTS[variant],
        SIZES[size],
        className
      )}
    >
      <motion.span
        style={{ x: tx, y: ty }}
        className="relative z-10 inline-flex items-center gap-2.5"
      >
        {label}
        <Arrow />
      </motion.span>
    </motion.a>
  );
}
