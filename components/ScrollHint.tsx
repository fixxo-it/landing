"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/* Sits over every section from the second one on — chrome, the same way the
   header is, so it reads as part of the page's frame rather than a hint
   belonging to any one section. Held off the hero deliberately: the hero
   already carries its own full-bleed image right to that same bottom edge,
   and the frosted band was cutting into it before anyone had scrolled at all.
   It steps aside again once the footer arrives, because there is nothing left
   below to scroll to by then. */
const HIDE_ROOT_MARGIN = "0px 0px -40% 0px";

export default function ScrollHint() {
  const [pastHero, setPastHero] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const io = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const io = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0, rootMargin: HIDE_ROOT_MARGIN },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const hidden = !pastHero || nearFooter;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[140px] transition-opacity duration-300 ease-out",
        hidden && "opacity-0",
      )}
    >
      {/* the frosted dissolve: backdrop-blur on a fixed band, masked so the blur
          is strongest at the very bottom edge and fades to nothing by the
          band's top — whatever is scrolling underneath softens into it rather
          than being cut off by a hard line */}
      <div className="absolute inset-0 backdrop-blur-md [-webkit-mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-white/5 to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]" />
    </div>
  );
}
