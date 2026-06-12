'use client';

import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

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
    title: 'Choose a caregiver',
    desc: 'See verified profiles, ratings, and experience in seconds',
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
    desc: 'Track their arrival live — like Ola, but for care',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eyebrow}>Simple &amp; fast</div>
          <h2 className={styles.h2}>From need to caregiver in minutes.</h2>
          <p className={styles.subhead}>
            No agency calls, no 3-day wait, no negotiations.
          </p>
        </motion.div>

        <div className={styles.stepsRow}>
          {/* connector line */}
          <div className={styles.connectorLine} />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className={styles.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
            >
              <div className={styles.stepCircle}>{step.icon}</div>
              <div className={styles.stepTime}>{step.time}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
