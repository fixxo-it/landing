import { useId } from 'react';

/* Jelly-glass glyphs in the style of the candy-3D reference, minus the shine.
   Each icon is one filled silhouette, layered as: a soft drop shadow, a
   saturated body with a rounded edge, and a lighter translucent core inset
   from the rim. Lime by default; `tone="teal"` gives the same glyph in the
   brand dark teal, with its detail strokes in white so they still read. */
type Tone = { light: string; base: string; dark: string; ink: string };

const TONES: Record<'lime' | 'teal', Tone> = {
  lime: { light: '#F6FFB8', base: '#E4FF5C', dark: '#A9C91F', ink: '#06555B' },
  teal: { light: '#0E7A82', base: '#06555B', dark: '#013A3C', ink: '#FFFFFF' },
};

/* `detail` takes the tone's ink colour, so the marks on a glyph flip with it */
type Def = { d: string; detail?: (ink: string, tone: Tone) => React.ReactNode };

const ICONS: Record<string, Def> = {
  heart: {
    d: 'M12 21.2C5 15.8 2.5 12.2 2.5 8.6 2.5 5.6 4.8 3.4 7.6 3.4c1.8 0 3.4 1 4.4 2.6 1-1.6 2.6-2.6 4.4-2.6 2.8 0 5.1 2.2 5.1 5.2 0 3.6-2.5 7.2-9.5 12.6Z',
  },
  growth: {
    d: 'M12.00 2.60 L14.88 8.84 L21.70 9.65 L16.66 14.31 L18.00 21.05 L12.00 17.70 L6.00 21.05 L7.34 14.31 L2.30 9.65 L9.12 8.84Z',
  },
  training: {
    d: 'M12 3.6 22.4 9 12 14.4 1.6 9ZM6 12.4V17c0 1.9 2.7 3.4 6 3.4s6-1.5 6-3.4v-4.6L12 15.6Z',
    detail: (ink: string) => (
      <path
        d="M20.6 10.6v5.6"
        stroke={ink}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.85}
      />
    ),
  },
  shield: {
    d: 'M12 2.6 20 5.6v6c0 4.9-3.4 8.4-8 10-4.6-1.6-8-5.1-8-10v-6Z',
    detail: (ink: string) => (
      <path
        d="m8.4 12 2.6 2.7 4.7-5.2"
        stroke={ink}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  calendar: {
    d: 'M5 4.6h14a2.5 2.5 0 0 1 2.5 2.5V19a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 19V7.1A2.5 2.5 0 0 1 5 4.6Z',
    detail: (ink: string) => (
      <>
        <path d="M2.5 9.4h19" stroke={ink} strokeWidth={1.2} opacity={0.55} />
        <path
          d="M8 3.4v3.4M16 3.4v3.4"
          stroke={ink}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="m8.6 15 2.4 2.5 4.4-4.9"
          stroke={ink}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  bolt: {
    d: 'M13.5 2.2 4.6 13.4h6.2l-1.2 8.4 9-11.4h-6.3Z',
  },
  gift: {
    d: 'M12 12C9 6 3.2 4.4 2.6 8.2 2.1 12 5 14.6 9.5 13L12 12l2.5 1c4.5 1.6 7.4-1 6.9-4.8C20.8 4.4 15 6 12 12ZM9.5 13c-1.4 3.8-3.2 6.3-4.6 7.8 2.6-.4 5.2-2.8 6.2-5.6ZM14.5 13c1.4 3.8 3.2 6.3 4.6 7.8-2.6-.4-5.2-2.8-6.2-5.6Z',
    detail: (_ink: string, tone: Tone) => (
      <ellipse cx="12" cy="12" rx="2" ry="2.5" fill={tone.dark} />
    ),
  },
};

export default function BenefitIcon({
  name,
  className = 'h-28 w-28',
  tone: toneName = 'lime',
}: {
  name: string;
  className?: string;
  tone?: keyof typeof TONES;
}) {
  const id = useId().replace(/:/g, '');
  const tone = TONES[toneName];
  const { d, detail } = ICONS[name];
  return (
    <svg
      className={`${className} overflow-visible`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}b`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={tone.base} />
          <stop offset="1" stopColor={tone.dark} />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone.light} />
          <stop offset="1" stopColor={tone.base} />
        </linearGradient>
        <filter id={`${id}s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow
            dx="0"
            dy="1.2"
            stdDeviation="1"
            floodColor="#0B1F20"
            floodOpacity="0.28"
          />
        </filter>
        <filter id={`${id}q`}>
          <feGaussianBlur stdDeviation="0.45" />
        </filter>
      </defs>

      <g filter={`url(#${id}s)`}>
        <path
          d={d}
          fill={`url(#${id}b)`}
          stroke={tone.dark}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </g>
      {/* translucent core, pulled in from the rim so the edge stays saturated */}
      <g filter={`url(#${id}q)`}>
        <path
          d={d}
          fill={`url(#${id}c)`}
          opacity={0.9}
          transform="translate(12 12) scale(0.8) translate(-12 -12)"
        />
      </g>
      {detail?.(tone.ink, tone)}
    </svg>
  );
}
