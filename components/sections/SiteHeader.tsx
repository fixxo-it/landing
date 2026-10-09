'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { openDownloadModal } from '@/components/DownloadModal';
import { EASE } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';

export const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Safe360', href: '#safety-360' },
  { label: 'FAQs', href: '#faq' },
  {
    label: 'Join as a caregiver',
    href: '/join',
  },
];

/* Safe360 is the one nav item that is a mark rather than a destination, so it
   carries a glimmer instead of plain ink. lime-deep/lime-light collapsed to
   one hex a while back (both point at the same lime now), which flattened
   this into a static colour with no visible sweep — teal is what actually
   gives the band something to travel between, so the mark now reads as
   switching lime and green rather than just sitting lime. The band is the
   middle third of a background three times the text's width travelling one
   way, so it reads as a highlight passing over rather than the whole word
   pulsing. Reduced motion gets the flat lime. */
const GLIMMER =
  'animate-shimmer bg-[length:300%_100%] bg-gradient-to-r from-lime via-white via-50% to-lime bg-clip-text font-semibold text-transparent motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-lime';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduced = useSafeReducedMotion();

  return (
    /* lives on the hero only: absolutely placed over the top of the video and
       scrolls away with it, rather than following you down the page. The bar
       is see-through — white type straight on the video, spanning the page
       measure like the hero copy beneath it. */
    <header className="absolute inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div
        /* the bar drops in on load, ahead of the hero — the page assembles
           top-down instead of the chrome being there before the content.
           CSS (.header-drop) so it plays before hydration, not after it. */
        className={cn(
          'header-drop',
          /* spans the 1800 page measure, like the hero copy. `relative` is
             the anchor the dropdown below positions itself against, so its
             own height animation never touches this box's height in turn. */
          'relative mx-auto w-full max-w-[1800px] border transition-[border-radius,background-color,border-color,box-shadow] duration-500 ease-out',
          /* the open mobile menu is white glass, the same treatment as the
             hero's "Why choose us?" pill: a faint white tint and a hairline
             white rim over a heavy blur of the video behind it. The blur
             itself lives on a layer inside (below), not on this box: a
             backdrop-filter here would make the bar the backdrop root for
             the dropdown it contains, and the dropdown's own blur would then
             see nothing behind it but would not blur the video */
          open
            ? 'border-white/30 shadow-float'
            : 'border-transparent bg-transparent',
          /* bottom corners flatten to butt flush against the dropdown's own
             square top edge — same merged-pill look as before, just achieved
             without the two sharing one growing box */
          open ? 'rounded-t-[28px]' : 'rounded-full'
        )}
      >
        {open && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-t-[28px] bg-white/10 backdrop-blur-xl backdrop-saturate-150 lg:hidden"
          />
        )}
        <nav
          /* carries the page's own gutter, so the logo sits on the same left
             edge as the hero headline */
          className="relative flex h-[68px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32"
          aria-label="Main"
        >
          <a
            href="#top"
            className="font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em] text-white"
          >
            FamCare
          </a>

          {/* links sit dead centre of the bar, independent of the two ends */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative whitespace-nowrap py-1 text-base font-medium tracking-[-0.02em] transition-colors duration-200',
                  item.href === '#safety-360'
                    ? GLIMMER
                    : 'text-white/90 hover:text-white'
                )}
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              href="#book"
              label="BOOK NOW"
              variant="onDark"
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
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out',
                    open ? 'top-[5px] rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-[5px] block h-0.5 w-4 rounded-full bg-current transition-opacity duration-200',
                    open && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out',
                    open ? 'top-[5px] -rotate-45' : 'top-[10px]'
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
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              /* absolute and pinned to the bar's own bottom edge — it overlays
                 the page below rather than sitting in flow, so its height
                 animation never pushes the header's own box taller and the
                 page never shifts under it. Same white glass as the bar above
                 so the two read as one shape with no seam. */
              className="absolute inset-x-0 top-full overflow-hidden rounded-b-[28px] border-x border-b border-white/30 bg-white/10 shadow-float backdrop-blur-xl backdrop-saturate-150 lg:hidden"
            >
              <div className="px-3 pb-6 sm:px-5 lg:px-7">
                <ul className="flex flex-col border-t border-white/15 pt-2">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block py-3 text-base font-medium',
                          item.href === '#safety-360' ? GLIMMER : 'text-white'
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
                  variant="onDark"
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
      </div>
    </header>
  );
}
