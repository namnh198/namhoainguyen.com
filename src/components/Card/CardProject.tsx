import { Project } from '@/types'

import Badge from '@/components/Badge/Badge'
import BadgeTech from '@/components/Badge/BadgeTech'

export default function CardProject({ project }: { project: Project }) {
  return (
    <div className="relative shadow-xl bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700 group hover:shadow-md p-5 rounded-3xl transition-shadow">
      <a href={project.permalink} className="absolute inset-0"></a>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-1.5">
          <Badge label="Project" color="red" />
        </div>

        <h2 className="block mt-4 dark:text-neutral-300 font-semibold text-base text-neutral-800">
          {project.title}
        </h2>
        {project.description && (
          <p className="block dark:text-neutral-400 text-neutral-500 text-sm mt-3.5 mb-4">
            {project.description}
          </p>
        )}
        {project.techs && (
          <div className="relative flex flex-wrap gap-1.5">
            {project.techs.map((tech, index) => (
              <BadgeTech key={index} techId={tech} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
