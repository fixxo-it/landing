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
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <NextImage 
            src="/logo.png" 
            alt="FamCare" 
            width={320} 
            height={128} 
            priority
            style={{ objectFit: 'contain', objectPosition: 'left' }}
          />
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <Link href="/#features">Features</Link>
          <Link href="/#pillars">Quality</Link>
          <Link href="/support">Support</Link>
          <a
            href="https://apps.apple.com/in/app/famcare/id6761720384"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.getAppBtn}
          >
            Get App ↗
          </a>
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
              <Link href="/support" onClick={() => setIsOpen(false)}>Support</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
