"use client";

import { useEffect, useRef, useState } from "react";
import SmoothScrollLink from "@/components/SmoothScrollLink";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    side: "right",
    body: "One place for competitions, not a scavenger hunt across emails, websites, and who happens to know.",
    details: [
      "Browse by category, deadline, and level",
      "See eligibility and cost before you commit",
    ],
  },
  {
    step: "02",
    title: "Match",
    side: "left",
    body: "Filter by skill, interest, affordability, and eligibility, so fit comes before insider knowledge.",
    details: [
      "STEM, arts, debate, writing, and more",
      "Matched to your grade level and experience",
    ],
  },
  {
    step: "03",
    title: "Compete",
    side: "right",
    body: "Take the next step with clarity and get seen beyond your school network.",
    details: [
      "A clear path from discovery to registration",
      "Competitions can find you, not just the other way around",
    ],
  },
] as const;

export default function HowItWorks() {
  const pathRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [fractions, setFractions] = useState<number[]>([]);
  const [endFraction, setEndFraction] = useState(1);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const measure = () => {
      const h = path.offsetHeight || 1;
      setFractions(
        stepRefs.current.map((el) =>
          el ? (el.offsetTop + el.offsetHeight / 2) / h : 1,
        ),
      );
      setEndFraction(
        endRef.current
          ? (endRef.current.offsetTop + endRef.current.offsetHeight / 2) / h
          : 0.97,
      );
    };

    measure();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = path.getBoundingClientRect();
        const anchor = window.innerHeight * 0.72;
        const p = (anchor - rect.top) / rect.height;
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(path);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="section-rule scroll-mt-14 bg-surface px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="max-w-xl">
          <h2 className="max-w-[15ch] text-display-lg font-bold tracking-tight text-foreground">
            One path, not a scavenger hunt.
          </h2>
          <p className="mt-4 text-lg text-muted">
            From curiosity to competition in one place, built so every student
            can find opportunities that fit, not just the ones their school
            already knows about.
          </p>
        </div>

        <div ref={pathRef} className="relative mt-14">
          {/* The path: one continuous line, offset left, drawn on scroll. */}
          <svg
            aria-hidden
            preserveAspectRatio="none"
            viewBox="0 0 16 100"
            className="pointer-events-none absolute inset-y-0 left-2 w-4 lg:left-[38%] lg:-translate-x-1/2"
          >
            <line x1="8" y1="0" x2="8" y2="100" stroke="var(--line)" strokeWidth="2" />
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="100"
              stroke="var(--brand-red)"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              style={{ transition: `stroke-dashoffset 120ms ${EASE}` }}
            />
          </svg>

          <ol>
            {STEPS.map((item, i) => {
              const filled = progress >= (fractions[i] ?? 1) - 0.02;
              const numberClass =
                item.side === "left"
                  ? "absolute top-1/2 left-full ml-3 -translate-y-1/2 text-sm font-semibold tabular-nums tracking-[0.1em] text-accent lg:left-auto lg:right-full lg:ml-0 lg:mr-3"
                  : "absolute top-1/2 left-full ml-3 -translate-y-1/2 text-sm font-semibold tabular-nums tracking-[0.1em] text-accent";

              return (
                <li
                  key={item.step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative py-12 sm:py-16 lg:grid lg:grid-cols-[38%_1fr] lg:py-20"
                >
                  <span
                    aria-hidden
                    className="absolute left-4 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 lg:left-[38%]"
                  >
                    <span
                      className={`block h-3.5 w-3.5 rounded-full border-2 border-accent ${
                        filled ? "bg-accent" : "bg-surface"
                      }`}
                      style={{ transition: `background-color 300ms ${EASE}` }}
                    />
                    <span className={numberClass}>{item.step}</span>
                  </span>

                  <div
                    className={
                      item.side === "left"
                        ? "pl-12 lg:col-start-1 lg:pl-0 lg:pr-10 lg:text-right"
                        : "pl-12 lg:col-start-2 lg:pl-10"
                    }
                  >
                    <div
                      className={`max-w-[55ch] ${
                        item.side === "left" ? "lg:ml-auto" : ""
                      }`}
                    >
                      <h3 className="text-xl font-bold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-md text-muted-strong">
                        {item.body}
                      </p>
                      <div className="mt-4 flex flex-col gap-1 text-sm text-muted">
                        {item.details.map((detail) => (
                          <p key={detail}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Terminus: the path leads onward to the waitlist. */}
          <div
            ref={endRef}
            className="relative pl-12 pt-6 lg:grid lg:grid-cols-[38%_1fr] lg:pl-0"
          >
            <span
              aria-hidden
              className="absolute left-4 top-1 z-10 flex flex-col items-center -translate-x-1/2 lg:left-[38%]"
            >
              <span
                className={`block h-3.5 w-3.5 rounded-full ${
                  progress >= endFraction - 0.02 ? "bg-accent" : "bg-line"
                }`}
                style={{ transition: `background-color 300ms ${EASE}` }}
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={progress >= endFraction - 0.02 ? "text-accent" : "text-line"}
                style={{ transition: `color 300ms ${EASE}` }}
              >
                <path
                  d="M8 3v9M4 8l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="lg:col-start-2 lg:pl-10">
              <SmoothScrollLink
                href="#join"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-accent-hover"
              >
                Join the waitlist
                <span className="nudge-x" aria-hidden>
                  →
                </span>
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
