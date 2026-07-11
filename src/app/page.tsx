import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

const CALENDAR_URL = "https://calendar.app.google/AX1fCWGdukco55z47";

const AUDIENCES = [
  {
    title: "Students, parents & coaches",
    body: "Find competitions in your niche, and help shape what we build.",
  },
  {
    title: "Founding software developers",
    body: "Join the founding engineering team from day one.",
  },
  {
    title: "Advisors",
    body: "Share advice, or just learn more about the idea.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="relative isolate min-h-[100svh] overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80"
          alt="Students collaborating around a table"
          fill
          priority
          className="animate-hero-image object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 animate-fade"
          style={{ background: "var(--hero-overlay)" }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-6 py-7 sm:px-10">
          <nav className="animate-rise flex items-center justify-between gap-4">
            <p className="font-display text-[15px] font-semibold tracking-wide text-white/90">
              EdTech Startup
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-white/70 transition hover:text-white"
            >
              Book a meeting
            </a>
          </nav>

          <main className="flex flex-1 flex-col justify-center pb-12 pt-16">
            <div className="max-w-2xl">
              <h1 className="animate-rise-delay-1 font-display text-[clamp(2.4rem,7vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                EdTech Startup
              </h1>
              <p className="animate-rise-delay-2 mt-5 max-w-lg text-[1.15rem] leading-relaxed text-white/80 sm:text-[1.25rem]">
                Connecting talent to opportunity through competitions —
                regardless of where a student lives or who they know.
              </p>

              <div className="animate-rise-delay-3 mt-9">
                <WaitlistForm variant="hero" />
                <p className="mt-3 text-[13px] text-white/50">
                  Prefer to talk?{" "}
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white/60"
                  >
                    Schedule a meeting
                  </a>
                </p>
              </div>
            </div>
          </main>
        </div>
      </header>

      <section className="bg-surface-solid px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-brand sm:text-[1.75rem]">
            Who this is for
          </h2>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
            If one of these fits, join the waitlist.
          </p>

          <ul className="mt-10 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-10">
            {AUDIENCES.map((item) => (
              <li key={item.title}>
                <h3 className="text-[15px] font-semibold text-brand">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-line bg-background px-6 py-7 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-medium text-brand">EdTech Startup</span>
            {" · "}
            Myshay Causey, Cornell &apos;29
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand transition hover:text-accent"
          >
            Book a meeting
          </a>
        </div>
      </footer>
    </div>
  );
}
