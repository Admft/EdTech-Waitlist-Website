"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";

const TEAM = [
  {
    name: "Adam Moffat",
    role: "Head of Software Engineering",
    statement:
      "Cornell M.Eng. student. I lead Causey's software architecture and core product engineering, building systems that make discovery fair.",
    image: "/adam-headshot.jpg",
    imageAlt: "Headshot of Adam Moffat",
    imageScale: 1.35,
    linkedin: "https://www.linkedin.com/in/adamrmoffat/",
  },
  {
    name: "Divine Bamgboye",
    role: "Founding Software Engineer",
    statement:
      "I'm building the product alongside the team, shipping features that open doors for students who don't already have them.",
    image: "/divine-headshot.jpg",
    imageAlt: "Headshot of Divine Bamgboye",
    linkedin: "https://www.linkedin.com/in/divine-bamgboye-859149317/",
  },
  {
    name: "Sasha Hobbs",
    role: "Task Hand",
    statement:
      "I keep the founding work moving day to day, so the team can stay focused on building Causey for students who need it.",
    image: "/sasha-headshot.jpg",
    imageAlt: "Headshot of Sasha Hobbs",
  },
] as const;

const FOUNDER_REST = [
  "Growing up in Los Angeles, she won local chess competitions but found it nearly impossible to access state and national tournaments, despite actively seeking opportunities and having the ability to compete. It wasn't until she moved across the country that she was finally able to compete—and win—on a larger stage.",
  "That experience revealed a problem extending far beyond chess: countless talented students are overlooked simply because they lack access to the right opportunities.",
  "Causey was founded to change that. By making competitive opportunities more accessible, we are working to ensure that talent—not chance or financial circumstances—determines how far students can go, giving every young person the chance to develop their skills, compete at the highest levels, and reach their full potential.",
];

export default function TeamSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="team"
      className="section-rule bg-surface-soft px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-14">
          <Reveal variant="left" className="mx-auto w-full max-w-[220px] lg:mx-0 lg:max-w-none">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_48px_rgba(20,24,28,0.1)]">
              <Image
                src="/myshay-headshot.jpeg"
                alt="Myshay Causey, Founder & CEO of Causey"
                fill
                sizes="240px"
                className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </Reveal>

          <Reveal variant="right" className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Our story
            </p>
            <h2 className="mt-3 font-display text-display font-semibold tracking-tight text-foreground">
              Meet our founder
            </h2>
            <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-base font-bold tracking-tight text-foreground">
                Myshay Causey
              </p>
              <p className="text-xs font-semibold text-brand-red">
                Founder &amp; CEO
              </p>
              <a
                href="https://www.linkedin.com/in/myshay-causey-a29684285/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-xs font-medium text-muted-strong transition hover:text-brand-red"
              >
                LinkedIn <span className="nudge-x" aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-4 space-y-3 text-[15px] leading-[1.65] text-muted sm:text-[16px]">
              <p>
                Causey was first envisioned while its founder was still in high
                school and officially launched at age 19 while attending Cornell
                University.
              </p>
              <div className={`space-y-3 ${expanded ? "block" : "hidden"} lg:block`}>
                {FOUNDER_REST.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-red transition hover:text-brand-red-hover lg:hidden"
              aria-expanded={expanded}
            >
              {expanded ? "Read less" : "Read more"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-line pt-10 sm:mt-14 sm:pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              The team
            </p>
            <h2 className="mt-3 text-display-sm font-bold tracking-tight text-foreground">
              Builders behind Causey
            </h2>
            <p className="mt-2.5 text-base text-muted">
              Students and engineers working to make opportunity easier to find.
            </p>
          </div>

          <ul className="mx-auto mt-9 grid max-w-[56rem] grid-cols-3 gap-x-6 gap-y-9 sm:gap-x-12 lg:gap-x-16">
            {TEAM.map((person) => {
              const image = (
                <Image
                  src={person.image}
                  alt={person.imageAlt}
                  fill
                  sizes="168px"
                  className={
                    "imageScale" in person && person.imageScale
                      ? "object-cover object-top scale-[1.35] transition duration-500 group-hover:scale-[1.42]"
                      : "object-cover object-top transition duration-500 group-hover:scale-[1.05]"
                  }
                />
              );

              return (
                <li
                  key={person.name}
                  className="group flex flex-col items-center text-center"
                >
                  {"linkedin" in person && person.linkedin ? (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="card-lift relative aspect-square w-full max-w-[168px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(27,33,32,0.07)]"
                    >
                      {image}
                    </a>
                  ) : (
                    <div className="relative aspect-square w-full max-w-[168px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(27,33,32,0.07)]">
                      {image}
                    </div>
                  )}
                  <div className="mt-3 max-w-[220px]">
                    <h3 className="text-base font-bold tracking-tight text-foreground">
                      {person.name}
                    </h3>
                    <p className="mt-0.5 text-2xs font-semibold text-brand-red">
                      {person.role}
                    </p>
                    <p className="mt-2 hidden text-xs text-muted sm:block">
                      {person.statement}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
