'use client';

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import styles from './Testimonials.module.css';

// ── Actual user feedback (verified app store reviews) ────────────────────────
const ACTUAL_TESTIMONIALS = [
  {
    name: 'Siwani Dubey',
    location: 'Verified App Review · Jun 2026',
    text: '"Excellent childcare app! Very easy to use and helps me quickly find reliable babysitters and childcare support when needed. The booking process is smooth and I feel safe choosing caregivers through the platform. Customer support is also responsive and helpful. Highly recommended!"',
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
    text: '"Initially I had my inhibitions, but due to an office call with a small baby to care for, I decided to give FamCare a try. I was simply amazed - my 2.5 year daughter mingled so well with the caretaker in no time. She fed her, cleaned her, and they played all through the booking. My baby calls them \'Green Wali didi\' now. FamCare has become my go-to app!"',
    initials: 'PB',
    color: '#15803D',
    stars: 5,
    type: 'Baby Care',
    typeBg: '#DCFCE7',
    typeFg: '#14532D',
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
