/** Shared waitlist option values — keep in sync with WaitlistForm. */
export const ALLOWED_ROLES = [
  "student",
  "parent",
  "coach",
  "organizer",
  "other",
] as const;

export type WaitlistRole = (typeof ALLOWED_ROLES)[number];

export const COMPETITION_INTERESTS = [
  { value: "stem", label: "STEM" },
  { value: "speech_debate", label: "Speech & Debate" },
  { value: "arts_writing", label: "Arts & Writing" },
  { value: "business", label: "Business & Entrepreneurship" },
  { value: "academic", label: "Academic / Scholarships" },
  { value: "other", label: "Other / Not sure yet" },
] as const;

export type CompetitionInterest = (typeof COMPETITION_INTERESTS)[number]["value"];

export const ALLOWED_COMPETITION_INTERESTS = new Set(
  COMPETITION_INTERESTS.map((item) => item.value),
);
