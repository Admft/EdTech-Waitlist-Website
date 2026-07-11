"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function HeroScrollStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(rect.height * 0.55, 1);
      const raw = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(raw);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opacity = 1 - progress * 0.55;
  const translate = progress * 48;
  const scale = 1 - progress * 0.04;

  return (
    <div
      ref={ref}
      className="hero-canvas relative isolate flex min-h-[100svh] flex-col scroll-mt-0"
      style={{
        ["--hero-fade" as string]: String(opacity),
        ["--hero-shift" as string]: `${translate}px`,
        ["--hero-scale" as string]: String(scale),
      }}
    >
      {children}
    </div>
  );
}
