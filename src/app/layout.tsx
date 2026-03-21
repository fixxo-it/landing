import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'fam.care - Trust, Quality & Safety in Caregiving',
  description: 'The most modern caregiver app prioritizing standardized trust, formal supply, and uncompromising quality for your family.',
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
