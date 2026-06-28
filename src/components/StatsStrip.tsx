'use client';

import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { revealContainer, staggerItem } from '@/lib/motion';
import styles from './StatsStrip.module.css';

type Stat = {
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
};

const STATS: Stat[] = [
  { value: 10, suffix: ' min',   label: 'Avg. arrival time' },
  { value: 6,  suffix: '-layer', label: 'Verification process' },
  { value: 149, prefix: '₹',    label: 'Starting price' },
  { text: '6AM–9PM',             label: 'Service hours' },
  { value: 87, suffix: '%',      label: 'Book again rate' },
];

export default function StatsStrip() {
  return (
    <div className={styles.strip}>
      <motion.div className={styles.inner} {...revealContainer(0.08)}>
        {STATS.map((s, i) => (
          <motion.div key={i} className={styles.item} variants={staggerItem}>
            <div className={styles.num}>
              {s.text ? s.text : (
                <CountUp value={s.value!} prefix={s.prefix} suffix={s.suffix} />
              )}
            </div>
            <div className={styles.label}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
