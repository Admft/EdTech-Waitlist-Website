import { ReactNode } from "react";

const CALENDAR_URL = "https://calendar.app.google/AX1fCWGdukco55z47";

function ExternalMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ${className}`}
    >
      <path
        d="M4.5 2H10v5.5M10 2L2.5 9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Variant = "nav" | "cta" | "footer";

const VARIANT: Record<Variant, string> = {
  nav: "inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-semibold text-foreground transition hover:border-brand-red/40 hover:text-brand-red",
  cta: "group mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-brand-blue/45 bg-transparent px-5 py-2.5 text-base font-semibold text-brand-blue-strong transition hover:border-brand-blue hover:bg-brand-blue-soft/40",
  footer:
    "group inline-flex items-center gap-1.5 font-medium text-muted-strong transition hover:text-brand-red",
};

/**
 * Calendar link that always signals it opens externally.
 * Desktop: icon nudges on hover + native title tooltip.
 * Mobile: icon stays visible (no hover needed).
 */
export default function BookMeetingLink({
  variant = "nav",
  children = "Book a meeting",
}: {
  variant?: Variant;
  children?: ReactNode;
}) {
  return (
    <a
      href={CALENDAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Opens in a new tab"
      aria-label="Book a meeting (opens in a new tab)"
      className={`group ${VARIANT[variant]}`}
    >
      {children}
      <ExternalMark className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </a>
  );
}
