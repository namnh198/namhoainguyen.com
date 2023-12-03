// import PostAside from '@/components/PostAside'
import Comment from '@/components/Comment'
import HeadingPost from '@/components/Heading/HeadingPost'
import PostBody from '@notion-x/components/PostBody'
import PostToc from '@notion-x/components/PostToc'
import { BlockOptionsContextType } from '@notion-x/hooks/context'
import { Post } from '@notion-x/interface'
import { ExtendedRecordMap, PageBlock } from 'notion-types'
import { getPageTableOfContents } from 'notion-utils'

// import Comments from '../components/Comments'
// import Footer from '../components/Footer'

type SinglePostTemplateProps = {
  recordMap: ExtendedRecordMap
  post: Post
  blockOptionsContext?: BlockOptionsContextType
  hideMeta?: boolean
}

export default function SinglePostTemplate(props: SinglePostTemplateProps) {
  const id = Object.keys(props.recordMap.block)[0]
  const block = props.recordMap.block[id]?.value
  const tocs = getPageTableOfContents(block as PageBlock, props.recordMap)
  return (
    <>
      <div className="animate-fadeIn">
        <HeadingPost recordMap={props.recordMap} post={props.post} hideMeta={props.hideMeta} />
        <div className="container flex flex-col my-10 lg:flex-row">
          <div className="flex-1">
            <article className="max-w-4xl 2xl:pr-4 mx-auto overflow-x-hidden">
              <PostBody
                recordMap={props.recordMap}
                blockOptions={{
                  siteDomain: 'namhoainguyen.com',
                  labelTocTitle: 'In this note',
                  blockCodeCopiedText: 'Copied',
                  blockCodeCopyText: 'Copy',
                  headingScrollMarginTopClass: 'scroll-mt-[70px]',
                  minNumHeadingsToShowToc: 4
                }}
                useSimpleImage={true}
              />
              <Comment />
            </article>
          </div>
          <aside className="hidden 2xl:block h-[calc(100vh-130px)] sticky top-[70px] pt-8">
            <PostToc
              recordMap={props.recordMap}
              tocs={tocs}
              labelTocTitle="In this note"
              showContent={true}
            />
          </aside>
        </div>
      </div>
    </>
  )
}
