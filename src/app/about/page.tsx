import BgGlassmorphism from '@/components/BgGlassmorphism'
import Container from '@/components/Container'
import Heading from '@/components/Heading/Heading'
import HeadingAbout from '@/components/Heading/HeadingAbout'
import { cv } from '@/data/cv'
import { skills } from '@/data/skills'
import { getMetadata } from '@/lib/utils'
import CVGroup from './CVGroup'
import SkillGroup from './SkillGroup'

export const metadata = getMetadata({
  title: 'About Us',
  description: 'About Us'
})

export default function AboutPage() {
  return (
    <>
      <BgGlassmorphism />
      <Container className="lg:py-28 lg:space-y-28 py-16 space-y-16">
        <HeadingAbout />
        <div className="relative">
          <Heading title="Languages" />
          <div className="grid gap-6 grid-cols-1 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(skill => (
              <SkillGroup key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
        <div className="relative py-16">
          <div className="absolute z-0 -translate-x-1/2 2xl:max-w-screen-2xl bg-neutral-100 dark:bg-black dark:bg-opacity/20 inset-y-0 left-1/2 w-screen xl:max-w-[1340px] xl:rounded-[40px]">
            <span className="sr-only hidden">bg</span>
          </div>
          <div className="relative grid gap-8 lg:grid-cols-2">
            {cv.map(group => (
              <CVGroup key={group.id} cv={group} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
