/* QR campaigns (/c/[code]): an offer behind a QR code, set up in the FamCare
   admin (QR Campaigns). The page holds no copy of its own beyond fallbacks. */

export const CODE_RE = /^[a-z0-9][a-z0-9-]{1,39}$/;
export const PLACEMENT_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;

/* httpOnly cookie holding the customer's FamCare login on this site. The
   browser never sees the token; only this site's /api/campaign routes do. */
export const SESSION_COOKIE = 'fc_campaign_session';
export const SESSION_MAX_AGE = 2 * 60 * 60; // 2 hours

export type BonusRule = { min_amount_paise: number; bonus_paise: number };

export type CampaignState =
  'live' | 'not_started' | 'ended' | 'paused' | 'sold_out' | 'unavailable';

export type PublicCampaign = {
  code: string;
  name: string;
  kind: 'wallet_topup' | 'pass_pack';
  state: CampaignState;
  starts_at: string | null;
  ends_at: string | null;
  headline: string;
  subheadline: string | null;
  highlights: string[];
  terms: string | null;
  button_label: string | null;
  success_message: string | null;
  ended_message: string | null;
  audience: 'all' | 'new' | 'existing';
  require_serviceable: 'off' | 'new_users' | 'all';
  placement: { code: string; name: string } | null;
  fallback: { code: string; headline: string } | null;
  topup: {
    amount_options_paise: number[];
    allow_custom_amount: boolean;
    min_amount_paise: number | null;
    max_amount_paise: number | null;
    bonus_rules: BonusRule[];
    bonus_once_per_phone: boolean;
    preset_amount_paise: number | null;
  } | null;
  pack: {
    plan_name: string;
    visits: number;
    validity_days: number;
    session_hours: number | null;
    services: string[];
    price_paise: number;
  } | null;
};

export type Me = {
  eligible: boolean;
  reason_code: string | null;
  message: string | null;
  is_new_user: boolean;
  bonus_available: boolean;
  needs_location: boolean;
  phone_last4: string;
  wallet_balance_paise: number;
  dev_bypass: boolean;
};

export type Checkout = {
  purchase_id: string;
  order_id: string;
  key_id: string;
  amount_paise: number;
  bonus_paise: number;
  currency: string;
  name: string;
  description: string;
  prefill: { contact: string };
  dev_bypass: boolean;
};

export type PurchaseResult = {
  purchase_id: string;
  status: 'created' | 'paid' | 'fulfilled' | 'expired' | 'failed';
  kind: 'wallet_topup' | 'pass_pack';
  amount_paise: number;
  bonus_paise: number;
  wallet_balance_paise: number;
  success_message: string | null;
  pass: {
    plan_name: string;
    visits_total: number;
    expires_at: string | null;
  } | null;
};

export function rupees(paise: number | null | undefined): string {
  if (paise == null) return '';
  const r = paise / 100;
  return (
    '₹' +
    r.toLocaleString('en-IN', {
      minimumFractionDigits: r % 1 ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
}

/* The extra for an amount: the highest slab it reaches. */
export function bonusFor(rules: BonusRule[], amountPaise: number): number {
  let best = 0;
  for (const r of rules)
    if (amountPaise >= r.min_amount_paise) best = r.bonus_paise;
  return best;
}

export function dateLabel(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}
