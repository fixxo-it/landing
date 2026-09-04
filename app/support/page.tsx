"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Section";
import Reveal, { EASE } from "@/components/motion/Reveal";
import BackButton from "@/components/legal/BackButton";
import SiteFooter from "@/components/sections/SiteFooter";
import { cn } from "@/lib/cn";

const FAQS: [string, string][] = [
  [
    "How do I book a caregiver?",
    "Download the FamCare app from the App Store or Play Store, log in with your mobile number via OTP, then enter your care requirements and preferred time to confirm a booking.",
  ],
  [
    "How do you ensure the safety of caregivers?",
    "Every FamCare caregiver clears application screening, two interviews, Aadhaar and address verification, a criminal background check, reference checks, and in-centre training before they are bookable.",
  ],
  [
    "What areas do you serve?",
    "We currently operate in Whitefield and Varthur, Bengaluru, and are expanding across east Bengaluru through the year.",
  ],
  [
    "How do I cancel or reschedule a booking?",
    "Cancel or reschedule directly from the FamCare app. Cancellations made at least 30 minutes before the scheduled time are fully refunded; a small fee applies after that.",
  ],
  [
    "What is your pricing?",
    "Pricing is transparent and standardised by the type of care and duration of the service — you see the exact quote in the app before you confirm.",
  ],
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C9.4 21 3 14.6 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

const CONTACTS = [
  {
    icon: MailIcon,
    title: "Email us",
    body: "For support, partnerships, or general inquiries.",
    href: "mailto:support@famcare.co.in",
    label: "support@famcare.co.in",
  },
  {
    icon: PhoneIcon,
    title: "Call us",
    body: "For immediate assistance and support.",
    href: "tel:+919535711078",
    label: "+91 95357 11078",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={cn(
            "group flex w-full items-start justify-between gap-8 px-6 pt-6 text-left transition-[padding] duration-300 sm:px-8",
            open ? "pb-3" : "pb-6",
          )}
        >
          <span className="text-lg font-semibold leading-snug text-ink lg:text-xl">
            {question}
          </span>
          <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-ink-faint transition-colors duration-200 group-hover:text-ink" aria-hidden>
            <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <motion.line
              x1="10" y1="3" x2="10" y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ transformOrigin: "10px 10px" }}
            />
          </svg>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] px-6 pb-6 text-[15px] leading-relaxed text-ink-muted sm:px-8 lg:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white/80 py-4 backdrop-blur-md">
        <Container>
          <BackButton />
        </Container>
      </div>

      <Container className="pb-20 pt-8 lg:pb-28 lg:pt-12">
        <h1 className="font-display text-h1 font-semibold text-ink lg:text-h1-lg">
          Support &amp; Contact
        </h1>
        <Reveal
          as="p"
          delay={0.05}
          className="mt-4 max-w-[560px] text-lg leading-relaxed text-ink-muted"
        >
          We&rsquo;re here to help with any questions about our caregiving services.
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-[720px]">
          {CONTACTS.map(({ icon: Icon, title, body, href, label }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-3 rounded-[20px] border border-line bg-white p-8 shadow-float"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-teal-tint text-teal">
                <Icon />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
              <p className="text-[15px] text-ink-muted">{body}</p>
              <a
                href={href}
                className="mt-1 font-display text-base font-semibold text-teal underline decoration-teal/30 underline-offset-4 transition-colors duration-200 hover:decoration-teal"
              >
                {label}
              </a>
            </div>
          ))}
        </Reveal>

        <div className="mt-20 lg:mt-28">
          <Reveal as="h2" className="font-display text-h3 font-semibold text-ink">
            Frequently asked questions
          </Reveal>

          <Reveal delay={0.05} className="mt-8 overflow-hidden rounded-[20px] border border-line lg:max-w-[820px]">
            <div className="divide-y divide-line">
              {FAQS.map(([q, a]) => (
                <FaqItem key={q} question={q} answer={a} />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      <SiteFooter />
    </main>
  );
}
