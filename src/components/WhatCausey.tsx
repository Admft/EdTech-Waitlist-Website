"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
  span: string;
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    title: "Find competitions in your niche",
    body: "Discover opportunities that match what you actually care about — not just what happens to float through your school.",
    span: "col-span-3",
    icon: (
      <Icon>
        <circle cx="11" cy="11" r="6" />
        <path d="M11 8v6M8 11h6M20 20l-4.5-4.5" />
      </Icon>
    ),
  },
  {
    title: "Choose by skill level",
    body: "Filter by how challenging a competition is, so you can stretch yourself without guessing in the dark.",
    span: "col-span-3",
    icon: (
      <Icon>
        <path d="M5 20V10M12 20V4M19 20v-7" />
      </Icon>
    ),
  },
  {
    title: "Know what's affordable",
    body: "See costs upfront and make decisions that work for your budget — not just for students who already have resources.",
    span: "col-span-2",
    icon: (
      <Icon>
        <path d="M4 7a2 2 0 0 1 2-2h8l6 6-8 8-8-8V7Z" />
        <circle cx="8.5" cy="8.5" r="1.25" />
      </Icon>
    ),
  },
  {
    title: "Save the search time",
    body: "Stop bouncing across scattered websites, emails, and word of mouth. One place for what's relevant.",
    span: "col-span-2",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" />
      </Icon>
    ),
  },
  {
    title: "Connect both sides",
    body: "A central base that puts students in touch with competitions — and competitions in touch with students.",
    span: "col-span-2",
    icon: (
      <Icon>
        <path d="M9 15l6-6" />
        <path d="M8 11l-2 2a3.5 3.5 0 0 0 5 5l2-2" />
        <path d="M16 13l2-2a3.5 3.5 0 0 0-5-5l-2 2" />
      </Icon>
    ),
  },
];

const MISSION = {
  title: "Level the playing field",
  body: "Opportunity shouldn't depend on who you know or what school you attend. We're building for equitable access — including students from lower-income communities.",
  icon: (
    <Icon>
      <path d="M12 4v16M6 20h12M12 5l6 3-6 3-6-3 6-3Z" />
      <path d="M5 9l-2.5 4.5a3 3 0 0 0 5 0L5 9ZM19 9l-2.5 4.5a3 3 0 0 0 5 0L19 9Z" />
    </Icon>
  ),
};

export default function WhatCausey() {
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
      id="what-causey"
      className={`section-rule hidden bg-surface-soft px-8 py-24 lg:block ${
        visible ? "is-inview" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="scroll-reveal mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            What Causey is
          </p>
          <h2 className="mt-3 text-[clamp(2rem,3.6vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-foreground">
            Making competition discovery fair, clear, and reachable.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            For too long, finding competitions has been word of mouth — decided
            by zip code and school. Causey is the central platform so any
            student with drive can build a clear path to the next level.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-6 gap-4">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className={`scroll-reveal group flex flex-col rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_16px_40px_rgba(27,33,32,0.08)] ${feature.span}`}
              style={{
                transitionDelay: visible ? `${120 + index * 80}ms` : "0ms",
              }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-brand-red transition group-hover:scale-105">
                {feature.icon}
              </span>
              <h3 className="mt-5 text-[1.2rem] font-bold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-strong">
                {feature.body}
              </p>
            </article>
          ))}

          <article
            className="scroll-reveal group relative col-span-6 flex items-center gap-6 overflow-hidden rounded-2xl border border-brand-blue/20 bg-brand-blue-soft/45 p-8"
            style={{
              transitionDelay: visible ? `${120 + FEATURES.length * 80}ms` : "0ms",
            }}
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-brand-blue-strong shadow-[0_6px_18px_rgba(58,122,163,0.18)]">
              {MISSION.icon}
            </span>
            <div className="min-w-0">
              <h3 className="text-[1.35rem] font-bold tracking-tight text-foreground">
                {MISSION.title}
              </h3>
              <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-muted-strong">
                {MISSION.body}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
