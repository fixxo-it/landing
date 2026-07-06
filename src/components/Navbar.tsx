'use client';

import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useStoreUrl } from '@/lib/useStoreUrl';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const storeUrl = useStoreUrl();

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <NextImage src="/logo-1.png" alt="FamCare" width={280} height={112} priority style={{ objectFit: 'contain', objectPosition: 'left' }} />
        </Link>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          <Link href="/#services">Services</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#about">About us</Link>
          <Link href="/safe-360">Safe360™</Link>
          <a href={storeUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
            Download Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button className={styles.mobileToggle} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <Link href="/#services" onClick={() => setOpen(false)}>Services</Link>
              <Link href="/#how" onClick={() => setOpen(false)}>How it works</Link>
              <Link href="/#about" onClick={() => setOpen(false)}>About us</Link>
              <Link href="/safe-360" onClick={() => setOpen(false)}>Safe360™</Link>
              <a href={storeUrl} target="_blank" rel="noopener noreferrer" className={styles.mobileDownload} onClick={() => setOpen(false)}>
                Download Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
