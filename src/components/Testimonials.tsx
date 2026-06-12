'use client';

import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Ananya R.',
    location: 'Product Manager · Indiranagar',
    text: '"My newborn was 3 weeks old and I had a work call I couldn\'t miss. A FamCare nanny was at my door in 11 minutes. She was calm, experienced, and my baby loved her."',
    initials: 'AR',
    color: '#2A5240',
    stars: 5,
    type: 'Newborn care',
    typeBg: '#FFF3E0',
    typeFg: '#BF360C',
  },
  {
    name: 'Vikram & Pooja S.',
    location: 'Founders · HSR Layout',
    text: '"We\'ve been using the monthly pass for 4 months. Same nanny every time, she knows our daughter\'s routine better than anyone. It\'s like having a family member."',
    initials: 'VP',
    color: '#0F766E',
    stars: 5,
    type: 'Infant day care',
    typeBg: '#EDE7F6',
    typeFg: '#4527A0',
  },
  {
    name: 'Meera T.',
    location: 'Architect · Koramangala',
    text: '"My 2-year-old is impossible with strangers. The FamCare toddler companion they sent had him laughing in 10 minutes. I cried — happy tears. Finally some time to breathe."',
    initials: 'MT',
    color: '#B45309',
    stars: 5,
    type: 'Toddler companion',
    typeBg: '#E8F5E9',
    typeFg: '#1B5E20',
  },
  {
    name: 'Rohit & Deepa N.',
    location: 'Engineers · Whitefield',
    text: '"After-school care sorted! The caregiver picks up our 6-year-old, handles snacks and homework — by the time we\'re home everything is done. Absolute lifesaver."',
    initials: 'RN',
    color: '#0369A1',
    stars: 5,
    type: 'After-school care',
    typeBg: '#E3F2FD',
    typeFg: '#0D47A1',
  },
  {
    name: 'Kavitha M.',
    location: 'Doctor · Jayanagar',
    text: '"I had a night shift and needed overnight care for my 4-month-old. FamCare\'s night care caregiver was incredible — professional, gentle, and I could actually sleep knowing he was safe."',
    initials: 'KM',
    color: '#6D28D9',
    stars: 5,
    type: 'Night care',
    typeBg: '#F5E6C8',
    typeFg: '#B8832A',
  },
  {
    name: 'Priya & Arjun K.',
    location: 'Startup Founders · Koramangala',
    text: '"Emergency booking at 7am on a Monday. Caregiver arrived in 9 minutes. Verified, warm, and our baby warmed up to her almost instantly. This service is magic."',
    initials: 'PK',
    color: '#059669',
    stars: 5,
    type: 'Emergency care',
    typeBg: '#E8F5E9',
    typeFg: '#1B5E20',
  },
];

const DOUBLED = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">Real Bangalore families</div>
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
