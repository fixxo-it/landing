import Image from 'next/image';
import { Check } from 'lucide-react';
import styles from './Safe360Architecture.module.css';

const pillars = [
  {
    name: 'Verified people',
    src: '/images/safe360-icons/identity360.png',
    items: ['Multi-level identity verification', 'Police verification', 'Face authentication'],
  },
  {
    name: 'Safe arrival',
    src: '/images/safe360-icons/arrival360.png',
    items: ['Live GPS tracking', 'OTP check-in', 'AI face match'],
  },
  {
    name: 'Safe care',
    src: '/images/safe360-icons/care360.png',
    items: ['Care timeline', 'Digital care report', 'Smart caregiver matching'],
  },
  {
    name: 'Real-time monitoring',
    src: '/images/safe360-icons/geofence360.png',
    items: ['Geofencing', 'Silent SOS', 'Operations monitoring'],
  },
  {
    name: 'Continuous quality',
    src: '/images/safe360-icons/audit360.png',
    items: ['Trust score', 'Behaviour score', 'Surprise audits'],
  },
  {
    name: 'Transparent support',
    src: '/images/safe360-icons/support360.png',
    items: ['Incident management', 'Secure communication', 'Family notifications'],
  },
];

export default function Safe360Architecture() {
  return (
    <section id="safe360" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">The Safe360 architecture</span>
            <h2>Six pillars. One connected safety system.</h2>
          </div>
          <p>
            Every pillar owns a critical part of the care journey while sharing signals with the rest of the system in real time.
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map(({ name, src, items }, index) => (
            <article className={styles.card} key={name}>
              <div className={styles.cardTop}>
                <div className={styles.icon}>
                  <Image src={src} alt="" width={92} height={92} sizes="68px" className={styles.iconArt} />
                </div>
                <span>Module {String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{name}</h3>
              <ul>
                {items.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.status}>
          <span /> Six modules connected · Command Center online · Human oversight active
        </div>
      </div>
    </section>
  );
}
