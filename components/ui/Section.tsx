import { cn } from "@/lib/cn";
import Reveal from "@/components/motion/Reveal";

/* Every section on the page shares this gutter + measure, so the left edge of
   the hero headline lines up with the left edge of the footer wordmark. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 lg:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/* `lg` matches the "Book in 3 taps" heading exactly — cn() is a plain join with
   no tailwind-merge, so an override cannot be passed through className */
const HEADING_SIZE = {
  default: "text-h2 lg:text-h2-lg",
  /* matches "Book in 4 steps" from mobile up to lg, so the page's other
     oversized headings (Safe360™, Never alone, the hiring and testimonials
     titles) read at the same size on a phone instead of a step down */
  lg: "text-h1 lg:text-[4.5rem] lg:leading-[1.04] lg:tracking-[-0.032em]",
};

export function SectionHeading({
  title,
  body,
  align = "center",
  tone = "light",
  size = "default",
  className,
  children,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  size?: keyof typeof HEADING_SIZE;
  className?: string;
  children?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        /* left on every heading below sm regardless of `align` — a centred
           block reads fine at desktop measure but turns ragged and hard to
           scan once the line wraps to phone width. Centring, where asked for,
           only takes over from sm up. */
        "flex flex-col items-start text-left",
        centered && "sm:items-center sm:text-center",
        className,
      )}
    >
      <Reveal
        as="h2"
        delay={0.05}
        className={cn(
          "font-display font-semibold text-balance",
          HEADING_SIZE[size],
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Reveal>
      {body && (
        <Reveal
          as="p"
          delay={0.1}
          className={cn(
            "mt-5 max-w-[560px] text-lg leading-relaxed text-pretty",
            centered && "sm:mx-auto",
            tone === "dark" ? "text-white/80" : "text-ink-muted",
          )}
        >
          {body}
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.15} className="mt-8">
          {children}
        </Reveal>
      )}
    </div>
  );
}
