import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion vocabulary for the FamCare landing page.
 *
 * Personality: calm, premium reveals as the baseline (EASE_OUT), with a few
 * delight beats elsewhere using a softer overshoot (EASE_SOFT). Centralizing
 * these keeps every section consistent and easy to tune in one place.
 */

// Calm premium ease-out — the default for reveals.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
// Slight overshoot — for accent moments (badges, pops).
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

// Standard scroll trigger: animate once, a little before fully in view.
export const viewportOnce = { once: true, margin: '-80px' } as const;

const baseTransition: Transition = { duration: 0.65, ease: EASE_OUT };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: baseTransition },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** A single staggered child — fade-up. Pair with `staggerContainer`. */
export const staggerItem: Variants = fadeUp;

/**
 * Parent container that staggers its children's `show` state.
 * Children should use `staggerItem` (or any variants with hidden/show keys).
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Convenience props to drop onto a scroll-triggered container. */
export const revealContainer = (stagger = 0.08, delayChildren = 0) => ({
  variants: staggerContainer(stagger, delayChildren),
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: viewportOnce,
});

/** Shared spring for entrance/bounce moments (FloatingCTA, pops). */
export const springSoft: Transition = { type: 'spring', stiffness: 320, damping: 30 };
