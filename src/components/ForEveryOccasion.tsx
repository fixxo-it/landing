'use client';

import { motion } from 'framer-motion';
import { EASE_OUT, fadeUp, revealContainer, staggerItem, viewportOnce } from '@/lib/motion';
import styles from './ForEveryOccasion.module.css';

const occasions = [
  {
    icon: '🤱',
    title: 'Post-delivery support',
    desc: 'New mother recovery care and newborn support in the first 40 days.',
  },
  {
    icon: '✈️',
    title: 'Travel care',
    desc: 'Trusted care while you travel - hourly or multi-day, fully covered.',
  },
  {
    icon: '💑',
    title: 'Date night / outing',
    desc: 'Step out without worry. Evening care, booked in 2 minutes.',
  },
  {
    icon: '🤒',
    title: 'Sick child support',
    desc: "Can't take leave? Trained caregiver when your child is unwell.",
  },
  {
    icon: '💻',
    title: 'Work from home',
    desc: 'A caregiver alongside you at home so you can actually focus.',
  },
];

export default function ForEveryOccasion() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
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

        <motion.div className={styles.grid} {...revealContainer(0.08)}>
          {occasions.map((o, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <div className={styles.iconWrap}>{o.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{o.title}</h3>
                <p className={styles.cardDesc}>{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
