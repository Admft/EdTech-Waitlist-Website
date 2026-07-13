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

// Line X: one source of truth for the track, the nodes, and the terminus.
const LINE_X = "left-4 lg:left-1/2";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const fractionsRef = useRef<number[]>([1, 1, 1]);
  const [reached, setReached] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const measure = () => {
      const h = container.offsetHeight || 1;
      fractionsRef.current = stepRefs.current.map((el) =>
        el ? (el.offsetTop + el.offsetHeight / 2) / h : 1,
      );
    };

    const apply = (p: number) => {
      fill.style.transform = `scaleY(${p})`;
      const next = fractionsRef.current.map((f) => p >= f - 0.02);
      setReached((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };

    measure();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const anchor = window.innerHeight * 0.72;
        const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
        apply(p);
      });
    };

    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(container);
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
      <div className="mx-auto max-w-5xl">
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

        <div ref={containerRef} className="relative mt-12">
          {/* The path: a 2px track with a scaleY fill. */}
          <div
            aria-hidden
            className={`absolute inset-y-0 w-0.5 -translate-x-1/2 bg-line ${LINE_X}`}
          >
            <div
              ref={fillRef}
              className="absolute inset-0 origin-top bg-accent"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol>
            {STEPS.map((item, i) => {
              const filled = reached[i];
              const isLeft = item.side === "left";

              return (
                <li
                  key={item.step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative py-4 first:pt-0 last:pb-0 lg:grid lg:grid-cols-2 lg:py-5"
                >
                  {/* Node on the line */}
                  <span
                    aria-hidden
                    className={`absolute top-1/2 z-20 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent ${LINE_X} ${
                      filled ? "bg-accent" : "bg-surface"
                    }`}
                    style={{ transition: `background-color 300ms ${EASE}` }}
                  />

                  {/* Connector: hairline from the node out to the panel edge */}
                  <span
                    aria-hidden
                    className={`absolute top-1/2 z-0 hidden h-px w-8 -translate-y-1/2 lg:block ${
                      isLeft ? "right-1/2" : "left-1/2"
                    } ${filled ? "bg-accent" : "bg-line"}`}
                    style={{ transition: `background-color 300ms ${EASE}` }}
                  />

                  <div
                    className={
                      isLeft
                        ? "pl-10 lg:col-start-1 lg:pl-0 lg:pr-8"
                        : "pl-10 lg:col-start-2 lg:pl-8"
                    }
                  >
                    {/* The panel: flat, square, one hard accent edge facing the
                        path. No shadow, no radius, no hover lift. */}
                    <div
                      className={`bg-canvas px-5 py-4 ring-1 ring-line ${
                        isLeft
                          ? "lg:border-r-2 lg:text-right"
                          : "lg:border-l-2"
                      } ${filled ? "border-accent" : "border-line"}`}
                      style={{ transition: `border-color 300ms ${EASE}` }}
                    >
                      <div
                        className={`flex items-baseline gap-2.5 ${
                          isLeft ? "lg:justify-end" : ""
                        }`}
                      >
                        <span className="text-sm font-semibold tabular-nums tracking-[0.1em] text-accent">
                          {item.step}
                        </span>
                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-base leading-snug text-muted-strong">
                        {item.body}
                      </p>
                      <div
                        className={`mt-3 flex flex-col gap-0.5 border-t border-line pt-3 text-sm text-muted ${
                          isLeft ? "lg:items-end" : ""
                        }`}
                      >
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

          {/* Terminus */}
          <div
            ref={endRef}
            className="relative pl-10 pt-5 lg:grid lg:grid-cols-2 lg:pl-0"
          >
            <span
              aria-hidden
              className={`absolute top-0 z-10 flex -translate-x-1/2 flex-col items-center gap-0.5 ${LINE_X}`}
            >
              <span
                className={`block h-3 w-3 rounded-full ${
                  reached[3] ? "bg-accent" : "bg-line"
                }`}
                style={{ transition: `background-color 300ms ${EASE}` }}
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={reached[3] ? "text-accent" : "text-line"}
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

            <div className="lg:col-start-2 lg:pl-8">
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