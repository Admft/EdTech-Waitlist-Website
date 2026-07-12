"use client";

import { useEffect } from "react";
import Link from "next/link";
import CauseyLogo from "@/components/CauseyLogo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <CauseyLogo size="md" />
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        Something broke
      </p>
      <h1 className="mt-3 text-display-lg font-bold tracking-tight text-foreground">
        That wasn&apos;t supposed to happen.
      </h1>
      <p className="mt-4 max-w-md text-md text-muted">
        An unexpected error came up. Try again, or head back home.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="cta-enabled inline-flex h-11 items-center rounded-lg px-6 text-base font-semibold"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-lg border border-line bg-white px-6 text-base font-semibold text-foreground transition hover:border-brand-red/40 hover:text-brand-red"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
