import CauseyLogo from "@/components/CauseyLogo";
import CompetitionCards from "@/components/CompetitionCards";
import HeroScrollStage from "@/components/HeroScrollStage";
import HowItWorks from "@/components/HowItWorks";
import SmoothScrollLink from "@/components/SmoothScrollLink";
import TeamSection from "@/components/TeamSection";
import WaitlistForm from "@/components/WaitlistForm";

const CALENDAR_URL = "https://calendar.app.google/AX1fCWGdukco55z47";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <HeroScrollStage>
        <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
            <a href="/" className="transition hover:opacity-80">
              <CauseyLogo size="md" />
            </a>
            <div className="flex items-center gap-1 sm:gap-2">
              <SmoothScrollLink
                href="#how-it-works"
                className="hidden px-3 py-2 text-[14px] font-medium text-muted-strong transition hover:text-foreground sm:inline"
              >
                How it works
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#team"
                className="hidden px-3 py-2 text-[14px] font-medium text-muted-strong transition hover:text-foreground sm:inline"
              >
                Team
              </SmoothScrollLink>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line bg-white px-3.5 py-2 text-[14px] font-semibold text-foreground transition hover:border-brand-red/40 hover:text-brand-red"
              >
                Book a meeting
              </a>
            </div>
          </div>
        </header>

        <div className="hero-scroll-content relative z-10 flex flex-1 flex-col">
          <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 pb-10 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pb-14 lg:pt-16">
            <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="animate-rise mb-4 inline-flex items-center rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-semibold text-brand-red">
                Pre-launch · Fall 2026
              </p>
              <h1 className="animate-rise-delay-1 text-[clamp(2.1rem,5vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-foreground">
                Your talent shouldn&apos;t depend on your zip code.
              </h1>
              <p className="animate-rise-delay-1 mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-muted sm:text-[17px] lg:mx-0">
                Causey helps students discover competitions that match their
                talent — so success isn&apos;t limited by where you live or who
                you know.
              </p>

              <div
                id="waitlist"
                className="animate-rise-delay-2 mx-auto mt-8 max-w-lg scroll-mt-24 rounded-2xl border border-line bg-white p-5 shadow-[0_12px_40px_rgba(20,24,28,0.06)] sm:p-6 lg:mx-0"
              >
                <WaitlistForm idPrefix="hero" source="hero" />
              </div>
            </div>

            <div className="animate-rise-delay-3 min-w-0 self-center">
              <CompetitionCards />
            </div>
          </main>

          <div className="relative z-10 flex justify-center pb-8 pt-1">
            <SmoothScrollLink
              href="#how-it-works"
              className="animate-bob inline-flex flex-col items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-red transition hover:text-accent-hover"
            >
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SmoothScrollLink>
          </div>
        </div>
      </HeroScrollStage>

      <HowItWorks />

      <TeamSection />

      <section className="section-rule bg-surface px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid overflow-hidden rounded-2xl border border-line bg-surface-soft lg:grid-cols-2">
            <div className="border-b border-line bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <h2 className="text-xl font-bold text-foreground">Join the waitlist</h2>
              <p className="mt-2 text-[15px] text-muted">
                Be first to know when Causey launches — and help shape what we
                build.
              </p>
              <div className="mt-5">
                <WaitlistForm idPrefix="bottom" source="footer" />
              </div>
            </div>

            <div className="flex flex-col justify-center bg-brand-blue-soft/50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Want to talk?</h2>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
                Students, parents, coaches, organizers, and builders — book a
                short conversation with the founding team.
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-[15px] font-semibold text-white transition hover:brightness-95"
              >
                Book a meeting
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-rule bg-surface px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="font-semibold text-foreground">Causey</span>
            <span>Myshay Causey, Cornell &apos;29</span>
          </div>
          <div className="flex flex-wrap gap-4 sm:justify-end">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted-strong transition hover:text-brand-red"
            >
              Book a meeting
            </a>
            <a
              href="#waitlist"
              className="font-medium text-muted-strong transition hover:text-brand-red"
            >
              Join the waitlist
            </a>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-6xl text-[13px] text-muted">
          © 2026 Causey. Connecting talent to opportunity.
        </p>
      </footer>
    </div>
  );
}
