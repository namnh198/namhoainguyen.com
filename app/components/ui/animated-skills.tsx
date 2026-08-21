import { useMemo } from "react";
import { TECHS, type TechItem } from "~/data/techs";
import { LazyImage } from "./lazy-image";
import { Marquee } from "./marquee";

function AnimatedSkills() {
  const techs = useMemo(() => {
    return TECHS.filter((tech) => tech.image);
  }, []);
  const itemsPerRow = Math.ceil(techs.length / 3);
  const row1 = techs.slice(0, itemsPerRow);
  const row2 = techs.slice(itemsPerRow, itemsPerRow * 2);
  const row3 = techs.slice(itemsPerRow * 2);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s]">
        {row1.map((tech) => (
          <BadgeSkill key={tech.name} tech={tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:60s]">
        {row2.map((tech) => (
          <BadgeSkill key={tech.name} tech={tech} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:40s]">
        {row3.map((tech) => (
          <BadgeSkill key={tech.name} tech={tech} />
        ))}
      </Marquee>
      <div className="bg-linear-to-r from-bg-card pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
      <div className="bg-linear-to-l from-bg-card pointer-events-none absolute inset-y-0 right-0 w-1/4"></div>
    </div>
  );
}

function BadgeSkill({ tech }: { tech: TechItem }) {
  return (
    <a
      href={tech.url}
      title={tech.name}
      target="_blank"
      rel="noreferrer noopener"
      className="about-item"
    >
      <LazyImage
        src={tech.image}
        alt={tech.name}
        showLoader={false}
        width={20}
        height={20}
        layout="fixed"
        className="rounded-sm"
      />
      <span>{tech.name}</span>
    </a>
  );
}

export { AnimatedSkills, BadgeSkill };
