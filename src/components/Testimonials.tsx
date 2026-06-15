'use client';

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import styles from './Testimonials.module.css';

// ── Actual user feedback (verified app store reviews) ────────────────────────
const ACTUAL_TESTIMONIALS = [
  {
    name: 'Siwani Dubey',
    location: 'Verified App Review · Jun 2026',
    text: '"Excellent childcare app! Very easy to use and helps me quickly find reliable babysitter and childcare support when needed. The booking process is smooth and I feel safe choosing caregivers through the platform. Customer support is also responsive and helpful. Overall, a very convenient and trustworthy service for parents. Highly recommended!"',
    initials: 'SD',
    color: '#7C3AED',
    stars: 5,
    type: 'Baby Care',
    typeBg: '#EDE7F6',
    typeFg: '#5B21B6',
  },
  {
    name: 'Puja Baranwal',
    location: 'Verified App Review · Jun 2026',
    text: '"Initially I had my inhibitions, but due to some office call and a small baby to take care simultaneously, I decided to give famcare a try. I was simply amazed by the person who came for baby care. My 2.5 year daughter mingled so well with her in like no time. The care taker was very loving to my child, she fed her, cleaned her and they played well all along the booking time. Now I have been consistently using their services and all of their caretakers are amazingly good. My baby calls them Green Wali didi now. Famcare has become my go to app for any baby care needs now and I highly recommend their service. The app is also easy to use and very user friendly."',
    initials: 'PB',
    color: '#15803D',
    stars: 5,
    type: 'Baby Care',
    typeBg: '#DCFCE7',
    typeFg: '#14532D',
  },
  {
    name: 'Gayatri Panda',
    location: 'Verified App Review · Jun 2026',
    text: '"Pleasant experience we always felt completely at ease knowing our child was in safe and caring hands."',
    initials: 'GP',
    color: '#0369A1',
    stars: 5,
    type: 'Baby Care',
    typeBg: '#E0F2FE',
    typeFg: '#075985',
  },
  {
    name: 'Siddhartha Mahapatra',
    location: 'Verified App Review · Jun 2026',
    text: '"We highly recommend for any family looking for a trustworthy babysitter."',
    initials: 'SM',
    color: '#B45309',
    stars: 5,
    type: 'Baby Care',
    typeBg: '#FEF3C7',
    typeFg: '#92400E',
  },
  {
    name: 'Neha',
    location: 'Verified App Review · Jun 2026',
    text: '"Great experience very helpful."',
    initials: 'N',
    color: '#BE185D',
    stars: 5,
    type: 'Baby Care',
    typeBg: '#FCE7F3',
    typeFg: '#9D174D',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const DOUBLED = [...ACTUAL_TESTIMONIALS, ...ACTUAL_TESTIMONIALS];

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
          <div className="eyebrow">Real Whitefield, Bangalore families</div>
          <h2 className="h2">
            They trusted FamCare.<br />
            Now they won&apos;t go back.
          </h2>
        </motion.div>
      </div>

      <div className={styles.marqueeOuter}>
        <div className={styles.marqueeTrack}>
          {DOUBLED.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.quote}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: `${t.color}22`, color: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <h4 className={styles.name}>{t.name}</h4>
                  <p className={styles.location}>{t.location}</p>
                  <span
                    className={styles.type}
                    style={{ background: t.typeBg, color: t.typeFg }}
                  >
                    {t.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
