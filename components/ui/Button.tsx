import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "onDark" | "solid";
type Size = "sm" | "md";

const BASE =
  "group relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0";

export const PHOTO_TEAL = "bg-teal-dark";

/* liquid glass, lime body with teal type: a blurred specular streak near the
   top (before) for the glossy highlight, and a soft glow low in the pill
   (after) for the inner-glow + shadow read. Text/Arrow sit on their own
   stacking layer in the JSX below so the two pseudo layers can sit over the
   body without covering them. */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[#E4FF5C] text-teal shadow-[0_30px_45px_-20px_rgba(1,97,99,0.4)] before:absolute before:inset-x-[8%] before:top-[10%] before:h-[38%] before:rounded-full before:bg-gradient-to-b before:from-white/60 before:via-white/15 before:to-transparent before:blur-[3px] before:pointer-events-none before:content-[''] after:absolute after:inset-x-[20%] after:bottom-[6%] after:h-[26%] after:rounded-full after:bg-white/20 after:blur-lg after:pointer-events-none after:content-[''] hover:bg-[#d8f43f]",
  secondary:
    "border border-line bg-white text-ink-muted hover:border-teal/40 hover:text-teal",
  onDark: "bg-white text-teal hover:bg-teal-tint",
  /* flat brand teal, white type — no gloss/glow layers. The nav CTA uses it:
     sitting inside the header bar all the way down the page, it wants to read
     as plain chrome rather than as the lime call to action the sections
     themselves carry. */
  solid: "bg-teal text-white hover:bg-teal-dark",
};

/* h-11 / h-12 only — two button heights across the whole page */
const SIZES: Record<Size, string> = {
  sm: "h-11 px-6 text-sm",
  md: "h-12 px-7 text-base",
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none",
        className,
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Button({
  href,
  label,
  variant = "primary",
  size = "sm",
  className,
  onClick,
}: {
  href: string;
  label: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /* when present the anchor is intercepted — the href stays as the no-JS
     fallback destination */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
    >
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {label}
        <Arrow />
      </span>
    </a>
  );
}
