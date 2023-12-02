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
      <Container className="py-16 space-y-16">
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => (
            <CardProject key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </div>
  )
}
