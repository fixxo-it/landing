import type { Metadata } from 'next';
import { Caveat, Faculty_Glyphic, Figtree } from 'next/font/google';
import './globals.css';
import PageFx from '@/components/fx/PageFx';
import MotionPrefs from '@/components/fx/MotionPrefs';
import ChatWidget from '@/components/chat/ChatWidget';
import { JsonLd, siteGraph } from '@/components/seo/JsonLd';
import { SHARE_IMAGE } from '@/lib/seo';
import {
  BUSINESS,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_URL,
} from '@/lib/site-content';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

/* editorial serif for the monthly-plans headings */
const glyphic = Faculty_Glyphic({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-glyphic',
  display: 'swap',
});

/* handwritten face for the signatures on the testimonial notes only */
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

/* Site-wide defaults. Each page sets its own title, description and
   canonical URL via pageMetadata() (lib/seo.ts). There is deliberately no
   canonical here: a layout's canonical is inherited by every page that doesn't
   set one, which would point them all at the home page. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BUSINESS.name,
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: BUSINESS.name,
    locale: 'en_IN',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: { card: 'summary_large_image', images: [SHARE_IMAGE] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${caveat.variable} ${glyphic.variable} antialiased`}>
        <JsonLd data={siteGraph()} />
        <MotionPrefs>
          {children}
          {/* on every page; renders nothing unless switched on in admin */}
          <ChatWidget />
        </MotionPrefs>
        <PageFx />
      </body>
    </html>
  );
}
