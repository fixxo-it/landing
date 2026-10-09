'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Section';
import SplitText from '@/components/motion/SplitText';
import TealGround, { trackSpotlight } from '@/components/fx/TealGround';
import { DURATION, EASE } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

/* The dark teal title band every inner page opens with — the same ground as
   the home hero, so moving between pages feels like one site. */
export default function PageHero({
  eyebrow,
  title,
  sub,
  className,
  containerClassName,
  align = 'left',
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  align?: 'left' | 'center';
  children?: React.ReactNode;
}) {
  const reduced = useSafeReducedMotion();
  const fade = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduced ? 0 : 18,
      filter: reduced ? 'none' : 'blur(8px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transitionEnd: { filter: 'none' },
    },
    transition: { duration: DURATION, ease: EASE, delay },
  });

  return (
    <section
      onPointerMove={trackSpotlight}
      className={cn(
        'relative isolate mx-2 overflow-hidden rounded-[28px] text-white sm:mx-3 lg:rounded-[44px]',
        className
      )}
    >
      <TealGround grid spotlight />
      <Container
        className={cn(
          'py-16 lg:py-24',
          align === 'center' && 'flex flex-col items-center text-center',
          containerClassName
        )}
      >
        {eyebrow && (
          <motion.p
            {...fade(0.1)}
            className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[-0.02em] text-white/85 backdrop-blur"
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="max-w-[18ch] font-display text-[2.75rem] font-bold leading-[1.04] tracking-[-0.02em] text-white lg:text-[5rem] lg:leading-[1]">
          <SplitText text={title} onMount delay={0.15} step={0.07} />
        </h1>
        {sub && (
          <motion.div
            {...fade(0.45)}
            className="mt-5 max-w-[620px] text-lg leading-relaxed text-white/70"
          >
            {sub}
          </motion.div>
        )}
        {children}
      </Container>
    </section>
  );
}
