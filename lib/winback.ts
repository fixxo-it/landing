/* Win-back campaign pages: the shape sutram returns and the little helpers
   the page and its three proxy routes share. The campaign itself (questions,
   call slots, copy) is configured in the FamCare admin, never here. */

export const SLUG_RE = /^[a-z0-9][a-z0-9-]{2,39}$/;

export type Option = { value: string; label: string };
export type Question = {
  id: string;
  label: string;
  type: 'choice' | 'text';
  options: Option[];
  required: boolean;
};
export type Slot = {
  key: string;
  label: string;
  start: string;
  end: string;
  available: boolean;
};
export type Day = { date: string; label: string; slots: Slot[] };
export type Campaign = {
  slug: string;
  name: string;
  content: {
    headline: string;
    subheadline: string;
    submit_label: string;
    thank_you: string;
    consent_text: string;
  };
  questions: Question[];
  days: Day[];
};

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'ref',
] as const;

/* The attribution parameters on the link the person tapped. Anything else in
   the address is ignored. */
export function utmFrom(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) out[k] = v.slice(0, 100);
  }
  return out;
}
