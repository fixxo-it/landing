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
      { label: "Safe360™", href: "#safety" },
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
      <Container className="relative">
        <Stagger className="grid gap-12 pt-16 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-x-10">
          <StaggerItem>
            <p className="font-display text-4xl font-bold tracking-[-0.03em] text-white">FamCare</p>
            <p className="mt-3 text-[15px] text-white/70">
              Trusted Baby care in{" "}
              <span className="font-medium italic text-lime-light">10 minutes</span>
            </p>

            <address className="mt-9 not-italic">
              <p className="text-[15px] text-white/70">Whitefield and Varthur, Bangalore</p>
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

          <p className="flex shrink-0 items-center gap-1.5">
            Made with
            <svg className="h-3 w-3 shrink-0 fill-lime-light" viewBox="0 0 24 24" aria-label="love" role="img">
              <path d="M12 21s-7.5-4.7-9.6-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9Z" />
            </svg>
            in Bengaluru.
          </p>
        </div>
      </Container>
    </footer>
  );
}
