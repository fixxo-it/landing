/* the lime jelly-glass surface from the join page icons, for cards: a light-to-
   lime gradient, a darker lime rim, a soft inner glow and a drop shadow. Pair
   with <JellyGloss /> (inside a `relative overflow-hidden` parent) for the
   white gloss streak and highlight dot. */
export const JELLY_LIME =
  'bg-gradient-to-br from-[#F6FFB8] via-[#E4FF5C] to-[#C4E63A] border border-[#A9C91F] shadow-[0_10px_24px_-12px_rgba(11,31,32,0.35),inset_0_0_24px_rgba(255,255,255,0.45)]';

export function JellyGloss() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[8%] -top-[6%] h-[34%] w-[62%] -rotate-[14deg] rounded-full bg-white/45"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-[7%] top-[20%] h-2 w-2 rounded-full bg-white/90"
      />
    </>
  );
}

/* the same jelly rim and inner glow in the company dark green, with no gloss
   layer — for the large panels behind the app screenshots */
export const JELLY_GREEN =
  'bg-gradient-to-b from-[#0E7A82] to-[#014D4F] border border-[#013A3C] shadow-[0_10px_24px_-12px_rgba(1,77,79,0.6),inset_0_0_24px_rgba(120,220,215,0.25)]';
