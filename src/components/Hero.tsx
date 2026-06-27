'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { EASE_OUT, fadeUp, staggerContainer } from '@/lib/motion';
import { useStoreUrl } from '@/lib/useStoreUrl';
import styles from './Hero.module.css';

const CARE_IMAGES = [
  { src: '/images/babycare.png', alt: 'Baby care' },
  { src: '/images/babycare2.png', alt: 'Baby care activity' },
  { src: '/images/babycare3.png', alt: 'Professional baby care' },
  { src: '/images/babysitting.webp', alt: 'Babysitting service' },
  { src: '/images/childcare.webp', alt: 'Childcare' },
  { src: '/images/childcare1.png', alt: 'Child care service' },
  { src: '/images/childcare2.png', alt: 'Children care activity' },
  { src: '/images/childcare3.png', alt: 'Professional childcare' },
];

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const storeUrl = useStoreUrl();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CARE_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          In-house trained, <strong>authorised caregivers</strong> — criminal record &amp; background verified.
          Safety for both you and your caregiver, built into our full-stack care model.
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

      {/* RIGHT - images */}
      <motion.div
        className={styles.heroRight}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: EASE_OUT }}
      >
        <div className={styles.imageGallery}>
          <div className={styles.carouselContainer}>
            <motion.div
              className={styles.carouselMain}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.8, ease: EASE_OUT }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className={styles.carouselSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      opacity: { duration: 0.6, ease: EASE_OUT },
                      scale: { duration: 4, ease: 'linear' },
                    },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                >
                  <NextImage
                    src={CARE_IMAGES[currentImageIndex].src}
                    alt={CARE_IMAGES[currentImageIndex].alt}
                    width={320}
                    height={420}
                    priority
                    style={{ objectFit: 'cover', borderRadius: '16px', width: '100%', height: '100%' }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <div className={styles.carouselDots}>
              {CARE_IMAGES.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentImageIndex ? styles.dotActive : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className={styles.leftColumn}>
            <motion.div
              className={styles.imageMedium}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: EASE_OUT }}
            >
              <NextImage
                src="/images/babycare.png"
                alt="Baby care"
                width={280}
                height={280}
                priority
                style={{ objectFit: 'cover', borderRadius: '16px' }}
              />
            </motion.div>
            <motion.div
              className={styles.imageSmall}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.7, ease: EASE_OUT }}
            >
              <NextImage
                src="/images/childcare.webp"
                alt="Childcare"
                width={200}
                height={200}
                priority
                style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
