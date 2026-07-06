import { Activity, GraduationCap, IdCard, Radar, Users } from 'lucide-react';
import styles from './AboutFamCare.module.css';

const trustStack = [
  {
    icon: GraduationCap,
    title: 'FamCare Academy',
    description: 'In-house caregiver training and care readiness.',
  },
  {
    icon: IdCard,
    title: 'Identity & trust',
    description: 'Background, police, and face verification.',
  },
  {
    icon: Radar,
    title: 'Session intelligence',
    description: 'Audio signals, geofencing, and smart alerts.',
  },
  {
    icon: Activity,
    title: 'Command Center',
    description: 'Real-time operations and incident response.',
  },
];

export default function AboutFamCare() {
  return (
    <section id="about" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.story}>
          <span className="eyebrow">About FamCare</span>
          <h2>Building the operating system for trust in home care.</h2>
          <p className={styles.lead}>
            FamCare is building India&apos;s AI-enabled technology infrastructure for caregiving—so families no longer have to rely on word of mouth and guesswork.
          </p>
          <p>
            We operate as a technology company, not simply a caregiving marketplace. Verified and FamCare Academy-trained caregivers are supported by in-session monitoring, geofencing, and a dedicated Command Center that watches over every session in real time.
          </p>
          <p>
            By building industrial-grade trust at scale, we help working couples and working women pursue their careers without compromising their families&apos; safety.
          </p>
          <a href="#safe360" className={styles.link}>Explore FamCare Safe360™ <span>→</span></a>
        </div>

        <div className={styles.stackPanel}>
          <div className={styles.stackHeader}>
            <span>How FamCare works</span>
            <b><i /> Active system</b>
          </div>
          <div className={styles.stackGrid}>
            {trustStack.map(({ icon: Icon, title, description }) => (
              <article key={title} className={styles.stackItem}>
                <div className={styles.stackIcon}><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className={styles.stackFooter}><Users size={17} /> Human oversight across every layer</div>
        </div>
      </div>
    </section>
  );
}
