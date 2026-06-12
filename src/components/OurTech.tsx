'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT, fadeUp, revealContainer, staggerItem, viewportOnce } from '@/lib/motion';
import styles from './OurTech.module.css';

const iconPop: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 140, damping: 14, delay: 0.1 } },
};

const features = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="3" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
      </svg>
    ),
    title: 'Live Tracking',
    subtitle: 'Always know where your caregiver is',
    desc: 'Track your caregiver in real time from the moment they leave until they arrive. Get live updates, estimated arrival time, and peace of mind — every step of the way.',
    color: '#14B8A6',
    bg: 'rgba(20, 184, 166, 0.08)',
    border: 'rgba(20, 184, 166, 0.2)',
    pill: 'Real-time GPS',
    pillBg: 'rgba(20, 184, 166, 0.12)',
    pillFg: '#0F766E',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect x="6" y="10" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="3" />
        <path d="M34 18l8-5v16l-8-5V18z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="14" cy="21" r="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M8 30c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Video Calling',
    subtitle: 'Check in on your little one anytime',
    desc: 'Connect face-to-face with your caregiver at any moment during the session. See your baby, ask questions, and stay involved — without being in the room.',
    color: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.07)',
    border: 'rgba(99, 102, 241, 0.18)',
    pill: 'In-app call',
    pillBg: 'rgba(99, 102, 241, 0.1)',
    pillFg: '#4338CA',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" />
        <circle cx="24" cy="24" r="11" fill="currentColor" opacity="0.12" />
        <path d="M24 14v10l6 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
        <path d="M10 10l4 4M38 10l-4 4M10 38l4-4M38 38l-4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'SOS Button',
    subtitle: 'Emergency help, instantly',
    desc: 'One tap sends an immediate alert to our response team and your emergency contacts. Available to both parents and caregivers — because safety can\'t wait.',
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.07)',
    border: 'rgba(239, 68, 68, 0.18)',
    pill: '1-tap emergency',
    pillBg: 'rgba(239, 68, 68, 0.1)',
    pillFg: '#B91C1C',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <path d="M24 8c5.5 0 10 4.5 10 10v6c0 5.5-4.5 10-10 10s-10-4.5-10-10v-6c0-5.5 4.5-10 10-10z" stroke="currentColor" strokeWidth="3" />
        <path d="M14 24v6c0 5.5 4.5 10 10 10s10-4.5 10-10v-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 38v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 42h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="18" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.7" />
      </svg>
    ),
    title: 'Live Audio Recording',
    subtitle: 'Full session documentation',
    desc: 'Every session is recorded with consent. Review interactions, document milestones, and keep a complete record of your child\'s care — always protected and encrypted.',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.07)',
    border: 'rgba(245, 158, 11, 0.18)',
    pill: 'Encrypted records',
    pillBg: 'rgba(245, 158, 11, 0.1)',
    pillFg: '#92400E',
  },
];

export default function OurTech() {
  return (
    <section className={styles.section} id="tech">
      <div className="container">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="eyebrow">Built for trust</div>
          <h2 className="h2">
            Our tech keeps your child<br />
            safe at all times.
          </h2>
          <p className={styles.subhead}>
            Every session is backed by features designed for transparency, safety, and total peace of mind.
          </p>
        </motion.div>

        <motion.div className={styles.grid} {...revealContainer(0.12)}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={styles.card}
              style={{ borderColor: f.border, background: f.bg }}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE_OUT } }}
            >
              <motion.div
                className={styles.iconWrap}
                style={{ color: f.color, background: `${f.color}18` }}
                variants={iconPop}
              >
                {f.icon}
              </motion.div>

              <span
                className={styles.pill}
                style={{ background: f.pillBg, color: f.pillFg }}
              >
                {f.pill}
              </span>

              <h3 className={styles.cardTitle} style={{ color: f.color }}>
                {f.title}
              </h3>
              <p className={styles.cardSubtitle}>{f.subtitle}</p>
              <p className={styles.cardDesc}>{f.desc}</p>

              <div className={styles.pulseWrap}>
                <motion.div
                  className={styles.pulse}
                  style={{ background: f.color }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                />
                <div className={styles.pulseDot} style={{ background: f.color }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.trustBar}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <span>End-to-end encrypted</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>📍</span>
            <span>Location never stored</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🛡️</span>
            <span>DPDP compliant</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>⚡</span>
            <span>SOS response in under 90 sec</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
