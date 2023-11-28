import projectsImg from '@/assets/images/projects.svg'
import CardProject from '@/components/Card/CardProject'
import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import { getProjects } from '@/lib/notes'

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <div>
      <HeadingNote title="Projects" image={projectsImg} total={`${projects.length} Projects`}>
        I love building things. Practicing is the best way to learn. Here are some of my projects.
      </HeadingNote>
      <Container>
        <div className="grid gap-6 grid-cols-1 md:gap-8 sm:grid-cols-2 lg:md:grid-cols-3 xl:grid-cols-4">
          {projects.map(project => (
            <CardProject key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </div>
  )
}
