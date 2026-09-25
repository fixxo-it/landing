"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

const SERVICES: [string, string][] = [
  ["Newborn care", "/img/newborncare.png"],
  ["Infant day care", "/img/infantcare.png"],
  ["Toddler companion", "/img/toddlercare.png"],
  ["After school care", "/img/afterschoolcare.png"],
  ["Elderly care", "/img/elderlycare.png"],
];

/* one service at a time, held for 2 seconds, crossfading to the next */
export default function ServiceLoop() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SERVICES.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ml-auto w-full max-w-[460px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-teal-tint">
        {SERVICES.map(([name, src], idx) => (
          <Image
            key={name}
            src={src}
            alt={name}
            fill
            priority={idx === 0}
            sizes="460px"
            className={cn(
              "object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none",
              idx === i ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
    </div>
  );
}
