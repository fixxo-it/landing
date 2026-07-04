'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT, EASE_SOFT, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import styles from './Pillars.module.css';

const checks = [
  {
    icon: '🔍',
    title: 'Criminal Records & Background Verification Check',
    desc: 'Verified against national criminal records and police databases. Renewed every 6 months.',
    accent: 'teal',
  },
  {
    icon: '🪪',
    title: 'Government ID verification',
    desc: 'Aadhaar and PAN cross-checked and stored securely.',
    accent: 'teal',
  },
  {
    icon: '📋',
    title: 'Employment history check',
    desc: 'Past employers contacted and references verified.',
    accent: 'teal',
  },
  {
    icon: '🎓',
    title: 'Skill assessment',
    desc: 'Practical baby care skills tested by our in-house trainers.',
    accent: 'teal',
  },
  {
    icon: '💬',
    title: 'In-person interview',
    desc: 'Every caregiver meets our ops team before going live.',
    accent: 'teal',
  },
  {
    icon: '🏠',
    title: 'Physical address verified',
    desc: 'Home address confirmed and on record before any assignment.',
    accent: 'teal',
  },
  {
    icon: '⭐',
    title: 'Ongoing rating review',
    desc: 'Drop below 4.2 stars? Immediately paused and retrained.',
    accent: 'teal',
  },
];

const sampleCaregivers = [
  { name: 'Priya S.', role: 'Newborn specialist · 4 yrs exp', rating: '4.9', tasks: 312 },
  { name: 'Sunita K.', role: 'Toddler companion · 5 yrs exp', rating: '4.8', tasks: 274 },
  { name: 'Radha M.', role: 'Infant day care · 3 yrs exp', rating: '4.9', tasks: 198 },
];

const checkItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

const stampVariants: Variants = {
  hidden: { scale: 1.3, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 500, damping: 18 } },
};

export default function Pillars() {
  return (
    <section id="verified" className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        {/* Left: verification list */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="eyebrow">Zero compromise</div>
          <h2 className="h2">
            Every caregiver is <em className={styles.em}>authorised</em>,<br />
            verified &amp; <em className={styles.em}>trained</em>.
          </h2>
          <p className={styles.intro}>
            We don&apos;t just take anyone. Our 6-layer process means you know
            exactly who is walking into your home. Safety is non-negotiable —
            for our users <strong>and</strong> our caregivers.
          </p>

          <div className={styles.layerLabel}>
            <span className={styles.layerNum}>6</span>
            <span className={styles.layerText}>layers of verification</span>
          </div>

          <motion.div
            className={styles.checksGrid}
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {checks.map((c, i) => (
              <motion.div
                key={i}
                className={`${styles.checkCard} ${styles[`accent_${c.accent}`]}`}
                variants={checkItemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2, ease: EASE_SOFT } }}
              >
                <div className={styles.checkIcon}>{c.icon}</div>
                <div className={styles.checkBody}>
                  <div className={styles.checkTitle}>{c.title}</div>
                  <div className={styles.checkDesc}>{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: sample caregiver panel */}
        <motion.div
          className={styles.panel}
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className={styles.panelBadge} variants={fadeUp}>
            <span className={styles.panelBadgeIcon}>🛡️</span>
            <span>Sample verified caregivers</span>
          </motion.div>

          {sampleCaregivers.map((c, i) => (
            <motion.div
              key={i}
              className={styles.caregiverCard}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <div className={styles.avatar}>👩</div>
              <div className={styles.caregiverInfo}>
                <div className={styles.caregiverName}>{c.name}</div>
                <div className={styles.caregiverRole}>{c.role}</div>
                <motion.div className={styles.badges} variants={staggerContainer(0.08, 0.1)}>
                  <motion.span className={`${styles.badge} ${styles.badgeGreen}`} variants={stampVariants}>
                    ✓ Police verified
                  </motion.span>
                  <motion.span className={`${styles.badge} ${styles.badgeBlue}`} variants={stampVariants}>
                    ✓ Aadhaar verified
                  </motion.span>
                  <motion.span className={`${styles.badge} ${styles.badgeGold}`} variants={stampVariants}>
                    ⭐ {c.rating}
                  </motion.span>
                  <motion.span className={`${styles.badge} ${styles.badgePurple}`} variants={stampVariants}>
                    ✓ {c.tasks} tasks done
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div className={styles.panelCta} variants={fadeUp}>
            <p className={styles.panelCtaText}>Ready to book a verified caregiver?</p>
            <a
              href="https://apps.apple.com/in/app/famcare/id6761720384"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.panelBtn}
            >
              Book Now <span className={styles.arrow}>→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
