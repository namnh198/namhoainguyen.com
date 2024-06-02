import projectsImg from '@/public/images/projects.svg'
import Project from '@/components/project'
import { PostListHeading } from '@/components/post-heading'
import { getProjects } from '@/lib/notion'
import { getMetadata } from '@/lib/utils'

const title = 'Projects'
const description = 'I love building things. Practicing is the best way to learn. Here are some of my projects.'

export const revalidate = 100

export const metadata = getMetadata({
  title,
  description,
  images: [`/api/og?title=${encodeURI(title)}&description=${encodeURI(description)}`]
})

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <>
      <PostListHeading
        title='Projects'
        total={`${projects.length} Projects`}
        image={projectsImg}
        description={description}
      />
      <div className='container py-16 space-y-16'>
        <div className='grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3'>
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  )
}
