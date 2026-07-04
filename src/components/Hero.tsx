'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { EASE_OUT } from '@/lib/motion';
import { useStoreUrl } from '@/lib/useStoreUrl';
import styles from './Hero.module.css';

const CARE_IMAGES = [
  { src: '/images/babycare.png',    alt: 'Baby care' },
  { src: '/images/babycare2.png',   alt: 'Baby care activity' },
  { src: '/images/babycare3.png',   alt: 'Professional baby care' },
  { src: '/images/babysitting.webp',alt: 'Babysitting service' },
  { src: '/images/childcare.webp',  alt: 'Childcare' },
  { src: '/images/childcare1.png',  alt: 'Child care service' },
  { src: '/images/childcare2.png',  alt: 'Children care activity' },
  { src: '/images/childcare3.png',  alt: 'Professional childcare' },
];

const TRUST_BADGES = [
  'Police verified',
  'In-house trained',
  'Arrives in ~10 min',
];

const lineReveal: Variants = {
  hidden: { y: '108%' },
  show: { y: 0, transition: { duration: 0.78, ease: EASE_OUT } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const storeUrl = useStoreUrl();

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % CARE_IMAGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.hero}>

      {/* ── LEFT – content ─────────────────────────────────────────── */}
      <motion.div
        className={styles.left}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Live pill */}
        <motion.div className={styles.livePill} variants={itemUp}>
          <span className={styles.dotWrap}>
            <span className={styles.dot} />
            <span className={styles.ping} />
          </span>
          Live now · Whitefield, Bangalore
        </motion.div>

        {/* Headline */}
        <h1 className={styles.headline}>
          <span className={styles.mask}>
            <motion.span className={styles.maskInner} variants={lineReveal}>
              Verified Baby
            </motion.span>
          </span>
          <span className={styles.mask}>
            <motion.span className={styles.maskInner} variants={lineReveal}>
              Care, at your
            </motion.span>
          </span>
          <span className={styles.mask}>
            <motion.span className={`${styles.maskInner} ${styles.tenLine}`} variants={lineReveal}>
              door in <em className={styles.tenMin}>10 min.</em>
            </motion.span>
          </span>
        </h1>

        {/* Trust badges */}
        <motion.div className={styles.trustRow} variants={itemUp}>
          {TRUST_BADGES.map((b, i) => (
            <span key={i} className={styles.badge}>
              <svg className={styles.checkSvg} viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6.5l2.8 2.8L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {b}
            </span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p className={styles.subtitle} variants={itemUp}>
          In-house <strong>trained</strong>, authorised caregivers — criminal record &amp; background{' '}
          <strong>verified</strong>. Safety built into every booking, for both you and your caregiver.
        </motion.p>

        {/* CTAs */}
        <motion.div className={styles.actions} variants={itemUp}>
          <a href={storeUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Now
          </a>
          <a href="#tech" className={styles.btnGhost}>
            Safety Features
            <span className={styles.arrow}>→</span>
          </a>
        </motion.div>

        {/* Coming soon */}
        <motion.div className={styles.comingRow} variants={itemUp}>
          <span className={styles.comingLabel}>Also coming soon:</span>
          <span className={styles.comingChip}>👴 Elderly Care</span>
        </motion.div>
      </motion.div>

      {/* ── RIGHT – visual ─────────────────────────────────────────── */}
      <motion.div
        className={styles.right}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.9 }}
      >
        {/* Image carousel fills the panel */}
        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className={styles.slide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: 1, scale: 1,
                transition: { opacity: { duration: 0.55 }, scale: { duration: 4.5, ease: 'linear' } },
              }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
            >
              <NextImage
                src={CARE_IMAGES[idx].src}
                alt={CARE_IMAGES[idx].alt}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlay so cards are readable */}
          <div className={styles.overlay} />

          {/* Floating card – top right */}
          <motion.div
            className={`${styles.floatCard} ${styles.floatTop}`}
            initial={{ opacity: 0, y: -14, x: 14 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.85, duration: 0.65, ease: EASE_OUT }}
          >
            <span className={styles.floatEmoji}>⚡</span>
            <div>
              <div className={styles.floatNum}>~10 min</div>
              <div className={styles.floatLabel}>Avg. arrival time</div>
            </div>
          </motion.div>

          {/* Floating card – bottom left */}
          <motion.div
            className={`${styles.floatCard} ${styles.floatBottom}`}
            initial={{ opacity: 0, y: 14, x: -14 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 1.0, duration: 0.65, ease: EASE_OUT }}
          >
            <span className={styles.floatEmoji}>🛡️</span>
            <div>
              <div className={styles.floatNum}>6-Layer</div>
              <div className={styles.floatLabel}>Verification</div>
            </div>
          </motion.div>

          {/* Dots */}
          <div className={styles.dots}>
            {CARE_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`${styles.dotBtn}${i === idx ? ` ${styles.dotBtnActive}` : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
