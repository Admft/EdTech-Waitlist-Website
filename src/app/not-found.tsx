import Link from "next/link";
import CauseyLogo from "@/components/CauseyLogo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <CauseyLogo size="md" />
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-display-lg font-bold tracking-tight text-foreground">
        This page took a detour.
      </h1>
      <p className="mt-4 max-w-md text-md text-muted">
        The page you were looking for isn&apos;t here. Let&apos;s get you back
        to finding opportunities.
      </p>
      <Link
        href="/"
        className="cta-enabled mt-8 inline-flex h-11 items-center rounded-lg px-6 text-base font-semibold"
      >
        Back to home
      </Link>
    </main>
  );
}
