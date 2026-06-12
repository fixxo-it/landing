'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT, EASE_SOFT, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
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

const checkItemVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const iconPop: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: EASE_SOFT } },
};

const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.45, ease: EASE_OUT, delay: 0.12 },
      opacity: { duration: 0.01, delay: 0.12 },
    },
  },
};

// Badge "stamp" — small overshoot like a verification stamp being applied.
const stampVariants: Variants = {
  hidden: { scale: 1.35, opacity: 0 },
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
            Every caregiver is verified.<br />
            Not just screened.
          </h2>
          <p className={styles.intro}>
            We don&apos;t just take anyone. Our 6-layer process means you know
            exactly who is walking into your home.
          </p>

          <div className={styles.checksWrap}>
            {/* 6-layer trust meter — fills as the checklist completes */}
            <div className={styles.meterRail}>
              <motion.div
                className={styles.meterFill}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.2 }}
              />
            </div>

            <motion.ul
              className={styles.checks}
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {checks.map((c, i) => (
                <motion.li key={i} className={styles.checkItem} variants={checkItemVariants}>
                  <motion.div className={styles.checkIcon} variants={iconPop}>
                    {c.icon}
                  </motion.div>
                  <div className={styles.checkBody}>
                    <div className={styles.checkTitle}>{c.title}</div>
                    <div className={styles.checkDesc}>{c.desc}</div>
                  </div>
                  <svg
                    className={styles.checkMark}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M4 12.5l5 5L20 6.5"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={drawPath}
                    />
                  </svg>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* Right: sample caregiver panel */}
        <motion.div
          className={styles.panel}
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className={styles.panelLabel} variants={fadeUp}>
            Sample verified caregivers
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
                <motion.div
                  className={styles.badges}
                  variants={staggerContainer(0.08, 0.1)}
                >
                  <motion.span className={`${styles.badge} ${styles.badgeGreen}`} variants={stampVariants}>
                    ✓ Police verified
                  </motion.span>
                  <motion.span className={`${styles.badge} ${styles.badgeBlue}`} variants={stampVariants}>
                    ✓ Aadhaar verified
                  </motion.span>
                  <motion.span className={`${styles.badge} ${styles.badgeGold}`} variants={stampVariants}>
                    ⭐ {c.rating}
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
