'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './LegalLayout.module.css';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <main>
      <Navbar />
      <div className={styles['legal-container']}>
        <div className={styles['legal-header']}>
          <h1 className={styles['legal-title']}>{title}</h1>
          <p className={styles['legal-date']}>Last Updated: {lastUpdated}</p>
        </div>
        <div className={styles['legal-content']}>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
