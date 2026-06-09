'use client';

import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Anjali Sharma',
    location: 'Bengaluru',
    text: 'The peace of mind FamCare provides is unmatched. Our nanny is professional, punctual, and truly cares for our toddler as her own.',
    initials: 'AS',
    color: '#14B8A6',
    stars: 5,
  },
  {
    name: 'Rajesh Iyer',
    location: 'Bengaluru',
    text: 'Finding a reliable caregiver used to be a nightmare of calls and vetting. With FamCare, we were matched with a professional in minutes.',
    initials: 'RI',
    color: '#0F766E',
    stars: 5,
  },
  {
    name: 'Dr. Sunita Verma',
    location: 'Bengaluru',
    text: 'Transparent, safe, and professional. The exhaustive background checks and field auditing give us the extra layer of trust we need.',
    initials: 'SV',
    color: '#0369A1',
    stars: 5,
  },
  {
    name: 'Vikram & Neha',
    location: 'Bengaluru',
    text: 'Best decision for our newborn. The matched professional was highly trained and made our transition to parenthood so much easier.',
    initials: 'VN',
    color: '#7C3AED',
    stars: 5,
  },
  {
    name: 'Priya Menon',
    location: 'Bengaluru',
    text: 'The dog walker FamCare assigned is fantastic. Real-time updates and a caregiver who genuinely loves animals — couldn\'t ask for more.',
    initials: 'PM',
    color: '#B45309',
    stars: 5,
  },
  {
    name: 'Arun Nair',
    location: 'Bengaluru',
    text: 'My elderly mother needed help after her surgery. The companion FamCare sent was trained, patient, and became part of our family.',
    initials: 'AN',
    color: '#0891B2',
    stars: 5,
  },
];

const DOUBLED = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.bgCircle1} />
      <div className={styles.bgCircle2} />

      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Real Stories</span>
          <h2 className="h2">Trusted by Indian Families</h2>
          <p className={styles.subhead}>
            Real experiences from parents who found the perfect care with FamCare.
          </p>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
