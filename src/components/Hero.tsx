'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* LEFT — content */}
      <motion.div
        className={styles.heroLeft}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Availability pill */}
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <span className={styles.liveDot} />
          <span>Live now · Bangalore</span>
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          Expert baby care,<br />
          at your door<br />
          in <span className={styles.underlineHighlight}>10 minutes.</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          Verified, trained nannies and baby caregivers — for newborns, toddlers, and everything
          in between. On-demand or scheduled, whenever you need it.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="https://apps.apple.com/in/app/famcare/id6761720384"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnDark}
          >
            Book on-demand →
          </a>
          <a href="#pricing" className={styles.btnOutline}>
            See monthly plans
          </a>
        </motion.div>
      </motion.div>

      {/* RIGHT — big stat panel */}
      <motion.div
        className={styles.heroRight}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
      >
        <div className={styles.bigTime}>
          <div className={styles.bigNum}>10</div>
          <div className={styles.bigUnit}>minutes</div>
          <div className={styles.bigLabel}>Average caregiver arrival time</div>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.hStat}>
            <div className={styles.hStatNum}>2,400+</div>
            <div className={styles.hStatLabel}>Sessions delivered</div>
          </div>
          <div className={styles.hStat}>
            <div className={styles.hStatNum}>87%</div>
            <div className={styles.hStatLabel}>Repeat booking rate</div>
          </div>
          <div className={styles.hStat}>
            <div className={styles.hStatNum}>4.9 ★</div>
            <div className={styles.hStatLabel}>Average rating</div>
          </div>
          <div className={styles.hStat}>
            <div className={styles.hStatNum}>100%</div>
            <div className={styles.hStatLabel}>Background verified</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
