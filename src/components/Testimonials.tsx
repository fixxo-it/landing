'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    name: 'Puja Baranwal',
    location: 'Verified App Review · Jun 2026',
    text: 'Initially I had my inhibitions, but due to some office call and a small baby to take care simultaneously, I decided to give FamCare a try. I was simply amazed by the person who came for baby care. My 2.5-year-old daughter mingled so well with her in no time. The caretaker was very loving — she fed her, cleaned her, and they played well all along the booking. Now I have been consistently using their services. My baby calls them Green Wali didi now. FamCare has become my go-to app for any baby care needs.',
    initials: 'PB',
    color: '#15803D',
    stars: 5,
  },
  {
    name: 'Siwani Dubey',
    location: 'Verified App Review · Jun 2026',
    text: 'Excellent childcare app! Very easy to use and helps me quickly find reliable babysitter and childcare support when needed. The booking process is smooth and I feel safe choosing caregivers through the platform. Customer support is also responsive and helpful. A very convenient and trustworthy service for parents. Highly recommended!',
    initials: 'SD',
    color: '#7C3AED',
    stars: 5,
  },
  {
    name: 'Nikhil',
    location: 'Verified App Review · Jun 2026',
    text: 'Experience was very good. We are very happy to have a caregiver from FamCare. She really took good care of my kids and was very professional as well.',
    initials: 'N',
    color: '#0F766E',
    stars: 5,
  },
  {
    name: 'Aahan Senapati',
    location: 'Verified App Review · Jun 2026',
    text: 'Excellent service, my baby is in love with the caregiver. Very helpful.',
    initials: 'AS',
    color: '#0369A1',
    stars: 5,
  },
  {
    name: 'Gayatri Panda',
    location: 'Verified App Review · Jun 2026',
    text: 'Pleasant experience — we always felt completely at ease knowing our child was in safe and caring hands.',
    initials: 'GP',
    color: '#B45309',
    stars: 5,
  },
  {
    name: 'Siddhartha Mahapatra',
    location: 'Verified App Review · Jun 2026',
    text: 'We highly recommend FamCare for any family looking for a trustworthy babysitter.',
    initials: 'SM',
    color: '#BE185D',
    stars: 5,
  },
  {
    name: 'Neha',
    location: 'Verified App Review · Jun 2026',
    text: 'Great experience, very helpful.',
    initials: 'N',
    color: '#7C3AED',
    stars: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="eyebrow">Real families, real reviews</div>
          <h2 className="h2">
            They trusted FamCare.<br />
            Now they won&apos;t go back.
          </h2>
          <p className={styles.subhead}>All reviews are from verified app store users in Whitefield, Bangalore.</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} className={styles.card} variants={cardVariants}>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.quote}>{t.text}</p>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.location}>{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
