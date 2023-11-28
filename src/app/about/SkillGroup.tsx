import BadgeTech from '@/components/Badge/BadgeTech'
import type { SkillType } from '@/data/skills'
export default function SkillGroup({ skill }: { skill: SkillType }) {
  return (
    <div className="p-6 bg-white shadow-md dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-700 rounded-xl">
      <h3 className="font-semibold text-2xl dark:text-neutral-200 leading-none text-neutral-900">
        {skill.name}
      </h3>
      <div className="block dark:text-neutral-400 text-neutral-500 text-sm md:mt-8 mt-4 sm:text-base">
        <div className="flex flex-wrap gap-2 mt-3 relative">
          {skill.lists.map(tech => (
            <BadgeTech key={tech} techId={tech} showTitle />
          ))}
        </div>
      </div>
    </div>
  )
}
