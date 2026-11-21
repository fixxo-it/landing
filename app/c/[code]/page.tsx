import type { Metadata } from 'next';
import Link from 'next/link';
import { backendUrl } from '@/app/api/chat/backend';
import { CODE_RE, PLACEMENT_RE, type PublicCampaign } from '@/lib/campaign';
import CampaignFlow from '@/components/campaign/CampaignFlow';

/* A QR campaign's page: wallet top-ups and pass packs, set up in the FamCare
   admin (QR Campaigns). People reach it by scanning a printed QR, so search
   engines are told to skip it. Every load counts as a scan for the admin funnel. */

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'FamCare offer',
  robots: { index: false, follow: false },
};

async function load(
  code: string,
  placement: string | null
): Promise<PublicCampaign | null> {
  const url = CODE_RE.test(code) ? backendUrl(`/campaigns/${code}`) : null;
  if (!url) return null;
  const q = placement && PLACEMENT_RE.test(placement) ? `?p=${placement}` : '';
  try {
    const res = await fetch(url + q, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? ((await res.json()) as PublicCampaign) : null;
  } catch {
    return null;
  }
}

export default async function CampaignPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ p?: string }>;
}) {
  const { code } = await params;
  const { p } = await searchParams;
  const campaign = await load(code, typeof p === 'string' ? p : null);

  if (!campaign) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
        <h1 className="font-glyphic text-3xl text-ink sm:text-4xl">
          This offer is not open right now
        </h1>
        <p className="mt-3 text-base text-ink-muted">
          It may have ended, or the link may be incomplete. You can still see
          how FamCare can help you.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex h-12 items-center rounded-full bg-teal-dark px-7 text-base font-semibold text-white"
        >
          Go to FamCare
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-8 sm:py-14">
      <CampaignFlow
        campaign={campaign}
        placement={campaign.placement?.code ?? null}
      />
    </main>
  );
}
