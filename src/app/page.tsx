import CompetitionCards from "@/components/CompetitionCards";
import HowItWorks from "@/components/HowItWorks";
import TeamSection from "@/components/TeamSection";
import WaitlistForm from "@/components/WaitlistForm";

const CALENDAR_URL = "https://calendar.app.google/AX1fCWGdukco55z47";

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
      <div className="hero-canvas relative isolate">
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
                href="#team"
                className="hidden px-3 py-2 text-[13px] font-medium text-muted-strong transition hover:text-white sm:inline"
              >
                Team
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/15 px-3 py-1.5 text-[13px] font-medium text-muted-strong transition hover:border-white/25 hover:text-white"
              >
                Book a meeting
              </a>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-5 pb-8 pt-10 sm:px-8 sm:pb-10 lg:grid-cols-2 lg:gap-10 lg:pb-12 lg:pt-16">
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="animate-rise mb-4 inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/15 px-3 py-1 text-[12px] font-semibold tracking-wide text-accent">
              Pre-launch · Fall 2026
            </p>
            <h1 className="animate-rise-delay-1 font-display text-[clamp(2.35rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
              Your talent shouldn&apos;t depend on your zip{" "}
              <span className="text-accent">code.</span>
            </h1>
            <p className="animate-rise-delay-1 mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-muted-strong sm:text-[17px] lg:mx-0">
              Causey is the central place students, parents, and coaches find
              competitions worth entering — no insider network required.
            </p>

            <div
              id="waitlist"
              className="animate-rise-delay-2 mx-auto mt-8 max-w-lg scroll-mt-24 rounded-xl border border-white/[0.08] border-l-2 border-l-accent bg-white/[0.02] p-4 sm:p-5 lg:mx-0"
            >
              <WaitlistForm idPrefix="hero" source="hero" />
            </div>
          </div>

          <div className="animate-rise-delay-3 min-w-0 self-center">
            <CompetitionCards />
          </div>
        </main>

        <div className="relative z-10 flex justify-center pb-6 pt-1">
          <a
            href="#how-it-works"
            className="animate-bob inline-flex flex-col items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent transition hover:text-accent-hover"
          >
            How it works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <HowItWorks />

      <TeamSection />

      <section className="section-rule bg-surface px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid overflow-hidden rounded-xl border border-white/[0.08] border-l-2 border-l-accent bg-background/60 lg:grid-cols-2">
            <div className="border-b border-white/[0.08] p-6 sm:p-7 lg:border-b-0 lg:border-r lg:border-white/[0.08]">
              <h2 className="font-display text-xl font-semibold text-white">
                Ready to get in early?
              </h2>
              <p className="mt-2 text-[14px] text-muted">
                Join the waitlist — we&apos;ll reach out when Causey launches.
              </p>
              <div className="mt-5">
                <WaitlistForm idPrefix="bottom" source="footer" />
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-white">
                Want to meet instead?
              </h2>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
                Prefer a conversation? Book a short call and we&apos;ll walk you
                through what Causey is building.
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-enabled mt-6 inline-flex w-fit items-center gap-2 rounded-md px-4 py-2.5 text-[14px] font-semibold"
              >
                Book a meeting
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-rule px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2 text-[13px] text-muted">
            <p>
              <span className="font-medium text-muted-strong">Causey</span>
              {" · "}
              Myshay Causey, Cornell &apos;29
            </p>
            <p>© 2026 Causey. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-2 text-[13px] sm:items-end">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted-strong transition hover:text-white"
            >
              Book a meeting
            </a>
            <a
              href="#waitlist"
              className="font-medium text-muted-strong transition hover:text-white"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
