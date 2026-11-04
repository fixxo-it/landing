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
      { label: 'Monthly plans', href: '/monthly' },
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

/* "FamCare" outlined from Figtree Bold */
const WORDMARK =
  'M0 712V12H449V137H137V305H397V430H137V712ZM689 724Q599 724 549 684Q500 644 500 571Q500 491 553 450Q607 410 704 410H822Q815 364 793 340Q771 315 730 315Q698 315 672 329Q646 343 628 372L512 332Q526 300 553 270Q580 239 623 220Q667 200 730 200Q806 200 856 229Q907 258 931 310Q956 363 955 435L952 712H829L827 654Q808 688 773 706Q739 724 689 724ZM711 614Q743 614 769 599Q795 584 810 560Q825 536 825 510V508H750Q685 508 660 524Q635 539 635 567Q635 589 655 602Q675 614 711 614ZM1060 712V212H1184L1190 277Q1213 239 1249 220Q1285 200 1329 200Q1390 200 1431 226Q1473 252 1492 306Q1514 255 1554 227Q1594 200 1647 200Q1735 200 1781 255Q1827 311 1827 426V712H1695V456Q1695 405 1684 377Q1673 349 1654 337Q1635 324 1609 324Q1561 323 1535 355Q1509 387 1509 450V712H1377V456Q1377 405 1366 377Q1356 349 1336 337Q1317 324 1291 324Q1243 323 1218 355Q1192 387 1192 450V712ZM2260 724Q2158 724 2079 678Q2000 631 1955 550Q1910 468 1910 362Q1910 256 1955 174Q2000 93 2078 46Q2157 0 2259 0Q2331 0 2393 25Q2455 51 2501 96Q2548 142 2573 201L2446 248Q2429 211 2401 183Q2373 156 2337 140Q2301 125 2259 125Q2198 125 2151 155Q2103 186 2076 239Q2050 292 2050 362Q2050 432 2077 485Q2104 539 2152 569Q2200 600 2262 600Q2305 600 2341 583Q2376 567 2404 538Q2431 509 2448 471L2575 517Q2550 578 2504 625Q2457 672 2395 698Q2333 724 2260 724ZM2819 724Q2729 724 2679 684Q2630 644 2630 571Q2630 491 2683 450Q2737 410 2834 410H2952Q2945 364 2923 340Q2901 315 2860 315Q2828 315 2802 329Q2776 343 2758 372L2642 332Q2656 300 2683 270Q2710 239 2753 220Q2797 200 2860 200Q2936 200 2986 229Q3037 258 3061 310Q3086 363 3085 435L3082 712H2959L2957 654Q2938 688 2903 706Q2869 724 2819 724ZM2841 614Q2873 614 2899 599Q2925 584 2940 560Q2955 536 2955 510V508H2880Q2815 508 2790 524Q2765 539 2765 567Q2765 589 2785 602Q2805 614 2841 614ZM3190 712V212H3322V304Q3353 257 3400 233Q3448 210 3499 210V338Q3453 338 3413 349Q3372 360 3347 385Q3322 410 3322 449V712ZM3795 724Q3721 724 3664 690Q3607 657 3574 598Q3542 539 3542 462Q3542 385 3575 326Q3609 267 3667 234Q3726 200 3802 200Q3868 200 3923 234Q3979 269 4012 336Q4046 402 4046 497H3680Q3685 547 3723 576Q3761 606 3809 606Q3850 606 3876 588Q3902 571 3916 543L4034 589Q4013 631 3979 662Q3946 692 3900 708Q3854 724 3795 724ZM3687 399H3903Q3900 368 3883 349Q3866 330 3843 321Q3820 312 3798 312Q3777 312 3752 320Q3728 329 3709 348Q3691 367 3687 399Z';

const LINK = 'transition-colors duration-200 hover:text-teal-dark';

export default function SiteFooter() {
  return (
    /* z-10 and a solid ground so it stays over the CTA phone that bleeds down
       into it. A soft curved top, the brand beside the link columns, and the
       page ends on the name fading out. */
    <footer
      id="site-footer"
      className="relative z-10 overflow-hidden rounded-t-[32px] border-t border-line bg-gradient-to-b from-white to-teal-tint pt-14 lg:rounded-t-[48px] lg:pt-20"
    >
      <Container>
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-x-10">
          <StaggerItem className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.02em] text-teal-dark">
              FamCare
            </p>
            <p className="mt-1.5 text-sm text-ink-muted">Caregivers in 10 minutes</p>

            <p className="mt-8 text-sm text-ink-muted">Find us at</p>
            <div className="mt-3 flex items-center gap-4 text-ink-muted">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={LINK}>
                  <svg className="h-5 w-5 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            <address className="mt-8 max-w-[300px] border border-line bg-white/60 p-4 text-[13px] not-italic leading-relaxed text-ink-muted">
              <p>© {new Date().getFullYear()} FamCare. All rights reserved.</p>
              <p className="mt-3">
                1st floor, Novel MSR Building, Subbaiah Reddy Colony, Marathahalli Village, Marathahalli, Bengaluru,
                Karnataka 560037
              </p>
              <p className="mt-3 flex flex-col gap-0.5 text-ink">
                <a href="tel:+919535711078" className={LINK}>
                  +91 95357 11078
                </a>
                <a href="mailto:support@famcare.co.in" className={LINK}>
                  support@famcare.co.in
                </a>
              </p>
            </address>
          </StaggerItem>

          {COLUMNS.map((col) => (
            <StaggerItem key={col.head}>
              <nav aria-label={col.head}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink">{col.head}</h2>
                <ul className="mt-6 space-y-3.5 text-base text-ink-muted">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noopener noreferrer' : undefined}
                        className={LINK}
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

        {/* decorative: the name set huge and fading away down the page. Drawn as a
            shape rather than live text, so no browser can measure or clip it
            differently, and the viewBox hugs the letters so it fills the width */}
        <svg aria-hidden viewBox="0 0 4046 724" className="mb-6 mt-12 block w-full lg:mb-10 lg:mt-16">
          <defs>
            <linearGradient id="footer-wordmark" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="724">
              <stop offset="0" stopColor="#0B1F20" stopOpacity="0.15" />
              <stop offset="1" stopColor="#0B1F20" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path d={WORDMARK} fill="url(#footer-wordmark)" />
        </svg>
      </Container>
    </footer>
  );
}
