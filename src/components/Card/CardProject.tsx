import { Project } from '@/app/types'

import Badge from '@/components/Badge/Badge'
import BadgeTech from '@/components/Badge/BadgeTech'

export default function CardProject({ project }: { project: Project }) {
  return (
    <div className="relative shadow-md bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-slate-600 group transition duration-200 ease-in-out hover:-translate-y-0.5 hover:-translate-x-0.5 p-5 rounded-3xl">
      <a
        href={project.permalink}
        className="absolute inset-0"
        target="_blank"
        title={project.title}
      ></a>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-1.5">
          <Badge label={project.type || 'Projects'} color={getColorBadge(project.type)} />
        </div>

        <h2 className="block mt-4  font-semibold text-base text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h2>
        {project.description && (
          <p className="block  text-neutral-500 dark:text-neutral-400 text-sm mt-3.5 mb-4">
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

const getColorBadge = (type?: string) => {
  switch (type) {
    case 'Web Development':
      return 'yellow'
    case 'DevOps':
      return 'blue'
    default:
      return 'red'
  }
}

export const SkeletonCardProject = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="rounded-3xl shadow-md bg-slate-200 dark:bg-neutral-700 animate-pulse h-[200px]"></div>
    </div>
  )
}
