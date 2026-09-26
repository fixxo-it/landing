import { useId } from "react";

/* the numbered step circle in the same jelly-glass finish as the benefit
   icons: saturated rim, lighter translucent core, white gloss and highlight */
export default function StepBadge({ n }: { n: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="relative h-14 w-14 overflow-visible" viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id={`${id}b`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#E4FF5C" />
          <stop offset="1" stopColor="#C6E52E" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6FFC2" />
          <stop offset="1" stopColor="#E4FF5C" />
        </linearGradient>
        <clipPath id={`${id}k`}>
          <circle cx="24" cy="24" r="21" />
        </clipPath>
        <filter id={`${id}s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="#0B1F20" floodOpacity="0.28" />
        </filter>
        <filter id={`${id}q`}>
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
      </defs>
      <g filter={`url(#${id}s)`}>
        <circle cx="24" cy="24" r="21" fill={`url(#${id}b)`} stroke="#C6E52E" strokeWidth={2} />
      </g>
      <g filter={`url(#${id}q)`}>
        <circle cx="24" cy="24" r="16.5" fill={`url(#${id}c)`} opacity={0.9} />
      </g>
      <g clipPath={`url(#${id}k)`}>
        <ellipse
          cx="17"
          cy="12"
          rx="13"
          ry="6"
          fill="#fff"
          opacity={0.5}
          transform="rotate(-28 17 12)"
        />
      </g>
      <circle cx="12.5" cy="17" r="1.8" fill="#fff" opacity={0.9} />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fontWeight={800}
        fill="#06555B"
        stroke="#E4FF5C"
        strokeWidth={0.6}
        paintOrder="stroke"
        style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
      >
        {n}
      </text>
    </svg>
  );
}
