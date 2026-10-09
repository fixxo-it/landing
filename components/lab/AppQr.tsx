"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, Grain, SplitChars } from "./core";

/* the store link behind the QR: OneLink sends iOS and Android to the right
   store, and opens the app if it is already installed */
const DIRECT_URL = "https://famcare.onelink.me/LK0E/cgr3j0s7";

/* Anything can open the popup; passing the click lets the teal flood start
   from the button that was pressed. */
export function openAppQr(e?: { clientX: number; clientY: number }) {
  window.dispatchEvent(new CustomEvent("lab:qr", { detail: e ? { x: e.clientX, y: e.clientY } : null }));
}

/* The phone mockup with the QR on its screen, as on the live site. */
export function PhoneQr({ className = "", scan = false }: { className?: string; scan?: boolean }) {
  return (
    <div className={`relative rounded-[46px] bg-neutral-900 p-[10px] shadow-[0_40px_80px_-30px_rgba(1,77,79,.55)] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-white px-4 pt-6">
        <span aria-hidden className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-teal-light/30 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-16 -right-14 h-44 w-44 rounded-full bg-teal/20 blur-3xl" />
        <span className="relative mx-auto block h-[22px] w-[86px] rounded-full bg-neutral-900" />
        <div className="relative mt-6 flex justify-center">
          <div className="relative overflow-hidden rounded-2xl bg-white p-3">
            <Image
              src="/img/download-qr.jpeg"
              alt="Scan the QR code to download the FamCare app"
              width={200}
              height={200}
              quality={100}
              className="block h-[200px] w-[200px]"
            />
            {scan && <span aria-hidden className="qr-scan absolute inset-x-2 top-3 h-[2px] rounded-full bg-teal shadow-[0_0_14px_3px_rgba(6,85,91,.5)]" />}
          </div>
        </div>
        <p className="relative mt-4 text-center text-sm font-semibold text-teal-dark">Scan to download FamCare</p>
      </div>
    </div>
  );
}

export function AppQrModal() {
  const [open, setOpen] = useState(false);
  const origin = useRef({ x: 0, y: 0 });
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<{ x: number; y: number } | null>).detail;
      origin.current = d ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      setOpen(true);
    };
    window.addEventListener("lab:qr", onOpen);
    return () => window.removeEventListener("lab:qr", onOpen);
  }, []);

  // build the entrance once the popup is in the DOM
  useEffect(() => {
    if (!open) return;
    const el = root.current!;
    const { x, y } = origin.current;
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .fromTo(".qr-flood", { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(150% at ${x}px ${y}px)`, duration: 0.9, ease: "expo.inOut" })
        .fromTo(".qr-ring", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 1.2, ease: "expo.out" }, 0.45)
        .fromTo(
          ".qr-phone",
          { y: 500, rotateX: 65, rotateZ: -12, scale: 0.6, opacity: 0 },
          { y: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1, duration: 1.3, ease: "expo.out" },
          0.5,
        )
        .fromTo(".qr-title .char", { yPercent: 120 }, { yPercent: 0, stagger: 0.025, duration: 0.9, ease: "expo.out" }, 0.65)
        .fromTo(".qr-fade", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" }, 0.9);
      // the scan line sweeps the code on a loop, and the rings breathe
      gsap.fromTo(".qr-scan", { y: 0 }, { y: 200, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.4 });
      gsap.to(".qr-ring", { scale: 1.08, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.3, delay: 1.6 });
    }, el);

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = useCallback(() => {
    if (!tl.current) return setOpen(false);
    tl.current
      .timeScale(1.8)
      .reverse()
      .eventCallback("onReverseComplete", () => setOpen(false));
  }, []);

  if (!open) return null;

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label="Download the FamCare app" className="fixed inset-0 z-[96]">
      <div className="qr-flood absolute inset-0 overflow-hidden bg-teal-dark text-white" onClick={close}>
        <Grain />
        {/* concentric rings behind the phone */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[14vw]">
          {[1, 0.72, 0.46].map((s) => (
            <span key={s} className="qr-ring absolute rounded-full border border-white/15" style={{ width: `${s * 110}vh`, height: `${s * 110}vh` }} />
          ))}
        </div>

        <div
          className="relative flex h-full flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between md:px-[8vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-xl text-center md:text-left">
            <h2 className="qr-title text-[12vw] font-bold leading-[0.95] md:text-[5.2vw]">
              <SplitChars text="Care in your" />
              <br />
              <SplitChars text="pocket" />
            </h2>
            <p className="qr-fade mt-6 text-lg text-white/70">
              <span className="hidden md:inline">Scan the code with your phone camera to download FamCare.</span>
              <span className="md:hidden">Download FamCare and book a caregiver in a few taps.</span>
            </p>
            <a href={DIRECT_URL} className="qr-fade btn-lime mt-8 md:hidden">
              Open the app
            </a>
          </div>

          <div className="[perspective:1400px]">
            <PhoneQr scan className="qr-phone h-[400px] w-[300px] md:h-[440px] md:w-[320px]" />
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="qr-fade absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-2xl transition-transform hover:rotate-90 md:right-10 md:top-8"
        >
          ×
        </button>
      </div>
    </div>
  );
}
