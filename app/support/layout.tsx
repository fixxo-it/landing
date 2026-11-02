import { JsonLd, faqPage } from '@/components/seo/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { BUSINESS, SUPPORT_FAQ } from '@/lib/site-content';

/* The support page is a client component, which can't export metadata, so its
   title, description and FAQ data live in this pass-through layout. */
export const metadata = pageMetadata({
  title: 'Support & Contact | FamCare',
  description: `Help with FamCare bookings, cancellations and payments. Email ${BUSINESS.email} or call ${BUSINESS.phoneDisplay}.`,
  path: '/support',
});

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={faqPage('/support', SUPPORT_FAQ)} />
      {children}
    </>
  );
}
