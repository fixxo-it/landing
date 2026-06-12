import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FamCare - Trusted Baby Care in Whitefield, Bangalore',
  description: 'Verified, trained nannies and baby caregivers for newborns, toddlers, and everything in between. On-demand or scheduled, at your door in 10 minutes.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
