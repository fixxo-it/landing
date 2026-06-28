'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Logo + tagline */}
        <div className={styles.brand}>
          <NextImage
            src="/logo.png"
            alt="FamCare"
            width={160}
            height={50}
            style={{ objectFit: 'contain' }}
          />
          <p className={styles.tagline}>Trusted baby care in 10 mins</p>
          <p className={styles.location}>Whitefield · Bangalore</p>
          <div className={styles.contact}>
            <a href="tel:+919535711078">+91 95357 11078</a>
            <span>·</span>
            <a href="mailto:support@famcare.co.in">support@famcare.co.in</a>
          </div>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <div className={styles.linkHeading}>Services</div>
            <Link href="#services">Newborn care</Link>
            <Link href="#services">Infant day care</Link>
            <Link href="#services">Toddler companion</Link>
            <Link href="#services">After-school care</Link>
          </div>
          <div className={styles.linkGroup}>
            <div className={styles.linkHeading}>Company</div>
            <Link href="#how">How it works</Link>
            <Link href="#verified">Verified caregivers</Link>
            <Link href="/support">Support</Link>
          </div>
          <div className={styles.linkGroup}>
            <div className={styles.linkHeading}>Legal</div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/deletion-of-data">Data Deletion</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {new Date().getFullYear()} FAMCARE TECHNOLOGIES PRIVATE LIMITED. All rights reserved.</span>
          <span className={styles.madeWith}>Made with ❤️ for Whitefield, Bangalore families</span>
        </div>
      </div>
    </footer>
  );
}
