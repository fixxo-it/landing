'use client';

import { motion } from 'framer-motion';
import { EASE_OUT, fadeUp, revealContainer, staggerItem, viewportOnce } from '@/lib/motion';
import styles from './FlexibleHours.module.css';

const durations = [
  { hours: '1', unit: 'hour',  name: 'Quick help',    comingSoon: false },
  { hours: '3', unit: 'hours', name: 'Quick support', comingSoon: false },
  { hours: '5', unit: 'hours', name: 'Extended care', comingSoon: true  },
];

export default function FlexibleHours() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="eyebrow">Flexible hours</div>
          <h2 className="h2">Pay for only the hours you need.</h2>
          <p className={styles.subhead}>
            Book for as little as 1 hour or as much as a full day — whatever works for you.
          </p>
        </motion.div>

        <motion.div className={styles.grid} {...revealContainer(0.1)}>
          {durations.map((d, i) => (
            <motion.div
              key={i}
              className={`${styles.card}${d.comingSoon ? ` ${styles.cardSoon}` : ''}`}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE_OUT } }}
            >
              {d.comingSoon && <div className={styles.soonBadge}>Coming Soon</div>}
              <div className={styles.bigNum}>{d.hours}</div>
              <div className={styles.unit}>{d.unit}</div>
              <div className={styles.name}>{d.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
