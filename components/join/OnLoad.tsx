"use client";

import { motion } from "framer-motion";
import { DURATION, EASE } from "@/components/motion/Reveal";

/* plays on mount rather than on scroll: the header sits inside the top 10% of
   the viewport, which Reveal's in-view margin deliberately ignores */
export default function OnLoad({
  delay = 0,
  y = -16,
  children,
}: {
  delay?: number;
  y?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
