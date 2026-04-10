'use client';

import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <NextImage 
            src="/logo.png" 
            alt="FamCare" 
            width={120} 
            height={40} 
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <Link href="/#features">Features</Link>
          <Link href="/#pillars">Quality</Link>
          <Link href="/#services">Services</Link>
          <Link href="/support">Support</Link>
          <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '1rem' }}>
            Book Care
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Link href="/#features" onClick={() => setIsOpen(false)}>Features</Link>
              <Link href="/#pillars" onClick={() => setIsOpen(false)}>Quality</Link>
              <Link href="/#services" onClick={() => setIsOpen(false)}>Services</Link>
              <Link href="/support" onClick={() => setIsOpen(false)}>Support</Link>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                Book Care
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
