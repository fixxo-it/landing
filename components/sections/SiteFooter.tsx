import Image from 'next/image';
import { Container } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';

const COLUMNS: {
  head: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    head: 'Services',
    links: [
      { label: 'Newborn care', href: '#services' },
      { label: 'Infant day care', href: '#services' },
      { label: 'Toddler companion', href: '#services' },
      { label: 'After school care', href: '#services' },
    ],
  },
  {
    head: 'Company',
    links: [
      { label: 'Join as a caregiver', href: '/join' },
      { label: 'Safe360', href: '#safety-360' },
      { label: 'AI-first care', href: '#safety-360' },
      { label: 'How it works', href: '#how-it-works' },
    ],
  },
  {
    head: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Refund policy', href: '/refund-policy' },
      { label: 'Data deletion', href: '/data-deletion' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'FamCare on LinkedIn',
    href: 'https://www.linkedin.com/company/famcare-co-in/',
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z',
  },
  {
    label: 'FamCare on Instagram',
    href: 'https://www.instagram.com/famcare.co.in',
    path: 'M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.46.67.26 1.24.6 1.8 1.16.56.56.9 1.13 1.16 1.8.24.64.41 1.37.46 2.43.05 1.06.06 1.4.06 4.12 0 2.72-.01 3.06-.06 4.12-.05 1.06-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.16 1.8 4.9 4.9 0 0 1-1.8 1.16c-.64.24-1.37.41-2.43.46-1.06.05-1.4.06-4.12.06-2.72 0-3.06-.01-4.12-.06-1.06-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.8-1.16 4.9 4.9 0 0 1-1.16-1.8c-.24-.64-.41-1.37-.46-2.43C2.01 15.06 2 14.72 2 12c0-2.72.01-3.06.06-4.12.05-1.06.22-1.79.46-2.43.26-.67.6-1.24 1.16-1.8a4.9 4.9 0 0 1 1.8-1.16c.64-.24 1.37-.41 2.43-.46C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.36-1.02.67-.31.31-.5.6-.67 1.02-.12.31-.26.78-.3 1.65-.05 1.05-.06 1.37-.06 4.04 0 2.67.01 2.99.06 4.04.04.87.18 1.34.3 1.65.16.42.36.71.67 1.02.31.31.6.5 1.02.67.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06 2.67 0 2.99-.01 4.04-.06.87-.04 1.34-.18 1.65-.3.42-.16.71-.36 1.02-.67.31-.31.5-.6.67-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.04 0-2.67-.01-2.99-.06-4.04-.04-.87-.18-1.34-.3-1.65a2.73 2.73 0 0 0-.67-1.02 2.73 2.73 0 0 0-1.02-.67c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-1.99a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z',
  },
];

export default function SiteFooter() {
  return (
    /* z-10 so it stays over the CTA phone that bleeds down into it. The footer
       itself is a transparent frame; the dark teal card inset inside it is
       what closes the page, so every line inside it is set in white. */
    <footer id="site-footer" className="relative z-10 p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-card bg-teal-dark text-white">
        <Image
          src="/img/Grainy.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <Container className="relative">
          <Stagger className="grid gap-14 pt-16 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-x-12 lg:pt-20">
            <StaggerItem>
              <div className="w-fit lg:pr-16">
                <p className="font-display text-5xl font-bold leading-none tracking-[-0.02em] text-white">
                  FamCare
                </p>
                <p className="mt-1.5 whitespace-nowrap text-[15px] font-bold text-white/70">
                  Caregivers in{' '}
                  <span className="font-bold italic text-lime-light">
                    10 minutes
                  </span>
                </p>
              </div>

              <address className="mt-14 max-w-md not-italic text-white/80">
                <p className="text-base leading-relaxed">
                  1st floor, Novel MSR Building, Subbaiah Reddy Colony,
                  Marathahalli Village, Marathahalli, Bengaluru, Karnataka
                  560037
                </p>
                <p className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-base">
                  <a
                    href="tel:+919535711078"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    +91 95357 11078
                  </a>
                  <a
                    href="mailto:support@famcare.co.in"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    support@famcare.co.in
                  </a>
                </p>
              </address>
            </StaggerItem>

            {COLUMNS.map((col) => (
              <StaggerItem key={col.head}>
                <nav aria-label={col.head}>
                  <h2 className="text-base font-bold uppercase text-white">
                    {col.head}
                  </h2>
                  <ul className="mt-6 space-y-4 text-base">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target={l.external ? '_blank' : undefined}
                          rel={l.external ? 'noopener noreferrer' : undefined}
                          className="text-white/80 transition-colors duration-200 hover:text-white"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </StaggerItem>
            ))}
          </Stagger>

          {/* closing bar — deliberately not wrapped in <Reveal>: the shared
              viewport trigger holds a reveal until the element clears the
              bottom 10% of the screen, and the very last strip of the page can
              never clear it — you run out of scroll first. It stayed at
              opacity 0 for good. */}
          <div className="mt-16 flex flex-col gap-4 border-t border-white/15 py-8 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
            <p>© {new Date().getFullYear()} FamCare. All rights reserved.</p>

            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                Made with
                <svg
                  className="h-3.5 w-3.5 shrink-0 fill-lime-light"
                  viewBox="0 0 24 24"
                  aria-label="love"
                  role="img"
                >
                  <path d="M12 21s-7.5-4.7-9.6-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9Z" />
                </svg>
                in Bengaluru.
              </span>

              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/70 transition-colors duration-200 hover:text-white"
                >
                  <svg
                    className="h-5 w-5 shrink-0 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
