"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const ROLES = [
  { value: "", label: "I am a…" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
  { value: "coach", label: "Coach or Educator" },
  { value: "organizer", label: "Competition Organizer" },
  { value: "other", label: "Other" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState({ email: false, role: false });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferredBy(ref);
  }, []);

  const emailValid = EMAIL_RE.test(email.trim());
  const roleValid = role.length > 0;
  const canSubmit = emailValid && roleValid && status !== "loading";

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    if (!email.trim()) return "Email is required.";
    if (!emailValid) return "Enter a valid email.";
    return "";
  }, [touched.email, email, emailValid]);

  const roleError = useMemo(() => {
    if (!touched.role) return "";
    if (!roleValid) return "Select who you are.";
    return "";
  }, [touched.role, roleValid]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ email: true, role: true });
    if (!canSubmit) return;

    setStatus("loading");
    setMessage("");
    setCopied(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
          referredBy,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setShareUrl(`${window.location.origin}?ref=${data.referralCode}`);
      setPosition(typeof data.position === "number" ? data.position : null);
      setStatus("success");
      setName("");
      setEmail("");
      setRole("");
      setTouched({ email: false, role: false });
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

  const field =
    "h-11 w-full rounded-md border border-field-border bg-field px-3.5 text-[14px] text-foreground outline-none transition placeholder:text-muted focus:border-white/30";

  if (status === "success") {
    return (
      <div
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-5"
        role="status"
      >
        <p className="font-display text-xl font-semibold tracking-tight text-foreground">
          You&apos;re #{position ?? "—"} on the list.
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-strong">
          Refer 3 classmates to guarantee priority access to the beta.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            readOnly
            value={shareUrl}
            className={`${field} flex-1 text-[12px] sm:text-[13px]`}
          />
          <button
            type="button"
            onClick={copyLink}
            className="h-11 shrink-0 rounded-md border border-white/20 px-4 text-[14px] font-medium text-foreground transition hover:bg-white/5"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2.5" noValidate>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="waitlist-role">
            I am a
          </label>
          <select
            id="waitlist-role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, role: true }))}
            className={`${field} appearance-none ${roleError ? "border-red-400/60" : ""}`}
          >
            {ROLES.map((option) => (
              <option key={option.value || "empty"} value={option.value} className="bg-[#141c28]">
                {option.label}
              </option>
            ))}
          </select>
          {roleError ? (
            <p className="mt-1 text-[12px] text-red-300" role="alert">
              {roleError}
            </p>
          ) : null}
        </div>
        <div>
          <label className="sr-only" htmlFor="waitlist-name">
            Name
          </label>
          <input
            id="waitlist-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className="sr-only" htmlFor="waitlist-email">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          className={`${field} ${emailError ? "border-red-400/60" : ""}`}
        />
        {emailError ? (
          <p className="mt-1 text-[12px] text-red-300" role="alert">
            {emailError}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="h-11 w-full rounded-md bg-accent text-[14px] font-semibold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:self-start sm:px-6"
      >
        {status === "loading" ? "Joining…" : "Join the waitlist →"}
      </button>

      <p className="text-[12px] leading-relaxed text-muted">
        Be first in line when we launch. No spam, ever.
      </p>

      {status === "error" && (
        <p className="text-[13px] text-red-300" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
