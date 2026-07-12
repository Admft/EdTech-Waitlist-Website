"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "One place for competitions, not a scavenger hunt across emails, websites, and who happens to know.",
    details: [
      "Browse by category, deadline, and level",
      "See eligibility and cost before you commit",
    ],
  },
  {
    step: "02",
    title: "Match",
    body: "Filter by skill, interest, affordability, and eligibility, so fit comes before insider knowledge.",
    details: [
      "STEM, arts, debate, writing, and more",
      "Matched to your grade level and experience",
    ],
  },
  {
    step: "03",
    title: "Compete",
    body: "Take the next step with clarity and get seen beyond your school network.",
    details: [
      "A clear path from discovery to registration",
      "Competitions can find you, not just the other way around",
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
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
      <div className="mx-auto max-w-4xl">
        <div className="scroll-reveal max-w-2xl">
          <h2 className="text-display-lg font-bold tracking-tight text-foreground">
            One path, not a scavenger hunt.
          </h2>
          <p className="mt-4 text-lg text-muted">
            From curiosity to competition in one place, built so every student
            can find opportunities that fit, not just the ones their school
            already knows about.
          </p>
        </div>

        <ol className="scroll-reveal mt-12 border-t border-line">
          {STEPS.map((item) => (
            <li
              key={item.title}
              className="flex gap-5 border-b border-line py-7 sm:gap-8 sm:py-9"
            >
              <span className="shrink-0 text-base font-bold tracking-[0.12em] text-accent">
                {item.step}
              </span>
              <div className="min-w-0 max-w-prose">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-md text-muted-strong">
                  {item.body}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-2.5 text-sm text-muted"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50"
                        aria-hidden
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
