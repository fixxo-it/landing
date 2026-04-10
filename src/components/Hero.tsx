'use client';

import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, HeartPulse, CheckSquare, Baby, Smile, UserRound, Dog } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
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
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ShieldCheck size={18} />
            <span>Pioneering Quality, Safety & Trust</span>
          </motion.div>
          
          <motion.h1 
            className="h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Baby, Child, Elder and <br />
            Pet Care in <span className="text-gradient">Minutes</span>
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Experience the most modern caregiver app designed for your family's safety and speed. 
            We bring you directly hired & matched professionals to your doorstep in just minutes.
          </motion.p>
          
          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button className="btn btn-primary">
              Book a Caregiver
            </button>
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
          
          <motion.div 
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
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
        </motion.div>
        
        <div className={styles.visual}>
          <motion.div 
            className={styles.offeringsContainer}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className={styles.offeringsTitle}>Our Care Offerings</h3>
            <div className={styles.offeringsGrid}>
              <div className={styles.offeringCard}>
                <div className={styles.offeringIcon}>
                  <Baby size={32} />
                </div>
                <div className={styles.offeringText}>
                  <h4>Baby Care</h4>
                  <p>Expert care for your littlest ones, from newborns to infants.</p>
                </div>
              </div>
              
              <div className={styles.offeringCard}>
                <div className={styles.offeringIcon}>
                  <Smile size={32} />
                </div>
                <div className={styles.offeringText}>
                  <h4>Child Care</h4>
                  <p>Engaging and safe care for toddlers and growing children.</p>
                </div>
              </div>
              
              <div className={styles.offeringCard}>
                <div className={styles.offeringIcon}>
                  <UserRound size={32} />
                </div>
                <div className={styles.offeringText}>
                  <h4>Elderly Care</h4>
                  <p>Compassionate support and assistance for your senior family members.</p>
                </div>
              </div>

              <div className={styles.offeringCard}>
                <div className={styles.offeringIcon}>
                  <Dog size={32} />
                </div>
                <div className={styles.offeringText}>
                  <h4>Pet Care</h4>
                  <p>Professional care, walking, and attention for your furry friends.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
