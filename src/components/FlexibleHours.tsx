'use client';

import { motion } from 'framer-motion';
import styles from './FlexibleHours.module.css';

const durations = [
  {
    hours: '3',
    unit: 'hours',
    name: 'Quick support',
    desc: 'Errands, doctor visits, or a well-deserved breather',
    price: 'From ₹299/hr',
  },
  {
    hours: '6',
    unit: 'hours',
    name: 'Half-day',
    desc: 'Full morning or afternoon of uninterrupted focus',
    price: 'From ₹275/hr',
  },
  {
    hours: '9',
    unit: 'hours',
    name: 'Full day',
    desc: 'Complete working day — focus completely on what matters',
    price: 'From ₹249/hr',
  },
  {
    hours: 'Night',
    unit: '8pm – 7am',
    name: 'Night care',
    desc: 'Overnight support and sleep training assistance',
    price: 'From ₹1,499/night',
  },
];

export default function FlexibleHours() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">Flexible hours</div>
          <h2 className="h2">Pay for only the hours you need.</h2>
          <p className={styles.subhead}>
            No minimum commitment. Book for 3 hours or a full working day — at
            transparent, fixed prices.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {durations.map((d, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <div className={styles.bigHours}>{d.hours}</div>
              <div className={styles.unit}>{d.unit}</div>
              <div className={styles.name}>{d.name}</div>
              <p className={styles.desc}>{d.desc}</p>
              <div className={styles.price}>{d.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
