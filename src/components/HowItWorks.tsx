'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import styles from './HowItWorks.module.css';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const STEPS = [
  {
    icon: '📱',
    time: '30 sec',
    title: 'Open the app',
    desc: "Pick care type, your child's age, and how long you need",
  },
  {
    icon: '👤',
    time: '1 min',
    title: 'Caregiver is assigned',
    desc: 'We match you with the best available verified caregiver instantly',
  },
  {
    icon: '✅',
    time: '2 min',
    title: 'Confirm & pay',
    desc: 'Fixed pricing shown upfront. UPI, card, or wallet',
  },
  {
    icon: '🏠',
    time: '~10 min',
    title: 'Caregiver arrives',
    desc: 'Track their arrival live — like Ola, Uber, or Swiggy, but for care',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className={styles.eyebrow}>Simple &amp; fast</div>
          <h2 className={styles.h2}>From need to caregiver<br />in 10 minutes.</h2>
          <p className={styles.subhead}>
            No agency calls, no 3-day wait, no negotiations.
          </p>
        </motion.div>

        <motion.div
          className={styles.stepsRow}
          variants={staggerContainer(0.14, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className={styles.step}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE_OUT } }}
            >
              <div className={styles.stepNum}>0{i + 1}</div>
              <div className={styles.stepHeader}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <span className={styles.stepTime}>{step.time}</span>
              </div>
              <div className={styles.stepTitle}>{step.title}</div>
              <p className={styles.stepDesc}>{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div className={styles.connector} aria-hidden="true">→</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
