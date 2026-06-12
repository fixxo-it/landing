'use client';

import { motion } from 'framer-motion';
import styles from './PremiumAddons.module.css';

const addons = [
  {
    icon: '🧠',
    title: 'Early learning play',
    desc: 'Structured activities for cognitive and motor development (1–4 yrs)',
  },
  {
    icon: '🥣',
    title: 'Meal prep for baby',
    desc: 'Age-appropriate food prep, purees, and feeding routines',
  },
  {
    icon: '🌙',
    title: 'Sleep training assist',
    desc: 'Caregiver trained in gentle sleep routine methods for infants',
  },
  {
    icon: '🛁',
    title: 'Bath & grooming',
    desc: 'Safe bathing, hair care, and hygiene routines for newborns and infants',
  },
];

export default function PremiumAddons() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">Premium add-ons</div>
          <h2 className="h2">More than just babysitting.</h2>
          <p className={styles.subhead}>
            Upgrade any session with a specialised add-on. These are trained
            skills, not basic supervision.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {addons.map((a, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <div className={styles.icon}>{a.icon}</div>
              <h3 className={styles.cardTitle}>{a.title}</h3>
              <p className={styles.cardDesc}>{a.desc}</p>
              <span className={styles.pill}>Premium add-on</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
