'use client';

import { motion } from 'framer-motion';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className={styles.heading}>Go. We&apos;ve got them.</h2>
        <p className={styles.sub}>
          Your baby is in safe, verified hands. Book in 2 minutes, caregiver at your door in 10.
        </p>
        <div className={styles.actions}>
          <a
            href="https://apps.apple.com/in/app/famcare/id6761720384"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhite}
          >
            Book on-demand now
          </a>
          <a href="#pricing" className={styles.btnGhost}>
            View monthly plans
          </a>
        </div>
      </motion.div>
    </section>
  );
}
