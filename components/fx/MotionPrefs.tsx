'use client';

import { useEffect, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';

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

/* useReducedMotion for components whose first render depends on it. The OS
   setting is unknown on the server, so this reports false until mount and
   the real value after — server and client render the same markup, and the
   MotionConfig above already keeps transforms off in between. */
export function useSafeReducedMotion() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduced;
}
