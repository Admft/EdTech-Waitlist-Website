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
type Source = "hero" | "footer";

export default function WaitlistForm({
  idPrefix = "hero",
  source = "hero",
}: {
  idPrefix?: string;
  source?: Source;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [roleDetail, setRoleDetail] = useState("");
  const [competitionInterest, setCompetitionInterest] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState({ email: false, role: false });
  const [company, setCompany] = useState("");
  const [startedAt] = useState(() => Date.now());

  const showRoleDetail = role === "other";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferredBy(ref);
  }, []);

  const emailValid = EMAIL_RE.test(email.trim());
  const roleValid = role.length > 0;
  const formReady = emailValid && roleValid;
  const canSubmit = formReady && status !== "loading";

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

  function onRoleChange(value: string) {
    setRole(value);
    if (value !== "other") setRoleDetail("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ email: true, role: true });
    if (!formReady || status === "loading") return;

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
          roleDetail: showRoleDetail ? roleDetail.trim() : "",
          competitionInterest: competitionInterest.trim(),
          referredBy,
          source,
          company,
          startedAt,
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
      setRoleDetail("");
      setCompetitionInterest("");
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
    "h-11 w-full rounded-lg border border-field-border bg-field px-3.5 text-base text-foreground outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20";

  if (status === "success") {
    return (
      <div
        className="w-full rounded-xl border border-accent/25 bg-accent-soft p-5 text-center lg:text-left"
        role="status"
      >
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white lg:mx-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4 9.5l3.2 3.2L14 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">
          You&apos;re on the list.
        </p>
        {position !== null ? (
          <p className="mt-1 text-sm font-semibold text-accent">
            You&apos;re #{position} in line.
          </p>
        ) : null}
        <p className="mt-2 text-sm text-muted-strong">
          Share Causey with someone who&apos;d want in.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            readOnly
            value={shareUrl}
            className={`${field} flex-1 bg-white text-2xs sm:text-xs`}
          />
          <button
            type="button"
            onClick={copyLink}
            className="cta-enabled h-11 shrink-0 rounded-lg px-4 text-sm font-semibold"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex w-full flex-col gap-2.5" noValidate>
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${idPrefix}-company`}>Company</label>
        <input
          id={`${idPrefix}-company`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor={`${idPrefix}-role`}>
            I am a
          </label>
          <div className="relative">
            <select
              id={`${idPrefix}-role`}
              name="role"
              required
              value={role}
              onChange={(e) => onRoleChange(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, role: true }))}
              className={`${field} appearance-none pr-10 ${
                !role ? "text-muted" : ""
              } ${roleError ? "border-red-500/70" : ""}`}
            >
              {ROLES.map((option) => (
                <option
                  key={option.value || "empty"}
                  value={option.value}
                  className="bg-white text-foreground"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {roleError ? (
            <p className="mt-1 text-2xs text-red-600" role="alert">
              {roleError}
            </p>
          ) : null}
        </div>

        <div>
          <label className="sr-only" htmlFor={`${idPrefix}-email`}>
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={`${field} ${emailError ? "border-red-500/70" : ""}`}
          />
          {emailError ? (
            <p className="mt-1 text-2xs text-red-600" role="alert">
              {emailError}
            </p>
          ) : null}
        </div>

        {showRoleDetail ? (
          <div className="sm:col-span-2">
            <label className="sr-only" htmlFor={`${idPrefix}-role-detail`}>
              Describe your role
            </label>
            <input
              id={`${idPrefix}-role-detail`}
              type="text"
              name="roleDetail"
              maxLength={80}
              autoComplete="organization-title"
              placeholder="What best describes your role?"
              value={roleDetail}
              onChange={(e) => setRoleDetail(e.target.value)}
              className={field}
            />
          </div>
        ) : null}

        <div>
          <label className="sr-only" htmlFor={`${idPrefix}-interest`}>
            Competitions you want to see (optiomal)
          </label>
          <input
            id={`${idPrefix}-interest`}
            type="text"
            name="competitionInterest"
            maxLength={200}
            placeholder="Competitions you want to see"
            value={competitionInterest}
            onChange={(e) => setCompetitionInterest(e.target.value)}
            className={field}
          />
        </div>

        <div>
          <label className="sr-only" htmlFor={`${idPrefix}-name`}>
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
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

      <button
        type="submit"
        disabled={!canSubmit}
        className={`mx-auto h-11 w-full rounded-lg text-base font-semibold lg:mx-0 lg:w-auto lg:self-start lg:px-7 ${
          canSubmit ? "cta-enabled" : "cta-disabled"
        }`}
      >
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </button>

      {!formReady ? (
        <p className="text-center text-xs text-muted lg:text-left">
          Students, parents, coaches, and organizers welcome.
        </p>
      ) : (
        <p className="text-center text-xs text-muted lg:text-left">
          Free to join. We&apos;ll only email you about Causey.
        </p>
      )}

      {status === "error" && (
        <p className="text-center text-xs text-red-600 lg:text-left" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
