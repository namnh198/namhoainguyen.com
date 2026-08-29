import { useState } from "react";

import { IconChevronRight } from "@tabler/icons-react";

import { getMetaData } from "~/lib/get-meta-data";
import { cn } from "~/lib/utils";
import { PROJECTS } from "~/data/projects";

import { AnimatedSkills } from "~/components/ui/animated-skills";

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
          <h1 className="font-heading text-gradient text-[1.7rem] leading-tight font-extrabold tracking-[-0.01em] lg:text-[2.3rem]">
            About me
          </h1>
          <p className="text-text-2 mt-4 max-w-2xl">
            I'm a senior full-stack engineer, creative coder and self-proclaimed designer who specializes in web
            development. I make it my mission to translate user-focused designs into pixel-perfect websites or
            applications that run blazing fast.
          </p>
        </div>
        <div className="flex flex-col pb-14">
          <section className="relative flex gap-4 pb-5">
            <div className="relative flex w-11 shrink-0 justify-center">
              <span className="font-heading text-accent bg-bg-card border-border-bright relative z-1 mt-1 inline-flex size-9 items-center justify-center rounded-lg border text-sm font-extrabold">
                01
              </span>
              <span className="absolute inset-0 top-10 -bottom-1 left-1/2 w-0.5 -translate-x-1/2 bg-linear-[var(--accent),var(--accent-2)] opacity-30" />
            </div>
            <div className="bg-bg-card hover:border-border-bright flex-1 overflow-hidden rounded-xl border px-5 py-4 transition-colors">
              <div className="mb-3.5 flex flex-wrap items-baseline gap-3">
                <h2 className="font-heading font-extrabold tracking-[0.04em] uppercase">Tech Stacks</h2>
                <p className="text-text-3 text-[.82rem]">What I actually do it with</p>
              </div>
              <AnimatedSkills />
            </div>
          </section>
          <section className="relative flex gap-4 pb-5">
            <div className="relative flex w-11 shrink-0 justify-center">
              <span className="font-heading text-accent bg-bg-card border-border-bright relative z-1 mt-1 inline-flex size-9 items-center justify-center rounded-lg border text-sm font-extrabold">
                02
              </span>
              <span className="absolute inset-0 top-10 -bottom-1 left-1/2 w-0.5 -translate-x-1/2 bg-linear-[var(--accent),var(--accent-2)] opacity-30" />
            </div>
            <div className="bg-bg-card hover:border-border-bright flex-1 rounded-xl border px-5 py-4 transition-colors">
              <div className="mb-3.5 flex flex-wrap items-baseline gap-3">
                <h2 className="font-heading font-extrabold tracking-[0.04em] uppercase">Experiences</h2>
                <p className="text-text-3 text-[.82rem]">What I actually do it with</p>
              </div>
            </div>
          </section>
          <section className="relative flex gap-4 pb-5">
            <div className="relative flex w-11 shrink-0 justify-center">
              <span className="font-heading text-accent bg-bg-card border-border-bright relative z-1 mt-1 inline-flex size-9 items-center justify-center rounded-lg border text-sm font-extrabold">
                03
              </span>
              <span className="absolute inset-0 top-10 -bottom-1 left-1/2 w-0.5 -translate-x-1/2 bg-linear-[var(--accent),var(--accent-2)] opacity-30" />
            </div>
            <div className="bg-bg-card hover:border-border-bright flex-1 rounded-xl border px-5 py-4 transition-colors">
              <div className="mb-3.5 flex flex-wrap items-baseline gap-3">
                <h2 className="font-heading font-extrabold tracking-[0.04em] uppercase">Projects</h2>
                <p className="text-text-3 text-[.82rem]">What I actually do it with</p>
              </div>
              <div className="flex flex-wrap items-start gap-3">
                {PROJECTS.map((project) => {
                  const [open, setOpen] = useState(false);
                  return (
                    <div
                      key={project.name}
                      className={cn("bg-bg-elevated overflow-hidden rounded-lg border transition-colors", {
                        "border-accent w-full basis-full": open,
                      })}
                    >
                      <button
                        className={cn("about-item text-text-2 w-full justify-between", {
                          "bg-bg-card": !open,
                          "bg-bg-elevated rounded-none! border-b-0!": open,
                        })}
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
                          <div className="mb-2.5 flex flex-col">
                            <div className="flex items-center justify-between gap-4 border-t py-1.5 font-mono text-sm">
                              <span className="text-text-3">Name</span>
                              <span className="text-text-2 text-right font-mono">{project.name}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 border-t py-1.5 font-mono text-sm">
                              <span className="text-text-3">Type</span>
                              <span className="text-text-2 text-right font-mono">{project.type}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 border-t py-1.5 font-mono text-sm">
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
                              <div className="flex items-center justify-between gap-4 border-t py-1.5 font-mono text-sm">
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
            <div className="relative flex w-11 shrink-0 justify-center">
              <span className="font-heading text-accent bg-bg-card border-border-bright relative z-1 mt-1 inline-flex size-9 items-center justify-center rounded-lg border text-sm font-extrabold">
                04
              </span>
              <span className="absolute inset-0 top-10 -bottom-1 left-1/2 w-0.5 -translate-x-1/2 bg-linear-[var(--accent),var(--accent-2)] opacity-30" />
            </div>
            <div className="bg-bg-card hover:border-border-bright flex-1 rounded-xl border px-5 py-4 transition-colors">
              <div className="mb-3.5 flex flex-wrap items-baseline gap-3">
                <h2 className="font-heading font-extrabold tracking-[0.04em] uppercase">Educations</h2>
                <p className="text-text-3 text-[.82rem]">What I actually do it with</p>
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
