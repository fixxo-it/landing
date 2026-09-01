"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

/* Shared motion language for the page:
   – one easing curve (a soft out-expo) so nothing feels like a different site
   – a 28px rise: far enough that the arrival reads as an arrival, short enough
     that nobody is left waiting on it
   – every animation collapses to a plain fade when the OS asks for less motion */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const RISE = 28;
export const DURATION = 0.75;

/* One trigger line for the whole page. The negative margin holds the reveal
   until the element is properly inside the viewport rather than firing while it
   is still a sliver at the bottom edge — otherwise the animation is over before
   it has scrolled somewhere you can see it. */
export const VIEWPORT = { once: true, margin: "-15% 0px -10% 0px" } as const;

/* The same trigger, expressed for the `useInView` hook. Everything on the page
   reveals through this rather than through the declarative `whileInView` prop:
   the hook is a plain IntersectionObserver we drive ourselves, so a reveal can
   never be left stranded at opacity 0 by the motion feature bundle failing to
   pick the viewport gesture up. */
export const IN_VIEW = { once: true, margin: "-10% 0px -10% 0px" } as const;

export function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, IN_VIEW);
  return { ref, inView };
}

type Tag = "div" | "span" | "p" | "h2" | "h3" | "li" | "ul" | "section";

export default function Reveal({
  as = "div",
  delay = 0,
  y = RISE,
  className,
  children,
}: {
  as?: Tag;
  delay?: number;
  y?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;
  const { ref, inView } = useReveal();

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : y }}
      transition={{ duration: DURATION, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

/* Parent/child pair for grids and lists — children arrive in reading order. */
export function Stagger({
  className,
  delay = 0,
  step = 0.08,
  as = "div",
  children,
}: {
  className?: string;
  delay?: number;
  step?: number;
  as?: Tag;
  children: React.ReactNode;
}) {
  const Component = motion[as] as typeof motion.div;
  const { ref, inView } = useReveal();
  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  className,
  as = "div",
  children,
}: {
  className?: string;
  as?: Tag;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : RISE },
    show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
  };
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
