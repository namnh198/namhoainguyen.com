import toolsImg from '@/public/images/tools.svg'
import { getTools } from '@/lib/notion'
import { getMetadata } from '@/lib/utils'
import ToolPage from './ToolPage'
import { PostListHeading } from '@/components/post-heading'

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
      <PostListHeading title='Tools' total={`${tools.length} Tools`} image={toolsImg} description={description} />
      <div className='container py-16 space-y-16'>
        <ToolPage tools={tools} tags={tags} />
      </div>
    </div>
  )
}
