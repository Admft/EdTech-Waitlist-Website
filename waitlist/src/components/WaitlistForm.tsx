"use client";

import { FormEvent, useState } from "react";

const ROLES = [
  { value: "", label: "I am a…" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
  { value: "coach", label: "Coach / Educator" },
  { value: "organizer", label: "Competition organizer" },
  { value: "developer", label: "Founding software developer" },
  { value: "advisor", label: "Advisor / interested in learning more" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "light" }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isHero = variant === "hero";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
      setRole("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        className={`text-[15px] font-medium tracking-tight ${isHero ? "text-white" : "text-brand"}`}
        role="status"
      >
        {message}
      </p>
    );
  }

  const field =
    "h-11 rounded-lg border px-3.5 text-[15px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-lg flex-col gap-2.5">
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
          {status === "loading" ? "Joining…" : "Join waitlist"}
        </button>
      </div>
      <label className="sr-only" htmlFor={`waitlist-role-${variant}`}>
        Role
      </label>
      <select
        id={`waitlist-role-${variant}`}
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className={`${field} w-full appearance-none ${
          isHero
            ? "border-white/20 bg-white/90 text-brand"
            : "border-line bg-white text-brand"
        }`}
      >
        {ROLES.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {status === "error" && (
        <p className={`text-sm ${isHero ? "text-red-200" : "text-red-700"}`} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
