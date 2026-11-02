'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Sparkle, type ChatConfig } from './shared';

/* "Ask FamCare": the help chat on every page (mounted once in app/layout.tsx).

   On and off, every word on it, and the quick replies are controlled from the
   admin page Support -> Website Chatbot. The config is fetched once the page is
   idle, so the widget never competes with the page's own first paint, and when
   it comes back disabled (or fails) nothing renders at all.

   The panel's code loads on first hover/focus/tap of the launcher. */

const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false });
const preloadPanel = () => {
  void import('./ChatPanel');
};

export default function ChatWidget() {
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch('/api/chat/config')
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!cancelled && d?.enabled) setConfig(d as ChatConfig);
        })
        .catch(() => {});
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(load, { timeout: 3000 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }
    const t = window.setTimeout(load, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!config) return null;

  const openPanel = () => {
    setMounted(true);
    setOpen(true);
  };
  const closePanel = () => {
    setOpen(false);
    // Back to the launcher once it has faded back in.
    window.setTimeout(
      () => launcherRef.current?.focus({ preventScroll: true }),
      50
    );
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        aria-label="Chat with FamCare"
        aria-expanded={open}
        onClick={openPanel}
        onMouseEnter={preloadPanel}
        onFocus={preloadPanel}
        tabIndex={open ? -1 : 0}
        className={`fixed bottom-6 right-6 z-[90] flex h-14 items-center gap-[9px] rounded-full border border-[#A9C91F] bg-[linear-gradient(#EBFF7A,#DDF74A)] pl-[18px] pr-[22px] font-sans text-[16px] font-bold tracking-[-0.015em] text-teal shadow-[0_12px_22px_-8px_rgba(120,150,10,0.7),inset_0_0_14px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(110,140,0,0.3)] transition-[transform,opacity] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal max-[640px]:bottom-4 max-[640px]:right-4 ${
          open
            ? 'pointer-events-none scale-90 opacity-0'
            : 'opacity-100 hover:-translate-y-0.5'
        }`}
      >
        <Sparkle className="h-[18px] w-[18px]" />
        {config.launcher_label}
      </button>
      {mounted && (
        <ChatPanel config={config} open={open} onClose={closePanel} />
      )}
    </>
  );
}
