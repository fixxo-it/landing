/* The one place the site's facts and FAQ copy live. The page sections render
   from it, and so does everything machines read: the structured data
   (components/seo/JsonLd.tsx), the sitemap and /llms.txt. Change a fact or an
   answer here and every one of them moves together, so they can't disagree. */

/* www is the primary domain on Vercel; the bare domain redirects to it */
export const SITE_URL = 'https://www.famcare.co.in';

/* the home page's title and description, also the site-wide default */
export const HOME_TITLE = 'FamCare - On demand Baby care you can trust';
export const HOME_DESCRIPTION =
  'Professional trained background verified caregivers in 10 minutes. Live in Whitefield, Varthur & Mahadevapura.';

export const BUSINESS = {
  name: 'FamCare',
  legalName: 'FamCare Technologies Private Limited',
  tagline: 'On demand Baby care you can trust',
  summary:
    'FamCare is an on-demand, in-home baby care service in Bengaluru, India. Parents book trained, background-verified caregivers through the FamCare app.',
  email: 'support@famcare.co.in',
  /* E.164 for machines, spaced for people */
  phone: '+919535711078',
  phoneDisplay: '+91 95357 11078',
  city: 'Bengaluru',
  areas: ['Whitefield', 'Varthur', 'Mahadevapura'],
  services: [
    'Newborn care',
    'Infant day care',
    'Toddler companion',
    'After school care',
  ],
  /* opens the App Store or Play Store, whichever fits the device */
  appUrl: 'https://famcare.onelink.me/LK0E/cgr3j0s7',
  social: [
    'https://www.linkedin.com/company/famcare-co-in/',
    'https://www.instagram.com/famcare.co.in',
  ],
} as const;

/* every public page: drives the sitemap and the page list in /llms.txt */
export const PAGES = [
  {
    path: '/',
    name: 'Home',
    about: 'services, how booking works, safety, FAQ',
  },
  {
    path: '/support',
    name: 'Help & support',
    about: 'booking help, FAQ, contact details',
  },
  {
    path: '/refund-policy',
    name: 'Refund policy',
    about: 'cancellation charges and refunds',
  },
  {
    path: '/monthly',
    name: 'Monthly childcare plans',
    about: '10-hour monthly plan, 3-day trial, pauses, exit terms and waitlist',
  },
  {
    path: '/join',
    name: 'Join as a caregiver',
    about: 'caregiver jobs in Bengaluru',
  },
  {
    path: '/terms-and-conditions',
    name: 'Terms of use',
    about: 'terms for using the FamCare app and services',
    optional: true,
  },
  {
    path: '/privacy-policy',
    name: 'Privacy policy',
    about: 'how personal data is collected and used',
    optional: true,
  },
  {
    path: '/data-deletion',
    name: 'Data deletion',
    about: 'how to delete your account and data',
    optional: true,
  },
] as const;

/* An answer as plain text, for structured data and /llms.txt: a list of
   "Label: text" points becomes one sentence run. */
export function answerText(answer: FaqAnswer): string {
  return typeof answer === 'string' ? answer : answer.join(' ');
}

/* An answer is a paragraph, or a list of "Label: text" points rendered as bullets */
export type FaqAnswer = string | string[];
export type FaqGroup = { tab: string; items: [string, FaqAnswer][] };

/* Answer shape, held to across every entry below: the direct answer is the
   first sentence, the proof is the second, and there is no third. A parent
   opening a row wants the answer, not a warm-up to it. */

/* The home page FAQ, grouped by the tabs it shows. */
export const HOME_FAQ: FaqGroup[] = [
  {
    tab: 'Trust & safety',
    items: [
      [
        'How are FamCare caregivers verified?',
        'Every caregiver goes through two interviews, identity and address checks, background verification, training, and a practical skills assessment before they can take bookings.',
      ],
      [
        'Will I know who is coming to my home?',
        'Yes. As soon as a caregiver is assigned, you can see their photo and profile in the app and track them on the way. When they arrive, please check their FamCare ID before letting them in.',
      ],
    ],
  },
  {
    tab: 'Training',
    items: [
      [
        'What training does a caregiver complete?',
        "Every caregiver receives classroom and hands-on training in baby care, feeding and sleep routines, hygiene, safe handling, and emergency response. They also learn parent communication, household etiquette, and how to follow your family's care instructions. They must pass a practical assessment before taking bookings.",
      ],
      [
        'Is training refreshed over time?',
        'Yes. Every caregiver completes refresher training each quarter. When service feedback highlights a gap, our trainer provides individual coaching.',
      ],
    ],
  },
  {
    tab: 'Booking',
    items: [
      [
        'How quickly can someone reach me?',
        'Our median arrival time for instant bookings is 10 minutes in serviceable areas. It can take longer depending on caregiver availability, traffic and weather conditions such as heavy rain. You can also schedule care in advance.',
      ],
      [
        'Can I cancel or reschedule?',
        'You can cancel free of charge at least 4 hours before your booking starts, and reschedule free of charge at least 2 hours before. After that, the full booking amount is charged, with no refund.',
      ],
    ],
  },
  {
    tab: 'Caregivers',
    items: [
      [
        'Can I request the same caregiver again?',
        "Yes, with our Preferred Caregiver feature. Once you've marked at least 3 caregivers you like, we'll do our best to send one of them, depending on who's available. If none of them is free, you'll get another caregiver trained to the same FamCare standards.",
      ],
    ],
  },
  {
    tab: 'Service area',
    items: [
      [
        'Where is FamCare available?',
        'We currently serve selected areas of Whitefield, Varthur, and Mahadevapura/Garudachar Palya in Bengaluru. Enter your address in the app to check availability.',
      ],
      [
        'Can I request my area?',
        "Yes. Share your location in the app, and we'll notify you when FamCare becomes available nearby.",
      ],
    ],
  },
];

/* The help-centre FAQ on /support. */
export const SUPPORT_FAQ: [string, string][] = [
  [
    'How do I book a caregiver?',
    'Download the FamCare app from the App Store or Play Store, log in with your mobile number via OTP, then enter your care requirements and preferred time to confirm a booking.',
  ],
  [
    'How do you ensure the safety of caregivers?',
    'Every FamCare caregiver clears application screening, two interviews, Aadhaar and address verification, a criminal background check, reference checks, and in-centre training before they are bookable.',
  ],
  [
    'What areas do you serve?',
    'We currently operate in Whitefield, Varthur and Mahadevapura, Bengaluru, and are expanding across east Bengaluru through the year.',
  ],
  [
    'How do I cancel or reschedule a booking?',
    'Cancel or reschedule directly from the FamCare app. Cancellations made at least 4 hours before the scheduled time are free and fully refunded; later cancellations or no-shows may attract a cancellation charge.',
  ],
  [
    'What is your pricing?',
    "Pricing is transparent and standardised by the type of care and duration of the service. You see the full quote, including FamCare's service fee, in the app before you confirm. Applicable taxes, waiting time and session extensions are charged in addition.",
  ],
];
