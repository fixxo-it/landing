import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#016163",
          dark: "#014D4F",
          light: "#03c4c9",
          tint: "#F1F8F8",
        },
        /* one lime across the whole page — the bright yellow-green swatch, not
           the deeper green this used to be. All three keys share it: callers
           that reach for `lime-deep`/`lime-light` (a gradient's two stops, a
           legibility tweak against a light or dark ground) still resolve to the
           same colour rather than pointing at a shade that no longer exists. */
        lime: {
          DEFAULT: "#E4FF5C",
          deep: "#E4FF5C",
          light: "#E4FF5C",
        },
        ink: {
          DEFAULT: "#0B1F20",
          muted: "#5A6B6C",
          faint: "#8A9899",
        },
        line: "rgba(11, 31, 32, 0.10)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
      },
      /* one type ramp for the whole page — every heading picks from here */
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
        h3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "h2-lg": ["3.25rem", { lineHeight: "1.08", letterSpacing: "-0.028em" }],
        h1: ["2.75rem", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "h1-lg": ["4.25rem", { lineHeight: "1.04", letterSpacing: "-0.032em" }],
      },
      boxShadow: {
        card: "0 6px 20px -10px rgba(11, 31, 32, 0.22)",
        float: "0 18px 40px -22px rgba(11, 31, 32, 0.35)",
        pill: "0 4px 16px -8px rgba(11, 31, 32, 0.25)",
      },
      borderRadius: {
        card: "28px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      /* the testimonial rails: each track holds two identical copies, so
         sliding exactly one copy width loops with no visible seam */
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        /* held at each end rather than a smooth fade — a caret that eases is a
           cursor that looks broken */
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        /* the Trust badge's tracker pulse: a ring born at the centre of the
           badge and pushed out to its rim, fading as it goes — one flat lime,
           stepping down through opacity rather than changing hue, so it reads
           as the same colour as the banded ground it sits on. Three of them on
           staggered delays read as one continuous sweep. */
        radar: {
          "0%": { transform: "scale(0)", opacity: "0.9" },
          "60%": { opacity: "0.28" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        /* the dot the rings leave from — it breathes so the badge still reads as
           live in the moment between two rings */
        "radar-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.35)", opacity: "0.65" },
        },
        /* the gradient itself doesn't move — the background is twice as wide as
           the text and slides under it, so the highlight sweeps continuously */
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        /* a bright band travelling one-way across the text, rather than
           gradient-shift's back-and-forth pulse — the band is the middle third
           of a background twice as wide as the text, so it enters and exits
           clean instead of being visible at rest */
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        caret: "caret 1s steps(1, end) infinite",
        radar: "radar 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "radar-dot": "radar-dot 2.4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
