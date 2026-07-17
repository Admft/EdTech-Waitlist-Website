import { ReactNode } from "react";

export const APP_URL = "https://app.causey.dev";

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
  nav: "inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-red-hover",
  cta: "group mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-base font-semibold text-white transition hover:bg-brand-red-hover",
  footer:
    "group inline-flex items-center gap-1.5 font-medium text-muted-strong transition hover:text-brand-red",
};

export default function TryAppLink({
  variant = "nav",
  children = "Try the app",
}: {
  variant?: Variant;
  children?: ReactNode;
}) {
  return (
    <a
      href={APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Opens in a new tab"
      aria-label={`${typeof children === "string" ? children : "Try the app"} (opens in a new tab)`}
      className={`group ${VARIANT[variant]}`}
    >
      {children}
      <ExternalMark className="opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </a>
  );
}
