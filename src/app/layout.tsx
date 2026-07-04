import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://famcare.co.in'),
  title: 'FamCare – In-House Trained & Verified Baby Caregivers in Whitefield, Bangalore',
  description:
    "Get a verified, in-house trained caregiver at your door in 10 minutes. FamCare's full-stack care model includes criminal background checks, police verification, real-time tracking, and SOS safety features. Trusted baby care in Whitefield, Bangalore.",
  keywords: [
    'in-house trained caregivers',
    'verified baby care Whitefield',
    'caregiver in 10 minutes Bangalore',
    'trained caregiver Whitefield Bangalore',
    'safety features baby care app',
    'police verified nanny Bangalore',
    'on-demand baby care Whitefield',
    'criminal background check caregiver',
    'authorised baby care Bangalore',
    'background verified caregiver',
    'newborn care Whitefield',
    'infant day care Bangalore',
    'toddler caregiver on demand',
    'trusted babysitter Whitefield',
    'SOS safety caregiver app',
    'full-stack care model India',
    'in-house verified caregivers',
    'authorised baby care',
    'criminal background check caregivers',
    'background verified nanny',
    'full stack care model',
    'baby care Whitefield Bangalore',
    'verified trained caregiver',
    'caregiver safety',
    'on-demand baby care Bangalore',
  ],
  openGraph: {
    type: 'website',
    url: 'https://famcare.co.in',
    siteName: 'FamCare',
    title: 'FamCare – In-House Trained & Verified Baby Caregivers | Whitefield, Bangalore',
    description:
      'Verified caregiver at your door in 10 minutes. In-house trained, police-checked, and background-verified. Real-time tracking, SOS button, and live session monitoring.',
    images: [
      {
        url: '/fc-green.png',
        width: 512,
        height: 512,
        alt: 'FamCare – Verified Baby Care',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'FamCare – Trained & Verified Baby Care in Whitefield, Bangalore',
    description:
      'In-house trained caregivers, police-verified, at your door in 10 minutes. Real-time tracking and SOS safety features.',
    images: ['/fc-green.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://famcare.co.in',
  },
  icons: {
    icon: [
      { url: '/fc-green.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/fc-white.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/fc-green.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://famcare.co.in/#business',
      name: 'FamCare',
      description:
        "India's full-stack baby care platform. In-house trained, verified caregivers for newborns, infants, and toddlers. Criminal background checks, real-time tracking, and SOS safety features.",
      url: 'https://famcare.co.in',
      telephone: '+919986905105',
      email: 'founders@famcare.co.in',
      image: 'https://famcare.co.in/fc-green.png',
      priceRange: '₹149–₹499',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Whitefield',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560066',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '12.9698',
        longitude: '77.7500',
      },
      areaServed: { '@type': 'City', name: 'Whitefield, Bangalore' },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '06:00',
        closes: '21:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Baby Care Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Newborn Care',
              description: 'In-house trained caregiver for newborns. Feeding support, soothing, and nap routines.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Infant Day Care',
              description: 'Safe at-home supervision for infants 3–12 months. Verified caregiver arrives in under 10 minutes.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Toddler Companion',
              description: 'Play-based engagement and routine monitoring for toddlers aged 1–3 years.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'After-School Babysitting',
              description: 'Supervised after-school care for children aged 4–10 years.',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How quickly can I get a caregiver in Whitefield, Bangalore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FamCare connects you with a verified, in-house trained caregiver in under 10 minutes. Our on-demand baby care service covers Whitefield, Bangalore.',
          },
        },
        {
          '@type': 'Question',
          name: 'How are FamCare caregivers trained and verified?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every FamCare caregiver undergoes in-house training, a criminal background check, Aadhaar and PAN verification, employment history checks, skill assessments, and an in-person interview. Background checks are renewed every 6 months.',
          },
        },
        {
          '@type': 'Question',
          name: 'What safety features does FamCare offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "FamCare provides real-time GPS tracking, in-app video calling, a one-tap SOS emergency button, live audio recording, and geo-fencing alerts — so you always know your child is safe.",
          },
        },
        {
          '@type': 'Question',
          name: 'Are FamCare caregivers police-verified?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every FamCare caregiver is verified against national criminal records and police databases, renewed every 6 months.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does FamCare baby care cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FamCare baby care starts at ₹149. Pricing is transparent and shown upfront before you confirm your booking — no hidden fees or negotiations.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
