const CARDS = [
  {
    name: "National Science Olympiad",
    category: "STEM",
    deadline: "Oct 12",
    eligibility: "Grades 9–12",
    stackClass: "animate-card-1 left-[6%] top-1 z-10",
    depth: "back" as const,
  },
  {
    name: "Congressional Debate",
    category: "Speech & Debate",
    deadline: "Sep 28",
    eligibility: "All high school",
    stackClass: "animate-card-2 left-[33%] top-[7.5rem] z-[15]",
    depth: "back" as const,
  },
  {
    name: "Young Writers Prize",
    category: "Arts & Writing",
    deadline: "Nov 3",
    eligibility: "Ages 14–18",
    stackClass: "animate-card-3 left-[12%] top-[15rem] z-20",
    depth: "mid" as const,
  },
  {
    name: "Scholastic Chess Open",
    category: "Chess",
    deadline: "Sep 20",
    eligibility: "All high school",
    stackClass: "animate-card-4 left-[28%] top-[22.5rem] z-30",
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
        <span className="text-2xs font-semibold uppercase tracking-[0.06em] text-brand-red">
          {category}
        </span>
        <span className="shrink-0 text-2xs text-muted">Due {deadline}</span>
      </div>
      <div className="mt-2.5 text-lead font-semibold tracking-tight text-foreground">
        {name}
      </div>
      <p className="mt-3.5 border-t border-line pt-3.5 text-xs text-muted">
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
  mid: "blur(0.5px)",
  front: undefined,
};

/** Desktop-only competition stack for the hero. Hidden below `lg`. */
export default function CompetitionCards() {
  return (
    <div aria-hidden className="relative ml-auto h-[35rem] w-full max-w-lg pt-2">
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
  );
}
