import { AlertTriangle } from 'lucide-react';
import styles from './AnnouncementBanner.module.css';

export default function AnnouncementBanner() {
  return (
    <div className={styles.banner} role="status">
      <div className={styles.content}>
        <AlertTriangle size={16} className={styles.icon} aria-hidden="true" />
        <p>
          <strong>Apologies for the inconvenience</strong> — our app is
          currently down on the App Store. Our team is working to restore it
          as quickly as possible.
        </p>
      </div>
    </div>
  );
}
