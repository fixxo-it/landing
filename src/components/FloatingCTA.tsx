'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { X } from 'lucide-react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        >
          <div className={styles.inner}>
            <div className={styles.textBlock}>
              <strong>FamCare</strong>
              <span>Free on iOS &amp; Android</span>
            </div>

            <div className={styles.storeLinks}>
              <a
                href="https://apps.apple.com/in/app/famcare/id6761720384"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.storeBtn}
              >
                <NextImage
                  src="/appstore.png"
                  alt="App Store"
                  width={120}
                  height={36}
                  style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.famcare.praja&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.storeBtn}
              >
                <NextImage
                  src="/googleplay.webp"
                  alt="Google Play"
                  width={120}
                  height={36}
                  style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
                />
              </a>
            </div>

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
