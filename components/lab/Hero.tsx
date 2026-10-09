"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, onReady, SplitChars } from "./core";

/* the same loop as the live site: what a visit covers, so the headline
   itself shows what "care" means */
const WORDS = ["Baby Care", "Pram walk", "Indoor play", "Freshen up", "Feed time"];

/* Cycles through `words`, each sliding up as the last slides out. All the
   words share one grid cell, so the box is always as wide as the longest
   and the line never reflows mid-swap. */
function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 1600);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.12em] align-bottom">
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden={n !== i}
          className={`col-start-1 row-start-1 whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            n === i ? "translate-y-0 opacity-100" : n === (i - 1 + words.length) % words.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/* Full-bleed hero clip with the headline over it. The clip opens out from a
   rounded card when the loader lifts; scrolling away drifts the copy up
   faster than the video. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);

  /* revealed only once frames are actually moving, so a phone that blocks
     autoplay shows the poster rather than the OS play button */
  const videoRef = useCallback((node: HTMLVideoElement | null) => {
    if (!node) return;
    node.muted = true;
    if (!node.paused && node.readyState >= 3) setPlaying(true);
    else node.play()?.catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = root.current!;
      const frame = el.querySelector(".hero-frame");
      const video = el.querySelector(".hero-video");
      const chars = el.querySelectorAll("h1 .char");
      const fades = el.querySelectorAll(".hero-fade");

      gsap.set(frame, { clipPath: "inset(18% 12% 18% 12% round 2.5rem)" });
      gsap.set(video, { scale: 1.3 });
      gsap.set(chars, { yPercent: 115, rotate: 8 });
      gsap.set(fades, { opacity: 0, y: 30 });

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".hero-copy", { yPercent: -40, opacity: 0, ease: "none" }, 0)
        .to(".hero-parallax", { yPercent: 18, ease: "none" }, 0);

      // the clip drifts against the pointer, so the hero feels like a window
      const vx = gsap.quickTo(video, "x", { duration: 1.2, ease: "power3" });
      const vy = gsap.quickTo(video, "y", { duration: 1.2, ease: "power3" });
      const drift = (e: PointerEvent) => {
        vx((e.clientX / window.innerWidth - 0.5) * -40);
        vy((e.clientY / window.innerHeight - 0.5) * -30);
      };
      el.addEventListener("pointermove", drift);

      // runs after this context closes, so it targets elements, not selectors
      const off = onReady(() => {
        gsap
          .timeline()
          .to(frame, { clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 1.6, ease: "expo.inOut" })
          .to(video, { scale: 1.08, duration: 2.2, ease: "expo.out" }, 0)
          .to(chars, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.03, ease: "expo.out" }, 0.7)
          .to(fades, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, 1.1);
      });
      return () => {
        off();
        el.removeEventListener("pointermove", drift);
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-white">
      <div className="hero-frame absolute inset-0 overflow-hidden bg-teal-dark">
        <div className="hero-parallax absolute -inset-y-[10%] inset-x-0">
          <div className="hero-video absolute inset-0">
            <Image src="/img/hero-poster.jpg" alt="" aria-hidden fill priority sizes="100vw" className="object-cover" />
            <video
              ref={videoRef}
              src="/video/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              onPlaying={() => setPlaying(true)}
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>
        {/* scrim: white type has to hold up over every frame of the clip */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

        <div className="hero-copy absolute inset-x-0 bottom-0 px-5 pb-12 text-white md:px-10 md:pb-16">
          <h1 data-jelly className="text-[13vw] font-bold leading-[0.95] md:text-[7vw]">
            <span className="block whitespace-nowrap">
              <SplitChars text="Get" />{" "}
              <span className="hero-fade inline-block">
                <RotatingWord words={WORDS} />
              </span>
            </span>
            <span className="block">
              <SplitChars text="in 10 mins" />
            </span>
          </h1>
          <p className="hero-fade mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
            Trained, background verified caregivers at your door.
            <br />
            Live in Whitefield, Varthur &amp; Mahadevapura.
          </p>
        </div>
      </div>
    </section>
  );
}
