'use client';

import { motion } from 'framer-motion';
import styles from './WhySwitch.module.css';

const rows = [
  { feature: 'Time to find a caregiver', old: '3–7 days', new: '~10 minutes', tick: true },
  { feature: 'Background verification', old: '✗ Rarely done', new: '✓ Always done', tick: true },
  { feature: 'Transparent pricing', old: '✗ Negotiated', new: '✓ Fixed, upfront', tick: true },
  { feature: 'Backup if caregiver cancels', old: "✗ You're stranded", new: '✓ Instant replacement', tick: true },
  { feature: 'Real-time live tracking', old: '✗ No visibility', new: '✓ GPS tracking', tick: true },
  { feature: 'Verified ratings & reviews', old: '✗ Word of mouth', new: '✓ Post-session reviews', tick: true },
  { feature: 'Book on Sunday at 9pm', old: '✗ Not possible', new: '✓ 24/7 available', tick: true },
];

export default function WhySwitch() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eyebrow}>Why switch</div>
          <h2 className={styles.h2}>
            The old way of finding a nanny<br />
            is broken.
          </h2>
        </motion.div>

        <motion.div
          className={styles.table}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Header */}
          <div className={styles.thead}>
            <div className={styles.thFeat}>What you care about</div>
            <div className={styles.thOld}>Agency / referral</div>
            <div className={styles.thNew}>FamCare</div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.cellFeat}>{r.feature}</div>
              <div className={styles.cellOld}>{r.old}</div>
              <div className={styles.cellNew}>{r.new}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
