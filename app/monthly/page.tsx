import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal, { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Section';
import { cn } from '@/lib/cn';
import SiteHeader from '@/components/sections/SiteHeader';
import CtaBanner from '@/components/sections/CtaBanner';
import SiteFooter from '@/components/sections/SiteFooter';
import DownloadModal from '@/components/DownloadModal';
import SplitText from '@/components/motion/SplitText';
import WaitlistForm from '@/components/monthly/WaitlistForm';
import { Starburst } from '@/components/monthly/Bits';
import CrayonArt from '@/components/monthly/CrayonArt';
import { CTA_BLOCK, GHOST } from '@/components/monthly/styles';
import { PhotoCard } from '@/components/monthly/PhotoCard';

/* Every term, price and date here comes from "FamCare Monthly Care Plans",
   updated 03 November 2026. Change the copy only alongside that document.
   The page follows a hire-with-confidence story: why you can
   trust it, how it works, what it costs, then sign up and questions. */

export const metadata: Metadata = {
  title: 'Monthly childcare plans | FamCare',
  description: 'A familiar full-time caregiver, 10 hours a day, 26 days a month, with free backup cover in Whitefield. Join the waitlist',
};

/* campaign type: Faculty Glyphic headings in near-black, Figtree for the rest */
const H2 = 'font-glyphic text-[2.25rem] leading-[1.1] text-ink lg:text-[3rem]';
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.14em] text-teal';
/* the same side padding as the hero and the rest of the site */
const W = 'mx-auto w-full max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32';
const SECTION = 'py-20 lg:py-28';
/* facts from the live site's hiring and safety sections */
const TRUST = [
  ['6', 'background checks', 'checks'],
  ['2', 'interview rounds', 'interview'],
  ['In-centre', 'training & assessment', 'training'],
  ['Live', 'Safety Centre on every visit', 'live'],
] as const;

const CONFIDENCE = [
  { title: 'Background verified', body: 'ID, address, criminal background and reference checks, before anyone meets a family', img: '/img/afterschoolcare.png' },
  { title: 'Free backup cover', body: 'If your caregiver is on leave, a trained backup covers up to 10 hours at no extra cost', img: '/img/SmartMatchingg.png' },
  { title: 'Trained and assessed', body: 'Classroom and hands-on training, then a practical assessment watched by a trainer', img: '/img/newborncare.png' },
  { title: 'Watched over, always', body: 'Our Safety Centre follows every visit, with SOS one tap away', img: '/img/SafetyCentrre.png' },
];

const STEPS = [
  { n: '01', title: 'Join the waitlist', body: 'Tell us your area and your child’s age. We’ll call when a slot opens', img: '/img/microservices/indoor-play.jpg', pos: 'object-center' },
  { n: '02', title: 'Try for 3 days', body: 'Meet up to 3 caregivers over a ₹4,499 trial', img: '/img/candidate.png', pos: 'object-top' },
  { n: '03', title: 'Pick your caregiver', body: 'Keep the one your child loves. We confirm timings and your 26 service days', img: '/img/infantcare.png', pos: 'object-center' },
  { n: '04', title: 'Monthly care begins', body: 'The same familiar face every day, with backup whenever they’re away', img: '/img/toddlercare.png', pos: 'object-center' },
];

/* real reviews, taken verbatim from the live site */
/* each window a little taller than the last */
const STEP_HEIGHT = ['h-[230px] lg:h-[320px]', 'h-[265px] lg:h-[380px]', 'h-[300px] lg:h-[440px]', 'h-[335px] lg:h-[495px]'];

/* the three reviews as old baby-announcement cards: colour, then the keepsake on each */
const VINTAGE = [
  { paper: '#F8E4DC', motif: 'M10 2.5h4v2l1.5 2.5h-7L10 4.5zM8 7h8a1 1 0 0 1 1 1v11a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 19V8a1 1 0 0 1 1-1zM7 12h3M7 16h3' },
  { paper: '#DCE9EC', motif: 'M19 14.5A8 8 0 0 1 9.5 5a8 8 0 1 0 9.5 9.5zM17 3l.8 2.2L20 6l-2.2.8L17 9l-.8-2.2L14 6l2.2-.8z' },
  { paper: '#F7EDCC', motif: 'M3 11h13a6.5 6.5 0 0 1-13 0zM3 11a6.5 6.5 0 0 1 6.5-6.5V11M16 11l2.5-5H21M6.5 19.5a1.5 1.5 0 1 0 0 .01M14.5 19.5a1.5 1.5 0 1 0 0 .01' },
];

const REVIEWS = [
  ['Experience was very good. We are very happy to have a caregiver from FamCare. She really took good care of my kids and was very professional as well.', 'Nikhil', 'Dad of 2 · Whitefield'],
  ['Pleasant experience, we always felt completely at ease knowing our child was in safe and caring hands.', 'Gayatri Panda', 'Mom of 1 · Varthur'],
  ['Very professional and good care, the caregiver is very experienced and handled the child very well.', 'Swapna', 'Mom of 1 · Whitefield'],
];

const FAQS = [
  ['What does the monthly plan include?', 'A familiar primary caregiver for 10 hours a day on 26 agreed service days each month, with backup and replacement cover managed by FamCare. Timings, service dates and offs are confirmed before service begins'],
  ['Can I try a caregiver before committing?', 'Yes. The 3-day trial costs ₹4,499 and lets you meet up to 3 different caregivers. It’s paid separately and isn’t adjusted against the monthly fee or deposit'],
  ['What happens when my caregiver is on leave?', 'We send a trained backup for up to 10 hours on your agreed service days, at no extra charge. Backup caregivers may be different from your primary caregiver'],
  ['Is there a lock-in?', 'Yes, a 3-month minimum from your monthly start date. Cancelling during the lock-in forfeits the ₹18,000 deposit'],
  ['How do I cancel?', 'After the lock-in, give one month’s notice. Monthly fees remain payable during the notice period'],
  ['When do I get my deposit back?', 'Within 7 working days of your last service date, after any dues and agreed deductions are settled'],
  ['Can I pause when we travel?', 'Yes, once each: a 7-day pause for ₹3,999 and a 15-day pause for ₹6,999. Service restarts the day after the pause ends, and must resume within 7 days'],
  ['Where is the monthly plan available?', 'We’re starting in Whitefield and supported nearby clusters. Join the waitlist and we’ll tell you when your area opens'],
];

export default function MonthlyPage() {
  return (
    <>
      <main className="bg-white">
        <SiteHeader light active="/monthly" />

        {/* 1. hero, after the campaign artwork */}
        <section className="relative overflow-hidden">
          <Container className="grid items-center gap-6 pb-10 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-4 lg:pb-14 lg:pt-32">
            <Stagger delay={0.1} step={0.12} className="relative z-10">
              <StaggerItem>
                <p className="text-lg font-semibold uppercase tracking-[0.04em] text-teal lg:text-2xl">Introducing</p>
              </StaggerItem>
              <StaggerItem>
                <h1 className="mt-4 font-glyphic text-[3.4rem] leading-[0.98] text-ink sm:text-[4.5rem] lg:text-[6rem] xl:text-[6.8rem]">
                  <span className="block">
                    <SplitText text="Full time" onMount delay={0.2} step={0.08} />
                  </span>
                  <span className="block">
                    <SplitText text="Monthly" onMount delay={0.35} />
                  </span>
                  <span className="block">
                    <SplitText text="Caregivers" onMount delay={0.5} />
                  </span>
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-ink-muted">
                  Verified, trained caregivers in Bengaluru. One familiar face, 10 hours a day
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a href="#waitlist" className={CTA_BLOCK}>
                    Join the waitlist
                  </a>
                  <a href="#how" className="font-semibold text-teal underline decoration-teal/30 underline-offset-4 transition-colors hover:decoration-teal">
                    See how it works
                  </a>
                </div>
              </StaggerItem>
            </Stagger>

            <div className="relative">
              <Reveal delay={0.3} y={60}>
                <Image
                  src="/img/joyful-playtime.png"
                  alt="A FamCare caregiver playing with a toddler among colourful toys"
                  width={1312}
                  height={1199}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full mix-blend-multiply"
                />
              </Reveal>
              {/* the burst sits over the photo's top-left corner, as in the campaign artwork */}
              <div className="absolute left-[-2%] top-[-2%] z-10 w-[34%] text-[clamp(0.8rem,1.6vw,1.6rem)] lg:left-[-12%] lg:top-[0%] lg:w-[36%]">
                <Starburst className="w-full" />
              </div>
            </div>
          </Container>
        </section>

        {/* 2. trust strip: open on the white page, only rules between the figures */}
        <section className="bg-white">
          <Container className="pt-6 lg:pt-8">
            <Reveal>
              <p className="font-glyphic text-[1.625rem] leading-[1.15] text-ink lg:text-[2.25rem]">
                Every FamCare caregiver comes with
              </p>
            </Reveal>
            <Stagger className="mt-6 grid sm:grid-cols-2 lg:mt-10 xl:grid-cols-4" step={0.08}>
              {TRUST.map(([big, small, art], i) => (
                <StaggerItem
                  key={small}
                  className={cn(
                    'flex items-center gap-4 border-line py-5 sm:py-6 xl:px-7 xl:py-2',
                    i > 0 && 'border-t',
                    i === 0 && 'sm:pr-6 xl:pl-0',
                    i === 1 && 'sm:border-l sm:border-t-0 sm:pl-6',
                    i === 2 && 'sm:pr-6 xl:border-l xl:border-t-0',
                    i === 3 && 'sm:border-l sm:pl-6 xl:border-t-0',
                  )}
                >
                  <CrayonArt art={art} small className="h-[72px] w-[72px] shrink-0 rounded-2xl" />
                  <div className="min-w-0">
                    <p className="flex items-center gap-2.5 whitespace-nowrap font-glyphic text-[2rem] leading-none text-teal-dark lg:text-[2.5rem] xl:text-[1.875rem] 2xl:text-[2.5rem]">
                      {big}
                      {big === 'Live' && (
                        <span aria-hidden className="relative flex h-2.5 w-2.5">
                          <span className="absolute inset-0 animate-ping rounded-full bg-teal-light/70 motion-reduce:animate-none" />
                          <span className="relative h-2.5 w-2.5 rounded-full bg-teal-light" />
                        </span>
                      )}
                    </p>
                    <p className="mt-2 text-[15px] leading-snug text-ink-muted lg:text-base">{small}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* 3. hire with confidence: the heading held in the middle of a wall of
            taped-up snapshots, the way a family pins up the people it trusts */}
        <section className={SECTION}>
          <div className={W}>
            <Stagger className="grid items-center gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10" step={0.1}>
              <div className="order-first text-center sm:col-span-2 lg:order-none lg:col-span-1 lg:col-start-2 lg:row-start-1">
                <h2 className={`mx-auto max-w-[12ch] ${H2}`}>
                  <SplitText text="To hire with confidence" />
                </h2>
                <a href="#waitlist" className={`${GHOST} mt-8`}>
                  Join the waitlist
                </a>
              </div>
              {[CONFIDENCE.slice(0, 2), CONFIDENCE.slice(2)].map((column, c) => (
                <div
                  key={c}
                  className={cn(
                    'grid gap-8 lg:row-start-1 lg:gap-12',
                    c === 0 ? 'lg:col-start-1' : 'lg:col-start-3 lg:pt-16',
                  )}
                >
                  {column.map((p, i) => (
                    <StaggerItem key={p.title}>
                      <div
                        className={cn(
                          'relative rounded-2xl border border-line bg-white p-3 shadow-float transition-transform duration-500 ease-out hover:rotate-0 hover:scale-[1.02] motion-reduce:transition-none',
                          (c + i) % 2 === 0 ? '-rotate-2' : 'rotate-2',
                        )}
                      >
                        <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-2 bg-[#E4FF5C]/80" />
                        <PhotoCard src={p.img} alt={p.title} className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
                        <div className="px-2 pb-2 pt-4">
                          <h3 className="font-glyphic text-2xl leading-tight text-teal-dark">{p.title}</h3>
                          <p className="mt-2 text-[15px] leading-snug text-ink-muted">{p.body}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 4. how it works: four arched windows growing taller along one ground
            line, with the sun coming up behind the last: the first day */}
        <section id="how" className={`${SECTION} scroll-mt-24 overflow-hidden bg-white`}>
          <div className={W}>
            <Reveal className="text-center">
              <p className={EYEBROW}>How it works</p>
              <h2 className={`mt-4 ${H2}`}>
                <SplitText text="From waitlist to your first day" />
              </h2>
            </Reveal>
            {/* swipes sideways on a phone, so the windows keep their shape */}
            <Stagger
              className="-mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:mt-14 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0"
              step={0.12}
            >
              {STEPS.map((s, i) => (
                <StaggerItem key={s.n} className="group w-[68vw] max-w-[300px] shrink-0 snap-center lg:w-auto lg:max-w-none">
                  <div className="relative flex h-[340px] items-end lg:h-[500px]">
                    {i === STEPS.length - 1 && (
                      <span aria-hidden className="absolute -right-6 top-0 h-40 w-40 rounded-full bg-[#E4FF5C] lg:-right-10 lg:h-56 lg:w-56" />
                    )}
                    <PhotoCard
                      src={s.img}
                      alt={s.title}
                      className={cn('w-full rounded-b-none rounded-t-full border-[6px] border-b-0 border-teal-tint', STEP_HEIGHT[i])}
                      imgClassName={cn(s.pos, 'transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none')}
                      sizes="(min-width: 1024px) 25vw, 68vw"
                    />
                  </div>
                  {/* the ground line, carried from window to window */}
                  <div className="relative border-t-2 border-teal-dark/25 pt-5">
                    <span className="absolute -top-[17px] left-0 flex h-8 w-8 items-center justify-center rounded-full bg-teal-dark text-xs font-semibold text-white">
                      {s.n}
                    </span>
                    <h3 className="mt-2 font-glyphic text-2xl leading-tight text-ink">{s.title}</h3>
                    <p className="mt-2 text-ink-muted">{s.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 5. parents love: the one dark panel, held to the page's column */}
        <section className="py-20 lg:py-28">
          <div className={W}>
            <div className="relative isolate overflow-hidden rounded-[32px] bg-teal-dark px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-20">
              <div aria-hidden className="grain-strong pointer-events-none absolute inset-0 -z-10" />
              <Reveal className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E4FF5C]">Parents love FamCare</p>
                <h2 className="mx-auto mt-4 max-w-[18ch] font-glyphic text-[2.25rem] leading-[1.1] text-white lg:text-[3rem]">
                  <SplitText text="Which keeps us going" />
                </h2>
                <p className="mt-4 text-white/70">Real reviews from parents who book FamCare caregivers today</p>
              </Reveal>
              <Stagger className="mt-12 grid gap-4 lg:grid-cols-3" step={0.12}>
                {REVIEWS.map(([q, name, meta], i) => (
                  <StaggerItem key={name} className="h-full">
                    <figure
                      className={cn(
                        'h-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none',
                        i === 0 ? 'lg:-rotate-1' : i === 2 ? 'lg:rotate-1' : '',
                      )}
                    >
                      <div className="vintage-card h-full p-5" style={{ backgroundColor: VINTAGE[i].paper }}>
                        <div className="flex h-full flex-col items-center border-4 border-double border-[#6B4A2F]/40 px-5 py-7 text-center text-[#4A3B2A]">
                          <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0 text-[#6B4A2F]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d={VINTAGE[i].motif} />
                          </svg>
                          <blockquote className="mt-5 flex-1 font-glyphic text-lg leading-snug">{q}</blockquote>
                          <span aria-hidden className="mt-5 text-[#6B4A2F]/60">
                            ~ ✦ ~
                          </span>
                          <figcaption className="mt-3">
                            <p className="font-glyphic text-2xl leading-none">{name}</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#4A3B2A]/70">{meta}</p>
                          </figcaption>
                        </div>
                      </div>
                    </figure>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* 7. availability + waitlist */}
        <section id="waitlist" className="relative isolate scroll-mt-24 overflow-hidden bg-teal-dark py-20 text-white lg:py-28">
          <div aria-hidden className="grain-strong pointer-events-none absolute inset-0 -z-10" />
          <div className={W}>
            <Reveal className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E4FF5C]">Find caregivers near you</p>
              <h2 className="mt-4 font-glyphic text-[2.25rem] leading-[1.1] text-white lg:text-[3rem]">
                <SplitText text="Is monthly care in your area?" />
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">Pick your area and join the waitlist. We&rsquo;ll call you when a slot opens</p>
            </Reveal>
            <Reveal className="mt-10" delay={0.1}>
              <WaitlistForm />
            </Reveal>
          </div>
        </section>

        {/* 8. faq, after the form */}
        <section className="border-t border-line">
          <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-glyphic text-[2.6rem] leading-[1.06] text-ink lg:text-[4rem] lg:leading-[1.02]">
                <SplitText text="Frequently asked questions" />
              </h2>
            </Reveal>
            <Stagger className="divide-y divide-line border-y border-line" step={0.05}>
              {FAQS.map(([q, a], i) => (
                <StaggerItem key={q}>
                  <details open={i === 0} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                      <span className="text-lg font-semibold text-ink lg:text-xl">{q}</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-teal transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-muted">{a}</p>
                  </details>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        <CtaBanner heading="max-w-[14ch] font-glyphic text-[2.6rem] leading-[1.06] text-balance text-ink lg:text-[4rem] lg:leading-[1.02]" />
      </main>
      <SiteFooter />
      <DownloadModal />
    </>
  );
}
