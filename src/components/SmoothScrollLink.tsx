"use client";

import { MouseEvent, ReactNode } from "react";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(id: string, duration = 1100) {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navOffset = 56;
  const end = target.getBoundingClientRect().top + window.scrollY - navOffset;

  if (prefersReduced) {
    window.scrollTo(0, end);
    return;
  }

  const start = window.scrollY;
  const distance = end - start;
  const startTime = performance.now();

  function frame(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export default function SmoothScrollLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const id = href.slice(1);
    history.pushState(null, "", href);
    smoothScrollTo(id);
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
