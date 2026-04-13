'use client';

import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Video, ShieldAlert } from 'lucide-react';
import styles from './Pillars.module.css';

const milestones = [
  {
    title: 'Dedicated Field Safety Auditing',
    icon: ShieldAlert,
    color: '#14B8A6',
    items: [
      { subtitle: 'Dedicated Mystery Auditor', desc: 'Every 15-20 caregivers receive unannounced checks.' },
      { subtitle: 'Ensures Consistent Standards', desc: 'Maintains unparalleled service quality.' },
      { subtitle: 'Market-first Differentiator', desc: 'Setting the highest bar in the industry.' },
    ]
  },
  {
    title: 'Accountability & Verification',
    icon: ShieldCheck,
    color: '#E11D48',
    items: [
      { subtitle: 'In-Session Audio Monitoring', desc: 'Mics automatically activated for recorded duration.' },
      { subtitle: 'Aadhaar-Based ID Verification', desc: 'Mandatory for all households, enhancing baseline safety.' },
    ]
  },
  {
    title: 'Personalization & Check-ins',
    icon: Video,
    color: '#D97706',
    items: [
      { subtitle: 'Caregiver Continuity Option', desc: 'Request the same caregiver for repeat bookings.' },
      { subtitle: 'In-App Video Calling', desc: 'Anytime check-ins. Auto-picks up in 3 rings for office parents.' },
    ]
  },
  {
    title: 'Expert Training & Compliance',
    icon: Sparkles,
    color: '#059669',
    items: [
      { subtitle: 'Comprehensive Certification', desc: 'Prerequisite expert-led modules before deployment.' },
      { subtitle: 'Ongoing Refresher Programs', desc: 'Soft skills, grooming, and professional conduct.' },
      { subtitle: 'HR Professionals on Staff', desc: 'Expert support for compliance and labor standards.' },
    ]
  }
];

export default function Pillars() {
  return (
    <section id="pillars" className={`section ${styles.pillarsSection}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="h2">The Safety <span className="text-gradient">Journey</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Follow the meticulous, step-by-step framework we navigate to ensure unparalleled caregiving quality and child safety.
          </p>
        </motion.div>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine}></div>
          
          <div className={styles.timelineNodes}>
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div 
                  key={idx}
                  className={`${styles.milestoneRow} ${isEven ? styles.milestoneEven : styles.milestoneOdd}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  
                  {/* Left Column (Empty for Odds, Content for Evens) */}
                  <div className={styles.layoutColumn}>
                    {isEven && (
                      <div className={`${styles.milestoneCard} ${styles.alignRight}`}>
                        <h3 className={styles.cardTitle} style={{ color: milestone.color }}>
                          {milestone.title}
                        </h3>
                        <div className={styles.cardContent}>
                          {milestone.items.map((item, i) => (
                            <div key={i} className={styles.cardItem}>
                              <div className={styles.bullet} style={{ backgroundColor: milestone.color }} />
                              <div>
                                <strong>{item.subtitle}</strong>
                                <p>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className={styles.centerNodeWrapper}>
                    <motion.div 
                      className={styles.nodeCircle}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                      style={{ border: `3px solid ${milestone.color}` }}
                    >
                      <milestone.icon size={20} color={milestone.color} />
                    </motion.div>
                  </div>

                  {/* Right Column (Content for Odds, Empty for Evens) */}
                  <div className={styles.layoutColumn}>
                    {!isEven && (
                      <div className={`${styles.milestoneCard} ${styles.alignLeft}`}>
                        <h3 className={styles.cardTitle} style={{ color: milestone.color }}>
                          {milestone.title}
                        </h3>
                        <div className={styles.cardContent}>
                          {milestone.items.map((item, i) => (
                            <div key={i} className={styles.cardItem}>
                              <div className={styles.bullet} style={{ backgroundColor: milestone.color }} />
                              <div>
                                <strong>{item.subtitle}</strong>
                                <p>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
