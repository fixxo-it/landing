import {
  BUSINESS,
  SITE_URL,
  answerText,
  type FaqAnswer,
} from '@/lib/site-content';

/* Structured data (schema.org JSON-LD): the facts on the page, restated for
   search engines and AI assistants. Everything comes from lib/site-content.ts,
   so it always matches what the page shows. */

const ORG_ID = `${SITE_URL}/#organization`;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      /* escape "<" so no string in the data can close the script tag */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

/* Who FamCare is and what it offers. On every page, from the root layout. The
   street address is left out on purpose: parents never visit it, so it is
   described the way a service-area business is, by the areas it covers. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        sameAs: BUSINESS.social,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: BUSINESS.email,
          telephone: BUSINESS.phone,
          areaServed: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS.name,
        inLanguage: 'en-IN',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service`,
        name: 'In-home baby care',
        serviceType: 'Baby care',
        description: BUSINESS.summary,
        provider: { '@id': ORG_ID },
        areaServed: BUSINESS.areas.map((area) => ({
          '@type': 'Place',
          name: area,
          containedInPlace: { '@type': 'City', name: BUSINESS.city },
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'FamCare baby care services',
          itemListElement: BUSINESS.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: service },
          })),
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          name: 'FamCare app',
          serviceUrl: BUSINESS.appUrl,
        },
      },
    ],
  };
}

/* A page's FAQ as FAQPage data. Google no longer shows FAQ rich results
   (May 2026), but other engines and assistants still read it. */
export function faqPage(path: string, items: [string, FaqAnswer][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path === '/' ? '' : path}#faq`,
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answerText(answer) },
    })),
  };
}
