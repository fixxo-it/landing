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
  { label: 'Monthly plans', href: '/monthly' },
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

/* the same sweep for white pages, where lime and white would vanish */
const GLIMMER_LIGHT =
  'animate-shimmer bg-[length:300%_100%] bg-gradient-to-r from-teal-dark via-teal-light via-50% to-teal-dark bg-clip-text font-semibold text-transparent motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-teal-dark';

/* `light` is the same bar for pages that open on white rather than the video:
   dark type, and section links that lead back to the home page. `active` marks
   the page you are on. */
export default function SiteHeader({ light = false, active }: { light?: boolean; active?: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useSafeReducedMotion();
  const to = (href: string) => (light && href.startsWith('#') ? `/${href}` : href);

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
            ? light
              ? 'border-line bg-white shadow-float'
              : 'border-white/30 shadow-float'
            : 'border-transparent bg-transparent',
          /* bottom corners flatten to butt flush against the dropdown's own
             square top edge — same merged-pill look as before, just achieved
             without the two sharing one growing box */
          open ? 'rounded-t-[28px]' : 'rounded-full'
        )}
      >
        {open && !light && (
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
            href={light ? '/' : '#top'}
            className={cn(
              'font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em]',
              light ? 'text-teal-dark' : 'text-white'
            )}
          >
            FamCare
          </a>

          {/* links sit dead centre of the bar, independent of the two ends */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={to(item.href)}
                aria-current={item.href === active ? 'page' : undefined}
                className={cn(
                  'group relative whitespace-nowrap py-1 text-base font-medium tracking-[-0.02em] transition-colors duration-200',
                  item.href === '#safety-360'
                    ? light
                      ? GLIMMER_LIGHT
                      : GLIMMER
                    : light
                      ? 'text-ink/80 hover:text-teal-dark'
                      : 'text-white/90 hover:text-white',
                  item.href === active && 'font-semibold !text-teal-dark'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-0 -bottom-0.5 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none',
                    light ? 'bg-teal-dark' : 'bg-white',
                    item.href === active ? 'h-0.5 scale-x-100' : 'h-px scale-x-0'
                  )}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              href="#book"
              label="BOOK NOW"
              variant={light ? 'solid' : 'onDark'}
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
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border lg:hidden',
                light ? 'border-line text-teal-dark' : 'border-white/40 text-white'
              )}
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
              className={cn(
                'absolute inset-x-0 top-full overflow-hidden rounded-b-[28px] border-x border-b shadow-float lg:hidden',
                light
                  ? 'border-line bg-white'
                  : 'border-white/30 bg-white/10 backdrop-blur-xl backdrop-saturate-150'
              )}
            >
              <div className="px-3 pb-6 sm:px-5 lg:px-7">
                <ul className={cn('flex flex-col border-t pt-2', light ? 'border-line' : 'border-white/15')}>
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <a
                        href={to(item.href)}
                        aria-current={item.href === active ? 'page' : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block py-3 text-base font-medium',
                          item.href === '#safety-360'
                            ? light
                              ? GLIMMER_LIGHT
                              : GLIMMER
                            : light
                              ? 'text-ink'
                              : 'text-white',
                          item.href === active && 'font-semibold !text-teal-dark underline underline-offset-4'
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
                  variant={light ? 'solid' : 'onDark'}
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
