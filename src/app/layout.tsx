import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FamCare - Trust, Quality & Safety in Caregiving',
  description: 'The most modern caregiver app prioritizing standardized trust, formal supply, and uncompromising quality for your family.',
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
