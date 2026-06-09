'use client';

import { motion } from 'framer-motion';
import { Smartphone, UserCheck, MapPin } from 'lucide-react';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    number: '01',
    Icon: Smartphone,
    title: 'Book in Seconds',
    desc: 'Open the app, pick instant or scheduled care, and confirm in under 60 seconds. No calls, no waiting.',
    color: '#14B8A6',
    bg: 'rgba(20, 184, 166, 0.1)',
  },
  {
    number: '02',
    Icon: UserCheck,
    title: 'Get Matched',
    desc: 'We find the nearest background-verified professional who fits your exact needs and send a real-time confirmation.',
    color: '#0F766E',
    bg: 'rgba(15, 118, 110, 0.1)',
  },
  {
    number: '03',
    Icon: MapPin,
    title: 'Care Arrives',
    desc: 'Your verified caregiver arrives at your door. Track live in-app and check in anytime via video call.',
    color: '#0369A1',
    bg: 'rgba(3, 105, 161, 0.1)',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Simple Process</span>
          <h2 className="h2">
            Care in <span className="text-gradient">3 Steps</span>
          </h2>
          <p className={styles.subhead}>
            From booking to your door — faster than ordering food.
          </p>
        </motion.div>

        <div className={styles.stepsRow}>
          {STEPS.map((step, i) => (
            <div key={step.number} className={styles.stepWrapper}>
              <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <span className={styles.bigNumber}>{step.number}</span>
                <div className={styles.iconCircle} style={{ background: step.bg, color: step.color }}>
                  <step.Icon size={26} />
                </div>
                <h3 className={styles.title} style={{ color: step.color }}>{step.title}</h3>
                <p className={styles.desc}>{step.desc}</p>
              </motion.div>

              {i < STEPS.length - 1 && (
                <motion.div
                  className={styles.connector}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + 0.35, duration: 0.4 }}
                >
                  <svg viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6 H34 M28 1 L34 6 L28 11" stroke="rgba(20,184,166,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
