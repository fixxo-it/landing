import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const COLUMNS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Services",
    links: [
      { label: "Newborn care", href: "#services" },
      { label: "Infant day care", href: "#services" },
      { label: "Toddler companion", href: "#services" },
      { label: "After school care", href: "#services" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "Safety360™", href: "#safety" },
      { label: "AI-first care", href: "#safety" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Testimonials", href: "#stories" },
    ],
  },
  {
    head: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Refund policy", href: "/refund-policy" },
      { label: "Data deletion", href: "/data-deletion" },
    ],
  },
];

export default function SiteFooter() {
  return (
    /* z-10 so it stays over the CTA phone that bleeds down into it. Solid brand
       green closes the page, so every line inside it is set in white. */
    <footer
      id="site-footer"
      /* sized to its content: with the oversized wordmark gone there is nothing
         left to fill a full screen of green with */
      className="relative z-10 overflow-hidden rounded-t-[40px] bg-teal text-white lg:rounded-t-[56px]"
    >
      <Image
        src="/img/Grainy.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover mix-blend-overlay opacity-40"
      />

      <Container className="relative">
        <Stagger className="grid gap-12 pt-16 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-x-10">
          <StaggerItem>
            <p className="font-display text-4xl font-bold tracking-[-0.03em] text-white">FamCare</p>
            <p className="mt-3 text-[15px] text-white/70">
              Caregivers in{" "}
              <span className="font-medium italic text-lime-light">10 minutes</span>
            </p>

            <address className="mt-9 not-italic">
              <p className="text-[15px] text-white/70">
                1st floor, Novel MSR Building, Subbaiah Reddy Colony, Marathahalli Village,
                Marathahalli, Bengaluru, Karnataka 560037
              </p>
              <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[15px] text-white/70">
                <a href="tel:+919535711078" className="transition-colors hover:text-white">
                  +91 95357 11078
                </a>
                <a
                  href="mailto:support@famcare.co.in"
                  className="transition-colors hover:text-white"
                >
                  support@famcare.co.in
                </a>
              </p>
            </address>
          </StaggerItem>

          {COLUMNS.map((col) => (
            <StaggerItem key={col.head}>
              <nav aria-label={col.head}>
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.04em] text-white">
                  {col.head}
                </h2>
                <ul className="mt-6 space-y-4 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-white/70 transition-colors duration-200 hover:text-white"
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

        {/* closing bar — also what gives the last link row room to breathe
            instead of running into the bottom of the page.

            Deliberately not wrapped in <Reveal>: the shared viewport trigger
            holds a reveal until the element clears the bottom 10% of the
            screen, and the very last strip of the page can never clear it —
            you run out of scroll first. It stayed at opacity 0 for good. */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 py-8 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© {new Date().getFullYear()} FamCare. All rights reserved.</p>
          </div>

          <p className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1.5">
              Made with
              <svg className="h-3 w-3 shrink-0 fill-lime-light" viewBox="0 0 24 24" aria-label="love" role="img">
                <path d="M12 21s-7.5-4.7-9.6-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9Z" />
              </svg>
              in Bengaluru.
            </span>
            <a
              href="https://www.linkedin.com/company/famcare-co-in/home"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FamCare on LinkedIn"
              className="text-white/70 transition-colors duration-200 hover:text-white"
            >
              <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
