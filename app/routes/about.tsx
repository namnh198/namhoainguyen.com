import { getMetaData } from "~/lib/get-meta-data";
import { PROJECTS } from "~/data/projects";
import { TECHS } from "~/data/techs";

import { PostHeader } from "~/components/elements/post-header";

export function meta() {
  return getMetaData({
    title: "About me",
    desc: "Nam Hoai Nguyen, senior full-stack engineer: the tools he works with and the projects he has shipped.",
  });
}

const h2 = "font-heading text-[28px] leading-[1.1] font-medium tracking-[-0.02em] lg:text-[32px]";

export default function About() {
  return (
    <main className="min-h-dvh">
      <PostHeader
        title="About me"
        desc="I'm a senior full-stack engineer who builds websites and the cloud services behind them. This site is where I write down what I work out along the way."
      />
      <div className="container space-y-20 pb-24 lg:space-y-28 lg:pb-32">
        <section aria-labelledby="stack-h" className="space-y-8">
          <div className="space-y-3">
            <h2 id="stack-h" className={h2}>
              Tools I work with
            </h2>
            <p className="text-text-2">{TECHS.length} languages, frameworks and tools I have built with.</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {TECHS.map((tech) => (
              <li key={tech.id}>
                <a
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-card hover:border-border-bright flex min-h-14 items-center gap-3 rounded-lg border px-4 py-3 transition-[transform,border-color] duration-150 pointer-fine:hover:-translate-y-0.5"
                >
                  <img
                    src={tech.image}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    className="size-6 shrink-0 object-contain"
                  />
                  <span className="text-sm font-medium">{tech.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="projects-h" className="space-y-8">
          <div className="space-y-3">
            <h2 id="projects-h" className={h2}>
              Projects
            </h2>
            <p className="text-text-2">Open-source tools, Magento 2 modules and the earlier versions of this blog.</p>
          </div>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PROJECTS.map((project) => (
              <li key={project.name}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-card hover:border-border-bright flex h-full flex-col gap-4 rounded-lg border p-6 transition-[transform,border-color] duration-150 pointer-fine:hover:-translate-y-0.5"
                >
                  <span className="text-text-2 font-mono text-[13px]">{project.type}</span>
                  <span className="space-y-2">
                    <span className="font-heading block text-xl font-medium">{project.name}</span>
                    {project.desc && <span className="text-text-2 block">{project.desc}</span>}
                  </span>
                  <span className="mt-auto text-sm font-medium">
                    <span className="nav-word">Source on GitHub →</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
