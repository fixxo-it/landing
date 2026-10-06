'use client';

import { MotionConfig } from 'framer-motion';

/* Honours the OS "reduce motion" setting for every framer animation on the
   site — transforms are skipped and only opacity animates. Done here, once,
   rather than per component, so the server and client render the same
   initial styles and there is no hydration mismatch. */
export default function MotionPrefs({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
