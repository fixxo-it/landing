'use client';

import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { revealContainer, staggerItem } from '@/lib/motion';
import styles from './StatsStrip.module.css';

type Stat = {
  label: string;
  // Either a count-up number...
  value?: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  // ...or a plain string for non-numeric stats.
  text?: string;
};

const STATS: Stat[] = [
  { value: 10, suffix: ' min', label: 'Avg. arrival time' },
  { value: 6, suffix: '-layer', label: 'Verification process' },
  { value: 149, prefix: '₹', label: 'Starting price' },
  { text: '6AM - 9PM', label: 'Service hours' },
  { value: 87, suffix: '%', label: 'Book again rate' },
];

export default function StatsStrip() {
  return (
    <motion.div className={styles.strip} {...revealContainer(0.09)}>
      {STATS.map((s, i) => (
        <motion.div key={i} className={styles.item} variants={staggerItem}>
          <div className={styles.num}>
            {s.text ? (
              s.text
            ) : (
              <CountUp
                value={s.value!}
                prefix={s.prefix}
                suffix={s.suffix}
                separator={s.separator}
              />
            )}
          </div>
          <div className={styles.label}>{s.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
