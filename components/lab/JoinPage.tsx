"use client";

import { useEffect, useRef } from "react";
import ApplicationForm from "@/components/join/ApplicationForm";
import BenefitIcon from "@/components/join/BenefitIcon";
import HeroPhotoLoop from "@/components/join/HeroPhotoLoop";
import { gsap, Grain, SplitChars } from "./core";

/* The join page has no preloader, so it tells the shared motion layer
   (smooth scroll, intros) it can start straight away. */
export function MarkReady() {
  useEffect(() => {
    if (window.__labReady) return;
    window.__labReady = true;
    window.dispatchEvent(new Event("lab:ready"));
  }, []);
  return null;
}

/* Copy below is the live /join page's, word for word. */
const BENEFITS = [
  { icon: "heart", title: "Respect for your work", body: "Caregiving is skilled, meaningful work. Join a team that values the person behind the care" },
  { icon: "growth", title: "A career to grow in", body: "Build experience, strengthen your skills, and see a path forward in baby care" },
  { icon: "training", title: "Training that supports you", body: "Hands-on onboarding, skill checks and ongoing support, so you can care with confidence" },
  { icon: "shield", title: "Insurance support", body: "Eligible caregivers get insurance cover, as per the policy terms" },
  { icon: "calendar", title: "Attendance bonus", body: "Earn an extra bonus when you meet the month's attendance target" },
  { icon: "gift", title: "Joining bonus", body: "Eligible new caregivers can earn a joining bonus after meeting the required conditions" },
];

const STEPS = ["Submit this short form", "Speak with our hiring team", "Interview, checks and training"];

const BADGES = [
  ["Training", "left-[-8%] top-[14%]"],
  ["Insurance support", "right-[-10%] top-[38%]"],
  ["Joining bonus", "left-[-6%] bottom-[16%]"],
] as const;

/* ── Hero ─────────────────────────────────────────────────────────── */
export function JoinHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.15 })
        .fromTo(
          ".jh-mask",
          { clipPath: "inset(12% 10% 12% 10% round 2.5rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 1.4, ease: "expo.inOut" },
        )
        .fromTo("h1 .char", { yPercent: 115, rotate: 8 }, { yPercent: 0, rotate: 0, stagger: 0.025, duration: 1.2, ease: "expo.out" }, 0.6)
        .fromTo(".jh-fade", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" }, 0.9)
        .fromTo(".jh-photo", { opacity: 0, y: 120, rotate: 6, scale: 0.85 }, { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.4, ease: "expo.out" }, 0.7)
        .fromTo(".jh-badge", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: "back.out(2.4)" }, 1.3);

      // the photo card tilts toward the pointer, the badges float the other way
      const card = el.querySelector<HTMLElement>(".jh-tilt")!;
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3" });
      const bx = gsap.quickTo(".jh-badges", "x", { duration: 1, ease: "power3" });
      const by = gsap.quickTo(".jh-badges", "y", { duration: 1, ease: "power3" });
      const move = (e: PointerEvent) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        rx(-py * 14);
        ry(px * 18);
        bx(-px * 30);
        by(-py * 24);
      };
      el.addEventListener("pointermove", move);

      // scrolling away: copy lifts, photo sinks
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".jh-copy", { yPercent: -30, opacity: 0, ease: "none" }, 0)
        .to(".jh-photo", { yPercent: 15, ease: "none" }, 0);
      return () => el.removeEventListener("pointermove", move);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-white">
      <div className="jh-mask absolute inset-0 overflow-hidden bg-teal-dark text-white">
        <Grain />
        <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-12 px-5 pb-16 pt-32 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:gap-16">
          <div className="jh-copy">
            <p className="jh-fade text-sm font-semibold text-white/70">Caregiver careers · Bengaluru</p>
            <h1 data-jelly className="mt-6 text-[13vw] font-bold leading-[0.95] md:text-[6.6vw]">
              <span className="block whitespace-nowrap">
                <SplitChars text="Join FamCare" />
              </span>
              <span className="block text-white/80">
                <SplitChars text="Build a career" />
              </span>
              <span className="block text-white/80">
                <SplitChars text="in care" />
              </span>
            </h1>
            <p className="jh-fade mt-7 max-w-[620px] text-lg leading-relaxed text-white/70">
              At FamCare, your work is respected and your future matters. With proper training, insurance support and bonuses, you can earn more and care for
              families with real peace of mind
            </p>
            <div className="jh-fade mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#apply" className="btn-lime">
                Apply as a caregiver
              </a>
              <span className="text-white/70">A short application · About 3 minutes</span>
            </div>
          </div>

          <div className="jh-photo relative mx-auto w-full max-w-[420px] [perspective:1200px]">
            <div className="jh-tilt [transform-style:preserve-3d]">
              <HeroPhotoLoop className="w-full rounded-[28px] shadow-[0_50px_100px_-40px_rgba(0,0,0,.7)]" />
            </div>
            <div className="jh-badges pointer-events-none absolute inset-0">
              {BADGES.map(([label, pos], i) => (
                <span
                  key={label}
                  style={{ animation: `lab-bob ${3.5 + i}s ease-in-out ${i * -0.8}s infinite` }}
                  className={`jh-badge absolute ${pos} flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-sm font-semibold text-teal-dark shadow-[0_20px_40px_-15px_rgba(0,0,0,.5)] backdrop-blur`}
                >
                  <span className="h-2 w-2 rounded-full bg-teal-dark" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Benefits: six cards fly in out of 3D, then tilt under the pointer ── */
export function Benefits() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bn-card",
        { opacity: 0, y: 140, rotationX: -55, rotationY: (i) => (i % 3 === 0 ? -25 : i % 3 === 2 ? 25 : 0), z: -300 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          stagger: { each: 0.1, grid: "auto", from: "start" },
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: el.querySelector(".bn-grid"), start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".bn-head .char",
        { yPercent: 115 },
        { yPercent: 0, stagger: 0.02, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 75%" } },
      );

      gsap.utils.toArray<HTMLElement>(".bn-card").forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".bn-inner")!;
        const glare = card.querySelector<HTMLElement>(".bn-glare")!;
        const rx = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3" });
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * 16);
          ry(px * 16);
          glare.style.background = `radial-gradient(360px circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,.22), transparent 55%)`;
          glare.style.opacity = "1";
        });
        card.addEventListener("pointerleave", () => {
          rx(0);
          ry(0);
          glare.style.opacity = "0";
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-5 py-[16vh] md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <h2 data-skew className="bn-head max-w-[20ch] text-[11vw] font-bold leading-[0.95] text-ink md:text-[5vw]">
          <SplitChars text="A career that" />
          <br />
          <SplitChars text="looks after you" />
        </h2>
        <p className="mt-5 max-w-[680px] text-lg text-teal-dark/65 md:text-xl">Respect, training and rewards for every caregiver who joins the FamCare team</p>

        <div className="bn-grid mt-14 grid gap-5 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className="bn-card [perspective:1000px]">
              <div
                className={`bn-inner relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-shadow duration-500 [transform-style:preserve-3d] hover:shadow-[0_40px_80px_-35px_rgba(1,77,79,.6)] ${
                  i % 2 ? "border border-teal-dark/10 bg-teal-tint text-teal-dark" : "bg-teal-dark text-white"
                }`}
              >
                {i % 2 === 0 && <Grain />}
                <div className="bn-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
                <span className="pointer-events-none absolute -right-2 -top-6 text-[8rem] font-bold leading-none opacity-[0.08]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`relative [transform:translateZ(40px)] ${i % 2 === 0 ? "[&_*]:!text-white" : ""}`}>
                  <BenefitIcon name={b.icon} />
                </div>
                <h3 className="relative mt-6 text-2xl font-bold leading-tight [transform:translateZ(30px)]">{b.title}</h3>
                <p className={`relative mt-2 leading-snug ${i % 2 ? "text-teal-dark/70" : "text-white/70"}`}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[1000px] text-sm leading-relaxed text-teal-dark/55">
          * Your total earnings may be higher than in other roles when you qualify for available bonuses; actual earnings vary by role, attendance and
          eligibility. Insurance coverage and bonuses are subject to terms and conditions. Our hiring team will explain the amounts, coverage and payout
          timelines before you join
        </p>
      </div>
    </section>
  );
}

/* ── Steps: pinned; a line draws through three huge numbers ─────────── */
export function JoinSteps() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, pin: true, scrub: 1, end: "+=160%" } });
      tl.fromTo(".js-line", { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0);
      gsap.utils.toArray<HTMLElement>(".js-step").forEach((s, i) => {
        tl.fromTo(s.querySelector(".js-num"), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "back.out(1.8)" }, i)
          .fromTo(s.querySelector(".js-dot"), { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, i)
          .fromTo(s.querySelector(".js-text"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, i + 0.2);
      });
      tl.to({}, { duration: 0.5 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex h-screen flex-col justify-center overflow-hidden bg-teal-dark px-5 text-white md:px-10">
      <Grain />
      <div className="relative mx-auto w-full max-w-[1400px]">
        <h2 data-skew className="text-[11vw] font-bold leading-[0.95] md:text-[5vw]">
          How joining works
        </h2>
        <p className="mt-4 max-w-xl text-lg text-white/65">
          We&rsquo;ll review your details and contact shortlisted applicants to explain the role and next steps
        </p>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[calc(9vw+17px)] hidden h-[2px] bg-white/15 md:block">
            <div className="js-line h-full origin-left bg-white" />
          </div>
          <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map((s, i) => (
              <li key={s} className="js-step relative">
                <div className="overflow-hidden">
                  <span className="js-num block text-[30vw] font-bold leading-[0.9] text-white md:text-[10vw]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span
                  className={`js-dot relative z-10 mt-2 block h-5 w-5 rounded-full border-[3px] border-teal-dark ${i === STEPS.length - 1 ? "bg-lime" : "bg-white"}`}
                />
                <p className="js-text mt-5 max-w-[16rem] text-2xl font-semibold leading-snug">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── Apply: the live form, unchanged in what it asks and where it sends ── */
export function Apply() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ap-head .char",
        { yPercent: 115 },
        { yPercent: 0, stagger: 0.02, duration: 1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 75%" } },
      );
      gsap.fromTo(
        ".ap-form",
        { opacity: 0, y: 120, rotationX: -20, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current!.querySelector(".ap-form"), start: "top 85%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="apply" className="scroll-mt-24 px-5 py-[16vh] md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <h2 data-skew className="ap-head text-[11vw] font-bold leading-[0.95] text-ink md:text-[5vw]">
          <SplitChars text="Tell us a little" />
          <br />
          <SplitChars text="about yourself" />
        </h2>
        <p className="mt-5 max-w-xl text-lg text-teal-dark/65 md:text-xl">A short application, about 3 minutes. Our hiring team will be in touch.</p>
        <div className="ap-form mt-12 [perspective:1400px]">
          <ApplicationForm />
        </div>
      </div>
    </section>
  );
}
