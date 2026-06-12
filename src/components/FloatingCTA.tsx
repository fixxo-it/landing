'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Baby } from 'lucide-react';
import { springSoft } from '@/lib/motion';
import { useStoreUrl } from '@/lib/useStoreUrl';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const storeUrl = useStoreUrl();

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 600);
      else setVisible(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className={styles.bar}
          initial={{ y: 120, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 120, opacity: 0, x: '-50%' }}
          transition={springSoft}
        >
          <div className={styles.inner}>
            <div className={styles.iconWrap}>
              <Baby size={20} />
            </div>
            <div className={styles.textBlock}>
              <strong>Baby care at your door</strong>
              <span>Verified nannies · ~10 min arrival</span>
            </div>

            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookBtn}
            >
              Download Now →
            </a>

            <button
              className={styles.dismiss}
              onClick={() => { setDismissed(true); setVisible(false); }}
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
