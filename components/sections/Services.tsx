"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Reveal, { DURATION, EASE, RISE, IN_VIEW } from "@/components/motion/Reveal";
import { openServiceBooking } from "@/components/DownloadModal";
import { cn } from "@/lib/cn";

/* services without a booking flow yet just announce themselves instead of
   deep linking into the app */
const COMING_SOON = new Set(["Elderly care"]);

/* every service shares one category, but each has its own sub-service id —
   that's the pair the deep link into the app needs. Elderly care has none
   yet since it opens the "coming soon" dialog instead. */
const CATEGORY_ID = "4c031045-1100-4d4a-9a8d-0b60251c0f8d";

/* cards without a dedicated photo fall back to the generic /img/service.png */
const SERVICES: [string, string?, string?][] = [
  ["Newborn care", "/img/newborncare.png", "bf18df9b-ff42-4457-b28d-850e9075d06a"],
  ["Infant day care", "/img/infantcare.png", "a2abbd02-6472-4171-a3fd-12e42d3036b1"],
  ["Toddler companion", "/img/toddlercare.png", "a82b6a6e-a05b-4a6c-8e4f-13da73caa95e"],
  ["After school care", "/img/afterschoolcare.png", "3ad7e368-898d-4256-b4eb-1251a0d4f944"],
  ["Elderly care", "/img/elderlycare.png"],
];

/* the last stretch of the pin is spent holding the settled strip, so the
   section never releases while the final card is still sliding in */
const HOLD = 0.2;
/* The strip starts this far right of its natural position, so the first card
   sits clear of the dissolve at the left edge rather than already half eaten by
   it before anyone has scrolled. It has to outrun the mask's own ramp — see the
   140px stop on the gradient below — with a little margin on top, so the card
   begins fully painted and only enters the fade once the strip is moving. */
const LEAD = 168;

export default function Services() {
  const reduced = useReducedMotion();
  const pinned = !reduced;
  const [comingSoon, setComingSoon] = useState(false);

  /* the scroll-driven pin is a lg-only effect — below it the strip is a plain
     overflow-x-auto native swipe, so the track must carry no transform at all
     there. Without this the framer `x` below was applied unconditionally on
     any screen size, starting the strip already offset by LEAD (168px) rather
     than flush against the left edge. */
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const wrapRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  /* watched on the strip's own viewport rather than on the track: the track is
     already carrying the scroll-driven x, and it runs far wider than the screen */
  const stripInView = useInView(viewportRef, IN_VIEW);

  /* How far the strip has to move for its last card to end up parked where the
     first one started: hard against the lead-in, clear of the dissolve, with
     the rest of the strip empty behind it. Measured off the last card rather
     than off the track's width, so adding a service does not need a new magic
     number and the end state does not depend on the card count.

     The two rects are read at the same moment, so the x the track is already
     carrying cancels out of the difference — no need to unwind the transform. */
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const last = track.lastElementChild;
      const offset = last
        ? last.getBoundingClientRect().left - track.getBoundingClientRect().left
        : 0;
      setTravel(pinned && wide ? Math.max(0, offset - LEAD) : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  /* the lead-in is travel too: the strip covers LEAD + travel over the same pin,
     so the pace is unchanged and the first card slides in from rest */
  const raw = useTransform(
    scrollYProgress,
    [0, 1 - HOLD],
    [pinned ? LEAD : 0, -travel],
  );
  /* stiff enough that the strip is not still catching up when the pin ends */
  const x = useSpring(raw, { stiffness: 260, damping: 40, mass: 0.3 });

  return (
    <section
      ref={wrapRef}
      id="services"
      /* The strip now runs its last card all the way over to the left edge
         rather than stopping once it has cleared the right one, which is around
         a third further to travel — the pin is longer by the same proportion so
         the cards still move at the pace they did, rather than whipping past. */
      className={cn("relative scroll-mt-24", pinned && "lg:h-[400vh]")}
    >
      <div
        className={cn(
          "flex flex-col gap-10 py-20 lg:gap-0 lg:py-0",
          pinned && "lg:sticky lg:top-0 lg:h-screen lg:flex-row lg:items-center lg:overflow-hidden",
        )}
      >
        {/* heading rail — the strip disappears into this edge */}
        <div className="relative z-20 shrink-0 bg-white px-6 sm:px-10 lg:w-[44%] lg:max-w-[560px] lg:px-16 xl:px-24 2xl:px-32">
          <Reveal
            as="h2"
            className="font-display text-h2 font-semibold text-balance text-ink lg:text-h2-lg"
          >
            From newborn to school going,
            <br className="hidden sm:block" /> we have the right{" "}
            {/* the swipe is a layer of its own rather than the span's own
                background: paint overshoots the word it marks, and a background
                stops dead at the box. The insets are what let it run past the
                letters top, bottom and both ends. */}
            <span className="relative inline-block text-teal">
              <span
                aria-hidden
                /* smaller overshoot on mobile: "Caregiver" is often the whole
                   last line at that width, and the full -3 inset was pushing
                   the swipe past the heading's own right edge */
                className="brush-highlight absolute -inset-x-1 -inset-y-1 bg-[#E4FF5C] sm:-inset-x-3"
              />
              <span className="relative">Caregiver</span>
            </span>
          </Reveal>
        </div>

        {/* strip viewport: native swipe on mobile, scroll-driven on desktop */}
        <div
          ref={viewportRef}
          className={cn(
            /* the vertical padding is headroom, not spacing: the viewport clips
               on both axes, so without it a card's hover lift and float shadow
               would be cut off at the top and bottom edges */
            "min-w-0 flex-1 overflow-x-auto py-6 lg:overflow-hidden lg:py-10",
            /* pulled back out again so the headroom costs no layout space */
            "-my-6 lg:-my-10",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            /* soft dissolve at the left edge so cards melt into the heading */
            pinned &&
              "lg:[mask-image:linear-gradient(to_right,transparent_0,black_140px)]",
          )}
        >
          <motion.div
            ref={trackRef}
            style={pinned && wide ? { x } : undefined}
            className="flex w-max gap-5 px-6 will-change-transform sm:px-10 lg:gap-6 lg:px-0"
            /* the strip fades up as the section arrives; the x above is the
               scroll-driven travel and is untouched by this */
            initial={{ opacity: 0, y: reduced ? 0 : RISE }}
            animate={
              stripInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : RISE }
            }
            transition={{ duration: DURATION, ease: EASE, delay: 0.1 }}
          >
            {SERVICES.map(([name, image, subServiceId]) => (
              <ServiceCard
                key={name}
                name={name}
                image={image}
                subServiceId={subServiceId}
                reduced={!!reduced}
                onComingSoon={() => setComingSoon(true)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/40 px-6 backdrop-blur-sm"
            onClick={() => setComingSoon(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-[560px] flex-col overflow-hidden rounded-3xl bg-white shadow-float"
            >
              <button
                type="button"
                onClick={() => setComingSoon(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-muted shadow-float ring-1 ring-line transition-colors duration-200 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {/* full width, stacked above the copy — on every breakpoint now,
                  not just from sm up */}
              <div className="relative h-[180px] w-full shrink-0">
                <Image
                  src="/img/elderlycare.png"
                  alt=""
                  aria-hidden
                  fill
                  sizes="560px"
                  className="object-cover"
                />
              </div>
              <div className="p-8 text-left">
                <p className="font-display text-h3 font-semibold text-ink">Coming soon</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Elderly care is on its way, we will let you know the moment it is live.
                </p>
                <button
                  type="button"
                  onClick={() => setComingSoon(false)}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-teal px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-dark"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCard({
  name,
  image,
  subServiceId,
  reduced,
  onComingSoon,
}: {
  name: string;
  image?: string;
  subServiceId?: string;
  reduced: boolean;
  onComingSoon: () => void;
}) {
  return (
    <motion.a
      href="#book"
      onClick={(e) => {
        e.preventDefault();
        if (COMING_SOON.has(name) || !subServiceId) {
          onComingSoon();
        } else {
          openServiceBooking(CATEGORY_ID, subServiceId);
        }
      }}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      /* no inner padding: the photo runs to the card edge, so the card's own
         radius has to clip it */
      className="group flex w-[240px] shrink-0 flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-float lg:w-[280px]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-teal-tint">
        {/* photographic ground behind the cutout, in place of the flat tint */}
        <Image
          src="/img/book3taps.jpg"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 280px, 240px"
          className="object-cover"
        />
        <Image
          src={image ?? "/img/service.png"}
          alt={name}
          fill
          sizes="(min-width: 1024px) 280px, 240px"
          /* cutout sits in the lower half of the canvas — anchor to the
             bottom so every tile frames the subject identically */
          className="object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />

        {/* scrim under the caption — the photo runs light in places, so white
            type needs its own ground rather than relying on the image */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 via-ink/45 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline justify-center gap-x-2 px-4 pb-4 text-center">
          <p className="text-lg font-semibold tracking-[-0.01em] text-white lg:text-xl">{name}</p>
          {COMING_SOON.has(name) && (
            <p className="text-sm text-white/75 lg:text-base">Coming soon</p>
          )}
        </div>
      </div>
    </motion.a>
  );
}
