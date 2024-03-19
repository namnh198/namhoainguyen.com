import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import { getTools } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import toolsImg from '@/public/images/tools.svg'
import ToolPage from './ToolPage'

export const revalidate = 20

const title = 'Tools I use'
const description = 'Apps, tools, websites I find useful.'

export const metadata = getMetadata({
  title,
  description,
  images: [`/api/og?title=${encodeURI(title)}&description=${encodeURI(description)}`]
})

export default async function ToolsPage() {
  const { tools, tags } = await getTools()

  return (
    <div>
      <HeadingNote title="Tools" image={toolsImg} total={`${tools.length} Tools`}>
        I&rsquo;m always on the lookout for new apps and websites that can help me learn and work
        more effectively. Here&rsquo;s a list of tools that I&rsquo;ve found really useful so far.
      </HeadingNote>
      <Container className="py-16 space-y-16">
        <ToolPage tools={tools} tags={tags} />
      </Container>
    </div>
  )
}
