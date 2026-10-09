'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/Section';
import SplitText from '@/components/motion/SplitText';
import Reveal from '@/components/motion/Reveal';
import { openDownloadModal } from '@/components/DownloadModal';
import { cn } from '@/lib/cn';

/* one photo per microservice, cropped out of the service tiles in
   public/img/microservices — the file name is the service name, kebab-cased */
const MICROSERVICES = [
  'Pram walk',
  'Freshen up',
  'Feed time',
  'Nap time',
  'Indoor play',
  'Screen off',
  'Outdoor play',
  'Meal break',
  'Meeting care',
  'Me time',
  'Fitness break',
].map((name) => ({
  name,
  image: `/img/microservices/${name.toLowerCase().replace(/ /g, '-')}.jpg`,
}));

/* split down the middle into two rails */
const ROWS = [
  MICROSERVICES.slice(0, Math.ceil(MICROSERVICES.length / 2)),
  MICROSERVICES.slice(Math.ceil(MICROSERVICES.length / 2)),
];

export default function Microservices() {
  return (
    <section
      id="microservices"
      className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28"
    >
      <Container>
        {/* same weight and size as "From newborn to school going," above */}
        <h2 className="text-balance font-display text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink lg:text-[3.75rem] lg:leading-[1.05]">
          <SplitText text="Microservices" />
        </h2>
      </Container>

      {/* two rails that run on their own, full-bleed so it reads as continuous
          rather than a widget that starts and stops at the page gutter. The
          edges dissolve on desktop; on mobile it is a native swipeable strip. */}
      <Reveal className="mt-10 lg:mt-14 lg:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex flex-col gap-6">
          {ROWS.map((row, r) => (
            <div
              key={r}
              className="flex overflow-x-auto [scrollbar-width:none] lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
            >
              {/* the list is rendered twice so the track can loop on itself. Each
                  copy carries its own trailing gap (pr) instead of a gap between
                  the copies, so -50% lands exactly on the start of the second.
                  The two rows run in opposite directions. */}
              <div
                className={cn(
                  'marquee-track flex w-max [animation-duration:45s]',
                  r === 0 ? 'animate-marquee' : 'animate-marquee-reverse'
                )}
              >
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy === 1 || undefined}
                    className="flex shrink-0 gap-6 pr-6"
                  >
                    {row.map((m) => (
                      <Card
                        key={m.name}
                        name={m.name}
                        image={m.image}
                        focusable={copy === 0}
                      />
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* the notch's concave corners: a quarter circle cut from a white square, so
   the photo's edge curves smoothly into and out of the label */
const CORNER =
  'pointer-events-none absolute h-7 w-7 bg-[radial-gradient(circle_at_100%_0%,transparent_27.5px,white_28px)]';

function Card({
  name,
  image,
  focusable,
}: {
  name: string;
  image: string;
  focusable: boolean;
}) {
  return (
    <li className="w-[240px] shrink-0 sm:w-[280px] lg:w-[320px]">
      <a
        href="#book"
        tabIndex={focusable ? undefined : -1}
        onClick={(e) => {
          e.preventDefault();
          openDownloadModal();
        }}
        className="group relative block aspect-[333/421]"
      >
        {/* the photo clips to its own rounded box; the label below sits outside
            that clip, so its square corner fully covers the photo's rounded one
            instead of letting a sliver of the edge show through */}
        <span className="absolute inset-0 overflow-hidden rounded-card bg-teal-tint">
          {/* the card is cut to the photos' own proportions (333×421), so the
              whole photo shows with nothing cropped */}
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            sizes="320px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        </span>

        {/* the label sits in a notch cut out of the photo's bottom-left corner,
            in the page's own white, so it reads as part of the page rather than
            a chip laid on the picture */}
        <span className="absolute bottom-0 left-0 flex items-center gap-2.5 rounded-tr-[28px] bg-white py-3 pl-0 pr-6 sm:pt-4">
          <span aria-hidden className={cn(CORNER, 'bottom-full left-0')} />
          <span aria-hidden className={cn(CORNER, 'bottom-0 left-full')} />
          <span className="font-display text-xl font-medium tracking-[-0.02em] text-ink lg:text-2xl">
            {name}
          </span>
          <svg
            className="h-4 w-4 shrink-0 text-teal transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </a>
    </li>
  );
}
