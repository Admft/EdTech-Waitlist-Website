"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { smoothScrollTo } from "@/components/SmoothScrollLink";

/**
 * Hero scroll cue: fades out as you scroll down, and fades immediately on click
 * while the page smooth-scrolls to How it works.
 */
export default function SeeHowItWorksCue({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [opacity, setOpacity] = useState(1);
  const [clickedAway, setClickedAway] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (clickedAway) return;
        // Fade slowly over the first ~560px so it lingers as you leave the hero.
        const next = Math.max(0, 1 - window.scrollY / 560);
        setOpacity(next);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
    };
  }, [clickedAway]);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setClickedAway(true);
    setOpacity(0);
    history.pushState(null, "", "#how-it-works");
    smoothScrollTo("how-it-works");
  }

  const hidden = opacity < 0.05;

  return (
    <div
      className="relative z-20 flex justify-center pb-8 pt-1"
      style={{
        opacity,
        pointerEvents: hidden ? "none" : "auto",
        transition: clickedAway
          ? "opacity 520ms cubic-bezier(0.4, 0, 0.2, 1)"
          : "opacity 160ms linear",
      }}
      aria-hidden={hidden}
    >
      <a href="#how-it-works" className={className} onClick={onClick}>
        {children}
      </a>
    </div>
  );
}
