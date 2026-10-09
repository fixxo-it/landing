"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, Grain } from "./core";

/* ── Problem → how we solve it ────────────────────────────────────
   Pinned, in the dark. The everyday problems appear one at a time and each
   drops into a single glass, which fills as they pile up. After the last
   one the glass cracks and bursts; in the blackness a ray of light opens
   from above, and FamCare's answer rises inside it. */
const PROBLEMS = [
  "Agencies want a monthly contract",
  "Sitters from a WhatsApp forward, unverified",
  "Family isn't always close by",
  "An afternoon of calls to find anyone",
];

const SOLUTIONS = [
  ["10 min", "A trained caregiver at your door, booked by the hour"],
  ["6 checks", "Background verified, interviewed twice, trained in-centre"],
  ["Live", "Tracked through every visit, with SOS one tap away"],
];

/* the glass breaks around an impact point into triangular shards; the rim
   runs clockwise from the top-left corner */
const IMPACT = [46, 58];
const RIM = [
  [0, 0],
  [30, 0],
  [66, 0],
  [100, 0],
  [96, 40],
  [90, 100],
  [62, 100],
  [34, 100],
  [10, 100],
  [4, 44],
];
const SHARDS = RIM.map((p, i) => {
  const q = RIM[(i + 1) % RIM.length];
  return {
    clip: `polygon(${IMPACT[0]}% ${IMPACT[1]}%, ${p[0]}% ${p[1]}%, ${q[0]}% ${q[1]}%)`,
    dx: ((IMPACT[0] + p[0] + q[0]) / 3 - IMPACT[0]) * 9,
    dy: ((IMPACT[1] + p[1] + q[1]) / 3 - IMPACT[1]) * 6,
  };
});
const CRACKS = RIM.map(([x, y]) => `M${IMPACT[0]} ${IMPACT[1]} L${(IMPACT[0] + x) / 2 + 4} ${(IMPACT[1] + y) / 2 - 5} L${x} ${y}`);
// the glass itself: a tumbler, wider at the rim than the base
const TUMBLER = "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)";

export function ProblemSolution() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = root.current!;
      const glass = el.querySelector<HTMLElement>(".ps-glass")!;
      const pills = gsap.utils.toArray<HTMLElement>(".ps-pill");
      // where a pill must travel to land on the pile inside the glass
      const landY = (i: number) => () => {
        const g = glass.getBoundingClientRect();
        const pill = pills[i];
        const top = pill.offsetTop + el.getBoundingClientRect().top;
        return g.bottom - 28 - (i + 1) * pill.offsetHeight * 0.42 - top;
      };

      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, pin: true, scrub: 1, end: "+=480%", invalidateOnRefresh: true } });
      tl.fromTo(".ps-glass-wrap", { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" });

      pills.forEach((pill, i) => {
        const at = 0.5 + i * 1.15;
        tl.fromTo(
          pill,
          { opacity: 0, y: -40, scale: 0.85, filter: "blur(10px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "power3.out" },
          at,
        )
          // hold, then drop into the glass, shrinking and tumbling
          .to(pill, { y: landY(i), scale: 0.42, rotation: [-9, 7, -5, 10][i], duration: 0.5, ease: "power2.in" }, at + 0.65)
          .to(pill, { keyframes: { y: ["+=0", "-=18", "+=18"] }, duration: 0.2, ease: "power1.out" }, at + 1.15)
          .to(".ps-liquid", { scaleY: (i + 1) * 0.2, duration: 0.3, ease: "back.out(2)" }, at + 1.12)
          .fromTo(".ps-splash", { scale: 0.3, opacity: 0.8 }, { scale: 1.6, opacity: 0, duration: 0.3 }, at + 1.12);
      });

      // the break: cracks run, the glass shudders, then bursts
      const B = 0.5 + PROBLEMS.length * 1.15 + 0.1;
      tl.fromTo(".ps-crack path", { opacity: 0 }, { opacity: 1, stagger: 0.025, duration: 0.08 }, B)
        .to(".ps-glass-wrap", { keyframes: { x: [0, -10, 9, -7, 6, -3, 0] }, duration: 0.3 }, B + 0.2)
        .to(".ps-crack", { opacity: 0, duration: 0.1 }, B + 0.52)
        .to(".ps-liquid", { scaleY: 0, opacity: 0, duration: 0.25 }, B + 0.5)
        .to(
          ".ps-shard",
          {
            x: (k) => SHARDS[k % SHARDS.length].dx + gsap.utils.random(-60, 60),
            y: (k) => SHARDS[k % SHARDS.length].dy + gsap.utils.random(80, 380),
            rotation: () => gsap.utils.random(-140, 140),
            rotationX: () => gsap.utils.random(-80, 80),
            opacity: 0,
            duration: 0.9,
            ease: "power2.in",
          },
          B + 0.5,
        )
        .to(
          pills,
          { x: () => gsap.utils.random(-500, 500), y: "+=" + 420, rotation: () => gsap.utils.random(-90, 90), opacity: 0, duration: 0.9, ease: "power2.in" },
          B + 0.5,
        )
        .fromTo(".ps-flash", { opacity: 0 }, { keyframes: { opacity: [0, 0.6, 0] }, duration: 0.3 }, B + 0.5)
        // darkness, then the ray of hope
        .to(".ps-dark", { opacity: 1, duration: 0.5 }, B + 0.9)
        .fromTo(".ps-beam", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.9, ease: "power2.out" }, B + 1.3)
        .fromTo(".ps-pool", { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, B + 1.7)
        .fromTo(".ps-motes", { opacity: 0 }, { opacity: 1, duration: 0.6 }, B + 1.8)
        .fromTo(
          ".ps-sol",
          { opacity: 0, y: 50, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.22, duration: 0.7, ease: "power3.out" },
          B + 2.0,
        )
        .to({}, { duration: 0.8 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="how-it-works" className="relative h-screen overflow-hidden bg-[#071a1b] text-white">
      <Grain />

      {/* each problem appears here, then falls into the glass */}
      {PROBLEMS.map((p) => (
        <div
          key={p}
          className="ps-pill absolute inset-x-0 top-[16vh] z-20 mx-auto w-fit rounded-full border border-white/25 bg-white/10 px-7 py-4 text-center text-2xl font-semibold opacity-0 shadow-[0_0_40px_-8px_rgba(255,255,255,.25)] backdrop-blur-md md:text-[2.4vw]"
        >
          {p}
        </div>
      ))}

      {/* the glass */}
      <div className="ps-glass-wrap absolute bottom-[7vh] left-1/2 z-10 h-[46vh] w-[min(36vh,62vw)] -translate-x-1/2 [perspective:900px]">
        <div className="ps-glass relative h-full w-full">
          {/* the liquid the problems pile into */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: TUMBLER }}>
            <div className="ps-liquid absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-gradient-to-t from-teal/70 to-teal-light/30" />
            <span className="ps-splash absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full border-2 border-teal-light/60 opacity-0" />
          </div>
          {/* ten shards of glass, each showing its own slice of the tumbler */}
          {SHARDS.map((s, k) => (
            <div key={k} className="ps-shard absolute inset-0" style={{ clipPath: s.clip }}>
              <div
                className="absolute inset-0 border border-white/40 bg-gradient-to-br from-white/25 via-white/5 to-white/15 shadow-[inset_0_0_30px_rgba(255,255,255,.15)]"
                style={{ clipPath: TUMBLER }}
              />
              <div className="absolute inset-y-[8%] left-[17%] w-[2.5%] rounded-full bg-white/20 blur-[1px]" style={{ clipPath: TUMBLER }} />
            </div>
          ))}
          <svg className="ps-crack pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {CRACKS.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={1.6}
                vectorEffect="non-scaling-stroke"
                opacity={0}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="ps-flash pointer-events-none absolute inset-0 z-30 bg-white opacity-0" />
      <div className="ps-dark pointer-events-none absolute inset-0 z-30 bg-black/80 opacity-0" />

      {/* the ray of hope */}
      <div className="pointer-events-none absolute inset-0 z-40">
        <div
          className="ps-beam absolute left-1/2 top-0 h-full w-[120vw] -translate-x-1/2 origin-top opacity-0"
          style={{
            clipPath: "polygon(46% 0, 54% 0, 82% 100%, 18% 100%)",
            background: "linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(228,255,92,.16) 45%, rgba(3,196,201,.10) 100%)",
            filter: "blur(6px)",
          }}
        />
        <div className="ps-pool absolute bottom-[-12vh] left-1/2 h-[30vh] w-[80vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,.35),transparent)] opacity-0" />
        <div className="ps-motes absolute inset-0 opacity-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/80"
              style={{
                left: `${36 + ((i * 37) % 28)}%`,
                top: `${20 + ((i * 53) % 70)}%`,
                animation: `lab-bob ${3 + (i % 4)}s ease-in-out ${i * -0.4}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center px-5 text-center">
        <h2
          data-skew
          className="ps-sol max-w-[18ch] text-[10vw] font-bold leading-[0.95] opacity-0 [text-shadow:0_0_40px_rgba(255,255,255,.35)] md:text-[5.2vw]"
        >
          So we made care something you book in a tap.
        </h2>
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-12">
          {SOLUTIONS.map(([k, v]) => (
            <div key={k} className="ps-sol opacity-0">
              <div className="text-5xl font-bold md:text-6xl">{k}</div>
              <p className="mx-auto mt-2 max-w-[16rem] text-white/75">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services: pinned horizontal scroll ───────────────────────────── */
const SERVICES = [
  ["Newborn care", "/img/newborncare.png", "0–3 months"],
  ["Infant day care", "/img/infantcare.png", "3–12 months"],
  ["Toddler companion", "/img/toddlercare.png", "1–3 years"],
  ["After school care", "/img/afterschoolcare.png", "4–12 years"],
  ["Elderly care", "/img/elderlycare.png", "60+ years · Coming soon"],
] as const;

export function HorizontalServices() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const horiz = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + distance(),
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card) => {
        const img = card.querySelector(".svc-img");
        gsap.fromTo(
          img,
          { xPercent: -14, scale: 1.25 },
          {
            xPercent: 14,
            scale: 1.25,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: horiz, start: "left right", end: "right left", scrub: true },
          },
        );
        gsap.fromTo(
          card,
          { rotate: 5, yPercent: 8 },
          {
            rotate: -5,
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: horiz, start: "left right", end: "right left", scrub: true },
          },
        );
      });

      // pointer: the card tilts toward the cursor in 3D, a glare follows it,
      // the photo slides the other way and the title lifts off the card
      gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card) => {
        const tilt = card.querySelector<HTMLElement>(".svc-tilt")!;
        const media = card.querySelector<HTMLElement>(".svc-media")!;
        const glare = card.querySelector<HTMLElement>(".svc-glare")!;
        const title = card.querySelector<HTMLElement>(".svc-title")!;
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.5, ease: "power3" });
        const mx = gsap.quickTo(media, "x", { duration: 0.6, ease: "power3" });
        const my = gsap.quickTo(media, "y", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * 22);
          ry(px * 22);
          mx(-px * 40);
          my(-py * 40);
          glare.style.background = `radial-gradient(420px circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,.38), transparent 55%)`;
        };
        const enter = () => {
          gsap.to(tilt, { scale: 1.05, duration: 0.6, ease: "expo.out" });
          gsap.to(title, { z: 70, duration: 0.6, ease: "expo.out" });
          gsap.to(glare, { opacity: 1, duration: 0.4 });
        };
        const leave = () => {
          rx(0);
          ry(0);
          mx(0);
          my(0);
          gsap.to(tilt, { scale: 1, duration: 1.1, ease: "elastic.out(1, 0.45)" });
          gsap.to(title, { z: 0, duration: 0.8, ease: "expo.out" });
          gsap.to(glare, { opacity: 0, duration: 0.5 });
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
      });

      gsap.to(".svc-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + distance(), scrub: true, invalidateOnRefresh: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="relative h-screen overflow-hidden">
      <div ref={track} className="flex h-full w-max items-center gap-[5vw] pl-5 pr-[10vw] md:pl-10">
        <div className="w-[80vw] shrink-0 md:w-[48vw]">
          <h2 data-skew className="text-[13vw] font-bold leading-[0.88] text-ink md:text-[7.5vw]">
            From newborn to school going
          </h2>
        </div>
        {SERVICES.map(([name, img, tag], i) => (
          <article key={name} className="svc-card relative h-[62vh] w-[72vw] shrink-0 [perspective:1100px] md:h-[72vh] md:w-[32vw]">
            <div className="svc-tilt relative h-full w-full overflow-hidden rounded-[2rem] bg-teal-dark [transform-style:preserve-3d]">
              <div className="svc-img absolute inset-0">
                <div className="svc-media absolute -inset-8">
                  <Image src={img} alt={name} fill sizes="(min-width: 768px) 36vw, 80vw" className="object-cover" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/90 via-teal-dark/10 to-transparent" />
              <div className="svc-glare pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay" />
              <span className="absolute right-6 top-4 text-[7rem] font-bold leading-none text-white/20">0{i + 1}</span>
              <div className="svc-title absolute inset-x-6 bottom-6 text-white">
                <span className="mb-3 inline-block rounded-full border border-white/40 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">{tag}</span>
                <h3 className="text-4xl font-bold md:text-5xl">{name}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute inset-x-5 bottom-8 h-px bg-teal-dark/15 md:inset-x-10">
        <div className="svc-progress h-full origin-left scale-x-0 bg-teal-dark" />
      </div>
    </section>
  );
}

/* ── Safe360: pinned dial ─────────────────────────────────────────
   One long pinned stretch; the dial spins through 360° while the four
   Safe360 pillars wipe in over each other. Copy and photos are the ones
   the live site's Safe360 section uses. */
const LAYERS = [
  [
    "Safety Center",
    "Someone's always watching.",
    "Our Safety Center keeps an eye on every visit while it's happening, so your baby is never out of sight.",
    "/img/SafetyCentrre.png",
    "50% 40%",
  ],
  [
    "Geofencing",
    "Your baby doesn't leave without you knowing.",
    "Your baby can't be taken out of the house without you knowing. If anything moves that shouldn't, you'll hear about it right away.",
    "/img/GeoFencing.png",
    "50% 40%",
  ],
  [
    "Live escalation",
    "If something's wrong, we move fast.",
    "The moment anything looks off during a visit, it's flagged and escalated straight away, so you're never the one who has to spot it first.",
    "/img/LiveEscalation.png",
    "50% 25%",
  ],
  [
    "Smart matching",
    "We don't send just anyone.",
    "Every caregiver is matched to your baby by proven experience with similar ages, verified training and, once you've booked before, how they've done with your family.",
    "/img/SmartMatchingg.png",
    "50% 45%",
  ],
] as const;

export function Safe360() {
  const root = useRef<HTMLElement>(null);
  const deg = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: "+=" + LAYERS.length * 90 + "%",
          onUpdate: (self) => {
            deg.current!.textContent = String(Math.round(self.progress * 360));
            setActive(Math.min(LAYERS.length - 1, Math.floor(self.progress * LAYERS.length)));
          },
        },
      });
      tl.to(".s360-ring", { rotate: 360, duration: LAYERS.length }, 0);
      gsap.utils.toArray<HTMLElement>(".s360-panel").forEach((panel, i) => {
        if (i === 0) return;
        tl.fromTo(panel, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, i - 0.3);
        tl.fromTo(panel.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 0.9, ease: "power2.out" }, i - 0.3);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="safety-360" className="relative h-screen overflow-hidden bg-teal-dark text-white">
      <Grain />
      <div className="relative grid h-full grid-cols-1 gap-6 px-5 py-20 md:grid-cols-2 md:px-10">
        <div className="relative flex flex-col justify-between">
          <div>
            <h2 data-skew className="text-[16vw] font-bold leading-[0.85] md:text-[9vw]">
              Safe360
              <span className="align-top text-[0.4em] font-light text-white/40">
                <span ref={deg}>0</span>°
              </span>
            </h2>
          </div>

          {/* one point at a time, in step with the photo on the right */}
          <div>
            <div className="mb-6 flex gap-2">
              {LAYERS.map(([eyebrow], i) => (
                <span key={eyebrow} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
                  <span className={`block h-full bg-white transition-transform duration-700 ${i <= active ? "translate-x-0" : "-translate-x-full"}`} />
                </span>
              ))}
            </div>
            <div className="relative min-h-[15rem] md:min-h-[17rem]">
              {LAYERS.map(([eyebrow, title, body], i) => (
                <div
                  key={title}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    i === active ? "translate-y-0 opacity-100 blur-0" : i < active ? "-translate-y-10 opacity-0 blur-sm" : "translate-y-10 opacity-0 blur-sm"
                  }`}
                >
                  <p className="mb-3 text-sm font-semibold uppercase text-white/50">
                    {String(i + 1).padStart(2, "0")} / {String(LAYERS.length).padStart(2, "0")} · {eyebrow}
                  </p>
                  <h3 className="max-w-[16ch] text-4xl font-bold leading-[1.05] md:text-[3.2rem]">{title}</h3>
                  <p className="mt-4 max-w-md text-lg text-white/70">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden items-center justify-center md:flex">
          <svg className="s360-ring absolute h-[min(44vw,84vh)] w-[min(44vw,84vh)]" viewBox="0 0 200 200" aria-hidden>
            <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(255,255,255,.12)" />
            {Array.from({ length: 72 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="2"
                x2="100"
                y2={i % 6 ? 6 : 12}
                stroke={i === 0 ? "#E4FF5C" : i % 18 ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.85)"}
                strokeWidth={i % 18 ? 0.6 : 1.4}
                transform={`rotate(${i * 5} 100 100)`}
              />
            ))}
          </svg>
          {/* a radar sweep turning behind the photo, and three dots in orbit */}
          <div
            aria-hidden
            className="absolute aspect-square h-[min(80vh,42vw)] animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(255,255,255,.22)_360deg)]"
          />
          {[
            ["h-[min(78vh,41vw)]", "animate-[spin_9s_linear_infinite]"],
            ["h-[min(76vh,40vw)]", "animate-[spin_14s_linear_infinite_reverse]"],
            ["h-[min(82vh,43vw)]", "animate-[spin_21s_linear_infinite]"],
          ].map(([size, spin], i) => (
            <div key={i} aria-hidden className={`absolute aspect-square ${size} ${spin}`}>
              <span
                className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${i === 1 ? "h-2 w-2 bg-lime" : "h-2.5 w-2.5 bg-white"}`}
              />
            </div>
          ))}
          {/* a circle that sits just inside the dial; each photo is centred on its subject */}
          <div className="relative aspect-square h-[min(70vh,37vw)] overflow-hidden rounded-full bg-teal shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
            {LAYERS.map(([eyebrow, title, , img, focus], i) => (
              <div key={title} className="s360-panel absolute inset-0" style={i ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}>
                <Image src={img} alt={eyebrow} fill sizes="30vw" className="object-cover" style={{ objectPosition: focus }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Interlude: zoom through the full stop ────────────────────────
   Pinned. "Safe by design." sits on white; scrolling dives the camera into
   its full stop until the dot swallows the screen in dark teal, which hands
   straight over to the Safe360 section below. */
export function ZoomDot() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = root.current!;
      const text = el.querySelector<HTMLElement>(".zd-text")!;
      const dot = el.querySelector<HTMLElement>(".zd-dot")!;
      // zoom about the dot's centre, measured relative to the text block; the
      // dot is a drawn circle rather than a "." glyph, so its box is exact
      const origin = () => {
        const t = text.getBoundingClientRect();
        const d = dot.getBoundingClientRect();
        return `${d.left - t.left + d.width / 2}px ${d.top - t.top + d.height / 2}px`;
      };
      gsap
        .timeline({ scrollTrigger: { trigger: el, pin: true, scrub: 1, end: "+=170%", invalidateOnRefresh: true } })
        .fromTo(".zd-word", { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" })
        // the dot glides to the middle of the screen as the camera dives in
        .fromTo(
          text,
          { scale: 1, x: 0, y: 0, transformOrigin: origin },
          {
            scale: 90,
            x: () => window.innerWidth / 2 - (dot.getBoundingClientRect().left + dot.offsetWidth / 2),
            y: () => window.innerHeight / 2 - (dot.getBoundingClientRect().top + dot.offsetHeight / 2),
            duration: 2,
            ease: "power3.in",
          },
          "+=0.2",
        )
        .to(".zd-word", { opacity: 0, duration: 0.6 }, "-=1.2")
        .set(".zd-flood", { opacity: 1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="zd-flood absolute inset-0 bg-teal-dark opacity-0">
        <Grain />
      </div>
      <h2 className="zd-text text-[14vw] font-bold leading-none text-ink md:text-[11vw]">
        <span className="zd-word inline-block">Safe</span> <span className="zd-word inline-block">by</span> <span className="zd-word inline-block">design</span>
        <span className="zd-dot ml-[0.03em] inline-block h-[0.15em] w-[0.15em] rounded-full bg-teal-dark" />
      </h2>
    </section>
  );
}
