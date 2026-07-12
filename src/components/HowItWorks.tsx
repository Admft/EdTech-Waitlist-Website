"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "One place for competitions — not a scavenger hunt across emails, websites, and who happens to know.",
    details: [
      "Browse by category, deadline, and level",
      "See eligibility and cost upfront",
    ],
  },
  {
    step: "02",
    title: "Match",
    body: "Filter by skill, interest, affordability, and eligibility — so fit comes before insider knowledge.",
    details: [
      "STEM, arts, debate, writing, and more",
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

function ArrowRight() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M6 14h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 8l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 12l5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepCard({ item }: { item: (typeof STEPS)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface-soft p-7 transition hover:border-accent/25 hover:bg-white hover:shadow-[0_10px_30px_rgba(27,33,32,0.06)]">
      <span className="text-[13px] font-bold tracking-[0.12em] text-accent">
        {item.step}
      </span>
      <h3 className="mt-4 text-[1.4rem] font-bold tracking-tight text-foreground">
        {item.title}
      </h3>
      <p className="mt-3 min-h-[5.25rem] text-[15px] leading-relaxed text-muted-strong">
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
  );
}

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
        <div className="scroll-reveal max-w-xl text-left">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            How Causey works
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-foreground">
            One path, not a scavenger hunt.
          </h2>
          <p className="mt-4 max-w-[36rem] text-[17px] leading-relaxed text-muted">
            From curiosity to competition in one place — built so every student
            can find opportunities that fit, not just the ones their school
            already knows about.
          </p>
        </div>

        <ol className="mt-14 flex flex-col items-stretch sm:hidden">
          {STEPS.map((item, index) => (
            <li
              key={item.title}
              className="scroll-reveal"
              style={{
                transitionDelay: visible ? `${120 + index * 100}ms` : "0ms",
              }}
            >
              <StepCard item={item} />
              {index < STEPS.length - 1 ? (
                <div
                  className="flex justify-center py-3 text-accent/55"
                  aria-hidden
                >
                  <ArrowDown />
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-14 hidden items-stretch sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-x-0">
          {STEPS.map((item, index) => (
            <Fragment key={item.title}>
              <div
                className="scroll-reveal min-w-0"
                style={{
                  transitionDelay: visible ? `${120 + index * 100}ms` : "0ms",
                }}
              >
                <StepCard item={item} />
              </div>
              {index < STEPS.length - 1 ? (
                <div
                  className="flex w-10 items-center justify-center text-accent/55 md:w-12 lg:w-14"
                  aria-hidden
                >
                  <ArrowRight />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
