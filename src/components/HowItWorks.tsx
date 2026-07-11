const STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "Stop hunting across school emails, Instagram posts, and forgotten bookmarks.",
    details: [
      "Browse by category, deadline, and level",
      "See eligibility upfront — no wasted applications",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M15.5 15.5L20 20"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Match",
    body: "Find opportunities that fit your skills and interests — not your zip code.",
    details: [
      "Filter by STEM, arts, debate, writing, and more",
      "Match to grade level, age, and experience",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 12h5l2.5-6 2.5 12L17 12h3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Compete",
    body: "Enter with confidence — and get seen beyond your school network.",
    details: [
      "Clear next steps from discovery to registration",
      "Show up for opportunities you actually qualify for",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 16V10a4 4 0 0 1 8 0v6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path d="M5 16h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M12 16v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M9 20h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-rule bg-surface px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
            How it works
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-white">
            From scattered searching to a clear path.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">
            Causey turns competition discovery into three simple steps — so
            talent and opportunity meet without an insider network.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((item, index) => (
            <li key={item.title} className="relative">
              {index < STEPS.length - 1 ? (
                <span
                  className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-muted/50 lg:block"
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M5 3.5L10.5 8 5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}

              <article className="flex h-full flex-col rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition hover:border-white/16 hover:bg-white/[0.035]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-muted-strong">
                    {item.icon}
                  </div>
                  <span className="font-display text-[12px] font-semibold tracking-[0.14em] text-white/45">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[1.45rem] font-semibold tracking-tight text-white sm:text-[1.55rem]">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-[4.5rem] text-[15px] leading-relaxed text-muted-strong sm:min-h-[4.75rem] sm:text-[16px]">
                  {item.body}
                </p>

                <ul className="mt-auto space-y-2.5 border-t border-white/[0.08] pt-5">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-2.5 text-[13px] leading-snug text-muted/75"
                    >
                      <span
                        className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-white/30"
                        aria-hidden
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
