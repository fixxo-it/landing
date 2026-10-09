"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/* The preloader fires `lab:ready` once its curtain lifts; intro animations
   wait on it so they play in view rather than behind the loader. */
declare global {
  interface Window {
    __labReady?: boolean;
  }
}

export function onReady(cb: () => void) {
  if (window.__labReady) {
    cb();
    return () => {};
  }
  window.addEventListener("lab:ready", cb, { once: true });
  return () => window.removeEventListener("lab:ready", cb);
}

/* Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger and the
   smooth scroll share one clock. Scrolling stays locked until the loader lifts. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    if (!window.__labReady) lenis.stop();
    const off = onReady(() => lenis.start());

    return () => {
      off();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}

/* Pulls its child toward the pointer and springs back on leave. */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block will-change-transform">
      {children}
    </div>
  );
}

/* Splits text into masked characters (`.char`) for staggered reveals. */
export function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${className}`} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span key={i} aria-hidden className="char inline-block will-change-transform">
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

/* Page-wide motion layer:
   - a hairline scroll-progress bar along the top
   - anything marked `data-skew` leans with scroll speed, then settles
   - a teal ripple blooms wherever you click
   - characters inside `data-jelly` hop and twist when the pointer passes */
export function ScrollFx() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      const skewers = gsap.utils.toArray<HTMLElement>("[data-skew]").map((el) => gsap.quickTo(el, "skewY", { duration: 0.6, ease: "power3" }));
      ScrollTrigger.create({
        onUpdate: (self) => {
          const lean = gsap.utils.clamp(-7, 7, self.getVelocity() / -350);
          skewers.forEach((to) => to(lean));
        },
      });
    });

    const settle = gsap
      .delayedCall(0.15, () =>
        gsap.utils.toArray<HTMLElement>("[data-skew]").forEach((el) => gsap.to(el, { skewY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" })),
      )
      .pause();
    const onScroll = () => settle.restart(true);
    window.addEventListener("scroll", onScroll, { passive: true });

    const ripple = (e: PointerEvent) => {
      const dot = document.createElement("span");
      dot.className = "pointer-events-none fixed z-[99] h-3 w-3 rounded-full border-2 border-teal";
      dot.style.left = `${e.clientX - 6}px`;
      dot.style.top = `${e.clientY - 6}px`;
      document.body.appendChild(dot);
      gsap.fromTo(dot, { scale: 0.4, opacity: 0.9 }, { scale: 9, opacity: 0, duration: 0.9, ease: "expo.out", onComplete: () => dot.remove() });
    };
    window.addEventListener("pointerdown", ripple);

    const hop = (e: PointerEvent) => {
      const char = (e.target as Element).closest?.(".char");
      if (!char || !char.closest("[data-jelly]") || gsap.isTweening(char)) return;
      gsap
        .timeline()
        .to(char, { y: "-0.22em", rotate: gsap.utils.random(-14, 14), duration: 0.22, ease: "power2.out" })
        .to(char, { y: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1.1, 0.35)" });
    };
    window.addEventListener("pointerover", hop);

    return () => {
      ctx.revert();
      settle.kill();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", ripple);
      window.removeEventListener("pointerover", hop);
    };
  }, []);

  return <div ref={bar} aria-hidden className="fixed inset-x-0 top-0 z-[85] h-[3px] origin-left scale-x-0 bg-teal-dark" />;
}

/* Film grain laid over the dark teal grounds, as on the live footer. */
export function Grain({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-[url(/img/Grainy.jpg)] bg-cover bg-center opacity-40 mix-blend-overlay ${className}`}
    />
  );
}
