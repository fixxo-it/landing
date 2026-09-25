"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* applicants must be 18 or over; dob is typed as DD/MM/YYYY */
export function parseDob(v: string) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (!m) return null;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const born = new Date(y, mo - 1, d);
  if (born.getMonth() !== mo - 1 || born.getDate() !== d || y < 1900) return null;
  return born;
}

/* keeps only digits that can still lead to a real date of birth for an
   applicant who is 18 or over, and adds the slashes as they type */
export function formatDob(raw: string) {
  const maxYear = new Date().getFullYear() - 18;
  const digits = raw.replace(/\D/g, "");
  let out = "";
  for (const ch of digits) {
    const n = out.replace(/\//g, "");
    const c = Number(ch);
    if (n.length === 0 && c > 3) break; // day: 0-3
    if (n.length === 1) {
      const day = Number(n + ch);
      if (day < 1 || day > 31) continue; // day: 01-31
    }
    if (n.length === 2 && c > 1) continue; // month: 0 or 1 first
    if (n.length === 3) {
      const month = Number(n[2] + ch);
      if (month < 1 || month > 12) continue; // month: 01-12
      const day = Number(n.slice(0, 2));
      const max = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
      if (day > max) continue; // e.g. 31/04, 30/02
    }
    if (n.length >= 4) {
      const y = n.slice(4) + ch;
      const lo = Number(y.padEnd(4, "0"));
      const hi = Number(y.padEnd(4, "9"));
      if (hi < 1900 || lo > maxYear) continue; // year: 1900 to 18 years ago
    }
    if (n.length >= 8) break;
    out += (n.length === 2 || n.length === 4 ? "/" : "") + ch;
  }
  return out;
}

export function isAdult(born: Date) {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 18);
  return born <= cutoff;
}

const pad = (n: number) => String(n).padStart(2, "0");

function Chevron({ dir }: { dir: "left" | "right" | "down" }) {
  const d = { left: "M15 6l-6 6 6 6", right: "M9 6l6 6-6 6", down: "M6 9l6 6 6-6" }[dir];
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/* typeable DD/MM/YYYY field with a calendar popover styled like the rest of
   the site; the picker only offers dates for applicants aged 18 or over */
export default function DobPicker({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"days" | "months" | "years">("days");
  const ref = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLButtonElement>(null);

  const latest = new Date();
  latest.setFullYear(latest.getFullYear() - 18);
  latest.setHours(0, 0, 0, 0);
  const maxYear = latest.getFullYear();
  const selected = parseDob(value);

  const [view, setView] = useState({ m: latest.getMonth(), y: maxYear });

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useEffect(() => {
    if (mode === "years") yearRef.current?.scrollIntoView({ block: "center" });
  }, [mode]);

  const toggle = () => {
    if (!open) {
      const base = selected && selected <= latest ? selected : latest;
      setView({ m: base.getMonth(), y: base.getFullYear() });
      setMode("days");
    }
    setOpen((v) => !v);
  };

  const first = new Date(view.y, view.m, 1).getDay();
  const count = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];

  const monthDisabled = (m: number) => new Date(view.y, m, 1) > latest;
  const canPrev = view.y > 1900 || view.m > 0;
  const canNext = new Date(view.y, view.m + 1, 1) <= latest;
  const step = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ m: d.getMonth(), y: d.getFullYear() });
  };

  const headBtn =
    "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[15px] font-semibold text-ink transition-colors hover:bg-teal-tint";
  const navBtn =
    "grid h-9 w-9 place-items-center rounded-full text-teal transition-colors hover:bg-teal-tint disabled:pointer-events-none disabled:opacity-30";

  return (
    <div ref={ref} className="relative" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <input
        name="dob"
        inputMode="numeric"
        autoComplete="bday"
        placeholder="DD/MM/YYYY"
        value={value}
        onChange={(e) => onChange(formatDob(e.target.value))}
        aria-invalid={invalid}
        className={cn(
          "h-14 w-full rounded-2xl border bg-white pl-5 pr-14 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-teal focus:ring-2 focus:ring-teal/20",
          invalid ? "border-[#B4432F]" : "border-line",
        )}
      />
      <button
        type="button"
        aria-label="Open calendar"
        aria-expanded={open}
        onClick={toggle}
        className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-teal transition-colors hover:bg-teal-tint"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-[min(320px,calc(100vw-3rem))] rounded-2xl border border-line bg-white p-3 shadow-float">
          <div className="flex items-center justify-between gap-1">
            {mode === "days" ? (
              <button type="button" aria-label="Previous month" disabled={!canPrev} onClick={() => step(-1)} className={navBtn}>
                <Chevron dir="left" />
              </button>
            ) : (
              <span className="h-9 w-9" />
            )}
            <div className="flex items-center">
              <button type="button" onClick={() => setMode(mode === "months" ? "days" : "months")} className={headBtn}>
                {MONTHS[view.m]} <Chevron dir="down" />
              </button>
              <button type="button" onClick={() => setMode(mode === "years" ? "days" : "years")} className={headBtn}>
                {view.y} <Chevron dir="down" />
              </button>
            </div>
            {mode === "days" ? (
              <button type="button" aria-label="Next month" disabled={!canNext} onClick={() => step(1)} className={navBtn}>
                <Chevron dir="right" />
              </button>
            ) : (
              <span className="h-9 w-9" />
            )}
          </div>

          {mode === "days" && (
            <div className="mt-2">
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-ink-muted">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="py-2">{w}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {cells.map((d, i) => {
                  if (!d) return <span key={i} />;
                  const date = new Date(view.y, view.m, d);
                  const disabled = date > latest;
                  const isSel = !!selected && selected.getTime() === date.getTime();
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        onChange(`${pad(d)}/${pad(view.m + 1)}/${view.y}`);
                        setOpen(false);
                      }}
                      className={cn(
                        "mx-auto grid h-10 w-10 place-items-center rounded-full text-[15px] font-medium transition-colors",
                        isSel ? "bg-teal text-white" : "text-ink hover:bg-teal-tint",
                        disabled && "pointer-events-none text-ink-faint/50",
                      )}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {mode === "months" && (
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  disabled={monthDisabled(i)}
                  onClick={() => {
                    setView({ ...view, m: i });
                    setMode("days");
                  }}
                  className={cn(
                    "rounded-xl px-2 py-3 text-[15px] font-medium transition-colors hover:bg-teal-tint disabled:pointer-events-none disabled:text-ink-faint/50",
                    i === view.m ? "bg-teal-tint text-teal" : "text-ink",
                  )}
                >
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          )}

          {mode === "years" && (
            <div className="mt-2 grid max-h-60 grid-cols-4 gap-1.5 overflow-y-auto pr-1">
              {Array.from({ length: maxYear - 1900 + 1 }, (_, i) => maxYear - i).map((y) => (
                <button
                  key={y}
                  ref={y === view.y ? yearRef : undefined}
                  type="button"
                  onClick={() => {
                    const m = new Date(y, view.m, 1) > latest ? latest.getMonth() : view.m;
                    setView({ m, y });
                    setMode("days");
                  }}
                  className={cn(
                    "rounded-xl px-1 py-2.5 text-[15px] font-medium transition-colors hover:bg-teal-tint",
                    y === view.y ? "bg-teal-tint text-teal" : "text-ink",
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
