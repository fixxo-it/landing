"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Button from "@/components/ui/Button";
import { openDownloadModal } from "@/components/DownloadModal";
import { DURATION, EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Safe360™", href: "#safety-360" },
  { label: "FAQs", href: "#faq" },
];

/* Safe360™ is the one nav item that is a mark rather than a destination, so it
   carries a glimmer instead of plain ink. lime-deep/lime-light collapsed to
   one hex a while back (both point at the same lime now), which flattened
   this into a static colour with no visible sweep — teal is what actually
   gives the band something to travel between, so the mark now reads as
   switching lime and green rather than just sitting lime. The band is the
   middle third of a background three times the text's width travelling one
   way, so it reads as a highlight passing over rather than the whole word
   pulsing. Reduced motion gets the flat lime. */
const GLIMMER =
  "animate-shimmer bg-[length:300%_100%] bg-gradient-to-r from-lime via-teal via-50% to-lime bg-clip-text font-semibold text-transparent motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-lime";

/* how far past the hero's bottom edge the bar stays wide, and how much of that
   it keeps on the way back up — the gap between the two is hysteresis, so a
   scroll that rests right on the boundary cannot flicker the width */
const ENTER = 0;
const EXIT = 80;

/* the bar has nothing left to point at once you reach the closing CTA, and it
   would otherwise sit on top of the download phone — so it steps aside */
const HIDE_OVER = ["#book", "#site-footer"];

/* …but not the instant a sliver of the CTA appears under the FAQ. The root is
   shrunk from the bottom so the section only counts as "reached" once its top
   has climbed past the upper 45% of the viewport — by then the FAQ is behind
   you and the bar has genuinely run out of page to point at. */
const HIDE_ROOT_MARGIN = "0px 0px -55% 0px";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const heroEnd = useRef(0);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  /* measured off the hero rather than a fixed number, so the bar narrows at the
     moment the hero leaves regardless of how tall it renders */
  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("top");
      heroEnd.current = hero ? hero.offsetTop + hero.offsetHeight - 140 : 420;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) =>
    setCompact((was) => v > heroEnd.current - (was ? EXIT : ENTER)),
  );

  /* observed rather than measured off scrollY, so it keeps working whatever
     height the CTA and footer end up being */
  useEffect(() => {
    const targets = HIDE_OVER.map((sel) => document.querySelector(sel)).filter(
      (el): el is Element => el !== null,
    );
    if (!targets.length) return;

    const showing = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) showing.add(e.target);
          else showing.delete(e.target);
        }
        setHidden(showing.size > 0);
      },
      { threshold: 0, rootMargin: HIDE_ROOT_MARGIN },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* a menu left open would keep taking clicks from behind the hidden bar */
  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  return (
    /* floating glass bar: it rides above the page rather than sitting on a
       band of its own, so the hero reads through it as you scroll */
    <header
      className={cn(
        "sticky top-0 z-50 px-3 pt-3 transition-[transform,opacity] duration-300 ease-out sm:px-5 sm:pt-4",
        hidden && "pointer-events-none -translate-y-[130%] opacity-0",
      )}
    >
      <motion.div
        /* the bar drops in on load, ahead of the hero — the page assembles
           top-down instead of the chrome being there before the content */
        initial={{ opacity: 0, y: reduced ? 0 : -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE }}
        className={cn(
          /* the bar is deliberately narrower than the 1800 page measure — it
             floats as its own object rather than spanning the content edges,
             then pulls in again once the hero is behind you. `relative` is
             the anchor the dropdown below positions itself against, so its
             own height animation never touches this box's height in turn. */
          "relative mx-auto w-full border border-white/70 bg-white/55 shadow-float backdrop-blur-xl backdrop-saturate-150 transition-[max-width,border-radius] duration-500 ease-out",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_40px_-22px_rgba(11,31,32,0.35)]",
          compact ? "max-w-[980px]" : "max-w-[1240px]",
          /* bottom corners flatten to butt flush against the dropdown's own
             square top edge — same merged-pill look as before, just achieved
             without the two sharing one growing box */
          open ? "rounded-t-[28px]" : "rounded-full",
        )}
      >
        <nav
          className="relative flex h-[68px] items-center justify-between gap-6 px-3 sm:px-5 lg:px-7"
          aria-label="Main"
        >
          <a href="#top" className="font-display text-2xl font-bold tracking-[-0.02em] text-teal">
            FamCare
          </a>

          {/* links sit dead centre of the bar, independent of the two ends */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative py-1 text-[15px] font-medium uppercase tracking-[0.06em] transition-colors duration-200",
                  item.href === "#safety-360" ? GLIMMER : "text-ink hover:text-teal",
                )}
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              href="#book"
              label="BOOK NOW"
              variant="solid"
              className="hidden sm:inline-flex"
              onClick={(e) => {
                e.preventDefault();
                openDownloadModal();
              }}
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out",
                    open ? "top-[5px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[5px] block h-0.5 w-4 rounded-full bg-current transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out",
                    open ? "top-[5px] -rotate-45" : "top-[10px]",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-nav"
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              /* absolute and pinned to the bar's own bottom edge — it overlays
                 the page below rather than sitting in flow, so its height
                 animation never pushes the header's own box taller and the
                 page never shifts under it. Same glass treatment as the bar
                 above so the two read as one shape with no seam. */
              className="absolute inset-x-0 top-full overflow-hidden rounded-b-[28px] border-x border-b border-white/70 bg-white/95 shadow-float backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
            >
              <div className="px-3 pb-6 sm:px-5 lg:px-7">
                <ul className="flex flex-col border-t border-line pt-2">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block py-3 text-base font-medium",
                          item.href === "#safety-360" ? GLIMMER : "text-ink",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button
                  href="#book"
                  label="BOOK NOW"
                  variant="solid"
                  size="md"
                  className="mt-4 w-full sm:hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    openDownloadModal();
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
