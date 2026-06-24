'use client';

import { motion, type Variants } from 'framer-motion';
import NextImage from 'next/image';
import { EASE_OUT, fadeUp, staggerContainer } from '@/lib/motion';
import { useStoreUrl } from '@/lib/useStoreUrl';
import styles from './Hero.module.css';

// Each headline line rises out of an overflow-hidden mask.
const lineReveal: Variants = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.2 } },
};

const HEADLINE_LINES = [
  <>On Demand &amp; Scheduled</>,
  <>Verified Baby Care,</>,
  <>at your door</>,
  <>
    in{' '}
    <span className={styles.underlineHighlight}>
      10 minutes.
      <motion.span className={styles.underlineBar} variants={underlineVariants} />
    </span>
  </>,
];

export default function Hero() {
  const storeUrl = useStoreUrl();

  return (
    <section className={styles.hero}>
      {/* LEFT - content */}
      <motion.div
        className={styles.heroLeft}
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="show"
      >
        {/* Availability pill */}
        <motion.div className={styles.eyebrow} variants={fadeUp}>
          <span className={styles.liveDotWrap}>
            <span className={styles.liveDot} />
            <span className={styles.ping} />
          </span>
          <span>Live now · Whitefield, Bangalore</span>
        </motion.div>

        <motion.h1 className={styles.headline} variants={staggerContainer(0.1)}>
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} className={styles.lineMask}>
              <motion.span className={styles.line} variants={lineReveal}>
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p className={styles.subtitle} variants={fadeUp}>
          Verified, trained nannies and baby caregivers - for newborns, toddlers, and everything
          in between. On-demand or scheduled, whenever you need it.
        </motion.p>

        <motion.div className={styles.actions} variants={fadeUp}>
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnDark}
          >
            <svg className={styles.appleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Now
          </a>
          <a href="#tech" className={styles.btnSafety}>
            Check Safety Features <span className={styles.arrow}>→</span>
          </a>
        </motion.div>

        <motion.div className={styles.serviceChips} variants={fadeUp}>
          <span className={styles.chipsLabel}>Also coming soon:</span>
          <span className={styles.chip}>👴 Elderly Care</span>
        </motion.div>
      </motion.div>

      {/* RIGHT - app screenshot */}
      <motion.div
        className={styles.heroRight}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: EASE_OUT }}
      >
        <motion.div
          className={styles.phoneMockup}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE_OUT }}
        >
          <NextImage
            src="/wdkndkd.png"
            alt="FamCare app"
            width={1080}
            height={2400}
            priority
            className={styles.phoneImage}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
