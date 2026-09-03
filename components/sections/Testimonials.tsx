"use client";

import Image from "next/image";

import { Container, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Quote = {
  quote: string;
  name: string;
  meta: string;
  /* when the review was left. Placeholders spread over the last four months —
     swap each one for the real date from the review export before launch. */
  when: string;
};

/* real reviews, taken verbatim from famcare.co.in */
const QUOTES: Quote[] = [
  {
    quote:
      "Initially I had my inhibitions, but due to some office call and a small baby to take care simultaneously, I decided to give FamCare a try.",
    name: "Puja Baranwal",
    meta: "Whitefield · Mom of 1",
    when: "Aug '26",
  },
  {
    quote:
      "Excellent childcare app! Very easy to use and helps me quickly find reliable babysitter and childcare support when needed.",
    name: "Siwani Dubey",
    meta: "Varthur · Mom of 1",
    when: "Aug '26",
  },
  {
    quote:
      "Experience was very good. We are very happy to have a caregiver from FamCare. She really took good care of my kids and was very professional as well.",
    name: "Nikhil",
    meta: "Whitefield · Dad of 2",
    when: "Jul '26",
  },
  {
    quote:
      "Pleasant experience, we always felt completely at ease knowing our child was in safe and caring hands.",
    name: "Gayatri Panda",
    meta: "Varthur · Mom of 1",
    when: "Jul '26",
  },
  {
    quote:
      "It was a seamless experience, the babysitter was calm, accommodating, and took great care of the baby.",
    name: "Archana Kammar",
    meta: "Whitefield · Mom of 1",
    when: "Jul '26",
  },
  {
    quote:
      "Very satisfied with the caregiver's service, she took care of the baby very calmly and kept her engaged.",
    name: "Archana KK",
    meta: "Varthur · Mom of 1",
    when: "Jun '26",
  },
  {
    quote:
      "Very professional and good care, the caregiver is very experienced and handled the child very well.",
    name: "Swapna",
    meta: "Whitefield · Mom of 1",
    when: "Jun '26",
  },
  {
    quote:
      "Very good experience with the caregiver, she was very professional and polite. She managed the baby very well.",
    name: "Neha",
    meta: "Varthur · Mom of 1",
    when: "May '26",
  },
];

export default function Testimonials() {
  /* two rails moving against each other reads as a wall of voices rather than
     one long queue — split down the middle so both are equally full */
  const half = Math.ceil(QUOTES.length / 2);
  const rows = [QUOTES.slice(0, half), QUOTES.slice(half)];

  return (
    <section
      id="stories"
      /* the padding is the price of the dissolve below: the heading has to
         start below where the wash finishes */
      className="relative isolate scroll-mt-24 overflow-hidden pb-40 pt-40 lg:pb-52 lg:pt-52"
    >
      {/* photographic ground under the rails. The mask dissolves its top and
          bottom edges into the white sections either side, so the section
          arrives as a wash rather than a hard band.

          No negative z-index here on purpose: a -z-10 sibling next to an
          element carrying its own mask-image (the rail below) is a known
          WebKit compositing bug — the masked element gets promoted to its own
          layer, and on iOS Safari the negatively-indexed sibling can paint
          on top of it instead of behind, exactly like the background bleeding
          over the cards. Staying in normal DOM order (this paints first) and
          giving the foreground an explicit z-10 instead sidesteps it. */}
      <div
        aria-hidden
        className="edge-fade absolute inset-0"
      >
        <Image src="/img/testimonials.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <Container className="relative z-10">
        <SectionHeading title="Real families. Real reviews. Zero filters" tone="dark" size="lg" />
      </Container>

      {/* full-bleed on purpose: the rails should run past the page gutter so the
          row reads as continuous rather than as a widget that starts and stops.
          The edge dissolve is lg-only: on mobile the rail is a native swipeable
          strip, not a scroll-jacked one, and the fade was reading as cards
          washing out into the background rather than a soft edge. */}
      <Reveal
        delay={0.15}
        className="relative z-10 mt-14 flex flex-col gap-6 lg:mt-16 lg:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        {rows.map((row, i) => (
          /* the rail is a scroll container, so it clips vertically too — the
             padding keeps the card shadows off that edge */
          <div key={i} className="flex overflow-x-auto py-5 lg:overflow-hidden">
            <div
              className={cn(
                "marquee-track flex w-max gap-6",
                i % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse",
              )}
            >
              {/* the copy is duplicated so the track can loop on itself; the
                  clone is hidden from screen readers and from tab order */}
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-6">
                  {row.map((q) => (
                    <Card key={q.quote} quote={q} aria-hidden={copy === 1} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Card({
  quote,
  className,
  ...rest
}: { quote: Quote } & React.HTMLAttributes<HTMLElement>) {
  return (
    <figure
      /* one fixed height for every card, so the two rails read as two even
         bands rather than a ragged skyline — flex stretch only equalises
         within a row, and the rows are separate containers. No padding or fill
         of its own any more — the two halves below own their own colour and
         padding, and the split between them is what the hairline sits on.
         relative + z-10 on hover: the -ml-px overlap between touching cards
         means each one's left edge sits on top of its neighbour's right edge —
         without lifting the hovered card, its own shadow would be cut off by
         the neighbour drawn after it. */
      className={cn(
        "relative flex h-[300px] w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/40 shadow-[0_18px_40px_-22px_rgba(11,31,32,0.35)] transition-shadow duration-300 hover:z-10 hover:shadow-float sm:w-[360px]",
        className,
      )}
      {...rest}
    >
      {/* upper half: lime, sized to its content rather than a fixed height —
          the name and locality are both single-line truncated spans, so this
          block is the same height on every card regardless of that card's
          quote length, which is what keeps the seam below at one consistent
          line across the whole rail. */}
      {/* the same bright lime used elsewhere as the "live" highlight — the FAQ's
          active tab, the stepper's travelling dot — rather than the deeper
          brand-lime token, which reads more green than yellow */}
      <div className="relative isolate shrink-0 bg-[#E4FF5C] px-6 pb-5 pt-6 lg:px-7 lg:pt-7">
        {/* a specular highlight across the top edge, so the pane still reads as
            a raised, lit surface rather than a flat colour fill */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent"
        />
        {/* name and locality only: the portraits were stand-ins, and without
            them the card leads on the person's own words instead of a stock
            face. Brand teal is what stays legible against lime — white would
            wash out. */}
        <figcaption className="min-w-0">
          <span className="block truncate font-display text-xl font-semibold tracking-[-0.01em] text-teal-dark lg:text-2xl">
            {quote.name}
          </span>
          {/* the date carries the same weight as the locality but a step
              lighter, so the line reads "who, where, when" without the month
              competing with the name above it */}
          <span className="mt-0.5 block truncate text-[15px] text-teal-dark/75">
            {quote.meta} <span className="text-teal-dark/50">· {quote.when}</span>
          </span>
        </figcaption>
      </div>

      {/* the seam itself — a dedicated line rather than a border on the block
          above it, so it survives that block's own padding changing later
          without drifting off the colour boundary it marks */}
      <div aria-hidden className="h-px shrink-0 bg-teal-dark/15" />

      {/* lower half: white, takes whatever height is left. min-h-0 is load
          bearing on a flex child — without it the quote's own height would
          floor this block above the space actually available and push the
          card taller than its fixed 300px. */}
      <div className="min-h-0 flex-1 overflow-hidden bg-white px-6 pb-6 pt-5 lg:px-7 lg:pb-7">
        <blockquote className="text-[17px] font-semibold leading-relaxed text-teal-dark">
          &ldquo;{quote.quote}&rdquo;
        </blockquote>
      </div>
    </figure>
  );
}
