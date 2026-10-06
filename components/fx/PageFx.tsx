'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/* Page-wide chrome: a hairline scroll-progress bar along the top edge. */
export default function PageFx() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.3,
  });

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-teal-light to-teal"
      />
    </>
  );
}
