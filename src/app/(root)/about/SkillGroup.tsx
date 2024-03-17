import BadgeTech from '@/components/Badge/BadgeTech'
import type { SkillType } from '@/data/skills'
export default function SkillGroup({ skill }: { skill: SkillType }) {
  return (
    <div className="p-6 bg-white dark:bg-neutral-900 shadow-md border border-neutral-200/70 dark:border-slate-600 rounded-xl">
      <h3 className="font-semibold text-2xl leading-none text-neutral-900 dark:text-neutral-100">
        {skill.name}
      </h3>
      <div className="block text-neutral-500 dark:text-neutral-300 text-sm md:mt-8 mt-4 sm:text-base">
        <div className="flex flex-wrap gap-2 mt-3 relative">
          {skill.lists.map(tech => (
            <BadgeTech key={tech} techId={tech} showTitle />
          ))}
        </div>
      </div>
    </div>
  )
}
