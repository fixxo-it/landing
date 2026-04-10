'use client';

import NextImage from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-color)', padding: '80px 0 40px 0', borderTop: '1px solid rgba(20, 184, 166, 0.1)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <NextImage 
            src="/logo.png" 
            alt="FamCare" 
            width={160} 
            height={50} 
            style={{ objectFit: 'contain' }}
          />
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px' }}>
          Pioneering Quality, Safety, and Trust in Caregiving. The modern solution for your family.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px 40px', marginBottom: '24px', color: 'var(--text-main)', fontWeight: 500 }}>
          <Link href="/#features">Features</Link>
          <Link href="/#pillars">Trust & Safety</Link>
          <Link href="/#services">Services</Link>
          <Link href="/support">Support</Link>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <a 
            href="https://play.google.com/store/apps/details?id=com.famcare.praja&pcampaignid=web_share" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              transition: 'transform 0.2s ease',
              margin: '0 auto',
              background: 'transparent',
              border: 'none',
              padding: '0'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <NextImage 
              src="/googleplay.webp" 
              alt="Get it on Google Play" 
              width={400} 
              height={122} 
              style={{ objectFit: 'contain' }}
            />
          </a>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px 40px', marginBottom: '40px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/deletion-of-data">Deletion of Data</Link>
        </div>

        <div style={{ borderTop: '1px solid rgba(20, 184, 166, 0.1)', width: '100%', paddingTop: '32px', marginTop: '8px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Swad Hotels And Restaurants Private Limited. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
