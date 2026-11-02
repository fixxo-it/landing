import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/site-content';

/* The link-preview card (WhatsApp, LinkedIn, X, search). Set explicitly on
   every page: a page that sets its own openGraph replaces the inherited one
   wholesale, so an image left to inheritance silently disappears. */
export const SHARE_IMAGE = {
  url: '/img/og-card.jpg',
  width: 1200,
  height: 630,
  alt: `${BUSINESS.name}: on-demand baby care you can trust in ${BUSINESS.areas.join(', ')}, ${BUSINESS.city}`,
};

/* A page's metadata: its own canonical URL, plus a link preview carrying that
   page's title and description. Paths are relative; they resolve against
   metadataBase in app/layout.tsx. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: BUSINESS.name,
      locale: 'en_IN',
      url: path,
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
