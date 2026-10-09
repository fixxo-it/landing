import type { Metadata } from 'next';
import { Caveat, Figtree } from 'next/font/google';
import './globals.css';
import PageFx from '@/components/fx/PageFx';
import MotionPrefs from '@/components/fx/MotionPrefs';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

/* handwritten face for the signatures on the testimonial notes only */
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FamCare - On demand Baby care you can trust',
  description:
    'Professional trained background verified caregivers in 10 minutes. Live in Whitefield, Varthur & Mahadevapura.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${caveat.variable} antialiased`}>
        <MotionPrefs>{children}</MotionPrefs>
        <PageFx />
      </body>
    </html>
  );
}
