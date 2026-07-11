import Image from "next/image";

const TEAM = [
  {
    name: "Myshay Causey",
    role: "Founder & CEO",
    statement:
      "I built Causey because talent shouldn't need a network. Growing up without one — and finding my footing through mentorship — showed me what real access can change.",
    image: "/myshay-headshot.jpeg",
    imageAlt: "Headshot of Myshay Causey",
    linkedin: "https://www.linkedin.com/in/myshay-causey-a29684285/",
  },
  {
    name: "Adam Moffat",
    role: "Founding Software Engineer",
    statement:
      "I like problem-solving and engineering solutions — from AI and IoT to cloud systems. I'm here to build the infrastructure that makes discovery fair.",
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
    <section id="team" className="section-rule bg-surface-soft px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.75rem,3.5vw,2.4rem)] font-bold tracking-tight text-foreground">
            Meet the team
          </h2>
          <p className="mt-3 text-[16px] text-muted">
            Students and builders working to make opportunity easier to find.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TEAM.map((person) => {
            const image = (
              <Image
                src={person.image}
                alt={person.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={
                  "imageScale" in person && person.imageScale
                    ? "object-cover object-top scale-[1.35] transition duration-300 group-hover:scale-[1.4]"
                    : "object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                }
              />
            );

            return (
              <li key={person.name} className="group flex flex-col">
                {"linkedin" in person && person.linkedin ? (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name} on LinkedIn`}
                    className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(27,33,32,0.06)] transition hover:border-accent/30"
                  >
                    {image}
                  </a>
                ) : (
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(27,33,32,0.06)]">
                    {image}
                  </div>
                )}
                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {person.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] font-semibold text-accent">{person.role}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{person.statement}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
