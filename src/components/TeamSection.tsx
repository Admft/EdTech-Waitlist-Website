import Image from "next/image";

const TEAM = [
  {
    name: "Adam Moffat",
    role: "Head of Engineering",
    statement:
      "I lead the coding and architecture behind Causey — building the systems that make discovery fair, from the ground up.",
    image: "/adam-headshot.jpg",
    imageAlt: "Headshot of Adam Moffat",
    imageScale: 1.35,
    linkedin: "https://www.linkedin.com/in/adamrmoffat/",
  },
  {
    name: "Divine Bamgboye",
    role: "Founding Software Engineer",
    statement:
      "I'm a CS student building software that opens doors — especially for students who don't already have them.",
    image: "/divine-headshot.jpg",
    imageAlt: "Headshot of Divine Bamgboye",
    linkedin: "https://www.linkedin.com/in/divine-bamgboye-859149317/",
  },
  {
    name: "Sasha Hobbs",
    role: "Founding Team",
    statement:
      "Part of the Causey founding team — more about what I do here coming soon.",
    image: "/sasha-headshot.avif",
    imageAlt: "Headshot of Sasha",
  },
] as const;

export default function TeamSection() {
  return (
    <section id="team" className="section-rule bg-surface-soft px-5 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <div className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_48px_rgba(20,24,28,0.08)]">
              <Image
                src="/myshay-headshot.jpeg"
                alt="Myshay Causey, Founder & CEO of Causey"
                fill
                sizes="280px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.85rem,3.8vw,2.75rem)] font-semibold tracking-tight text-foreground">
              Meet Our Founder
            </h2>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-[16px] font-bold tracking-tight text-foreground">
                Myshay Causey
              </p>
              <p className="text-[14px] font-semibold text-brand-red">
                Founder & CEO
              </p>
              <a
                href="https://www.linkedin.com/in/myshay-causey-a29684285/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-muted-strong transition hover:text-brand-red"
              >
                LinkedIn →
              </a>
            </div>

            <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-muted sm:text-[17px]">
              <p>
                Causey was first envisioned while its founder was still in high
                school and officially launched at age 19 while attending Cornell
                University.
              </p>
              <p>
                Growing up in Los Angeles, she won local chess competitions but
                found it nearly impossible to access state and national
                tournaments, despite actively seeking opportunities and having
                the ability to compete. It wasn&apos;t until she moved across
                the country that she was finally able to compete—and win—on a
                larger stage.
              </p>
              <p>
                That experience revealed a problem extending far beyond chess:
                countless talented students overlooked simply because they lack
                access to the right opportunities.
              </p>
              <p>
                Causey was founded to change that. By making competitive
                opportunities more accessible, the company is working to ensure
                that talent—not chance or financial circumstances—determines how
                far students can go, giving every young person the chance to
                develop their skills, compete at the highest levels, and reach
                their full potential.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-7 sm:mt-10 sm:pt-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-[clamp(1.45rem,3vw,1.85rem)] font-bold tracking-tight text-foreground">
              Meet the team
            </h3>
            <p className="mt-2 text-[15px] text-muted">
              Students and builders working to make opportunity easier to find.
            </p>
          </div>

          <ul className="mx-auto mt-7 grid max-w-[56rem] gap-x-12 gap-y-8 sm:grid-cols-3 lg:gap-x-16">
            {TEAM.map((person) => {
              const image = (
                <Image
                  src={person.image}
                  alt={person.imageAlt}
                  fill
                  sizes="168px"
                  className={
                    "imageScale" in person && person.imageScale
                      ? "object-cover object-top scale-[1.35] transition duration-300 group-hover:scale-[1.4]"
                      : "object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                  }
                />
              );

              return (
                <li key={person.name} className="group flex flex-col items-center text-center">
                  {"linkedin" in person && person.linkedin ? (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="relative h-[168px] w-[168px] shrink-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(27,33,32,0.06)] transition hover:border-accent/30"
                    >
                      {image}
                    </a>
                  ) : (
                    <div className="relative h-[168px] w-[168px] shrink-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(27,33,32,0.06)]">
                      {image}
                    </div>
                  )}
                  <div className="mt-3 max-w-[220px]">
                    <h4 className="text-[15px] font-bold tracking-tight text-foreground">
                      {person.name}
                    </h4>
                    <p className="mt-0.5 text-[12px] font-semibold text-brand-red">
                      {person.role}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">
                      {person.statement}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
