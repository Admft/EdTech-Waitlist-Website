/** Shared waitlist option values — keep in sync with WaitlistForm. */
export const ALLOWED_ROLES = [
  "student",
  "parent",
  "coach",
  "organizer",
  "other",
] as const;

export type WaitlistRole = (typeof ALLOWED_ROLES)[number];
