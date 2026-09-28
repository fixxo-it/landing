import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'onDark' | 'solid';
type Size = 'sm' | 'md';

export const BASE =
  'group relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0';

export const PHOTO_TEAL = 'bg-teal-dark';

/* lime jelly pill with teal type: lime rim, inner glow and drop shadow, matching the dark-green CTAs — no gloss layer */
export const VARIANTS: Record<Variant, string> = {
  primary:
    'border border-[#A9C91F] bg-gradient-to-b from-[#EBFF7A] to-[#DDF74A] text-teal shadow-[0_10px_18px_-8px_rgba(120,150,10,0.7),inset_0_0_14px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(110,140,0,0.3)] hover:brightness-105',
  secondary:
    'border border-line bg-white text-ink-muted hover:border-teal/40 hover:text-teal',
  onDark: 'bg-white text-teal hover:bg-teal-tint',
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
  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
    >
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {label}
        <Arrow />
      </span>
    </a>
  );
}
