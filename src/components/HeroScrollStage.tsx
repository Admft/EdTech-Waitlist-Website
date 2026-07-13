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

      // No fade on mobile — keep the hero fully solid.
      if (window.matchMedia("(max-width: 1023px)").matches) {
        setProgress(0);
        return;
      }

      const rect = el.getBoundingClientRect();
      const total = Math.max(rect.height * 2.4, 1);
      const raw = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(raw);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const opacity = 1 - progress * 0.35;
  const translate = progress * 28;
  const scale = 1 - progress * 0.02;

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
