/** Pre-launch mark: red C badge + Causey wordmark. */
export default function CauseyLogo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}) {
  const sizes = {
    sm: { text: "text-[18px]", mark: "h-[1.05em] w-[1.05em]", radius: 7 },
    md: { text: "text-[24px]", mark: "h-[1.05em] w-[1.05em]", radius: 7 },
    lg: { text: "text-[32px]", mark: "h-[1.05em] w-[1.05em]", radius: 7 },
    hero: {
      text: "text-[clamp(2.5rem,8vw,4.25rem)]",
      mark: "h-[1.05em] w-[1.05em]",
      radius: 7,
    },
  } as const;

  const { text, mark, radius } = sizes[size];

  return (
    <span
      className={`font-display inline-flex items-center gap-[0.35em] font-semibold tracking-[-0.03em] text-foreground ${text} ${className}`}
      aria-label="Causey"
    >
      <svg
        className={`shrink-0 ${mark}`}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
      >
        <rect width="32" height="32" rx={radius} fill="#c23b32" />
        <path
          d="M21.2 11.1c-.85-1.15-2.2-1.85-3.85-1.85-2.95 0-5.05 2.15-5.05 5.25s2.1 5.25 5.05 5.25c1.65 0 3-.7 3.85-1.85l2.05 1.35C22 21.1 20 22.35 17.35 22.35 12.9 22.35 9.7 19.1 9.7 14.5S12.9 6.65 17.35 6.65c2.65 0 4.65 1.2 5.9 3.1l-2.05 1.35Z"
          fill="#ffffff"
        />
      </svg>
      <span>Causey</span>
    </span>
  );
}
