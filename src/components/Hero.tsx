'use client';

import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, CheckSquare } from 'lucide-react';
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
            className={styles.heroLogoWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ marginBottom: '24px' }}
          >
            <NextImage 
              src="/logo.png" 
              alt="FamCare Logo" 
              width={0} 
              height={0} 
              sizes="100vw"
              priority
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </motion.div>

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

      </div>
    </section>
  );
}
