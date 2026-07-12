const CARDS = [
  {
    name: "National Science Olympiad",
    category: "STEM",
    deadline: "Oct 12",
    eligibility: "Grades 9–12",
    stackClass: "animate-card-1 left-[12%] top-2 z-10",
    depth: "back" as const,
  },
  {
    name: "Congressional Debate",
    category: "Speech & Debate",
    deadline: "Sep 28",
    eligibility: "All high school",
    stackClass: "animate-card-2 left-[32%] top-[8.25rem] z-20",
    depth: "mid" as const,
  },
  {
    name: "Young Writers Prize",
    category: "Arts & Writing",
    deadline: "Nov 3",
    eligibility: "Ages 14–18",
    stackClass: "animate-card-3 left-[18%] top-[16.5rem] z-30",
    depth: "front" as const,
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
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-brand-red">
          {category}
        </span>
        <span className="shrink-0 text-[12px] text-muted">Due {deadline}</span>
      </div>
      <h3 className="mt-2.5 truncate text-[18px] font-semibold leading-snug tracking-tight text-foreground sm:text-[19px]">
        {name}
      </h3>
      <p className="mt-3.5 border-t border-line pt-3.5 text-[13px] text-muted">
        {eligibility}
      </p>
    </>
  );
}

const DEPTH_OPACITY = {
  back: "opacity-55",
  mid: "opacity-75",
  front: "opacity-100",
} as const;

const DEPTH_FILTER: Record<"back" | "mid" | "front", string | undefined> = {
  back: "blur(1px)",
  mid: "blur(0.7px)",
  front: undefined,
};

export default function CompetitionCards() {
  return (
    <div aria-hidden>
      <div className="lg:hidden">
        <p className="mb-3 text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">
          Coming to Causey
        </p>
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CARDS.map((card) => (
            <article
              key={card.name}
              className="w-[82%] max-w-[300px] shrink-0 snap-center rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(27,33,32,0.08)]"
            >
              <CardBody {...card} />
            </article>
          ))}
        </div>
      </div>

      <div className="relative ml-auto hidden h-[27rem] w-full max-w-lg pt-2 lg:block">
        {CARDS.map((card) => (
          <article
            key={card.name}
            className={`absolute w-[88%] max-w-[320px] rounded-2xl border border-line bg-white p-5 shadow-[0_14px_40px_rgba(27,33,32,0.1)] ${card.stackClass} ${DEPTH_OPACITY[card.depth]}`}
            style={{
              transform: `rotate(var(--card-rot))`,
              ...(DEPTH_FILTER[card.depth]
                ? { filter: DEPTH_FILTER[card.depth] }
                : {}),
            }}
          >
            <CardBody {...card} />
          </article>
        ))}
      </div>
    </div>
  );
}
