'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, HeartPulse, CheckSquare } from 'lucide-react';
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
            Nannies & Babycare in <br />
            <span className="text-gradient">10 Minutes</span>
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Experience the most modern caregiver app designed for your family's safety and speed. 
            We bring you directly hired & matched professionals to your doorstep in just 10 minutes.
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
            <button className="btn btn-outline" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <HeartPulse size={20} />
              Our Standard
            </button>
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
          <div className={styles.illustrationFrame}>
            <motion.div 
              className={styles.blob}
              animate={{ 
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            />
            
            <motion.div 
              className={styles.floatingCard1}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, y: [-10, 10, -10] }}
              transition={{ 
                opacity: { delay: 0.8, duration: 0.5 },
                x: { delay: 0.8, duration: 0.5, type: 'spring' },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 } 
              }}
            >
              <HeartPulse size={24} color="var(--primary)" />
              <span>Standardized Trust</span>
            </motion.div>
            
            <motion.div 
              className={styles.floatingCard2}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, y: [10, -10, 10] }}
              transition={{ 
                opacity: { delay: 1, duration: 0.5 },
                x: { delay: 1, duration: 0.5, type: 'spring' },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 } 
              }}
            >
              <ShieldCheck size={24} color="var(--primary)" />
              <span>Field Auditing</span>
            </motion.div>

            <motion.div 
              className={styles.floatingCard3}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [-5, 15, -5] }}
              transition={{ 
                opacity: { delay: 1.2, duration: 0.5 },
                x: { delay: 1.2, duration: 0.5, type: 'spring' },
                y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 } 
              }}
            >
              <Users size={24} color="var(--primary)" />
              <span>Full-Stack Model</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
