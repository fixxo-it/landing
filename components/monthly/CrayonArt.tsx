/* Hand-drawn looking scenes for the plan cards, in the waxy crayon style of the
   campaign art. They are plain shapes run through one filter: the edges are
   roughened, then specks of paper are let through so the colour looks rubbed on. */
type Art = 'lock' | 'calendar' | 'refund' | 'agreement' | 'checks' | 'interview' | 'training' | 'live';

const TEAL = '#0E7C7B';
const DEEP = '#014D4F';
const LIME = '#D9F24F';
const ORANGE = '#EE7A35';
const TAN = '#D9B382';
const BROWN = '#6B4A2F';
const CREAM = '#FFF8E8';

const SCENES: Record<Art, { wash: string; art: React.ReactNode }> = {
  lock: {
    wash: '#DDF1EF',
    art: (
      <>
        <path d="M130 120V88a70 70 0 0 1 140 0v32" fill="none" stroke={BROWN} strokeWidth="26" />
        <rect x="88" y="112" width="224" height="170" rx="26" fill={TEAL} />
        <rect x="88" y="112" width="224" height="42" rx="20" fill={DEEP} />
        <circle cx="200" cy="190" r="24" fill={LIME} />
        <path d="M190 200h20l6 40h-32z" fill={LIME} />
      </>
    ),
  },
  calendar: {
    wash: '#FCE8D8',
    art: (
      <>
        <rect x="76" y="44" width="248" height="236" rx="22" fill={CREAM} />
        <rect x="76" y="44" width="248" height="62" rx="20" fill={ORANGE} />
        <path d="M136 24v48M264 24v48" stroke={BROWN} strokeWidth="16" strokeLinecap="round" />
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2].map((r) => (
            <rect key={`${c}${r}`} x={100 + c * 52} y={124 + r * 46} width="38" height="32" rx="6" fill={c === 3 && r === 2 ? DEEP : TAN} />
          )),
        )}
      </>
    ),
  },
  refund: {
    wash: '#FBF2CF',
    art: (
      <>
        <path d="M84 118a128 128 0 0 1 226-28" fill="none" stroke={TEAL} strokeWidth="20" strokeLinecap="round" />
        <path d="M322 42l-6 66-60-26z" fill={TEAL} />
        <circle cx="200" cy="176" r="104" fill={ORANGE} />
        <circle cx="200" cy="176" r="80" fill="#F6A25E" />
        <path d="M164 134h74M164 160h74M176 134c46 0 46 54 0 54h-12l60 54" fill="none" stroke={BROWN} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  checks: {
    wash: '#DDF1EF',
    art: (
      <>
        <path d="M200 26l122 44v92c0 72-54 118-122 138-68-20-122-66-122-138V70z" fill={TEAL} />
        <path d="M144 158l40 42 76-84" fill="none" stroke={LIME} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  interview: {
    wash: '#FCE8D8',
    art: (
      <>
        <path d="M70 50h190a22 22 0 0 1 22 22v92a22 22 0 0 1-22 22H138l-44 44v-44H70a22 22 0 0 1-22-22V72a22 22 0 0 1 22-22z" fill={ORANGE} />
        <path d="M178 150h130a20 20 0 0 1 20 20v70a20 20 0 0 1-20 20h-14v38l-38-38h-78a20 20 0 0 1-20-20v-70a20 20 0 0 1 20-20z" fill={DEEP} />
        <path d="M196 206h96" stroke={LIME} strokeWidth="18" strokeLinecap="round" />
      </>
    ),
  },
  training: {
    wash: '#FBF2CF',
    art: (
      <>
        <path d="M110 170v70c0 40 180 40 180 0v-70z" fill={TEAL} />
        <path d="M200 50l164 80-164 80-164-80z" fill={DEEP} />
        <path d="M330 140v88" stroke={ORANGE} strokeWidth="16" strokeLinecap="round" />
        <circle cx="330" cy="244" r="20" fill={ORANGE} />
      </>
    ),
  },
  live: {
    wash: '#E6F3D6',
    art: (
      <>
        <path d="M60 126a146 146 0 0 1 280 0" fill="none" stroke={TAN} strokeWidth="18" strokeLinecap="round" />
        <path d="M200 66a92 92 0 0 1 92 92c0 66-92 140-92 140s-92-74-92-140a92 92 0 0 1 92-92z" fill={TEAL} />
        <circle cx="200" cy="158" r="36" fill={LIME} />
      </>
    ),
  },
  agreement: {
    wash: '#E6F3D6',
    art: (
      <>
        <path d="M96 30h160l60 60v210H96z" fill={CREAM} />
        <path d="M256 30v60h60z" fill={TAN} />
        <path d="M128 112h150M128 150h150M128 188h96" stroke={BROWN} strokeWidth="11" strokeLinecap="round" />
        <circle cx="146" cy="244" r="28" fill={TEAL} />
        <path d="M134 244l9 10 17-20" fill="none" stroke={LIME} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M212 262l112-112 26 26-112 112-36 10z" fill={ORANGE} />
        <path d="M324 150l14-14 26 26-14 14z" fill={DEEP} />
      </>
    ),
  },
};

/* `small` is for little tiles: scaled down that far the fine grain would blur
   into a flat tint, so it is drawn coarser to still read as crayon */
export default function CrayonArt({ art, className, small = false }: { art: Art; className?: string; small?: boolean }) {
  const { wash, art: shapes } = SCENES[art];
  const id = `crayon-${art}${small ? '-small' : ''}`;
  return (
    <svg aria-hidden viewBox="0 0 400 320" preserveAspectRatio="xMidYMin slice" className={className}>
      <defs>
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale={small ? 16 : 9} result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency={small ? 0.3 : 0.95} numOctaves="2" seed="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  6 0 0 0 -1.55" result="specks" />
          <feComposite in="rough" in2="specks" operator="in" />
        </filter>
      </defs>
      <rect x="-20" y="-20" width="440" height="360" fill={wash} filter={`url(#${id})`} />
      <g filter={`url(#${id})`}>{shapes}</g>
    </svg>
  );
}
