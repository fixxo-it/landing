import type { Metadata } from 'next';
import Link from 'next/link';
import { backendUrl } from '@/app/api/chat/backend';
import { SLUG_RE, type Campaign } from '@/lib/winback';
import CallForm from '@/components/winback/CallForm';

/* A win-back campaign's call-back page. What it asks and which call slots it offers
   are set in the FamCare admin (Support, Win-back), so this page has no copy of its
   own. It is for people who were sent the link, so search engines are told to skip it. */

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Get a call from FamCare',
  robots: { index: false, follow: false },
};

async function load(slug: string): Promise<Campaign | null> {
  const url = SLUG_RE.test(slug) ? backendUrl(`/v1/winback/${slug}`) : null;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? ((await res.json()) as Campaign) : null;
  } catch {
    return null;
  }
}

export default async function CallPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = await load(slug);

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
    <main className="mx-auto max-w-xl px-5 py-10 sm:py-16">
      <CallForm initial={campaign} />
    </main>
  );
}
