"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

/* the OneLink, without the QR attribution tag — a direct tap on a phone
   is not a scan, and the smart link resolves to the App Store or Play Store
   on its own from the device's user agent */
const DIRECT_URL = "https://famcare.onelink.me/LK0E/cgr3j0s7";

/* Every download / book CTA on the page ends at the same place: the app. Rather
   than threading a setter through five sections, the modal listens for one
   event and anybody can fire it. */
const EVENT = "famcare:download";

/* iPadOS Safari has reported itself as desktop macOS since iPadOS 13 — no
   "iPad" anywhere in the UA string — so the regex alone misses every modern
   iPad. maxTouchPoints > 1 is what's left to tell a real Mac from one: a
   Mac has none, an iPad has many. */
const isMobileOS = () =>
  typeof navigator !== "undefined" &&
  (/android|iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (/macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1));

/* On a phone, showing a QR code to scan with the phone you're already holding
   is useless — send it straight to the store instead. The modal is only for
   desktop, where scanning is the point. */
export function openDownloadModal() {
  if (isMobileOS()) {
    window.location.href = DIRECT_URL;
    return;
  }
  window.dispatchEvent(new Event(EVENT));
}

/* Deep link straight into a specific service's booking flow for anyone who
   already has the app — the custom scheme only resolves if a handler is
   registered, so there's no way to detect success directly. Instead: fire it,
   and if the tab is still in the foreground after a beat, nothing caught it,
   so fall through to the store. Desktop has no app to deep link into, so it
   keeps the QR modal.

   iOS and some Android browsers show a native "Open in FamCare?" system
   confirmation before actually switching apps — the page counts as still
   foregrounded while that dialog is up, since it's OS chrome, not a tab
   switch. A short fallback timer fires *underneath* that dialog and
   overwrites the pending app-open with the store URL before the user ever
   gets to tap "Open" — which is exactly "redirects to the store even though
   the app is installed". A longer window, and listening on blur/pagehide as
   well as visibilitychange (different browsers signal the handoff
   differently), gives the dialog room to resolve before we assume it failed. */
function attemptDeepLink(url: string) {
  if (!isMobileOS()) {
    openDownloadModal();
    return;
  }

  const fallback = window.setTimeout(() => {
    window.location.href = DIRECT_URL;
  }, 2500);

  const cancel = () => {
    window.clearTimeout(fallback);
    document.removeEventListener("visibilitychange", onLeave);
    window.removeEventListener("blur", onLeave);
    window.removeEventListener("pagehide", onLeave);
  };
  const onLeave = () => {
    if (document.hidden) cancel();
  };
  document.addEventListener("visibilitychange", onLeave);
  window.addEventListener("blur", onLeave);
  window.addEventListener("pagehide", onLeave);

  window.location.href = url;
}

export function openServiceBooking(categoryId: string, subServiceId: string) {
  attemptDeepLink(`famcare:///schedule-care?category_id=${categoryId}&sub_service_id=${subServiceId}`);
}

/* The generic "book a caregiver" CTAs have no specific service to deep link
   into, so they just open the app itself — same install-check-then-fallback
   as openServiceBooking, just at the app's root rather than a booking route. */
export function openAppOrStore() {
  attemptDeepLink("famcare://");
}

export default function DownloadModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(EVENT, show);
    return () => window.removeEventListener(EVENT, show);
  }, []);

  /* escape to dismiss, and the page behind must not scroll under the blur */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="download-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 px-6 backdrop-blur-md"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] rounded-[28px] bg-white p-8 text-center shadow-float sm:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-teal/40 hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <span className="mx-auto mt-4 block w-fit rounded-2xl bg-white p-3 ring-1 ring-line">
              <Image
                src="/img/download-qr.jpeg"
                alt="QR code to download the FamCare app"
                width={220}
                height={220}
                quality={100}
                className="block h-[200px] w-[200px] sm:h-[220px] sm:w-[220px]"
              />
            </span>

            <h2
              id="download-modal-title"
              className="mt-7 font-display text-h3 font-semibold tracking-[-0.02em] text-ink"
            >
              Scan to download <span className="text-teal">FamCare</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[30ch] text-sm leading-relaxed text-ink-muted">
              A trained, verified caregiver at your door in{" "}
              <span className="font-medium italic text-teal">10 minutes</span>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
