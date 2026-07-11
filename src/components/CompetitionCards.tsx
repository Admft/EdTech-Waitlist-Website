const CARDS = [
  {
    name: "National Science Olympiad",
    category: "STEM",
    deadline: "Oct 12",
    eligibility: "Grades 9–12",
    className: "animate-card-1 left-2 top-4 z-10 sm:left-0",
  },
  {
    name: "Congressional Debate Circuit",
    category: "Speech & Debate",
    deadline: "Sep 28",
    eligibility: "All high school",
    className: "animate-card-2 right-0 top-24 z-20 sm:right-4",
  },
  {
    name: "Young Writers Prize",
    category: "Arts & Writing",
    deadline: "Nov 3",
    eligibility: "Ages 14–18",
    className: "animate-card-3 left-8 top-48 z-30 sm:left-10",
  },
] as const;

export default function CompetitionCards() {
  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem]" aria-hidden>
      {CARDS.map((card) => (
        <article
          key={card.name}
          className={`absolute w-[85%] max-w-[280px] rounded-xl border border-white/10 bg-surface-raised/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-sm ${card.className}`}
          style={{ transform: `rotate(var(--card-rot))` }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-strong">
              {card.category}
            </span>
            <span className="text-[11px] text-muted">Due {card.deadline}</span>
          </div>
          <h3 className="mt-2 font-display text-[17px] font-semibold leading-snug tracking-tight text-foreground">
            {card.name}
          </h3>
          <p className="mt-3 border-t border-white/10 pt-3 text-[12px] text-muted">
            {card.eligibility}
          </p>
        </article>
      ))}
    </div>
  );
}
