import { Fragment, type ReactNode } from 'react';

export type Action = 'book_app' | 'call' | 'email' | 'apply_join';

export type QuickReply = {
  id: string;
  question: string;
  answer: string;
  source: string;
  actions: Action[];
  show_at_start: boolean;
  show_after_answers: boolean;
};

/* Everything here is edited on the admin page Support -> Website Chatbot and
   served by /api/chat/config. */
export type ChatConfig = {
  enabled: true;
  launcher_label: string;
  header_eyebrow: string;
  header_title: string;
  header_subtitle: string;
  greeting: string;
  input_placeholder: string;
  fine_print: string;
  max_chips: number;
  support_phone: string;
  support_email: string;
  fallback_reply: string;
  quick_replies: QuickReply[];
};

export type Message =
  | { id: number; role: 'user'; text: string }
  | {
      id: number;
      role: 'bot';
      text: string;
      /** How much of `text` is showing; equals text.length once revealed. */
      shown: number;
      source: string;
      actions: Action[];
    };

const ACTIONS: Action[] = ['book_app', 'call', 'email', 'apply_join'];
export const knownActions = (list: unknown): Action[] =>
  Array.isArray(list)
    ? (list.filter((a) => ACTIONS.includes(a as Action)) as Action[])
    : [];

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .join(' ');

/* Answers allow three things: paragraphs (blank line), "- " lists and
   **bold**. Rendered from text nodes only, never as HTML, so neither an admin
   entry nor a model reply can inject markup or links. */
function inline(text: string): ReactNode[] {
  return text.split('**').map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function AnswerText({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).filter((b) => b.trim());
  return (
    <div className="space-y-2">
      {blocks.map((block, bi) => {
        const out: ReactNode[] = [];
        let list: string[] = [];
        let para: string[] = [];
        const flushList = () => {
          if (!list.length) return;
          out.push(
            <ul key={`l${out.length}`} className="space-y-1">
              {list.map((l, i) => (
                <li key={i} className="relative pl-3.5">
                  <span
                    aria-hidden
                    className="absolute left-0.5 top-[0.62em] h-[5px] w-[5px] rounded-full bg-current opacity-55"
                  />
                  {inline(l)}
                </li>
              ))}
            </ul>
          );
          list = [];
        };
        const flushPara = () => {
          if (!para.length) return;
          out.push(
            <p key={`p${out.length}`}>
              {para.map((l, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {inline(l)}
                </Fragment>
              ))}
            </p>
          );
          para = [];
        };
        for (const line of block.split('\n').filter((l) => l.trim())) {
          if (/^\s*- /.test(line)) {
            flushPara();
            list.push(line.replace(/^\s*- /, ''));
          } else {
            flushList();
            para.push(line);
          }
        }
        flushList();
        flushPara();
        return (
          <div key={bi} className="space-y-2">
            {out}
          </div>
        );
      })}
    </div>
  );
}

/* ── icons (inline, currentColor) ────────────────────────────────────────── */

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 2.5c.4 3.9 2.1 6.6 6 7.5-3.9.9-5.6 3.6-6 7.5-.4-3.9-2.1-6.6-6-7.5 3.9-.9 5.6-3.6 6-7.5Z" />
      <path
        d="M19 15c.2 1.7.9 2.6 2.5 3-1.6.4-2.3 1.3-2.5 3-.2-1.7-.9-2.6-2.5-3 1.6-.4 2.3-1.3 2.5-3Z"
        opacity=".7"
      />
    </svg>
  );
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    {...stroke}
    strokeWidth={2.2}
    aria-hidden
    className="h-5 w-5"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    {...stroke}
    strokeWidth={2.4}
    aria-hidden
    className="h-[18px] w-[18px]"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
export const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    {...stroke}
    strokeWidth={2}
    aria-hidden
    className="h-3 w-3"
  >
    <path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5" />
  </svg>
);
export const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    {...stroke}
    strokeWidth={2}
    aria-hidden
    className="h-[15px] w-[15px]"
  >
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
export const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    {...stroke}
    strokeWidth={2}
    aria-hidden
    className="h-[15px] w-[15px]"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);
