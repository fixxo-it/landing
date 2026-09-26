"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* a styled listbox in place of the native <select>, so the open menu matches
   the site rather than the OS */
export default function Select({
  value,
  onChange,
  options,
  placeholder,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-14 w-full items-center justify-between rounded-2xl border bg-white px-5 text-left text-base outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/20",
          invalid ? "border-[#B4432F]" : "border-line",
          value ? "text-ink" : "text-ink-faint",
        )}
      >
        {value || placeholder}
        <svg
          className={cn(
            "h-4 w-4 text-teal transition-transform duration-200",
            open && "rotate-180",
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-line bg-white p-1.5 shadow-float"
        >
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-colors hover:bg-teal-tint",
                  o === value ? "bg-teal-tint text-teal" : "text-ink",
                )}
              >
                {o}
                {o === value && <span aria-hidden>✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
