'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import styles from './HowItWorks.module.css';

const connectorVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const circlePop: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring', stiffness: 140, damping: 14 } },
};

const subFade: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
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
          <h2 className={styles.h2}>From need to caregiver in 10 minutes.</h2>
          <p className={styles.subhead}>
            No agency calls, no 3-day wait, no negotiations.
          </p>
        </motion.div>

        <motion.div
          className={styles.stepsRow}
          variants={staggerContainer(0.16, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* connector line */}
          <motion.div
            className={styles.connectorLine}
            variants={connectorVariants}
            style={{ originX: 0 }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className={styles.step}
              variants={stepVariants}
              whileHover={{ y: -8 }}
            >
              <motion.div
                className={styles.stepCircle}
                variants={circlePop}
                whileHover={{ scale: 1.12 }}
              >
                {step.icon}
              </motion.div>
              <motion.div className={styles.stepTime} variants={subFade}>
                {step.time}
              </motion.div>
              <motion.div className={styles.stepTitle} variants={subFade}>
                {step.title}
              </motion.div>
              <motion.p className={styles.stepDesc} variants={subFade}>
                {step.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
