'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Container, SectionHeading } from '@/components/ui/Section';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

/* The four Safe360 features as a scroll-stacked deck — the same four screens,
   and the same words, as the app's own Safe360 walkthrough. Copy on the left,
   the feature's photo on the right. */
type Pillar = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  /* the photos are portrait and the frame is landscape on desktop, so each
     one is cropped around its own subject */
  focus: string;
};

const PILLARS: Pillar[] = [
  {
    eyebrow: 'Safety Center',
    title: "Someone's always watching.",
    body: "Our Safety Center keeps an eye on every visit while it's happening, so your baby is never out of sight.",
    image: '/img/SafetyCentrre.png',
    focus: 'object-[50%_40%]',
  },
  {
    eyebrow: 'Geofencing',
    title: "Your baby doesn't leave without you knowing.",
    body: "Your baby can't be taken out of the house without you knowing. If anything moves that shouldn't, you'll hear about it right away.",
    image: '/img/geofencing.png',
    focus: 'object-[50%_40%]',
  },
  {
    eyebrow: 'Live escalation',
    title: "If something's wrong, we move fast.",
    body: "The moment anything looks off during a visit, it's flagged and escalated straight away, so you're never the one who has to spot it first.",
    image: '/img/LiveEscalation.png',
    focus: 'object-[50%_25%]',
  },
  {
    eyebrow: 'Smart matching',
    title: "We don't send just anyone.",
    body: "Every caregiver is matched to your baby by proven experience with similar ages, verified training and, once you've booked before, how they've done with your family.",
    image: '/img/SmartMatchingg.png',
    focus: 'object-[50%_45%]',
  },
];

export default function Safe360Dial() {
  /* one progress value across the whole stack; each card reads its own slice
     of it to shrink back as the cards after it land on top */
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="safety-360" className="relative scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading size="lg" title="Safe360" />

        {/* Every card sits in its own screen-tall slot and sticks to the top of
            it, so as you scroll the next card rides up over the one before and
            the stack builds; scrolling back up peels them off in reverse. Each
            card sticks a little lower than the last, leaving the edges of the
            ones beneath showing. */}
        <div ref={stackRef} className="relative">
          {PILLARS.map((p, i) => (
            <StackCard
              key={p.eyebrow}
              pillar={p}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StackCard({
  pillar,
  index,
  progress,
}: {
  pillar: Pillar;
  index: number;
  progress: MotionValue<number>;
}) {
  const reduced = useSafeReducedMotion();
  const n = PILLARS.length;
  /* from the moment this card lands until the stack ends it eases back a step
     for every card that will land on top of it — the last card never shrinks */
  const scale = useTransform(
    progress,
    [index / n, 1],
    [1, reduced ? 1 : 1 - (n - 1 - index) * 0.04]
  );

  return (
    <div className="sticky top-0 flex h-[100svh] items-start pt-6 lg:pt-8">
      <motion.article
        style={{ scale, top: index * 28 }}
        className="relative grid w-full origin-top overflow-hidden rounded-card border border-line bg-white shadow-[0_-12px_40px_-24px_rgba(11,31,32,0.35)] lg:h-[min(560px,calc(100svh-8rem))] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      >
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="text-xs font-semibold uppercase tracking-[-0.02em] text-teal">
            {pillar.eyebrow}
          </p>
          <h3 className="mt-3 max-w-[16ch] font-display text-h3 font-semibold text-ink lg:mt-4 lg:text-[2.75rem] lg:leading-[1.08]">
            {pillar.title}
          </h3>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-ink-muted lg:mt-6 lg:text-lg">
            {pillar.body}
          </p>
        </div>

        <div className="relative h-[300px] overflow-hidden bg-teal-tint sm:h-[380px] lg:h-full">
          <Image
            src={pillar.image}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover ${pillar.focus}`}
          />
        </div>
      </motion.article>
    </div>
  );
}
