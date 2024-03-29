'use client'

import Giscus, { Repo } from '@giscus/react'
import { useTheme } from 'next-themes'

export default function Comment() {
  const { resolvedTheme } = useTheme()
  return (
    <Giscus
      id="comments"
      repo={process.env.NEXT_PUBLIC_ID_GISCUS_REPO as Repo}
      repoId={`${process.env.NEXT_PUBLIC_ID_GISCUS_REPO_ID}` as string}
      category={process.env.NEXT_PUBLIC_ID_GISCUS_CATEGORY as string}
      categoryId={process.env.NEXT_PUBLIC_ID_GISCUS_CATEGORY_ID as string}
      strict="1"
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme}
      lang="en"
      host="https://giscus.app"
      loading="lazy"
    />
  )
}
