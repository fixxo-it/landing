'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import styles from './Pillars.module.css';

const pillars = [
  {
    title: 'Dedicated Field Safety Auditing',
    color: '#14B8A6',
    items: [
      { title: 'Dedicated Mystery Auditor', desc: 'Every 15-20 caregivers receive unannounced checks.' },
      { title: 'Ensures Consistent Standards', desc: 'Maintains unparalleled service quality.' },
      { title: 'Market-first Differentiator', desc: 'Setting the highest bar in the industry.' },
    ]
  },
  {
    title: 'Accountability & Verification',
    color: '#E11D48',
    items: [
      { title: 'In-Session Audio Monitoring', desc: 'Mics automatically activated for recorded duration.' },
      { title: 'Aadhaar-Based ID Verification', desc: 'Mandatory for all households, enhancing baseline safety.' },
    ]
  },
  {
    title: 'Personalization & Check-ins',
    color: '#D97706',
    items: [
      { title: 'Caregiver Continuity Option', desc: 'Request the same caregiver for repeat bookings.' },
      { title: 'In-App Video Calling', desc: 'Anytime check-ins. Auto-picks up in 3 rings for office parents.' },
    ]
  },
  {
    title: 'Expert Training & Compliance',
    color: '#059669',
    items: [
      { title: 'Comprehensive Certification', desc: 'Prerequisite expert-led modules before deployment.' },
      { title: 'Ongoing Refresher Programs', desc: 'Soft skills, grooming, and professional conduct.' },
      { title: 'HR Professionals on Staff', desc: 'Expert support for compliance and labor standards.' },
    ]
  }
];

export default function Pillars() {
  return (
    <section id="pillars" className={`section ${styles.pillarsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="h2">Pioneering <span className="text-gradient">Quality, Safety & Trust</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            We've set up four fundamental pillars to ensure that every caregiving session meets exceptional standards.
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx} 
              className={styles.pillarCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div className={styles.pillarTitle} style={{ background: pillar.color }}>
                {pillar.title}
              </div>
              <ul className={styles.pillarList}>
                {pillar.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={styles.pillarItem}>
                    <CheckCircle2 size={20} className={styles.bullet} style={{ color: pillar.color }} />
                    <div className={styles.pillarItemText}>
                      <span className={styles.pillarItemTitle}>{item.title}</span>
                      <span className={styles.pillarItemDesc}>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
