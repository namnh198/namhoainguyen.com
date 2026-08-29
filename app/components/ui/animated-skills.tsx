import { useMemo } from "react";
import type { TechItem } from "~/data/techs";

import { TECHS } from "~/data/techs";

import { LazyImage } from "./lazy-image";
import { Marquee } from "./marquee";

function AnimatedSkills() {
  const itemsPerRow = Math.ceil(TECHS.length / 4);
  const row1 = TECHS.slice(0, itemsPerRow);
  const row2 = TECHS.slice(itemsPerRow, itemsPerRow * 2);
  const row3 = TECHS.slice(itemsPerRow * 2, itemsPerRow * 3);
  const row4 = TECHS.slice(itemsPerRow * 3);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s]">
        {row1.map((tech) => (
          <BadgeSkill key={tech.name} tech={tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {row2.map((tech) => (
          <BadgeSkill key={tech.name} tech={tech} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:40s]">
        {row3.map((tech) => (
          <BadgeSkill key={tech.name} tech={tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {row4.map((tech) => (
          <BadgeSkill key={tech.name} tech={tech} />
        ))}
      </Marquee>
      <div className="from-bg-card pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-bg-card pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  );
}

function BadgeSkill({ tech }: { tech: TechItem }) {
  return (
    <a href={tech.url} title={tech.name} target="_blank" rel="noreferrer noopener" className="about-item">
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
