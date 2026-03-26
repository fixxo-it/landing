'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>fam.care</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/#features">Features</Link>
          <Link href="/#pillars">Quality</Link>
          <Link href="/#services">Services</Link>
          <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '1rem' }}>
            Book Care
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
