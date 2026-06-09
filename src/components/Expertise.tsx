'use client';

import { motion } from 'framer-motion';
import { Settings, Check } from 'lucide-react';
import NextImage from 'next/image';
import styles from './Expertise.module.css';

const items = [
  'In-House Trained Caregivers',
  'Directly Hired & Vetted Team',
  'Verified Background Checks',
  'Ensures Quality & Trust',
];

export default function Expertise() {
  return (
    <section className={`section ${styles.expertiseSection}`}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>
            <Settings size={16} />
            Synergy of Human & Tech
          </div>
          <h2 className={styles.h2}>In House Human Expertise</h2>
          
          <ul className={styles.list}>
            {items.map((item, idx) => (
              <motion.li 
                key={idx} 
                className={styles.listItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
              >
                <div className={styles.iconWrapper}>
                  <Check size={18} strokeWidth={3} />
                </div>
                {item}
              </motion.li>
            ))}
          </ul>
          
          <button className="btn btn-primary" style={{ background: 'white', color: 'var(--primary-dark)' }}>
            Meet Our Caregivers
          </button>
        </motion.div>
        
        <motion.div 
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <NextImage 
            src="/images/team.png" 
            alt="FAMCARE TEAM" 
            width={600}
            height={450}
            className={styles.teamImage} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
