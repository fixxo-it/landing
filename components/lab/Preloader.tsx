"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "./core";

const WORDS = ["Verified", "Trained", "Tracked", "Kind", "On time", "FamCare"];

/* Counts to 100 while a word ticker cycles, then lifts like a curtain and
   tells the page it can start its intro. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const count = { v: 0 };
      const tl = gsap.timeline();
      tl.to(count, {
        v: 100,
        duration: 2.4,
        ease: "power3.inOut",
        onUpdate: () => {
          num.current!.textContent = String(Math.round(count.v)).padStart(3, "0");
        },
      })
        .to(bar.current, { scaleX: 1, duration: 2.4, ease: "power3.inOut" }, 0)
        .to(words.current, { yPercent: (-100 * (WORDS.length - 1)) / WORDS.length, duration: 2.4, ease: `steps(${WORDS.length - 1})` }, 0)
        .to(".pl-fade", { opacity: 0, duration: 0.3 }, "+=0.15")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" })
        .add(() => {
          window.__labReady = true;
          window.dispatchEvent(new Event("lab:ready"));
        }, "-=0.75")
        .add(() => setGone(true));
    }, root);
    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      className="fixed inset-0 z-[95] flex flex-col justify-between bg-teal-dark p-6 text-white md:p-10"
    >
      <div className="pl-fade flex items-center justify-between text-sm font-semibold">
        <span>FamCare</span>
        <span className="text-white/60">Bengaluru · 2026</span>
      </div>

      <div className="pl-fade h-[18vw] overflow-hidden md:h-[11vw]">
        <div ref={words}>
          {WORDS.map((w) => (
            <div key={w} className="h-[18vw] text-[16vw] font-bold leading-[1.1] md:h-[11vw] md:text-[10vw]">
              {w}
            </div>
          ))}
        </div>
      </div>

      <div className="pl-fade">
        <div className="flex items-end justify-between">
          <span className="max-w-[16rem] text-sm font-medium text-white/70">Baby care you can trust, at your door in ten minutes</span>
          <span ref={num} className="text-[22vw] font-bold leading-[0.8] md:text-[14vw]">
            000
          </span>
        </div>
        <div className="mt-4 h-[2px] bg-white/15">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-white" />
        </div>
      </div>
    </div>
  );
}
