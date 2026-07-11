"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "Find competitions in one place — not scattered across emails, websites, and word of mouth.",
    details: [
      "Browse by category, deadline, and level",
      "See eligibility upfront",
    ],
  },
  {
    step: "02",
    title: "Match",
    body: "Get matched to opportunities that fit your skills and interests — not your zip code.",
    details: [
      "Filter by STEM, arts, debate, writing, and more",
      "Match to grade level and experience",
    ],
  },
  {
    step: "03",
    title: "Compete",
    body: "Take the next step with clarity — and get seen beyond your school network.",
    details: [
      "Clear path from discovery to registration",
      "Show up for opportunities you qualify for",
    ],
  },
] as const;

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`section-rule scroll-mt-14 bg-surface px-5 py-20 sm:px-8 sm:py-24 ${
        visible ? "is-inview" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="scroll-reveal mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
            How it works
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-tight text-foreground">
            A clearer path from curiosity to competition.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Causey is built so every student can find opportunities that match
            their talent — without needing the right school or the right
            connections.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((item, index) => (
            <li
              key={item.title}
              className="scroll-reveal relative"
              style={{ transitionDelay: visible ? `${120 + index * 100}ms` : "0ms" }}
            >
              {index < STEPS.length - 1 ? (
                <span
                  className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-accent/40 sm:block"
                  aria-hidden
                >
                  →
                </span>
              ) : null}

              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface-soft p-7 transition hover:border-accent/25 hover:bg-white hover:shadow-[0_10px_30px_rgba(27,33,32,0.06)]">
                <span className="text-[13px] font-bold tracking-[0.12em] text-accent">
                  {item.step}
                </span>
                <h3 className="mt-4 text-[1.4rem] font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 min-h-[4.5rem] text-[15px] leading-relaxed text-muted-strong sm:min-h-[4.75rem]">
                  {item.body}
                </p>
                <ul className="mt-auto space-y-2 border-t border-line pt-5">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-2.5 text-[13px] leading-snug text-muted"
                    >
                      <span
                        className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50"
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
