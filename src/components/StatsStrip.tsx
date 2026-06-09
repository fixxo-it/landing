'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';
import styles from './StatsStrip.module.css';

const TICKER = [
  '⚡ Instant Booking',
  '✓ Background Verified',
  '★ 4.8 App Rating',
  "🏆 Bengaluru's #1 Care App",
  '📍 At Your Doorstep',
  '🔒 Aadhaar Verified',
  '⏱ 10 Min Response',
];

const STATS = [
  { value: 10, suffix: ' min', isFloat: false, label: 'Avg. Response Time', Icon: Zap, color: '#34d399' },
  { value: 100, suffix: '%', isFloat: false, label: 'Background Checked', Icon: Shield, color: '#60a5fa' },
];

function CountUp({ target, suffix, isFloat }: { target: number; suffix: string; isFloat: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 45;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(eased * target);
      if (step >= steps) { setCount(target); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}</span>;
}

export default function StatsStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item}
              <span className={styles.dot} />
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.11, duration: 0.5 }}
            >
              <div className={styles.iconWrap} style={{ color: s.color }}>
                <s.Icon size={22} />
              </div>
              <div className={styles.number} style={{ color: s.color }}>
                <CountUp target={s.value} suffix={s.suffix} isFloat={s.isFloat} />
              </div>
              <div className={styles.label}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
