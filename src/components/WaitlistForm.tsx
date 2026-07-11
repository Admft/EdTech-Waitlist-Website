"use client";

import { FormEvent, useEffect, useState } from "react";

const ROLES = [
  { value: "", label: "I am a…" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
  { value: "coach", label: "Coach" },
  { value: "organizer", label: "Competition organizer" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "light" }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const isHero = variant === "hero";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferredBy(ref);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setCopied(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, referredBy }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      const url = `${window.location.origin}?ref=${data.referralCode}`;
      setShareUrl(url);
      setStatus("success");
      setEmail("");
      setRole("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (status === "success") {
    return (
      <div
        className={`w-full max-w-lg rounded-lg border p-4 ${
          isHero ? "border-white/20 bg-white/10 text-white" : "border-line bg-white text-brand"
        }`}
        role="status"
      >
        <p className="text-[15px] font-semibold tracking-tight">You&apos;re on the list.</p>
        <p className={`mt-2 text-[14px] leading-relaxed ${isHero ? "text-white/75" : "text-muted"}`}>
          Refer 3 classmates to guarantee priority access to the beta platform.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            readOnly
            value={shareUrl}
            className={`h-11 w-full flex-1 rounded-lg border px-3 text-[13px] outline-none ${
              isHero
                ? "border-white/20 bg-white text-brand"
                : "border-line bg-background text-brand"
            }`}
          />
          <button
            type="button"
            onClick={copyLink}
            className="h-11 shrink-0 rounded-lg bg-accent px-4 text-[14px] font-semibold text-white transition hover:bg-accent-hover sm:min-w-[7rem]"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    );
  }

  const field =
    "h-11 rounded-lg border px-3.5 text-[15px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-lg flex-col gap-2.5">
      <label className="sr-only" htmlFor={`waitlist-role-${variant}`}>
        I am a
      </label>
      <select
        id={`waitlist-role-${variant}`}
        name="role"
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className={`${field} w-full appearance-none ${
          isHero
            ? "border-white/20 bg-white text-brand"
            : "border-line bg-white text-brand"
        }`}
      >
        {ROLES.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label className="sr-only" htmlFor={`waitlist-email-${variant}`}>
          Email
        </label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${field} w-full flex-1 ${
            isHero
              ? "border-white/20 bg-white text-brand placeholder:text-muted/70"
              : "border-line bg-white text-brand placeholder:text-muted/55"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-11 shrink-0 rounded-lg bg-accent px-5 text-[15px] font-semibold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-[9.5rem]"
        >
          {status === "loading" ? "Joining…" : "Join the Waitlist"}
        </button>
      </div>
      {status === "error" && (
        <p className={`text-sm ${isHero ? "text-red-200" : "text-red-700"}`} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
