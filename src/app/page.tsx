import CompetitionCards from "@/components/CompetitionCards";
import WaitlistForm from "@/components/WaitlistForm";

const CALENDAR_URL = "https://calendar.app.google/AX1fCWGdukco55z47";

const STEPS = [
  {
    title: "Discover",
    body: "Browse competitions in one place instead of scattered sites and word of mouth.",
  },
  {
    title: "Match",
    body: "Find opportunities that fit your skills, interests, and eligibility — not your zip code.",
  },
  {
    title: "Compete",
    body: "Enter with confidence. Organizers reach a broader, more diverse talent pool.",
  },
] as const;

function LogoMark() {
  return (
    <span className="flex items-center gap-2.5" aria-label="Causey">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="1" y="1" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M7.2 11c0-2.1 1.5-3.5 3.8-3.5 1.5 0 2.6.6 3.2 1.6l-1.5.9c-.3-.5-.9-.9-1.7-.9-1.2 0-2 .8-2 1.9s.8 1.9 2 1.9c.8 0 1.4-.3 1.7-.9l1.5.9c-.6 1-1.7 1.6-3.2 1.6-2.3 0-3.8-1.4-3.8-3.5Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-display text-[15px] font-semibold tracking-tight">Causey</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <div className="hero-canvas relative isolate min-h-[100svh]">
        <div className="noise-overlay" aria-hidden />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
            <a href="/" className="text-foreground transition hover:text-white">
              <LogoMark />
            </a>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="#how-it-works"
                className="hidden px-3 py-2 text-[13px] font-medium text-muted-strong transition hover:text-white sm:inline"
              >
                How it works
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/20 px-3 py-1.5 text-[13px] font-medium text-foreground transition hover:bg-white/5"
              >
                Book a meeting
              </a>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="max-w-xl">
            <h1 className="animate-rise font-display text-[clamp(2.35rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
              Your talent shouldn&apos;t depend on your zip code.
            </h1>
            <p className="animate-rise-delay-1 mt-5 max-w-md text-[16px] leading-relaxed text-muted-strong sm:text-[17px]">
              Causey is the central place students, parents, and coaches find
              competitions worth entering — no insider network required.
            </p>

            <div className="animate-rise-delay-2 mt-8 max-w-lg">
              <WaitlistForm />
            </div>
          </div>

          <div className="animate-rise-delay-3 hidden lg:block">
            <CompetitionCards />
          </div>
        </main>
      </div>

      <section
        id="how-it-works"
        className="border-t border-line bg-surface px-5 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
            How it works
          </h2>
          <p className="mt-2 max-w-md text-[15px] text-muted">
            One platform. From discovery to the starting line.
          </p>

          <ol className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-3 sm:gap-8">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="border-t border-line px-5 py-10 sm:px-8 lg:hidden">
        <div className="mx-auto max-w-md">
          <CompetitionCards />
        </div>
      </div>

      <footer className="border-t border-line px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-medium text-muted-strong">Causey</span>
            {" · "}
            Myshay Causey, Cornell &apos;29
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-muted-strong transition hover:text-white"
          >
            Book a meeting
          </a>
        </div>
      </footer>
    </div>
  );
}
