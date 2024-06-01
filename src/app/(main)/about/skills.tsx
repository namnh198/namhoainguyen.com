import { type SkillType } from '@/data/about'
import Tech from '@/components/tech'

export default function Skills({ skills }: { skills: SkillType[] }) {
  return (
    <div className='grid gap-6 grid-cols-1 md:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {skills.map((skill) => (
        <SkillItem key={skill.name} skill={skill} />
      ))}
    </div>
  )
}

const SkillItem = ({ skill }: { skill: SkillType }) => (
  <div className='p-6 bg-white dark:bg-neutral-900 shadow-md border border-neutral-200/70 dark:border-slate-600 rounded-xl'>
    <h3 className='font-semibold text-2xl leading-none text-neutral-900 dark:text-neutral-100'>{skill.name}</h3>
    <div className='block text-neutral-500 dark:text-neutral-300 text-sm md:mt-8 mt-4 sm:text-base'>
      <div className='flex flex-wrap gap-2 mt-3 relative'>
        {skill.lists.map((tech) => (
          <Tech key={tech} techId={tech} showTitle />
        ))}
      </div>
    </div>
  </div>
)
