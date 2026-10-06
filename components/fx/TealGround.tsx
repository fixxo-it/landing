import { cn } from '@/lib/cn';

/* The dark teal ground every bold band on the site shares: two slow aurora
   blobs, an optional faint blueprint grid, an optional cursor spotlight, and
   film grain on top. The spotlight reads --mx/--my off the nearest ancestor
   that sets them (see useSpotlight), so moving the mouse never re-renders. */
export default function TealGround({
  className,
  grid = false,
  spotlight = false,
}: {
  className?: string;
  grid?: boolean;
  spotlight?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-teal-dark',
        className
      )}
    >
      <span className="absolute -left-[10%] -top-[30%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] animate-aurora rounded-full bg-teal-light/[0.12] blur-[120px] motion-reduce:animate-none" />
      <span className="absolute -bottom-[40%] -right-[15%] h-[60vw] max-h-[800px] w-[60vw] max-w-[800px] animate-aurora-slow rounded-full bg-[#06555B]/70 blur-[120px] motion-reduce:animate-none" />
      {grid && (
        <span className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      )}
      {spotlight && (
        <span className="absolute inset-0 bg-[radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,40%),rgba(3,196,201,0.12),transparent_60%)]" />
      )}
      <div className="grain absolute inset-0" />
    </div>
  );
}

/* pointer handler that feeds the spotlight its position via CSS variables */
export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
