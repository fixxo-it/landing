"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { openDownloadModal } from "@/components/DownloadModal";
import Reveal, { EASE, useReveal } from "@/components/motion/Reveal";

export default function CtaBanner() {
  const reduced = useReducedMotion();
  const phone = useReveal();

  return (
    /* the bottom padding is the breathing room between the CTA and the footer;
       the phone's overhang below is measured to outrun it, so it still slides
       under the footer instead of ending on a hard edge */
    <section id="book" className="relative scroll-mt-24 bg-white pb-16 pt-12 sm:pb-3 lg:pb-4 lg:pt-16">
      <Container className="relative">
        {/* no extra px here: the headline sits flush at Container's own
            gutter, same inset as the footer's wordmark below it */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <Reveal>
              {/* same ramp as the other section headings on the page */}
              {/* mobile size matched to "Book in 4 steps" so the page's
                  oversized headings all read at the same scale on a phone */}
              <h2 className="max-w-[12ch] font-display text-h1 font-semibold text-balance text-ink lg:text-[4.5rem] lg:leading-[1.04] lg:tracking-[-0.032em]">
                At your door in 10 minutes
              </h2>
              <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-ink-muted">
                Your child&rsquo;s favorite companion,
                <br />
                right when you need them most.
              </p>
              <Button
                href="#book"
                label="BOOK NOW"
                variant="primary"
                size="md"
                className="mt-8"
                onClick={(e) => {
                  e.preventDefault();
                  openDownloadModal();
                }}
              />
            </Reveal>
          </div>

          {/* phone + QR on desktop only — on a phone or tablet you're already
              holding the device the code would point you to, so it just
              costs vertical space for nothing. BOOK NOW covers that case
              instead: openDownloadModal() sends a mobile/tablet tap straight
              to the OneLink, which opens the app if it's installed and falls
              back to the right store if it isn't. */}
          <motion.div
            ref={phone.ref as React.Ref<HTMLDivElement>}
            initial={{ opacity: 0, y: reduced ? 0 : 40 }}
            animate={
              phone.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 40 }
            }
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            className="mx-auto hidden lg:block"
          >
            <QrPhone />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ── phone with the QR ──────────────────────────────────────────────────── */

const QR_SIZE = 228;

function QrPhone() {
  return (
    /* taller than the space left in the section, so it slides under the
       footer card instead of ending on a hard edge */
    <div className="relative h-[300px] w-[300px] lg:h-[360px] lg:w-[340px]">
      {/* the chassis is pinned past the bottom rather than given a fixed height:
          the overhang stays constant whatever the section's bottom padding is,
          so the bleed into the footer survives a spacing change */}
      <div className="absolute inset-x-0 -bottom-[280px] top-0 rounded-t-[46px] bg-neutral-900 p-[10px] shadow-[0_30px_60px_-30px_rgba(1,97,99,0.5)]">
        {/* the screen is a photo rather than flat grey — overflow-hidden is what
            keeps it inside the rounded top corners, and bg-neutral-100 stays as
            the colour before it decodes */}
        <div className="relative h-full w-full overflow-hidden rounded-t-[38px] bg-neutral-100 px-4 pt-6">
          <Image
            src="/img/endingnote.jpg"
            alt=""
            aria-hidden
            fill
            sizes="340px"
            className="object-cover"
          />

          {/* everything above the photo needs its own stacking order, or the
              fill image paints over it */}
          <span className="relative mx-auto block h-[22px] w-[86px] rounded-full bg-neutral-900" />
          <div className="relative mt-6 flex justify-center">
            <div
              className="rounded-2xl bg-white p-3"
              style={{ width: QR_SIZE + 24, height: QR_SIZE + 24 }}
            >
              <Image
                src="/img/download-qr.jpeg"
                alt="Scan the QR code to download the FamCare app"
                width={QR_SIZE}
                height={QR_SIZE}
                quality={100}
                className="block"
                style={{ width: QR_SIZE, height: QR_SIZE }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
