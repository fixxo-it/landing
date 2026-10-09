'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Container, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

type Quote = {
  quote: string;
  name: string;
  /* who they are to the child, then where — the line under the signature */
  meta: string;
};

/* the six strongest real reviews, taken verbatim from famcare.co.in */
const QUOTES: Quote[] = [
  {
    quote:
      'Experience was very good. We are very happy to have a caregiver from FamCare. She really took good care of my kids and was very professional as well.',
    name: 'Nikhil',
    meta: 'Dad of 2 · Whitefield',
  },
  {
    quote:
      'Pleasant experience, we always felt completely at ease knowing our child was in safe and caring hands.',
    name: 'Gayatri Panda',
    meta: 'Mom of 1 · Varthur',
  },
  {
    quote:
      'Initially I had my inhibitions, but due to some office call and a small baby to take care simultaneously, I decided to give FamCare a try.',
    name: 'Puja Baranwal',
    meta: 'Mom of 1 · Whitefield',
  },
  {
    quote:
      'It was a seamless experience, the babysitter was calm, accommodating, and took great care of the baby.',
    name: 'Archana Kammar',
    meta: 'Mom of 1 · Whitefield',
  },
  {
    quote:
      'Excellent childcare app! Very easy to use and helps me quickly find reliable babysitter and childcare support when needed.',
    name: 'Siwani Dubey',
    meta: 'Mom of 1 · Varthur',
  },
  {
    quote:
      'Very professional and good care, the caregiver is very experienced and handled the child very well.',
    name: 'Swapna',
    meta: 'Mom of 1 · Whitefield',
  },
];

/* each note sits at its own slight angle, like notes pinned up by hand —
   a fixed sequence rather than random so server and client render the same */
const TILTS = [-4, 2.5, -1.5, 3.5, -3, 1.5];

export default function Testimonials() {
  /* same arrival as How it works: the teal ground starts as an inset, heavily
     rounded card and opens out to full bleed as the section reaches the top */
  const reduced = useSafeReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 8, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 120, 0]);
  const clipPath = useTransform(
    [inset, radius] as const,
    ([i, r]: number[]) => `inset(${i}% ${i}% 0% ${i}% round ${r}px)`
  );

  return (
    <section
      ref={sectionRef}
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
      <motion.div
        aria-hidden
        style={{ clipPath }}
        className="absolute inset-0 overflow-hidden bg-teal-dark"
      >
        <Image
          src="/img/Grainy.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="grain pointer-events-none absolute inset-0" />
        {/* two slow light blobs so the teal has depth rather than reading flat */}
        <span className="absolute -left-[10%] top-[10%] h-[50vw] max-h-[700px] w-[50vw] max-w-[700px] animate-aurora rounded-full bg-teal-light/20 blur-[120px] motion-reduce:animate-none" />
        <span className="absolute -right-[10%] bottom-0 h-[40vw] max-h-[600px] w-[40vw] max-w-[600px] animate-aurora-slow rounded-full bg-[#0E7A82]/50 blur-[120px] motion-reduce:animate-none" />
      </motion.div>

      <Container className="relative z-10">
        <SectionHeading
          title="What our users are saying"
          tone="dark"
          size="lg"
        />
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
        {/* one rail. The vertical padding is room for the tilted corners and
            the card shadows, which the scroll container would otherwise clip. */}
        <div className="flex overflow-x-auto py-10 lg:overflow-hidden">
          <div className="marquee-track flex w-max animate-marquee gap-8">
            {/* the copy is duplicated so the track can loop on itself; the
                clone is hidden from screen readers and from tab order */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-8">
                {QUOTES.map((q, i) => (
                  <Card
                    key={q.quote}
                    quote={q}
                    tilt={TILTS[i % TILTS.length]}
                    aria-hidden={copy === 1}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Card({
  quote,
  tilt,
  className,
  style,
  ...rest
}: { quote: Quote; tilt: number } & React.HTMLAttributes<HTMLElement>) {
  return (
    <figure
      /* a lime note: quote on top, signature row pinned to the bottom so the
         signatures line up across the rail whatever the quote's length */
      className={cn(
        'relative isolate flex min-h-[300px] w-[300px] shrink-0 flex-col justify-between overflow-hidden bg-[#F4FCCB] p-7 text-teal-dark shadow-[0_24px_50px_-24px_rgba(0,0,0,0.55)] sm:w-[360px] lg:p-8',
        className
      )}
      style={{ transform: `rotate(${tilt}deg)`, ...style }}
      {...rest}
    >
      {/* the page's grain, multiplied in faintly so the note reads as paper
          rather than a flat fill */}
      <span
        aria-hidden
        className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.22] mix-blend-multiply"
      />

      <blockquote className="text-[17px] leading-relaxed lg:text-lg">
        &ldquo;{quote.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4">
        {/* initials rather than a portrait — the stock faces were stand-ins */}
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-dark/15 bg-white text-base font-bold text-teal-dark shadow-sm"
        >
          {quote.name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-hand text-[28px] font-semibold leading-none">
            {quote.name}
          </span>
          <span className="mt-1.5 block truncate text-sm text-teal-dark/70">
            {quote.meta}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
