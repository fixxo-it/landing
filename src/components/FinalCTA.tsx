'use client';

import { motion } from 'framer-motion';
import { fadeUp, revealContainer } from '@/lib/motion';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className={styles.section}>
      <motion.div {...revealContainer(0.12)}>
        <motion.h2 className={styles.heading} variants={fadeUp}>
          Go. We&apos;ve got them.
        </motion.h2>
        <motion.p className={styles.sub} variants={fadeUp}>
          Your baby is in safe, verified hands. Book in 2 minutes, caregiver at your door in 10.
        </motion.p>
        <motion.div className={styles.actions} variants={fadeUp}>
          <a
            href="https://apps.apple.com/in/app/famcare/id6761720384"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhite}
          >
            Book on-demand now <span className={styles.arrow}>→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
