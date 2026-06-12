'use client';

import { motion } from 'framer-motion';
import styles from './ForEveryOccasion.module.css';

const occasions = [
  {
    icon: '⚡',
    title: 'Emergency care',
    desc: 'Caregiver at your door in ~10 minutes. No advance booking needed.',
    badge: 'On-demand',
    badgeType: 'on',
  },
  {
    icon: '🤱',
    title: 'Post-delivery support',
    desc: 'New mother recovery care and newborn support in the first 40 days.',
    badge: 'Scheduled',
    badgeType: 'sch',
  },
  {
    icon: '✈️',
    title: 'Travel care',
    desc: 'Trusted care while you travel — hourly or multi-day, fully covered.',
    badge: 'Scheduled',
    badgeType: 'sch',
  },
  {
    icon: '💑',
    title: 'Date night / outing',
    desc: 'Step out without worry. Evening care, booked in 2 minutes.',
    badge: 'On-demand',
    badgeType: 'on',
  },
  {
    icon: '🤒',
    title: 'Sick child support',
    desc: "Can't take leave? Trained caregiver when your child is unwell.",
    badge: 'On-demand',
    badgeType: 'on',
  },
  {
    icon: '💻',
    title: 'Work from home',
    desc: 'A caregiver alongside you at home so you can actually focus.',
    badge: 'Scheduled',
    badgeType: 'sch',
  },
];

export default function ForEveryOccasion() {
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
          <div className="eyebrow">For every situation</div>
          <h2 className="h2">
            Whatever comes up,<br />
            we&apos;re ready.
          </h2>
          <p className={styles.subhead}>
            Life doesn&apos;t give notice. Neither should finding a caregiver.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {occasions.map((o, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className={styles.iconWrap}>{o.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{o.title}</h3>
                <p className={styles.cardDesc}>{o.desc}</p>
                <span className={`${styles.badge} ${o.badgeType === 'on' ? styles.badgeOn : styles.badgeSch}`}>
                  {o.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
