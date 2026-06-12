'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import styles from './WhySwitch.module.css';

const rows = [
  { feature: 'Time to find a caregiver', old: '3–7 days', new: '~10 minutes' },
  { feature: 'Background verification', old: 'Rarely done', new: 'Always done' },
  { feature: 'Transparent pricing', old: 'Negotiated', new: 'Fixed, upfront' },
  { feature: 'Backup if caregiver cancels', old: "You're stranded", new: 'Instant replacement' },
  { feature: 'Real-time live tracking', old: 'No visibility', new: 'GPS tracking' },
  { feature: 'Verified ratings & reviews', old: 'Word of mouth', new: 'Post-session reviews' },
  { feature: 'Book on Sunday at 9pm', old: 'Not possible', new: '24/7 available' },
];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.4, ease: EASE_OUT, delay: 0.1 },
      opacity: { duration: 0.01, delay: 0.1 },
    },
  },
};

export default function WhySwitch() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className={styles.eyebrow}>Why switch</div>
          <h2 className={styles.h2}>
            The old way of finding a nanny<br />
            is broken.
          </h2>
        </motion.div>

        <motion.div
          className={styles.table}
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Header */}
          <motion.div className={styles.thead} variants={fadeUp}>
            <div className={styles.thFeat}>What you care about</div>
            <div className={styles.thOld}>Agency / referral</div>
            <div className={styles.thNew}>FamCare</div>
          </motion.div>

          {/* Rows */}
          {rows.map((r, i) => (
            <motion.div key={i} className={styles.row} variants={rowVariants}>
              <div className={styles.cellFeat}>{r.feature}</div>
              <div className={styles.cellOld}>
                <span className={styles.cellInner}>
                  <span className={styles.cross} aria-hidden="true">✗</span>
                  {r.old}
                </span>
              </div>
              <div className={styles.cellNew}>
                <span className={styles.cellInner}>
                  <svg className={styles.checkMark} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <motion.path
                      d="M4 12.5l5 5L20 6.5"
                      stroke="var(--primary-light)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={drawPath}
                    />
                  </svg>
                  {r.new}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
