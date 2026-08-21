import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { AnimatedSkills } from "~/components/ui/animated-skills";
import { PROJECTS } from "~/data/projects";
import { getMetaData } from "~/lib/get-meta-data";
import { cn } from "~/lib/utils";

export function meta() {
  return getMetaData({
    title: "About me",
    desc: "About me",
  });
}

export default function About() {
  return (
    <main className="min-h-dvh">
      <div className="container pt-2">
        <div className="pt-10 pb-5">
          <h1 className="font-heading font-extrabold tracking-[-0.01em] text-gradient leading-tight text-[1.7rem] lg:text-[2.3rem]">
            About me
          </h1>
          <p className="mt-4 max-w-2xl text-text-2">
            I'm a senior full-stack engineer, creative coder and self-proclaimed
            designer who specializes in web development. I make it my mission to
            translate user-focused designs into pixel-perfect websites or
            applications that run blazing fast.
          </p>
        </div>
        <div className="flex flex-col pb-14">
          <section className="relative flex gap-4 pb-5">
            <div className="relative shrink-0 flex justify-center w-11">
              <span className="font-heading text-accent bg-bg-card border border-border-bright size-9 inline-flex items-center justify-center rounded-lg font-extrabold text-sm mt-1 relative z-1">
                01
              </span>
              <span className="absolute inset-0 top-10 left-1/2 -bottom-1 -translate-x-1/2 w-0.5 opacity-30 bg-linear-[var(--accent),var(--accent-2)]" />
            </div>
            <div className="flex-1 bg-bg-card border rounded-xl py-4 px-5 transition-colors hover:border-border-bright overflow-hidden">
              <div className="flex flex-wrap items-baseline gap-3 mb-3.5">
                <h2 className="font-heading uppercase tracking-[0.04em] font-extrabold">
                  Tech Stacks
                </h2>
                <p className="text-[.82rem] text-text-3">
                  What I actually do it with
                </p>
              </div>
              <AnimatedSkills />
            </div>
          </section>
          <section className="relative flex gap-4 pb-5">
            <div className="relative shrink-0 flex justify-center w-11">
              <span className="font-heading text-accent bg-bg-card border border-border-bright size-9 inline-flex items-center justify-center rounded-lg font-extrabold text-sm mt-1 relative z-1">
                02
              </span>
              <span className="absolute inset-0 top-10 left-1/2 -bottom-1 -translate-x-1/2 w-0.5 opacity-30 bg-linear-[var(--accent),var(--accent-2)]" />
            </div>
            <div className="flex-1 bg-bg-card border rounded-xl py-4 px-5 transition-colors hover:border-border-bright">
              <div className="flex flex-wrap items-baseline gap-3 mb-3.5">
                <h2 className="font-heading uppercase tracking-[0.04em] font-extrabold">
                  Experiences
                </h2>
                <p className="text-[.82rem] text-text-3">
                  What I actually do it with
                </p>
              </div>
            </div>
          </section>
          <section className="relative flex gap-4 pb-5">
            <div className="relative shrink-0 flex justify-center w-11">
              <span className="font-heading text-accent bg-bg-card border border-border-bright size-9 inline-flex items-center justify-center rounded-lg font-extrabold text-sm mt-1 relative z-1">
                03
              </span>
              <span className="absolute inset-0 top-10 left-1/2 -bottom-1 -translate-x-1/2 w-0.5 opacity-30 bg-linear-[var(--accent),var(--accent-2)]" />
            </div>
            <div className="flex-1 bg-bg-card border rounded-xl py-4 px-5 transition-colors hover:border-border-bright">
              <div className="flex flex-wrap items-baseline gap-3 mb-3.5">
                <h2 className="font-heading uppercase tracking-[0.04em] font-extrabold">
                  Projects
                </h2>
                <p className="text-[.82rem] text-text-3">
                  What I actually do it with
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-3">
                {PROJECTS.map((project) => {
                  const [open, setOpen] = useState(false);
                  return (
                    <div
                      key={project.name}
                      className={cn(
                        "bg-bg-elevated border rounded-lg transition-colors overflow-hidden",
                        {
                          "border-accent basis-full w-full": open,
                        },
                      )}
                    >
                      <button
                        className={cn(
                          "about-item text-text-2 justify-between w-full",
                          {
                            "bg-bg-card": !open,
                            "rounded-none! bg-bg-elevated border-b-0!": open,
                          },
                        )}
                        onClick={() => setOpen(!open)}
                      >
                        <span>{project.name}</span>
                        <IconChevronRight
                          width={16}
                          height={16}
                          className={cn({
                            "stroke-text-text-2": !open,
                            "stroke-accent rotate-90": open,
                          })}
                        />
                      </button>
                      {open && (
                        <div className="p-[0_.8rem_.8rem]">
                          <div className="flex flex-col mb-2.5">
                            <div className="border-t flex items-center justify-between gap-4 py-1.5 text-sm font-mono">
                              <span className="text-text-3">Name</span>
                              <span className="text-text-2 text-right font-mono">
                                {project.name}
                              </span>
                            </div>
                            <div className="border-t flex items-center justify-between gap-4 py-1.5 text-sm font-mono">
                              <span className="text-text-3">Type</span>
                              <span className="text-text-2 text-right font-mono">
                                {project.type}
                              </span>
                            </div>
                            <div className="border-t flex items-center justify-between gap-4 py-1.5 text-sm font-mono">
                              <span className="text-text-3">Github</span>
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-2 text-right font-mono"
                              >
                                {project.githubUrl}
                              </a>
                            </div>
                            {project.previewUrl && (
                              <div className="border-t flex items-center justify-between gap-4 py-1.5 text-sm font-mono">
                                <span className="text-text-3">Preview</span>
                                <a
                                  href={project.previewUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-text-2 text-right font-mono"
                                >
                                  {project.previewUrl}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="relative flex gap-4 pb-5">
            <div className="relative shrink-0 flex justify-center w-11">
              <span className="font-heading text-accent bg-bg-card border border-border-bright size-9 inline-flex items-center justify-center rounded-lg font-extrabold text-sm mt-1 relative z-1">
                04
              </span>
              <span className="absolute inset-0 top-10 left-1/2 -bottom-1 -translate-x-1/2 w-0.5 opacity-30 bg-linear-[var(--accent),var(--accent-2)]" />
            </div>
            <div className="flex-1 bg-bg-card border rounded-xl py-4 px-5 transition-colors hover:border-border-bright">
              <div className="flex flex-wrap items-baseline gap-3 mb-3.5">
                <h2 className="font-heading uppercase tracking-[0.04em] font-extrabold">
                  Educations
                </h2>
                <p className="text-[.82rem] text-text-3">
                  What I actually do it with
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function AboutItem() {
  // return
}
