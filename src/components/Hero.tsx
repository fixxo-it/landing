'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckSquare, X, CheckCircle2 } from 'lucide-react';
import styles from './Hero.module.css';
import Pillars from './Pillars';

const serviceDetails: Record<string, { title: string; items: string[] }> = {
  child: {
    title: 'Child Care',
    items: ['After School Babysitting', 'Tutoring & Homework', 'Creative Activities', 'Outdoor Play']
  },
  elderly: {
    title: 'Elderly Care',
    items: ['Elderly companion', 'Medication Reminders', 'Mobility Assistance']
  },
  pet: {
    title: 'Pet Care',
    items: ['Dog Walker', 'Pet Sitting']
  }
};

export default function Hero() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (key: string) => {
    if (expandedService === key) {
      setExpandedService(null);
    } else {
      setExpandedService(key);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.bgElements}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
      </div>
      
      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ marginBottom: '40px' }}
          >
            <span className="text-gradient">Trusted Care</span> in Minutes
          </motion.h1>

          <motion.div 
            className={styles.servicesWrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            onMouseLeave={() => setExpandedService(null)}
          >
            <div className={styles.servicesGrid}>
              

              <div 
                className={`${styles.serviceItem} ${expandedService === 'child' ? styles.activeService : ''}`}
                onMouseEnter={() => setExpandedService('child')}
              >
                <div className={styles.serviceImageWrapper}>
                  <NextImage src="/images/childcare.png" alt="Child Care" layout="fill" objectFit="cover" />
                </div>
                <h4>Child Care</h4>
              </div>
              
              <div 
                className={`${styles.serviceItem} ${expandedService === 'elderly' ? styles.activeService : ''}`}
                onMouseEnter={() => setExpandedService('elderly')}
              >
                <div className={styles.serviceImageWrapper}>
                  <NextImage src="/images/elderly.png" alt="Elderly Care" layout="fill" objectFit="cover" />
                </div>
                <h4>Elderly Care</h4>
              </div>

              <div 
                className={`${styles.serviceItem} ${expandedService === 'pet' ? styles.activeService : ''}`}
                onMouseEnter={() => setExpandedService('pet')}
              >
                <div className={styles.serviceImageWrapper}>
                  <NextImage src="/images/petcare.png" alt="Pet Care" layout="fill" objectFit="cover" />
                </div>
                <h4>Pet Care</h4>
              </div>
            </div>

            <AnimatePresence>
              {expandedService && (
                <motion.div 
                  className={styles.expandedDetails}
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className={styles.closeExpanded} onClick={() => setExpandedService(null)}>
                    <X size={20} />
                  </button>
                  <h3 className={styles.expandedTitle}>{serviceDetails[expandedService].title} Includes:</h3>
                  <div className={styles.expandedTags}>
                    {serviceDetails[expandedService].items.map((item, idx) => (
                      <div key={idx} className={styles.expandedTagItem}>
                        <CheckCircle2 size={16} className={styles.tagIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ marginTop: '32px' }}
          >
            Experience the most modern caregiver app designed for your family's safety and speed. 
            We bring you directly hired & matched professionals to your doorstep in just minutes.
          </motion.p>
          
          <motion.div 
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className={styles.statItem}>
              <Users className={styles.statIcon} />
              <div>
                <strong>100%</strong>
                <span>Vetted Team</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <CheckSquare className={styles.statIcon} />
              <div>
                <strong>Expert</strong>
                <span>Trained Staff</span>
              </div>
            </div>
          </motion.div>

          <Pillars />

          <motion.div
            className={styles.appScreenshotWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
          >
            <NextImage 
              src="/images/mobile.jpeg" 
              alt="FamCare Mobile App" 
              width={800} 
              height={1400}
              className={styles.appScreenshot}
            />
          </motion.div>

          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            style={{ marginTop: '40px', marginBottom: '-40px' }}
          >
            <a
              href="#"
              className={styles.playStoreLink}
              onClick={(e) => e.preventDefault()}
            >
              <NextImage
                src="/appstore.png"
                alt="Download on the App Store"
                width={400}
                height={122}
                className={styles.playStoreImg}
              />
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.famcare.praja&pcampaignid=web_share" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.playStoreLink}
            >
              <NextImage 
                src="/googleplay.webp" 
                alt="Get it on Google Play" 
                width={400} 
                height={122} 
                className={styles.playStoreImg}
              />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
