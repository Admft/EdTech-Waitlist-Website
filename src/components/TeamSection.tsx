import Image from "next/image";

const TEAM = [
  {
    name: "Myshay Causey",
    role: "Founder & CEO",
    statement:
      "I built Causey because talent shouldn't need a network. Growing up without one — and finding my footing through mentorship — showed me what real access can change.",
    image: "/myshay-headshot.jpeg",
    imageAlt: "Headshot of Myshay Causey",
  },
  {
    name: "Adam Moffat",
    role: "Founding Software Engineer",
    statement:
      "I like problem-solving and engineering solutions — from AI and IoT to cloud systems. I'm here to build the infrastructure that makes discovery fair.",
    image: "/adam-headshot.jpg",
    imageAlt: "Headshot of Adam Moffat",
    imageScale: 1.35,
  },
  {
    name: "Divine Bamgboye",
    role: "Founding Software Engineer",
    statement:
      "I'm a CS student building software that opens doors — especially for students who don't already have them.",
    image: "/divine-headshot.jpg",
    imageAlt: "Headshot of Divine Bamgboye",
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
    <section id="team" className="section-rule bg-background px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-[26px] font-semibold tracking-tight text-white sm:text-[30px]">
          Meet the team
        </h2>
        <p className="mt-2 max-w-md text-[15px] text-muted">
          Building Causey from the ground up.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {TEAM.map((person) => (
            <li key={person.name} className="group flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
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
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                  {person.name}
                </h3>
                <p className="mt-0.5 text-[13px] font-medium text-accent">{person.role}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{person.statement}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
