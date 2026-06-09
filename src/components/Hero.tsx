'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckSquare, Zap, X, CheckCircle2 } from 'lucide-react';
import styles from './Hero.module.css';

const serviceDetails: Record<string, { title: string; items: string[] }> = {
  child: {
    title: 'Child Care',
    items: ['After School Babysitting', 'WFH Babysitting', 'Quick Babysitting'],
  },
  elderly: {
    title: 'Elderly Care',
    items: ['Elderly Companion'],
  },
  pet: {
    title: 'Pet Care',
    items: ['Dog Walker'],
  },
};

export default function Hero() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <section className={styles.hero}>
      {/* Animated background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <div className={`container ${styles.heroContainer}`}>

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className={styles.heroLeft}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Availability pill */}
          <motion.div
            className={styles.topBadge}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Zap size={13} fill="currentColor" />
            Available Now in Bengaluru
          </motion.div>

          <motion.h1
            className={`h1 ${styles.headline}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <span className="text-gradient">In House Trusted Care</span>{' '}
            in Minutes
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            Experience the most modern caregiver app designed for your family's
            safety and speed. Directly hired &amp; matched professionals at your
            doorstep in minutes.
          </motion.p>

          {/* Service tiles */}
          <motion.div
            className={styles.servicesWrapper}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            onMouseLeave={() => setExpandedService(null)}
          >
            <div className={styles.servicesGrid}>
              {[
                { key: 'child', src: '/images/childcare.png', label: 'Child Care' },
                { key: 'elderly', src: '/images/elderly.png', label: 'Elderly Care' },
                { key: 'pet', src: '/images/petcare.png', label: 'Pet Care' },
              ].map(({ key, src, label }) => (
                <div
                  key={key}
                  className={`${styles.serviceItem} ${expandedService === key ? styles.activeService : ''}`}
                  onMouseEnter={() => setExpandedService(key)}
                >
                  <div className={styles.serviceImageWrapper}>
                    <NextImage src={src} alt={label} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <h4>{label}</h4>
                </div>
              ))}

              <div className={`${styles.serviceItem} ${styles.comingSoonWrapper}`}>
                <div className={styles.serviceImageWrapper} style={{ filter: 'grayscale(0.4)' }}>
                  <NextImage src="/images/adult.webp" alt="Adult Care" fill style={{ objectFit: 'cover' }} />
                </div>
                <h4>Adult Care</h4>
                <span className={styles.comingSoonBadge}>Coming Soon</span>
              </div>
            </div>

            <AnimatePresence>
              {expandedService && (
                <motion.div
                  className={styles.expandedDetails}
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className={styles.closeExpanded} onClick={() => setExpandedService(null)}>
                    <X size={20} />
                  </button>
                  <h3 className={styles.expandedTitle}>
                    {serviceDetails[expandedService].title} Includes:
                  </h3>
                  <div className={styles.expandedTags}>
                    {serviceDetails[expandedService].items.map((item, idx) => (
                      <div key={idx} className={styles.expandedTagItem}>
                        <CheckCircle2 size={16} className={styles.tagIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <div className={styles.statItem}>
              <Users className={styles.statIcon} />
              <div>
                <strong>100%</strong>
                <span>Vetted Team</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <CheckSquare className={styles.statIcon} />
              <div>
                <strong>Expert</strong>
                <span>Trained Staff</span>
              </div>
            </div>
          </motion.div>

          {/* App store buttons */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <a
              href="https://apps.apple.com/in/app/famcare/id6761720384"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.playStoreLink}
            >
              <NextImage
                src="/appstore.png"
                alt="Download on the App Store"
                width={400}
                height={122}
                className={styles.appStoreImg}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.famcare.praja&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.playStoreLink}
            >
              <NextImage
                src="/googleplay.webp"
                alt="Get it on Google Play"
                width={400}
                height={122}
                className={styles.playStoreImg}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Phones ── */}
        <motion.div
          className={styles.heroRight}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
        >
          <div className={styles.phonesRow}>
            <div className={`${styles.phoneFrame} ${styles.phoneFrameSide}`}>
              <div className={styles.phoneDynamicIsland} />
              <div className={styles.phoneScreen}>
                <NextImage src="/wdkndkd.png" alt="FamCare App Home" width={270} height={585} className={styles.phoneScreenImg} />
              </div>
            </div>
            <div className={`${styles.phoneFrame} ${styles.phoneFrameCenter}`}>
              <div className={styles.phoneDynamicIsland} />
              <div className={styles.phoneScreen}>
                <NextImage src="/Screenshot_20260512-155001_FamCare.png" alt="FamCare App Services" width={270} height={585} className={styles.phoneScreenImg} />
              </div>
            </div>
            <div className={`${styles.phoneFrame} ${styles.phoneFrameSide}`}>
              <div className={styles.phoneDynamicIsland} />
              <div className={styles.phoneScreen}>
                <NextImage src="/Screenshot_20260512-155009_FamCare.png" alt="FamCare App Booking" width={270} height={585} className={styles.phoneScreenImg} />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
