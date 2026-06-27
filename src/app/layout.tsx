import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FamCare – Authorised In-House Verified Trained Baby Caregivers | Whitefield, Bangalore',
  description: "India's full-stack care model. In-house trained, authorised caregivers with criminal record & background verification checks. Safety matters — for parents and caregivers alike. On-demand baby care in Whitefield, Bangalore, at your door in 10 minutes.",
  keywords: [
    'in-house verified caregivers',
    'authorised baby care',
    'criminal background check caregivers',
    'background verified nanny',
    'full stack care model',
    'baby care Whitefield Bangalore',
    'verified trained caregiver',
    'caregiver safety',
    'on-demand baby care Bangalore',
    'trusted babysitter Whitefield',
  ],
  icons: {
    icon: [
      { url: '/fc-green.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/fc-white.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/fc-green.png',
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
