"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, Grain, SplitChars } from "./core";
import { openAppQr } from "./AppQr";

/* ── Microservices: a reel where each one gets the stage ─────────────
   Pinned. The microservices arrive one at a time: each card swings in from
   the right to centre stage at full size, its name fills the backdrop,
   then it bows out to the left as the next one comes in. A strip of
   thumbnails along the bottom tracks where you are. */
const MICRO = [
  "Pram walk",
  "Freshen up",
  "Feed time",
  "Nap time",
  "Indoor play",
  "Screen off",
  "Outdoor play",
  "Meal break",
  "Meeting care",
  "Me time",
  "Fitness break",
];
const img = (name: string) => `/img/microservices/${name.toLowerCase().replace(/ /g, "-")}.jpg`;

export function MicroReel() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".mr-card");
      const n = cards.length;
      gsap.set(cards, { xPercent: -50, yPercent: -50, transformPerspective: 1400 });
      gsap.set(cards, { x: () => window.innerWidth * 0.55, rotate: 14, rotationY: -75, scale: 0.6, opacity: 0 });

      const stage = root.current!.querySelector<HTMLElement>(".mr-stage")!;
      const sx = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3" });
      const sy = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3" });
      root.current!.addEventListener("pointermove", (e) => {
        sx((e.clientX / window.innerWidth - 0.5) * 18);
        sy(-(e.clientY / window.innerHeight - 0.5) * 14);
      });
      root.current!.addEventListener("pointerleave", () => {
        sx(0);
        sy(0);
      });

      // each card holds centre stage for HOLD before the swap, so every
      // microservice gets its own moment rather than a constant blur
      const HOLD = 0.7;
      const SWAP = 1;
      // the opening line plays out first, like a sentence finishing itself
      const INTRO = 2.6;
      const startOf = (i: number) => INTRO + HOLD + (i - 1) * (HOLD + SWAP);
      const tl: gsap.core.Timeline = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: SWAP },
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: "+=" + (n * 70 + 200) + "%",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * tl.duration();
            setActive(gsap.utils.clamp(0, n - 1, Math.floor((t - startOf(1) - SWAP / 2) / (HOLD + SWAP)) + 1));
          },
        },
      });
      // "Need a hand for…" → "just an hour?" lands huge → the line lifts away
      // and the first card swings in to start the reel
      tl.fromTo(".mr-l1 .char", { yPercent: 120 }, { yPercent: 0, stagger: 0.02, duration: 0.5, ease: "power3.out" }, 0)
        .fromTo(
          ".mr-l2 .char",
          { yPercent: 130, rotate: 12, scale: 0.6 },
          { yPercent: 0, rotate: 0, scale: 1, stagger: 0.04, duration: 0.8, ease: "back.out(1.6)" },
          0.5,
        )
        .fromTo(".mr-l3", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 1.4)
        .to(".mr-lines", { yPercent: -40, opacity: 0, duration: 0.6, ease: "power3.in" }, 1.95)
        .to(".mr-intro", { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power3.inOut" }, 2.0)
        .to(cards[0], { x: 0, rotate: 0, rotationY: 0, scale: 1, opacity: 1, duration: 0.8 }, INTRO - 0.5);
      cards.forEach((card, i) => {
        if (i === 0) return;
        // the outgoing card bows out to the left as this one takes the stage
        tl.to(cards[i - 1], { x: () => -window.innerWidth * 0.55, rotate: -14, rotationY: 75, scale: 0.6, opacity: 0 }, startOf(i))
          .to(card, { x: 0, rotate: 0, rotationY: 0, scale: 1, opacity: 1 }, startOf(i))
          .fromTo(card.querySelector("img"), { scale: 1.35 }, { scale: 1 }, startOf(i));
      });
      tl.to({}, { duration: HOLD });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="microservices" className="relative h-screen overflow-hidden bg-teal-tint">
      {/* the opening line, after zero.university's "and it costs… zero" */}
      <div className="mr-intro absolute inset-0 z-30 flex items-center justify-center bg-white px-5" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
        <div className="mr-lines text-center">
          <p className="mr-l1 text-3xl font-semibold text-ink md:text-5xl">
            <SplitChars text="Need a hand for…" />
          </p>
          <p className="mr-l2 grain-text mt-2 whitespace-nowrap text-[17vw] font-bold leading-[1.1] md:text-[13vw]">
            <SplitChars text="just an hour?" />
          </p>
          <p className="mr-l3 mt-6 text-lg text-ink/60 md:text-2xl">11 microservices, booked for exactly the moment you need.</p>
        </div>
      </div>
      {/* the active name, huge, behind the card */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {MICRO.map((name, i) => (
          <span
            key={name}
            className={`absolute whitespace-nowrap text-[17vw] font-bold leading-none text-teal-dark/[0.07] transition-all duration-700 ease-out ${
              i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-16 opacity-0" : "translate-y-16 opacity-0"
            }`}
          >
            {name}
          </span>
        ))}
      </div>

      <div className="absolute left-5 top-24 z-20 max-w-xs md:left-10 md:top-28">
        <h2 data-skew className="text-5xl font-bold leading-[0.95] text-ink md:text-[4.2vw]">
          Care by <span className="text-teal">the hour</span>
        </h2>
        <p className="mt-4 text-base text-teal-dark/70 md:text-lg">Book a caregiver for exactly the moment you need.</p>
      </div>

      <div className="absolute right-5 top-24 z-20 text-right md:right-10 md:top-28">
        <div className="text-5xl font-bold tabular-nums md:text-7xl">
          {String(active + 1).padStart(2, "0")}
          <span className="font-light text-teal-dark/30">/{MICRO.length}</span>
        </div>
        <div className="relative mt-2 h-8 overflow-hidden text-xl font-medium md:text-2xl">
          {MICRO.map((name, i) => (
            <span
              key={name}
              className={`absolute right-0 whitespace-nowrap transition-all duration-500 ${i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"}`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="mr-stage absolute inset-0 [transform-style:preserve-3d]">
        {MICRO.map((name) => (
          <div
            key={name}
            className="mr-card absolute left-1/2 top-1/2 aspect-[333/421] h-[58vh] overflow-hidden rounded-[2rem] bg-white shadow-[0_50px_100px_-40px_rgba(1,77,79,.5)] md:h-[64vh]"
          >
            <Image src={img(name)} alt={name} fill sizes="50vh" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-1.5 px-5 md:bottom-8 md:gap-2">
        {MICRO.map((name, i) => (
          <div
            key={name}
            className={`relative aspect-[333/421] w-[7vw] max-w-[44px] overflow-hidden rounded-md transition-all duration-500 md:rounded-lg ${
              i === active ? "-translate-y-2 opacity-100 ring-2 ring-teal-dark" : "opacity-40"
            }`}
          >
            <Image src={img(name)} alt="" fill sizes="44px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── What sits behind every booking: one caregiver's journey ─────────
   Pinned. Nine stages, from the day someone applies to the moment they are
   caring for your child. The caregiver's portrait rides a track along the
   bottom, lighting each stage as it passes; the big frame on the right
   opens onto that stage's picture, and the left side tells it in a line. */
const STAGES = [
  {
    phase: "Hire",
    title: "They apply, and we look for temperament first",
    body: "Patient, calm, tidy and kind. Everyone sits two rounds of interviews.",
    img: "/img/candidate.png",
    fit: "cover",
  },
  {
    phase: "Verify",
    title: "Six independent checks",
    body: "Government ID, address, criminal background, references and more, all cleared before anyone meets a family.",
    img: "/img/6layerverification-crop.png",
    fit: "contain",
  },
  {
    phase: "Train",
    title: "Classroom and hands-on training",
    body: "Baby care, feeding and sleep routines, hygiene, safe handling and emergency response.",
    img: "/img/newborncare.png",
    fit: "cover",
  },
  {
    phase: "Train",
    title: "Assessed, then certified",
    body: "They show a trainer what they've learnt. Only those who pass can be booked, and training is refreshed every quarter.",
    img: "/img/infantcare.png",
    fit: "cover",
  },
  {
    phase: "Match",
    title: "Ready at a hub near you",
    body: "Certified caregivers wait at FamCare hubs close to the families they serve.",
    img: "/img/SmartMatchingg.png",
    fit: "cover",
  },
  {
    phase: "Match",
    title: "Matched to your booking",
    body: "Chosen for experience with children your child's age and, once you've booked before, how they've done with your family.",
    img: "/img/assign.png",
    fit: "contain",
  },
  {
    phase: "Visit",
    title: "On the way in about 10 minutes",
    body: "You see their photo and profile, and follow them live in the app.",
    img: "/img/livetracking.gif",
    fit: "contain",
  },
  {
    phase: "Visit",
    title: "At your door, caring for your child",
    body: "Check their FamCare ID at the door, then get on with your hour.",
    img: "/img/hero-poster.jpg",
    fit: "cover",
  },
  {
    phase: "Visit",
    title: "Watched over the whole time",
    body: "Our Safety Center keeps an eye on every visit, with SOS one tap away.",
    img: "/img/SafetyCentrre.png",
    fit: "cover",
  },
] as const;
const PHASES = ["Hire", "Verify", "Train", "Match", "Visit"];

export function Journey() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const n = STAGES.length;
      const frames = gsap.utils.toArray<HTMLElement>(".jy-frame");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: "+=" + n * 55 + "%",
          onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
        },
      });
      // the portrait rides the track; the filled line follows it
      tl.fromTo(".jy-rider", { left: "0%" }, { left: "100%", duration: n }, 0).fromTo(".jy-fill", { scaleX: 0 }, { scaleX: 1, duration: n }, 0);
      frames.forEach((f, i) => {
        if (i === 0) return;
        tl.fromTo(f, { clipPath: "circle(0% at 50% 100%)" }, { clipPath: "circle(150% at 50% 100%)", duration: 0.6, ease: "power2.inOut" }, i - 0.3).fromTo(
          f.querySelector(".jy-img"),
          { scale: 1.3, rotate: 4 },
          { scale: 1, rotate: 0, duration: 0.9, ease: "power2.out" },
          i - 0.3,
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const stage = STAGES[active];

  return (
    <section ref={root} id="journey" className="relative h-screen overflow-hidden bg-white">
      <div className="grid h-full grid-rows-[1fr_auto] gap-6 px-5 pb-10 pt-24 md:px-10 md:pt-28">
        <div className="grid min-h-0 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-14">
          <div className="flex flex-col justify-between">
            <div>
              <h2 data-skew className="max-w-[14ch] text-[9vw] font-bold leading-[0.95] text-ink md:text-[3.6vw]">
                What sits behind every booking
              </h2>
              <p className="mt-3 max-w-md text-teal-dark/65">One caregiver&rsquo;s journey, from the day they apply to the hour they spend with your child.</p>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span className="grain-text text-[18vw] font-bold leading-[0.8] tabular-nums md:text-[8vw]">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-xl font-semibold text-teal-dark/35">/ {String(STAGES.length).padStart(2, "0")}</span>
              </div>
              <div className="relative mt-5 min-h-[10rem]">
                {STAGES.map((s, i) => (
                  <div
                    key={s.title}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      i === active ? "translate-y-0 opacity-100 blur-0" : i < active ? "-translate-y-8 opacity-0 blur-sm" : "translate-y-8 opacity-0 blur-sm"
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase text-teal">{s.phase}</p>
                    <h3 className="mt-2 max-w-[20ch] text-3xl font-bold leading-[1.05] text-ink md:text-[2.4vw]">{s.title}</h3>
                    <p className="mt-3 max-w-md text-lg text-teal-dark/70">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* the picture for each stage, each opening over the last */}
          <div className="relative hidden min-h-0 overflow-hidden rounded-[2rem] bg-teal-tint shadow-[0_40px_80px_-40px_rgba(1,77,79,.5)] md:block">
            {STAGES.map((s, i) => (
              <div key={s.title} className="jy-frame absolute inset-0 bg-teal-tint" style={i ? { clipPath: "circle(0% at 50% 100%)" } : undefined}>
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  unoptimized={s.img.endsWith(".gif")}
                  sizes="45vw"
                  className={`jy-img ${s.fit === "cover" ? "object-cover" : "object-contain p-10"}`}
                />
              </div>
            ))}
            <span className="grain-bg absolute left-5 top-5 rounded-full bg-teal-dark px-4 py-1.5 text-sm font-semibold text-white">{stage.phase}</span>
          </div>
        </div>

        {/* the track: phases above, nine stops, the caregiver riding along */}
        <div>
          <div className="mb-3 grid grid-cols-5 text-xs font-semibold text-teal-dark/45 md:text-sm">
            {PHASES.map((p) => (
              <span key={p} className={stage.phase === p ? "text-teal-dark" : ""}>
                {p}
              </span>
            ))}
          </div>
          <div className="relative mx-6 h-2">
            <div className="absolute inset-0 rounded-full bg-teal-dark/10" />
            <div className="jy-fill grain-bg absolute inset-0 origin-left rounded-full bg-teal-dark" />
            {STAGES.map((s, i) => (
              <span
                key={s.title}
                className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-colors duration-500 ${i <= active ? "bg-teal-dark" : "bg-teal-dark/20"}`}
                style={{ left: `${(i / (STAGES.length - 1)) * 100}%` }}
              />
            ))}
            <div className="jy-rider absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 animate-ping rounded-full bg-teal/30" />
              <span className="relative block h-14 w-14 overflow-hidden rounded-full border-[3px] border-white bg-teal-tint shadow-[0_10px_25px_-8px_rgba(1,77,79,.7)] md:h-16 md:w-16">
                <Image src="/img/candidate.png" alt="" fill sizes="64px" className="object-cover object-top" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials: a 3D carousel ──────────────────────────────────
   The reviews stand in a ring; scrolling turns the ring, so each one swings
   round to face you in turn. */
const QUOTES = [
  [
    "Initially I had my inhibitions, but due to some office call and a small baby to take care simultaneously, I decided to give FamCare a try.",
    "Puja Baranwal",
    "Whitefield · Mom of 1",
  ],
  [
    "Excellent childcare app! Very easy to use and helps me quickly find reliable babysitter and childcare support when needed.",
    "Siwani Dubey",
    "Varthur · Mom of 1",
  ],
  [
    "Experience was very good. We are very happy to have a caregiver from FamCare. She really took good care of my kids and was very professional as well.",
    "Nikhil",
    "Whitefield · Dad of 2",
  ],
  ["Pleasant experience, we always felt completely at ease knowing our child was in safe and caring hands.", "Gayatri Panda", "Varthur · Mom of 1"],
  ["It was a seamless experience, the babysitter was calm, accommodating, and took great care of the baby.", "Archana Kammar", "Whitefield · Mom of 1"],
  ["Very satisfied with the caregiver's service, she took care of the baby very calmly and kept her engaged.", "Archana KK", "Varthur · Mom of 1"],
  ["Very professional and good care, the caregiver is very experienced and handled the child very well.", "Swapna", "Whitefield · Mom of 1"],
  ["Very good experience with the caregiver, she was very professional and polite. She managed the baby very well.", "Neha", "Varthur · Mom of 1"],
] as const;

/* Illustrated stand-in avatars, drawn rather than photographed so nobody
   mistakes them for the reviewers themselves. One look per review, in order;
   Nikhil is the dad. */
type Look = { man?: boolean; skin: string; hair: string; style: "long" | "bun" | "bob" | "short" | "curly"; top: string };
const LOOKS: Look[] = [
  { skin: "#C68863", hair: "#1E1410", style: "long", top: "#014D4F" },
  { skin: "#8D5B3E", hair: "#140D0A", style: "bun", top: "#06555B" },
  { man: true, skin: "#A86F4C", hair: "#17100C", style: "short", top: "#014D4F" },
  { skin: "#D9A07B", hair: "#3A2418", style: "bob", top: "#06555B" },
  { skin: "#B47A55", hair: "#1A110D", style: "curly", top: "#014D4F" },
  { skin: "#9C6646", hair: "#221510", style: "long", top: "#06555B" },
  { skin: "#C88E66", hair: "#2B1A12", style: "bun", top: "#014D4F" },
  { skin: "#E0AE8A", hair: "#120C09", style: "bob", top: "#06555B" },
];

function Avatar({ look, className = "" }: { look: Look; className?: string }) {
  const { skin, hair, style, top, man } = look;
  return (
    <svg viewBox="0 0 64 64" className={`rounded-full bg-white/70 ring-2 ring-teal-dark/80 ${className}`} aria-hidden>
      <defs>
        <clipPath id="av-clip">
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath="url(#av-clip)">
        {/* hair that falls behind the shoulders */}
        {style === "long" && <path d="M16 30c0-12 7-19 16-19s16 7 16 19v24H16z" fill={hair} />}
        {style === "curly" && <circle cx="32" cy="30" r="19" fill={hair} />}
        {/* shoulders and neck */}
        <path d="M8 66c2-12 11-18 24-18s22 6 24 18z" fill={top} />
        <rect x="27" y="38" width="10" height="10" rx="4" fill={skin} />
        {/* face */}
        <ellipse cx="32" cy="29" rx="11" ry="12.5" fill={skin} />
        {/* hair on top */}
        {style === "short" && <path d="M20.5 27c0-9 5-14 11.5-14s11.5 5 11.5 14c-2-5-6-7-11.5-7s-9.5 2-11.5 7z" fill={hair} />}
        {style === "bob" && <path d="M19 33c-2-13 4-21 13-21s15 8 13 21l-2.5-1c0-7-4-11-10.5-12-6.5 1-10.5 5-10.5 12z" fill={hair} />}
        {(style === "long" || style === "bun" || style === "curly") && (
          <path d="M20.5 26c1-8 5.5-12.5 11.5-12.5S42.5 18 43.5 26c-3-4-7-6-11.5-6s-8.5 2-11.5 6z" fill={hair} />
        )}
        {style === "bun" && <circle cx="32" cy="12" r="6" fill={hair} />}
        {man && <path d="M24.5 36c2 4 5 5.5 7.5 5.5s5.5-1.5 7.5-5.5c-1 6-4 8.5-7.5 8.5s-6.5-2.5-7.5-8.5z" fill={hair} opacity=".85" />}
        {/* eyes and smile */}
        <circle cx="27.5" cy="29" r="1.3" fill="#1A1210" />
        <circle cx="36.5" cy="29" r="1.3" fill="#1A1210" />
        <path d="M28 34.5c2.3 2 5.7 2 8 0" stroke="#1A1210" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Reviews() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".rv-card");
      const n = cards.length;
      const step = 360 / n;
      const radius = () => (cards[0].offsetWidth / 2 / Math.tan(Math.PI / n)) * 1.18;
      const place = (turn: number) => {
        cards.forEach((card, i) => {
          const angle = i * step + turn;
          const facing = Math.cos((angle * Math.PI) / 180);
          gsap.set(card, {
            rotationY: angle,
            transformOrigin: `50% 50% ${-radius()}px`,
            opacity: 0.12 + 0.88 * Math.max(0, facing) ** 2,
          });
        });
      };
      const ring = { turn: 0 };
      place(0);
      gsap.to(ring, {
        turn: -step * (n - 1),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: "+=" + n * 45 + "%",
          invalidateOnRefresh: true,
          onRefresh: () => place(ring.turn),
        },
        onUpdate: () => {
          place(ring.turn);
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="reviews" className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-teal-tint px-5">
      <h2 data-skew className="absolute inset-x-5 top-24 text-center text-[11vw] font-bold leading-[0.95] text-ink md:top-28 md:text-[4.2vw]">
        What parents say
      </h2>

      <div className="relative mt-24 h-[52vh] w-full [perspective:2000px]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {QUOTES.map(([quote, name, meta], i) => (
            <article
              key={name}
              className="rv-card absolute left-1/2 top-1/2 -ml-[min(42vw,190px)] -mt-[24vh] h-[48vh] w-[min(84vw,380px)] [backface-visibility:hidden]"
            >
              {/* the inner card bobs on its own beat; the ring turns the outer one */}
              <div
                style={{ animation: `lab-bob ${4 + (i % 3)}s ease-in-out ${i * -0.7}s infinite` }}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-[#ecff86] bg-gradient-to-br from-[#f6ffc4] via-[#e4ff5c] to-[#cfee2f] p-7 text-teal-dark shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_40px_70px_-30px_rgba(150,190,10,.75)] md:p-8"
              >
                {/* a holographic sheen sweeping across */}
                <span
                  aria-hidden
                  style={{ animation: `lab-sheen 3.6s ease-in-out ${i * 0.45}s infinite` }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
                <span aria-hidden className="pointer-events-none absolute -right-6 -top-10 text-[11rem] font-bold leading-none text-teal-dark/[0.08]">
                  &ldquo;
                </span>
                <span className="grain-bg relative w-fit rounded-full bg-teal-dark px-3 py-1 text-xs font-semibold text-[#e4ff5c]">{meta.split(" · ")[0]}</span>
                <blockquote className="relative text-xl font-bold leading-snug md:text-[1.45rem]">{quote}</blockquote>
                <div className="relative flex items-center gap-3">
                  <Avatar look={LOOKS[i % LOOKS.length]} className="h-12 w-12 shrink-0" />
                  <div className="text-sm">
                    <div className="font-bold">{name}</div>
                    <div className="text-teal-dark/65">{meta.split(" · ")[1]}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────
   The live site's questions. Rows rise in as the list arrives; hovering a
   row wipes a tint across it, and opening one rolls the answer down with
   the plus turning into a cross. */
const FAQS = [
  [
    "Trust & safety",
    "How are FamCare caregivers verified?",
    "Every caregiver goes through two interviews, identity and address checks, background verification, training, and a practical skills assessment before they can take bookings.",
  ],
  [
    "Trust & safety",
    "Will I know who is coming to my home?",
    "Yes. As soon as a caregiver is assigned, you can see their photo and profile in the app and track them on the way. When they arrive, please check their FamCare ID before letting them in.",
  ],
  [
    "Training",
    "What training does a caregiver complete?",
    "Every caregiver receives classroom and hands-on training in baby care, feeding and sleep routines, hygiene, safe handling, and emergency response. They also learn parent communication, household etiquette, and how to follow your family's care instructions. They must pass a practical assessment before taking bookings.",
  ],
  [
    "Training",
    "Is training refreshed over time?",
    "Yes. Every caregiver completes refresher training each quarter. When service feedback highlights a gap, our trainer provides individual coaching.",
  ],
  [
    "Booking",
    "How quickly can someone reach me?",
    "Our median arrival time for instant bookings is 10 minutes in serviceable areas. It can take longer depending on caregiver availability, traffic and weather conditions such as heavy rain. You can also schedule care in advance.",
  ],
  [
    "Booking",
    "Can I cancel or reschedule?",
    "You can cancel free of charge at least 4 hours before your booking starts, and reschedule free of charge at least 2 hours before. After that, the full booking amount is charged, with no refund.",
  ],
  [
    "Caregivers",
    "Can I request the same caregiver again?",
    "Yes, with our Preferred Caregiver feature. Once you've marked at least 3 caregivers you like, we'll do our best to send one of them, depending on who's available. If none of them is free, you'll get another caregiver trained to the same FamCare standards.",
  ],
  [
    "Service area",
    "Where is FamCare available?",
    "We currently serve selected areas of Whitefield, Varthur, and Mahadevapura/Garudachar Palya in Bengaluru. Enter your address in the app to check availability.",
  ],
  ["Service area", "Can I request my area?", "Yes. Share your location in the app, and we'll notify you when FamCare becomes available nearby."],
] as const;

export function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fq-row",
        { opacity: 0, y: 60, rotationX: -35 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.07,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current!.querySelector(".fq-list"), start: "top 80%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="faq" className="relative px-5 py-[16vh] md:px-10">
      <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 data-skew data-jelly className="text-[11vw] font-bold leading-[0.95] text-ink md:text-[4.6vw]">
            <SplitChars text="Questions," />
            <br />
            <SplitChars text="answered" />
          </h2>
          <p className="mt-5 max-w-sm text-lg text-teal-dark/65">Everything parents ask us before their first booking. Still unsure? Talk to us.</p>
          <div className="mt-6 space-y-2 text-lg font-semibold text-ink">
            <a
              href="mailto:support@famcare.co.in"
              className="block w-fit underline decoration-teal-dark/25 underline-offset-4 transition-colors hover:decoration-teal-dark"
            >
              support@famcare.co.in
            </a>
            <a
              href="tel:+919535711078"
              className="block w-fit underline decoration-teal-dark/25 underline-offset-4 transition-colors hover:decoration-teal-dark"
            >
              +91 95357 11078
            </a>
          </div>
          <button type="button" onClick={(e) => openAppQr(e)} className="btn-lime mt-8">
            Get the app
          </button>
        </div>

        <ul className="fq-list [perspective:1200px]">
          {FAQS.map(([, q, a], i) => {
            const isOpen = open === i;
            return (
              <li key={q} className="fq-row border-b border-teal-dark/10 first:border-t">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group relative flex w-full items-center gap-5 overflow-hidden px-2 py-6 text-left md:px-4"
                >
                  {/* tint that wipes across on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-teal-tint transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <span className="relative flex-1">
                    <span className="block text-lg font-semibold text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{q}</span>
                  </span>
                  <span
                    className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-2xl transition-all duration-500 ${
                      isOpen ? "rotate-[135deg] border-teal-dark bg-teal-dark text-white" : "border-teal-dark/20 text-teal-dark group-hover:rotate-90"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p
                    className={`overflow-hidden pl-2 pr-14 text-base leading-relaxed text-teal-dark/70 transition-all duration-700 md:pl-4 md:text-lg ${isOpen ? "pb-7 blur-0" : "blur-sm"}`}
                  >
                    {a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Footer: dark teal CTA with the QR phone, then the full site footer ── */
const FOOTER_COLS = [
  [
    "Services",
    [
      ["Newborn care", "/#services"],
      ["Infant day care", "/#services"],
      ["Toddler companion", "/#services"],
      ["After school care", "/#services"],
    ],
  ],
  [
    "Microservices",
    [
      "Pram walk",
      "Freshen up",
      "Feed time",
      "Nap time",
      "Indoor play",
      "Screen off",
      "Outdoor play",
      "Meal break",
      "Meeting care",
      "Me time",
      "Fitness break",
    ].map((m) => [m, "/#microservices"]),
  ],
  [
    "Company",
    [
      ["How it works", "/#how-it-works"],
      ["Safe360", "/#safety-360"],
      ["Our caregivers' journey", "/#journey"],
      ["What parents say", "/#reviews"],
      ["FAQs", "/#faq"],
      ["Join as a caregiver", "/join"],
    ],
  ],
  [
    "Legal",
    [
      ["Privacy policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms-and-conditions"],
      ["Refund policy", "/refund-policy"],
      ["Data deletion", "/data-deletion"],
    ],
  ],
] as [string, string[][]][];

const SOCIALS = [
  {
    label: "FamCare on LinkedIn",
    href: "https://www.linkedin.com/company/famcare-co-in/",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z",
  },
  {
    label: "FamCare on Instagram",
    href: "https://www.instagram.com/famcare.co.in",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.46.67.26 1.24.6 1.8 1.16.56.56.9 1.13 1.16 1.8.24.64.41 1.37.46 2.43.05 1.06.06 1.4.06 4.12 0 2.72-.01 3.06-.06 4.12-.05 1.06-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.16 1.8 4.9 4.9 0 0 1-1.8 1.16c-.64.24-1.37.41-2.43.46-1.06.05-1.4.06-4.12.06-2.72 0-3.06-.01-4.12-.06-1.06-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.8-1.16 4.9 4.9 0 0 1-1.16-1.8c-.24-.64-.41-1.37-.46-2.43C2.01 15.06 2 14.72 2 12c0-2.72.01-3.06.06-4.12.05-1.06.22-1.79.46-2.43.26-.67.6-1.24 1.16-1.8a4.9 4.9 0 0 1 1.8-1.16c.64-.24 1.37-.41 2.43-.46C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.36-1.02.67-.31.31-.5.6-.67 1.02-.12.31-.26.78-.3 1.65-.05 1.05-.06 1.37-.06 4.04 0 2.67.01 2.99.06 4.04.04.87.18 1.34.3 1.65.16.42.36.71.67 1.02.31.31.6.5 1.02.67.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06 2.67 0 2.99-.01 4.04-.06.87-.04 1.34-.18 1.65-.3.42-.16.71-.36 1.02-.67.31-.31.5-.6.67-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.04 0-2.67-.01-2.99-.06-4.04-.04-.87-.18-1.34-.3-1.65a2.73 2.73 0 0 0-.67-1.02 2.73 2.73 0 0 0-1.02-.67c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-1.99a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
];

export function FooterCta() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ft-word .char",
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: el.querySelector(".ft-word"), start: "top bottom", end: "top 75%", scrub: true },
        },
      );
      gsap.fromTo(
        ".ft-col",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el.querySelector(".ft-cols"), start: "top 90%" } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="download" className="relative overflow-hidden bg-teal-dark px-5 pt-[12vh] text-white md:px-10">
      <Grain />
      <div className="ft-cols relative grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,3fr)] lg:gap-10">
        <div className="ft-col">
          <p className="text-5xl font-bold leading-none">FamCare</p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            Caregivers in <span className="text-lime">10 minutes</span>
          </p>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-white/60">
            1st floor, Novel MSR Building, Subbaiah Reddy Colony, Marathahalli Village, Marathahalli, Bengaluru, Karnataka 560037
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <a href="tel:+919535711078" className="transition-colors hover:text-white">
              +91 95357 11078
            </a>
            <a href="mailto:support@famcare.co.in" className="transition-colors hover:text-white">
              support@famcare.co.in
            </a>
          </div>
        </div>
        {/* the link columns always sit side by side: two up on a phone, four across from there */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {FOOTER_COLS.map(([head, links]) => (
            <div key={head} className="ft-col">
              <p className="text-sm font-semibold uppercase text-white">{head}</p>
              <ul className="mt-5 space-y-3 text-sm text-white/65">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <span>© 2026 FamCare. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            Made with
            <svg className="h-3.5 w-3.5 fill-lime" viewBox="0 0 24 24" aria-label="love" role="img">
              <path d="M12 21s-7.5-4.7-9.6-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9Z" />
            </svg>
            in Bengaluru.
          </span>
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/70 transition-all hover:-translate-y-0.5 hover:text-white"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* the wordmark: 12% white, about a fifth of it sunk below the page edge */}
      <div
        aria-hidden
        data-jelly
        className="ft-word relative -mb-[3.6vw] mt-6 select-none whitespace-nowrap text-center text-[23vw] font-bold leading-[0.8] text-white/[0.12]"
      >
        <SplitChars text="FamCare" />
      </div>
    </footer>
  );
}

/* ── Header: hides on scroll down, returns on scroll up ────────────── */
export function Header() {
  const [hidden, setHidden] = useState(false);
  // the logo flips between white and dark teal to contrast with whatever is
  // actually behind it: the hero video, a dark teal section, a white one
  const [onDark, setOnDark] = useState(true);
  const logo = useRef<HTMLSpanElement>(null);
  const tag = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // sample the page under the logo every frame: the first visible element
    // with a solid background decides whether it is dark or light there
    const header = logo.current!.closest("header")!;
    let raf = 0;
    const sample = () => {
      const r = logo.current!.getBoundingClientRect();
      const stack = document.elementsFromPoint(r.left + r.width / 2, 34);
      let dark = false;
      for (const el of stack) {
        if (header.contains(el)) continue;
        const hidden = (() => {
          for (let n: Element | null = el; n; n = n.parentElement) if (getComputedStyle(n).opacity === "0") return true;
          return false;
        })();
        if (hidden) continue;
        const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
        if (!m || (m[3] !== undefined && Number(m[3]) < 0.5)) continue;
        const [rr, gg, bb] = m.map(Number);
        dark = 0.2126 * rr + 0.7152 * gg + 0.0722 * bb < 140;
        break;
      }
      setOnDark(dark);
      raf = requestAnimationFrame(sample);
    };
    raf = requestAnimationFrame(sample);

    // size the tagline so it runs exactly the width of the wordmark above it
    const fit = () => {
      const t = tag.current!;
      t.style.fontSize = "10px";
      t.style.fontSize = `${(10 * logo.current!.offsetWidth) / t.offsetWidth}px`;
    };
    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-5 py-4 transition-transform duration-500 md:px-10 ${hidden ? "-translate-y-full" : ""}`}
    >
      <Link href="/" className={`flex w-fit flex-col leading-none transition-colors duration-500 ${onDark ? "text-white" : "text-teal-dark"}`}>
        <span ref={logo} className="text-2xl font-bold">
          FamCare
        </span>
        <span ref={tag} className="mt-0.5 whitespace-nowrap font-bold">
          Caregivers in 10 mins
        </span>
      </Link>
      <nav className="flex items-center gap-3 rounded-full bg-white/80 p-1.5 text-sm font-medium text-teal-dark backdrop-blur-md">
        <Link href="/join" className="hidden px-3 md:inline">
          Become a caregiver
        </Link>
        <button type="button" onClick={(e) => openAppQr(e)} className="btn-lime btn-lime-sm">
          Get the app
        </button>
      </nav>
    </header>
  );
}
