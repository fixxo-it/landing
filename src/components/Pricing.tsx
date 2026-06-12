'use client';

import { motion } from 'framer-motion';
import styles from './Pricing.module.css';

const plans = [
  {
    tag: 'On-demand',
    name: 'Single session',
    price: '₹299',
    per: 'per hour onwards',
    features: [
      'Book in 2 minutes',
      'Caregiver in ~10 min',
      'No commitment needed',
      'All age groups covered',
      'Rate after session',
    ],
    featured: false,
    btnText: 'Book a session',
  },
  {
    tag: 'For families',
    name: 'Family plan',
    price: '₹6,999',
    per: '80 hours / month',
    features: [
      'All monthly pass perks',
      'Dedicated account manager',
      'Multi-child use',
      'Night care included',
      'Free trial session',
    ],
    featured: false,
    btnText: 'Get family plan',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.subhead}>
            Start with one session. Subscribe when you&apos;re ready. No long
            contracts, no agency fees.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {plans.map((p, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${p.featured ? styles.featured : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <span className={`${styles.tag} ${p.featured ? styles.tagFeatured : styles.tagDefault}`}>
                {p.tag}
              </span>
              <div className={`${styles.planName} ${p.featured ? styles.planNameW : ''}`}>{p.name}</div>
              <div className={`${styles.price} ${p.featured ? styles.priceW : ''}`}>{p.price}</div>
              <div className={`${styles.per} ${p.featured ? styles.perW : ''}`}>{p.per}</div>

              <ul className={`${styles.list} ${p.featured ? styles.listW : ''}`}>
                {p.features.map((f, j) => (
                  <li key={j}>
                    <span className={styles.check}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://apps.apple.com/in/app/famcare/id6761720384"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${p.featured ? styles.btnW : ''}`}
              >
                {p.btnText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
