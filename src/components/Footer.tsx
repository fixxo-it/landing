import { HeartPulse } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-color)', padding: '64px 0 32px 0', borderTop: '1px solid rgba(20, 184, 166, 0.1)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <HeartPulse size={32} color="var(--primary)" strokeWidth={2.5} />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.05em' }}>fam.care</span>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px' }}>
          Pioneering Quality, Safety, and Trust in Caregiving. The modern solution for your family.
        </p>
        
        <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', color: 'var(--text-main)', fontWeight: 500 }}>
          <a href="#features">Features</a>
          <a href="#pillars">Trust & Safety</a>
          <a href="#services">Services</a>
          <a href="#">Contact</a>
        </div>
        
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} fam.care. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
