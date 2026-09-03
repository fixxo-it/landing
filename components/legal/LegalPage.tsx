import { Container } from "@/components/ui/Section";
import BackButton from "@/components/legal/BackButton";

/* Shared shell for every legal page — the back button, the title, and a
   prose column for the content. One place to change the layout for all four
   pages rather than four copies drifting apart. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  /* e.g. "Last updated 18 August 2026" — optional, shown under the title
     once the real policy text and its effective date are in */
  updated?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      {/* sticky, not fixed: it scrolls with the page until it reaches the top,
         then holds there — never overlaps content on a short viewport the way
         a fixed position would */}
      <div className="sticky top-0 z-50 bg-white/80 py-4 backdrop-blur-md">
        <Container>
          <BackButton />
        </Container>
      </div>

      <Container className="max-w-[820px] pb-24 pt-8 lg:pb-32 lg:pt-12">
        <h1 className="font-display text-h1 font-semibold text-ink lg:text-h1-lg">
          {title}
        </h1>
        {updated && <p className="mt-3 text-sm text-ink-faint">{updated}</p>}

        {children ? (
          /* no typography plugin in this project, so the content's own tags
             are styled by hand here rather than with `prose` — h2 for each
             section, p for body copy, ul/li for lists. Content just writes
             plain JSX/HTML, this supplies the look. */
          <div
            className="mt-10 space-y-5 text-[15px] leading-relaxed text-ink-muted
              [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-h3 [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:first:mt-0
              [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink
              [&_a]:text-teal [&_a]:underline [&_a]:decoration-teal/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-teal
              [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
              [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5
              [&_strong]:font-semibold [&_strong]:text-ink"
          >
            {children}
          </div>
        ) : (
          /* placeholder until the real copy is dropped in — kept visually
             distinct (dashed, muted) so nobody mistakes it for the actual
             policy text */
          <p className="mt-10 rounded-2xl border border-dashed border-line px-6 py-10 text-center text-sm text-ink-faint">
            Content coming soon.
          </p>
        )}
      </Container>
    </main>
  );
}
