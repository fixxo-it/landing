'use client';

import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: "Anjali Sharma",
    location: "Bangalore",
    text: "The peace of mind FamCare provides is unmatched. Our nanny is professional, punctual, and truly cares for our toddler as her own.",
    initials: "AS"
  },
  {
    name: "Rajesh Iyer",
    location: "Bangalore",
    text: "Finding a reliable caregiver used to be a nightmare of calls and vetting. With FamCare, we were matched with a professional in minutes.",
    initials: "RI"
  },
  {
    name: "Dr. Sunita Verma",
    location: "Bangalore",
    text: "Transparent, safe, and professional. The exhaustive background checks and field auditing give us the extra layer of trust we need.",
    initials: "SV"
  },
  {
    name: "Vikram & Neha",
    location: "Bangalore",
    text: "Best decision for our newborn. The matched professional was highly trained and made our transition to parenthood so much easier.",
    initials: "VN"
  }
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.bgElements}>
        <div className={`${styles.circle} ${styles.circle1}`} />
        <div className={`${styles.circle} ${styles.circle2}`} />
      </div>
      
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="h2">Trusted by Indian Parents</h2>
          <p>Real experiences from families who found the perfect care with FamCare's standardized platform.</p>
        </motion.div>
        
        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <motion.div 
              key={index} 
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <p className={styles.quote}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initials}</div>
                <div className={styles.info}>
                  <h4>{t.name}</h4>
                  <p>{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
