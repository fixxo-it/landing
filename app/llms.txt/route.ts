import {
  BUSINESS,
  HOME_FAQ,
  PAGES,
  SITE_URL,
  answerText,
} from '@/lib/site-content';

/* /llms.txt (llmstxt.org): a plain summary of the site for AI assistants and
   agents. Built from lib/site-content.ts at build time, so it can never drift
   from the site. Rules that change, like cancellations and refunds, are
   linked rather than restated. */
export const dynamic = 'force-static';

const url = (path: string) => `${SITE_URL}${path}`;

const list = (items: readonly string[]) =>
  items.length > 1
    ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
    : items.join('');

export function GET() {
  const pages = PAGES.filter((p) => !('optional' in p));
  const optional = PAGES.filter((p) => 'optional' in p);

  const body = [
    `# ${BUSINESS.name}`,
    '',
    `> ${BUSINESS.summary} Currently serving ${list(BUSINESS.areas)}.`,
    '',
    `- Services: ${list(BUSINESS.services.map((s) => s.toLowerCase()))}.`,
    '- Booking happens in the FamCare app (iOS and Android); the website does not take bookings.',
    `- Get the app: ${BUSINESS.appUrl}`,
    `- Contact: ${BUSINESS.email} · ${BUSINESS.phoneDisplay}`,
    '',
    'Frequently asked questions:',
    '',
    ...HOME_FAQ.flatMap((group) =>
      group.items.map(([q, a]) => `- ${q} ${answerText(a)}`)
    ),
    '',
    '## Pages',
    '',
    ...pages.map((p) => `- [${p.name}](${url(p.path)}): ${p.about}`),
    '',
    '## Optional',
    '',
    ...optional.map((p) => `- [${p.name}](${url(p.path)}): ${p.about}`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
