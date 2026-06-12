'use client';

import { motion } from 'framer-motion';
import styles from './Pillars.module.css';

const checks = [
  {
    icon: '🔍',
    title: 'Police background check',
    desc: 'Verified against national records. Renewed every 6 months.',
  },
  {
    icon: '🪪',
    title: 'Government ID verification',
    desc: 'Aadhaar and PAN cross-checked and stored securely.',
  },
  {
    icon: '📋',
    title: 'Employment history check',
    desc: 'Past employers contacted and references verified.',
  },
  {
    icon: '🎓',
    title: 'Skill assessment',
    desc: 'Practical baby care skills tested by our in-house trainers.',
  },
  {
    icon: '💬',
    title: 'In-person interview',
    desc: 'Every caregiver meets our ops team before going live.',
  },
  {
    icon: '⭐',
    title: 'Ongoing rating review',
    desc: 'Drop below 4.2 stars? Immediately paused and retrained.',
  },
];

const sampleCaregivers = [
  { name: 'Priya S.', role: 'Newborn specialist · 4 yrs exp', rating: '4.9' },
  { name: 'Sunita K.', role: 'Toddler companion · 5 yrs exp', rating: '4.8' },
  { name: 'Radha M.', role: 'Infant day care · 3 yrs exp', rating: '4.9' },
];

export default function Pillars() {
  return (
    <section id="verified" className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        {/* Left: verification list */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Zero compromise</div>
          <h2 className="h2">
            Every caregiver is verified.<br />
            Not just screened.
          </h2>
          <p className={styles.intro}>
            We don&apos;t just take anyone. Our 6-layer process means you know
            exactly who is walking into your home.
          </p>

          <ul className={styles.checks}>
            {checks.map((c, i) => (
              <motion.li
                key={i}
                className={styles.checkItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className={styles.checkIcon}>{c.icon}</div>
                <div>
                  <div className={styles.checkTitle}>{c.title}</div>
                  <div className={styles.checkDesc}>{c.desc}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: sample caregiver panel */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={styles.panelLabel}>Sample verified caregivers</div>
          {sampleCaregivers.map((c, i) => (
            <div key={i} className={styles.caregiverCard}>
              <div className={styles.avatar}>👩</div>
              <div className={styles.caregiverInfo}>
                <div className={styles.caregiverName}>{c.name}</div>
                <div className={styles.caregiverRole}>{c.role}</div>
                <div className={styles.badges}>
                  <span className={`${styles.badge} ${styles.badgeGreen}`}>✓ Police verified</span>
                  <span className={`${styles.badge} ${styles.badgeBlue}`}>✓ Aadhaar verified</span>
                  <span className={`${styles.badge} ${styles.badgeGold}`}>⭐ {c.rating}</span>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.panelCta}>
            <p className={styles.panelCtaText}>Ready to book a verified caregiver?</p>
            <a
              href="https://apps.apple.com/in/app/famcare/id6761720384"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.panelBtn}
            >
              Book Now →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
