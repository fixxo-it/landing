'use client';

import { motion } from 'framer-motion';
import { EASE, useReveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

/* Each word rises out of its own clipping slot, tipped back a few degrees, so
   a heading assembles itself line by line rather than fading in as a block.
   `onMount` plays it straight away (above the fold); otherwise it waits for the
   shared in-view trigger like every other reveal on the page. */
export default function SplitText({
  text,
  className,
  delay = 0,
  step = 0.06,
  onMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
  onMount?: boolean;
}) {
  const { ref, inView } = useReveal();
  const show = onMount || inView;
  const words = text.split(' ');

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={cn('inline', className)}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block origin-bottom-left will-change-transform"
              initial={{ y: '110%', rotate: 7 }}
              animate={show ? { y: '0%', rotate: 0 } : undefined}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: delay + i * step,
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* the gap lives outside the clipping slot — inside an inline-block a
            trailing space collapses and the words run together */}
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}
