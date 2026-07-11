const CARDS = [
  {
    name: "National Science Olympiad",
    category: "STEM",
    deadline: "Oct 12",
    eligibility: "Grades 9–12",
    stackClass: "animate-card-1 left-0 top-2 z-10",
    depth: "back",
  },
  {
    name: "Congressional Debate",
    category: "Speech & Debate",
    deadline: "Sep 28",
    eligibility: "All high school",
    stackClass: "animate-card-2 left-[22%] top-[7.5rem] z-20",
    depth: "mid",
  },
  {
    name: "Young Writers Prize",
    category: "Arts & Writing",
    deadline: "Nov 3",
    eligibility: "Ages 14–18",
    stackClass: "animate-card-3 left-[6%] top-[15rem] z-30",
    depth: "front",
  },
] as const;

function CardBody({
  name,
  category,
  deadline,
  eligibility,
}: {
  name: string;
  category: string;
  deadline: string;
  eligibility: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-strong">
          {category}
        </span>
        <span className="shrink-0 text-[11px] text-muted">Due {deadline}</span>
      </div>
      <h3 className="mt-2 truncate font-display text-[16px] font-semibold leading-snug tracking-tight text-foreground sm:text-[17px]">
        {name}
      </h3>
      <p className="mt-3 border-t border-white/10 pt-3 text-[12px] text-muted">
        {eligibility}
      </p>
    </>
  );
}

const DEPTH_STYLE = {
  back: "opacity-55 blur-[1.5px] scale-[0.98]",
  mid: "opacity-80 blur-[0.5px]",
  front: "opacity-100",
} as const;

export default function CompetitionCards() {
  return (
    <div aria-hidden>
      <div className="lg:hidden">
        <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
          Coming to Causey
        </p>
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CARDS.map((card) => (
            <article
              key={card.name}
              className="w-[78%] max-w-[260px] shrink-0 snap-center rounded-xl border border-white/10 bg-surface-raised/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            >
              <CardBody {...card} />
            </article>
          ))}
        </div>
      </div>

      {/* Desktop: cascade with depth-of-field — back cards soft, front sharp */}
      <div className="relative mx-auto hidden h-[26rem] w-full max-w-md pt-6 lg:block">
        {CARDS.map((card) => (
          <article
            key={card.name}
            className={`absolute w-[82%] max-w-[270px] rounded-xl border border-white/10 bg-surface-raised p-4 shadow-[0_16px_40px_rgba(0,0,0,0.45)] ${card.stackClass} ${DEPTH_STYLE[card.depth]}`}
            style={{ transform: `rotate(var(--card-rot))` }}
          >
            <CardBody {...card} />
          </article>
        ))}
        <p className="absolute bottom-0 left-0 text-[12px] font-medium tracking-wide text-muted">
          Launching Fall 2026
        </p>
      </div>
    </div>
  );
}
