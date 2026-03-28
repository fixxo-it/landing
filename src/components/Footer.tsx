import { HeartPulse } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-color)', padding: '80px 0 40px 0', borderTop: '1px solid rgba(20, 184, 166, 0.1)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <HeartPulse size={32} color="var(--primary)" strokeWidth={2.5} />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.05em' }}>fam.care</span>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px' }}>
          Pioneering Quality, Safety, and Trust in Caregiving. The modern solution for your family.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px 40px', marginBottom: '40px', color: 'var(--text-main)', fontWeight: 500 }}>
          <Link href="/#features">Features</Link>
          <Link href="/#pillars">Trust & Safety</Link>
          <Link href="/#services">Services</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/refund-policy">Refund Policy</Link>
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
