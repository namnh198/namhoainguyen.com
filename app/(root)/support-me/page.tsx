import SinglePostTemplate from '@/app/notes/[slug]/SinglePostTemplate'
import { defaultOpenGraphImage } from '@/lib/config'
import { getMetadata } from '@/lib/utils'
import { getPage } from '@notion-x/lib/notion-api'
import { Suspense } from 'react'
import Loading from './loading'

export const metadata = getMetadata({
  title: 'Support Me',
  description: 'Buy me a coffee',
  images: [defaultOpenGraphImage]
})

export default async function SupportMePage() {
  const recordMap = await getPage(process.env.SUPPORT_ME_ID as string)

  return (
    <Suspense fallback={<Loading />}>
      <SinglePostTemplate recordMap={recordMap} hideMeta />
    </Suspense>
  )
}
