'use client';

import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="fam.care" height={36} />
          <span className={styles.logoText}>fam.care</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#pillars">Quality</a>
          <a href="#services">Services</a>
          <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '1rem' }}>
            Book Care
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
