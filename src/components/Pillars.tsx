'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Video, ShieldAlert } from 'lucide-react';
import styles from './Pillars.module.css';

const milestones = [
  {
    title: 'Field Safety Auditing',
    icon: ShieldAlert,
    color: '#14B8A6',
    items: [
      { subtitle: 'Dedicated Mystery Auditor', desc: 'Every 15-20 caregivers receive unannounced checks.' },
      { subtitle: 'Ensures Consistent Standards', desc: 'Maintains unparalleled service quality.' },
      { subtitle: 'Market-first Differentiator', desc: 'Setting the highest bar in the industry.' },
    ]
  },
  {
    title: 'Accountability & Verify',
    icon: ShieldCheck,
    color: '#E11D48',
    items: [
      { subtitle: 'In-Session Audio Monitoring', desc: 'Mics automatically activated for recorded duration.' },
      { subtitle: 'Aadhaar-Based ID Verification', desc: 'Mandatory for all households, enhancing baseline safety.' },
    ]
  },
  {
    title: 'Personalization',
    icon: Video,
    color: '#D97706',
    items: [
      { subtitle: 'Caregiver Continuity Option', desc: 'Request the same caregiver for repeat bookings.' },
      { subtitle: 'In-App Video Calling', desc: 'Anytime check-ins. Auto-picks up in 3 rings for office parents.' },
    ]
  },
  {
    title: 'Expert Training',
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
          <h2 className="h2" style={{ marginBottom: '0' }}>Safety And <span className="text-gradient">Journey with Trust</span></h2>
        </motion.div>

        <div className={styles.interactiveWrapper} onMouseLeave={() => setExpandedIndex(null)}>
          <div className={styles.pillarsGrid}>
            {milestones.map((milestone, idx) => (
              <motion.div 
                key={idx}
                className={`${styles.pillarIconCard} ${expandedIndex === idx ? styles.activeCard : ''}`}
                onMouseEnter={() => setExpandedIndex(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div 
                  className={styles.iconCircle}
                  style={{ 
                    color: milestone.color, 
                    borderColor: expandedIndex === idx ? milestone.color : 'rgba(0,0,0,0.05)',
                    backgroundColor: expandedIndex === idx ? `${milestone.color}15` : 'white'
                  }}
                >
                  <milestone.icon size={32} />
                </div>
                <h4>{milestone.title}</h4>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {expandedIndex !== null && (
              <motion.div 
                className={styles.expandedPanel}
                initial={{ opacity: 0, height: 0, translateY: -20 }}
                animate={{ opacity: 1, height: 'auto', translateY: 0 }}
                exit={{ opacity: 0, height: 0, translateY: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ borderColor: milestones[expandedIndex].color }}
              >

                
                <div className={styles.panelHeader}>
                  <div className={styles.panelIcon} style={{ background: milestones[expandedIndex].color }}>
                    {(() => {
                      const Icon = milestones[expandedIndex].icon;
                      return <Icon size={24} color="white" />;
                    })()}
                  </div>
                  <h3 style={{ color: milestones[expandedIndex].color }}>
                    {milestones[expandedIndex].title} Details
                  </h3>
                </div>

                <div className={styles.panelGrid}>
                  {milestones[expandedIndex].items.map((item, i) => (
                    <div key={i} className={styles.panelItem} style={{ borderLeftColor: milestones[expandedIndex].color }}>
                      <strong>{item.subtitle}</strong>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
