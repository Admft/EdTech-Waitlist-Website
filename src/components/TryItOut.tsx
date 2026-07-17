import Reveal from "@/components/Reveal";
import TryAppLink from "@/components/TryAppLink";

/**
 * Marketing bridge to the live product. Anti-vibecode constraints applied:
 * no status pill above the headline, no idle ping, no unlabeled fake counts,
 * no decorative checkmark squares, no rounded-full chips, mock labeled
 * illustrative, one primary CTA that names the action.
 */

const WHAT_YOU_GET = [
  {
    title: "Zip and radius",
    body: "Find scholastic chess tournaments near a real location.",
  },
  {
    title: "Cost and eligibility first",
    body: "Entry fees, dates, and who can play before you leave Causey.",
  },
  {
    title: "Filters that matter",
    body: "Grade band, rating band, fee ceiling, and date window.",
  },
] as const;

const FILTERS = [
  { label: "All grades", active: true },
  { label: "Under $50", active: false },
  { label: "Any rating", active: false },
  { label: "Next 30 days", active: false },
] as const;

/** Clearly illustrative sample rows — not live inventory counts. */
const SAMPLE_RESULTS = [
  {
    name: "Fall Scholastic Open",
    date: "Sat, Oct 4",
    fee: "$25 entry",
    eligibility: "Grades K–12",
  },
  {
    name: "City Youth Championship",
    date: "Sun, Oct 12",
    fee: "$40 entry",
    eligibility: "U1200 & Open",
  },
] as const;

/** Static, decorative preview of the live search experience. */
function AppPreview() {
  return (
    <figure className="m-0">
      <div
        aria-hidden
        className="rounded-2xl border border-line bg-surface-soft p-3 sm:p-4"
      >
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="flex items-center border-b border-line bg-surface-soft px-4 py-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-md bg-line" />
              <span className="h-2.5 w-2.5 rounded-md bg-line" />
              <span className="h-2.5 w-2.5 rounded-md bg-line" />
            </span>
            <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-2xs text-muted ring-1 ring-line">
              app.causey.dev
            </span>
            <span className="w-10" />
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex items-center gap-2 rounded-lg border border-field-border bg-field px-3 py-2">
              <span className="truncate text-sm text-muted-strong">
                Chess tournaments near{" "}
                <span className="font-semibold text-foreground">90012</span>
              </span>
              <span className="ml-auto shrink-0 rounded-lg bg-brand-red px-2.5 py-1 text-2xs font-semibold text-white">
                Search
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <span
                  key={filter.label}
                  className={`rounded-lg px-2.5 py-1 text-2xs font-medium ring-1 ${
                    filter.active
                      ? "bg-accent-soft text-brand-red ring-brand-red/25"
                      : "bg-white text-muted ring-line"
                  }`}
                >
                  {filter.label}
                </span>
              ))}
            </div>

            <div>
              <p className="text-2xs font-semibold uppercase tracking-[0.06em] text-muted">
                Sample results
              </p>
              <ul className="mt-2 space-y-2">
                {SAMPLE_RESULTS.map((result) => (
                  <li
                    key={result.name}
                    className="rounded-lg border border-line bg-white p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold tracking-tight text-foreground">
                        {result.name}
                      </span>
                      <span className="shrink-0 rounded-md bg-surface-soft px-2 py-0.5 text-2xs font-medium text-muted-strong ring-1 ring-line">
                        {result.eligibility}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {result.date} · {result.fee}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-2xs text-muted lg:text-left">
        Illustrative preview. Open the app for live tournaments.
      </figcaption>
    </figure>
  );
}

export default function TryItOut() {
  return (
    <section
      id="try-it"
      className="section-rule scroll-mt-14 overflow-hidden bg-surface px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <Reveal
          variant="left"
          className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left"
        >
          <h2 className="text-display-lg font-bold tracking-tight text-foreground">
            Search real chess tournaments now.
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-lg text-muted lg:mx-0">
            Chess discovery is live on app.causey.dev. Enter a zip code, see
            fees and eligibility, then open the organizer site to register.
            STEM, debate, arts, and writing come next.
          </p>

          <ul className="mt-8 space-y-5 border-l border-line pl-4 text-left">
            {WHAT_YOU_GET.map((item) => (
              <li key={item.title}>
                <p className="text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 max-w-prose text-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ul>

          <TryAppLink variant="cta">Search chess tournaments</TryAppLink>
        </Reveal>

        <Reveal variant="right" className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <AppPreview />
        </Reveal>
      </div>
    </section>
  );
}
