"use client";

import { useRouter } from "next/navigation";

/* router.back() rather than a hardcoded href to "/": whichever footer link or
   external referrer sent someone here, this returns them to it — a fixed "/"
   would strand anyone who arrived from somewhere other than the homepage. */
export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex h-11 items-center gap-2 rounded-full border border-line bg-white/90 px-5 text-sm font-semibold text-ink shadow-float backdrop-blur-md transition-colors duration-200 hover:border-teal/40 hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  );
}
