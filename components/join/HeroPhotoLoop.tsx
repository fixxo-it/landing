'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

const PHOTOS: [string, string][] = [
  ['Newborn care', '/img/newborncare.png'],
  ['Infant day care', '/img/infantcare.png'],
  ['Toddler companion', '/img/toddlercare.png'],
  ['After school care', '/img/afterschoolcare.png'],
  ['Elderly care', '/img/elderlycare.png'],
];

/* the hero's photo panel: one photo at a time at full strength, crossfading
   every 4 seconds with a slow push-in. The panel is cut to the photos' own
   portrait shape (896×1200), so each one shows whole rather than cropped. */
export default function HeroPhotoLoop({ className }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PHOTOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none relative aspect-[896/1200] overflow-hidden bg-teal-tint',
        className
      )}
    >
      {PHOTOS.map(([name, src], idx) => (
        <Image
          key={name}
          src={src}
          alt=""
          fill
          priority={idx === 0}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={cn(
            'object-cover transition-[opacity,transform] ease-out motion-reduce:transition-none',
            idx === i
              ? 'scale-105 opacity-100 [transition-duration:1000ms,4800ms]'
              : 'scale-100 opacity-0 [transition-delay:0ms,1000ms] [transition-duration:1000ms,0ms]'
          )}
        />
      ))}
    </div>
  );
}
