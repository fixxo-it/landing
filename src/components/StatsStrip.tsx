'use client';

import { motion } from 'framer-motion';
import styles from './StatsStrip.module.css';

const STATS = [
  { num: '10 min', label: 'Avg. arrival time' },
  { num: '6-layer', label: 'Verification process' },
  { num: '₹299', label: 'Starting price' },
  { num: '24 / 7', label: 'Always available' },
  { num: '87%', label: 'Book again rate' },
];

export default function StatsStrip() {
  return (
    <div className={styles.strip}>
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          className={styles.item}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
        >
          <div className={styles.num}>{s.num}</div>
          <div className={styles.label}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
