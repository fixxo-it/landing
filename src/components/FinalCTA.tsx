'use client';

import { motion } from 'framer-motion';
import { fadeUp, revealContainer } from '@/lib/motion';
import { useStoreUrl } from '@/lib/useStoreUrl';
import { openAppOrStore } from '@/lib/openAppOrStore';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  const storeUrl = useStoreUrl();
  return (
    <section className={styles.section}>
      <motion.div {...revealContainer(0.12)}>
        <motion.h2 className={styles.heading} variants={fadeUp}>
          Go. We&apos;ve got them.
        </motion.h2>
        <motion.p className={styles.sub} variants={fadeUp}>
          Your baby is in safe, verified hands. Book in 2 minutes, caregiver at your door in 10 minutes.
        </motion.p>
        <motion.div className={styles.actions} variants={fadeUp}>
          <a
            href={storeUrl}
            onClick={(e) => {
              e.preventDefault();
              openAppOrStore(storeUrl);
            }}
            className={styles.btnWhite}
          >
            Download Now <span className={styles.arrow}>→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
