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
                className="hidden px-3 py-2 text-sm font-medium text-muted-strong transition hover:text-foreground sm:inline"
              >
                How it works
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#team"
                className="hidden px-3 py-2 text-sm font-medium text-muted-strong transition hover:text-foreground sm:inline"
              >
                Team
              </SmoothScrollLink>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-semibold text-foreground transition hover:border-brand-red/40 hover:text-brand-red"
              >
                Book a meeting
              </a>
            </div>
          </div>
        </header>

        <div className="hero-scroll-content relative z-10 flex flex-1 flex-col">
          <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 pb-10 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pb-14 lg:pt-16">
            <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
              <h1 className="animate-rise text-display-xl font-bold tracking-tight text-foreground">
                Every student
                <br />
                deserves a fair shot at opportunity.
              </h1>
              <p className="animate-rise-delay-1 mx-auto mt-5 max-w-md text-md text-muted sm:text-lg lg:mx-0">
                Causey helps students discover competitions that match their
                talent, so success isn&apos;t limited by where you live or who
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
              className="animate-bob inline-flex flex-col items-center gap-1 text-sm font-bold uppercase tracking-[0.1em] text-brand-red transition hover:text-accent-hover"
            >
              See how it works
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

      <section id="join" className="section-rule scroll-mt-14 bg-surface px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-lg font-bold tracking-tight text-foreground">
              Be first in line when Causey opens.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
              Join the waitlist to help shape what we build, or book a short
              call with the founding team.
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-2xl border border-line bg-surface-soft shadow-[0_20px_60px_rgba(20,24,28,0.08)] lg:grid-cols-2">
            <div className="border-b border-line bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Join the waitlist
              </h3>
              <p className="mt-2 text-base text-muted">
                Free to join. We&apos;ll only email you about Causey.
              </p>
              <div className="mt-5">
                <WaitlistForm idPrefix="bottom" source="footer" />
              </div>
            </div>

            <div className="flex flex-col justify-center bg-brand-blue-soft/50 p-6 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Want to talk?
              </h3>
              <p className="mt-2 max-w-sm text-base text-muted">
                Book a short conversation with the founding team about what
                we&apos;re building.
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-brand-blue/45 bg-transparent px-5 py-2.5 text-base font-semibold text-brand-blue-strong transition hover:border-brand-blue hover:bg-brand-blue-soft/40"
              >
                Book a meeting
                <span className="nudge-x" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-rule bg-surface px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CauseyLogo size="sm" />
            <span className="text-xs text-muted">
              Myshay Causey, Cornell &apos;29
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:justify-end">
            <SmoothScrollLink
              href="#how-it-works"
              className="font-medium text-muted-strong transition hover:text-brand-red"
            >
              How it works
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#team"
              className="font-medium text-muted-strong transition hover:text-brand-red"
            >
              Team
            </SmoothScrollLink>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted-strong transition hover:text-brand-red"
            >
              Book a meeting
            </a>
            <SmoothScrollLink
              href="#waitlist"
              className="font-medium text-muted-strong transition hover:text-brand-red"
            >
              Join the waitlist
            </SmoothScrollLink>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-6xl border-t border-line pt-6 text-xs text-muted">
          © 2026 Causey.
        </p>
      </footer>
    </div>
  );
}
