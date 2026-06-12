'use client';

import { motion } from 'framer-motion';
import styles from './Services.module.css';

const stages = [
  {
    icon: '🍼',
    title: 'Newborn care',
    desc: 'Feeding support, soothing, nap routines, and hygiene for 0–3 months',
    tag: 'On-demand',
    featured: false,
  },
  {
    icon: '🏠',
    title: 'Infant day care',
    desc: 'Safe at-home supervision, bottle prep, and active caregiving for 3–12 months',
    tag: 'Most booked',
    featured: true,
  },
  {
    icon: '🎨',
    title: 'Toddler companion',
    desc: 'Play-based engagement, meals, and routine monitoring for 1–3 years',
    tag: 'On-demand',
    featured: false,
  },
  {
    icon: '🎒',
    title: 'After-school babysitting',
    desc: 'Drop-off support, snack time, and supervised homework for 4–10 years',
    tag: 'Scheduled',
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">Care for every stage</div>
          <h2 className="h2">
            From newborn to school-going —<br />
            we have the right caregiver.
          </h2>
          <p className={styles.subhead}>
            Choose by your child's age and stage. Every caregiver is matched to
            the specific needs of that age group.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${stage.featured ? styles.featuredCard : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.icon}>{stage.icon}</div>
              <h3 className={styles.cardTitle}>{stage.title}</h3>
              <p className={styles.cardDesc}>{stage.desc}</p>
              <span className={`${styles.tag} ${stage.featured ? styles.tagFeatured : ''}`}>
                {stage.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
