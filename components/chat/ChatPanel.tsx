'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { EASE } from '@/components/motion/Reveal';
import { useSafeReducedMotion } from '@/components/fx/MotionPrefs';
import { openAppOrStore } from '@/components/DownloadModal';
import {
  AnswerText,
  BookIcon,
  CloseIcon,
  knownActions,
  MailIcon,
  normalize,
  PhoneIcon,
  SendIcon,
  Sparkle,
  type Action,
  type ChatConfig,
  type Message,
  type QuickReply,
} from './shared';

/* The open chat. Mounted on first open and kept mounted afterwards, so the
   conversation survives closing and reopening (and client-side navigation,
   since the widget lives in the root layout). Nothing persists past a reload.

   Chip taps are answered here from the stored answer, with no network call and
   no tracking. Typed questions go to /api/chat/ask, which records them for the
   admin Overview and answers from a quick reply, the cache or Gemini. */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* A random v4 UUID for grouping one visit's questions in the admin stats.
   Secure randomness only (crypto), never Math.random. randomUUID needs a
   secure context (https / localhost); getRandomValues works everywhere this
   site runs, so it is the fallback. */
function newSessionId(): string {
  const c: Crypto = globalThis.crypto;
  if (typeof c.randomUUID === 'function') return c.randomUUID();
  const bytes = c.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(
    ''
  );
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function ChatPanel({
  config,
  open,
  onClose,
}: {
  config: ChatConfig;
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useSafeReducedMotion();
  const pathname = usePathname();
  const sessionId = useRef(newSessionId());
  const nextId = useRef(1);
  const asked = useRef(new Set<string>());
  const questions = useRef<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 0,
      role: 'bot',
      text: config.greeting,
      shown: config.greeting.length,
      source: '',
      actions: [],
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [askedCount, setAskedCount] = useState(0);

  const chips = useMemo(() => {
    const started = askedCount > 0 || messages.length > 1;
    return config.quick_replies
      .filter((q) => (started ? q.show_after_answers : q.show_at_start))
      .filter((q) => !asked.current.has(q.id))
      .slice(0, config.max_chips);
    // askedCount changes whenever `asked` does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, askedCount, messages.length]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(
        () => inputRef.current?.focus({ preventScroll: true }),
        60
      );
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el)
      el.scrollTo({
        top: el.scrollHeight,
        behavior: reduced ? 'auto' : 'smooth',
      });
  }, [messages, typing, reduced]);

  const markAsked = (q: QuickReply | undefined) => {
    if (q && !asked.current.has(q.id)) {
      asked.current.add(q.id);
      setAskedCount((n) => n + 1);
    }
  };

  /* Reveal an answer a few words at a time (about 3 words every 22 ms), then
     the source line and buttons. Reduced motion: all at once. */
  const reveal = useCallback(
    async (id: number, text: string) => {
      if (reduced) return;
      const parts = text.split(/(\s+)/);
      let count = 0;
      for (let i = 0; i < parts.length; i += 6) {
        count += parts.slice(i, i + 6).join('').length;
        const shown = count;
        setMessages((ms) =>
          ms.map((m) => (m.id === id && m.role === 'bot' ? { ...m, shown } : m))
        );
        await sleep(22);
      }
    },
    [reduced]
  );

  const ask = async (text: string, chip?: QuickReply) => {
    const message = text.trim().slice(0, 500);
    if (!message || busy) return;
    setBusy(true);
    setInput('');
    const previous = questions.current.slice(-3);
    questions.current.push(message);
    setMessages((ms) => [
      ...ms,
      { id: nextId.current++, role: 'user', text: message },
    ]);
    setTyping(true);

    const started = Date.now();
    const minTyping = 650 + Math.random() * 400;
    let answer = config.fallback_reply;
    let source = '';
    let actions: Action[] = ['email'];

    if (chip) {
      markAsked(chip);
      ({ answer, source, actions } = chip);
    } else {
      markAsked(
        config.quick_replies.find(
          (q) => normalize(q.question) === normalize(message)
        )
      );
      try {
        const res = await fetch('/api/chat/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            previous_questions: previous,
            session_id: sessionId.current,
            page: pathname,
          }),
        });
        if (res.ok) {
          const d = await res.json();
          if (typeof d.answer === 'string' && d.answer.trim()) {
            answer = d.answer;
            source = typeof d.source === 'string' ? d.source : '';
            actions = knownActions(d.actions);
          }
        }
      } catch {
        // Network trouble: the fallback reply and Email button stand.
      }
    }

    await sleep(Math.max(0, minTyping - (Date.now() - started)));
    setTyping(false);
    const id = nextId.current++;
    setMessages((ms) => [
      ...ms,
      {
        id,
        role: 'bot',
        text: answer,
        shown: reduced ? answer.length : 0,
        source,
        actions,
      },
    ]);
    await reveal(id, answer);
    setMessages((ms) =>
      ms.map((m) =>
        m.id === id && m.role === 'bot' ? { ...m, shown: answer.length } : m
      )
    );
    setBusy(false);
  };

  const words = config.header_subtitle.trim().split(/\s+/);
  const lastWord = words.pop() ?? '';

  return (
    <motion.div
      role="dialog"
      aria-label="FamCare chat"
      aria-hidden={!open}
      inert={!open}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={
        open
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 18, scale: 0.98 }
      }
      transition={{
        opacity: { duration: 0.28 },
        default: { duration: 0.38, ease: EASE },
      }}
      style={{ transformOrigin: 'bottom right' }}
      className={`fixed bottom-6 right-6 z-[90] flex h-[min(660px,calc(100vh-48px))] w-[400px] flex-col overflow-hidden rounded-[28px] border border-[rgba(11,31,32,0.08)] bg-white font-sans tracking-[-0.015em] text-ink shadow-[0_30px_70px_-26px_rgba(11,31,32,0.5)] max-[640px]:bottom-0 max-[640px]:left-0 max-[640px]:right-0 max-[640px]:top-3 max-[640px]:h-auto max-[640px]:w-auto max-[640px]:rounded-b-none max-[640px]:rounded-t-[26px] ${
        open ? '' : 'pointer-events-none'
      }`}
    >
      {/* header */}
      <div className="relative px-[22px] pb-[14px] pt-[22px]">
        {(config.header_eyebrow || '').trim() && (
          <div className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[-0.01em] text-teal">
            <Sparkle className="h-3.5 w-3.5" />
            {config.header_eyebrow}
          </div>
        )}
        <h2 className="mt-2.5 text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
          {config.header_title}
          {config.header_title && <br />}
          {words.join(' ')}
          {words.length > 0 && ' '}
          {lastWord && (
            <span className="relative inline-block text-teal">
              <span
                aria-hidden
                className="brush-highlight absolute -inset-x-1.5 -inset-y-0.5 bg-[#E4FF5C]"
              />
              <span className="relative">{lastWord}</span>
            </span>
          )}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-[#F1F4F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        >
          <CloseIcon />
        </button>
      </div>

      {/* messages */}
      <div
        ref={listRef}
        aria-live="polite"
        className="flex flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 pb-2 pt-4"
      >
        {messages.map((m) =>
          m.role === 'user' ? (
            <motion.div
              key={m.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="max-w-[86%] self-end rounded-[18px] rounded-br-[6px] bg-lime px-3.5 py-2.5 text-[15px] font-semibold leading-snug text-teal-dark"
            >
              {m.text}
            </motion.div>
          ) : (
            <motion.div
              key={m.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="max-w-[92%]"
            >
              <div className="text-[11.5px] font-bold text-teal">FamCare</div>
              <div className="px-1 py-0.5 text-[15px] leading-[1.5] text-ink">
                <AnswerText text={m.text.slice(0, m.shown)} />
              </div>
              {m.shown >= m.text.length && m.id !== 0 && (
                <>
                  {m.source && (
                    <div className="mt-1.5 flex items-center gap-1.5 px-1 text-[11.5px] opacity-60">
                      <BookIcon />
                      From {m.source}
                    </div>
                  )}
                  {m.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 px-1">
                      {m.actions.map((a) => (
                        <ActionButton key={a} action={a} config={config} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )
        )}
        {typing && (
          <div
            className="flex gap-[5px] px-1 py-2"
            aria-label="FamCare is typing"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-[7px] w-[7px] rounded-full bg-teal/50 motion-safe:animate-[chat-dot_1.1s_infinite]"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* suggestion chips */}
      {chips.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-2.5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.map((q) => (
            <button
              key={q.id}
              type="button"
              disabled={busy}
              onClick={() => ask(q.question, q)}
              className="h-[34px] shrink-0 whitespace-nowrap rounded-full bg-[#F4FCCB] px-3.5 text-[13.5px] font-semibold text-teal-dark transition hover:-translate-y-px hover:bg-[#ECF8B0] disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {q.question}
            </button>
          ))}
        </div>
      )}

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-2 px-3.5 pb-2 pt-2.5"
      >
        <input
          ref={inputRef}
          id="famcare-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          autoComplete="off"
          placeholder={config.input_placeholder}
          aria-label={config.input_placeholder || 'Type your question'}
          className="h-12 min-w-0 flex-1 rounded-full border border-transparent bg-[#F6F8F8] px-4 text-[15px] font-medium text-ink placeholder:text-ink-faint focus:border-teal/50 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={busy}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#013A3C] bg-[linear-gradient(#0E7A82,#014D4F)] text-white disabled:opacity-60"
        >
          <SendIcon />
        </button>
      </form>

      {config.fine_print && (
        <p className="px-4 pb-2.5 text-center text-[11px] opacity-55">
          {config.fine_print}
        </p>
      )}
    </motion.div>
  );
}

const actionCls =
  'inline-flex h-[34px] items-center gap-1.5 rounded-full px-[13px] text-[13px] font-semibold';
const primaryCls = `${actionCls} border border-[#013A3C] bg-[linear-gradient(#0E7A82,#014D4F)] text-white`;
const secondaryCls = `${actionCls} border border-line bg-white text-teal`;

function ActionButton({
  action,
  config,
}: {
  action: Action;
  config: ChatConfig;
}) {
  switch (action) {
    case 'book_app':
      return (
        <button
          type="button"
          onClick={() => openAppOrStore()}
          className={primaryCls}
        >
          Book in the app
        </button>
      );
    case 'apply_join':
      return (
        <Link href="/join" className={primaryCls}>
          Apply to join
        </Link>
      );
    case 'call':
      return (
        <a
          href={`tel:${config.support_phone.replace(/[^\d+]/g, '')}`}
          className={secondaryCls}
        >
          <PhoneIcon />
          Call
        </a>
      );
    case 'email':
      return (
        <a href={`mailto:${config.support_email}`} className={secondaryCls}>
          <MailIcon />
          Email support
        </a>
      );
  }
}
