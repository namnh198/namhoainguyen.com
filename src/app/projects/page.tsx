import projectsImg from '@/assets/images/projects.svg'
import CardProject from '@/components/Card/CardProject'
import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import { getProjects } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'

const title = 'Projects'
const description =
  'I love building things. Practicing is the best way to learn. Here are some of my projects.'

export const metadata = getMetadata({
  title,
  description,
  images: [`/api/og?title=${encodeURI(title)}&description=${encodeURI(description)}`]
})

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <div>
      <HeadingNote title={title} image={projectsImg} total={`${projects.length} Projects`}>
        {description}
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
