'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { fadeUp, revealContainer, staggerItem, viewportOnce } from '@/lib/motion';
import styles from './Services.module.css';

const stages = [
  {
    icon: '🍼',
    title: 'Newborn care',
    desc: 'Feeding support, soothing, and nap routines',
    tag: 'On-demand',
    featured: false,
    image: '/images/babycare.png',
    comingSoon: false,
  },
  {
    icon: '🏠',
    title: 'Infant day care',
    desc: 'Safe at-home supervision, bottle prep, and active caregiving for 3–12 months',
    tag: 'Most booked',
    featured: true,
    image: '/images/babycare2.png',
    comingSoon: false,
  },
  {
    icon: '🎨',
    title: 'Toddler companion',
    desc: 'Play-based engagement, meals, and routine monitoring for 1–3 years',
    tag: 'On-demand',
    featured: false,
    image: '/images/childcare1.png',
    comingSoon: false,
  },
  {
    icon: '🎒',
    title: 'After-school babysitting',
    desc: 'Drop-off support, snack time, and supervised homework for 4–10 years',
    tag: 'Scheduled',
    featured: false,
    image: '/images/childcare2.png',
    comingSoon: false,
  },
  {
    icon: '👴',
    title: 'Elderly care',
    desc: 'Compassionate at-home support, mobility assistance, and daily routine help for seniors',
    tag: 'Coming soon',
    featured: false,
    image: '/images/elderly.webp',
    comingSoon: true,
  },
];

export default function Services() {
  return (
    <section id="services" className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="eyebrow">Care for every stage</div>
          <h2 className="h2">
            From newborn to school-going —<br />
            we have the right caregiver.
          </h2>
          <p className={styles.subhead}>
            Every caregiver is matched to the specific needs of your child's age group.
          </p>
        </motion.div>

        <motion.div className={styles.grid} {...revealContainer(0.08)}>
          {stages.map((s, i) => (
            <motion.div
              key={i}
              className={`${styles.card}${s.featured ? ` ${styles.featuredCard}` : ''}${s.comingSoon ? ` ${styles.comingSoonCard}` : ''}`}
              variants={staggerItem}
              whileHover={{ scale: 1 }}
            >
              <div className={styles.imageWrap}>
                <NextImage
                  src={s.image}
                  alt={s.title}
                  width={240}
                  height={240}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
                {s.featured && (
                  <span className={styles.featuredLabel}>Most booked</span>
                )}
                {s.comingSoon && (
                  <div className={styles.csOverlay}>
                    <span className={styles.csBadge}>Coming Soon</span>
                  </div>
                )}
              </div>
              <div className={styles.body}>
                <div className={styles.icon}>{s.icon}</div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
