'use client'

import PostHeaderTopics from '@notion-x/components/PostHeaderTopics'
import { PageIcon } from '@notion-x/components/page-icon'
import { Text } from '@notion-x/components/text'
import { useNotionContext } from '@notion-x/hooks/context'
import { usePostDateStatus } from '@notion-x/hooks/postUpdatedDateStatus'
import HiMiniCheckBadge from '@notion-x/icons/HiMiniCheckBadge'
import HiOutlinePencilSquare from '@notion-x/icons/HiOutlinePencilSquare'
import cn from 'classnames'
import { get } from 'lodash'
import dynamic from 'next/dynamic'
import { ExtendedRecordMap } from 'notion-types'
import { Suspense } from 'react'

import { me } from '@/data/me'
import { defaultPostTypeOpts } from '@/lib/config'
import SimpleImage from '@notion-x/components/SimpleImage'
import { ImagePlaceholderPostHeader } from '@notion-x/components/image-placeholders'
import { Post } from '@notion-x/interface'
import Image from 'next/image'
import { getTextContent } from 'notion-utils'

const DateComponent = dynamic(() => import('@notion-x/components/DateComponent'), {
  ssr: false
})

export const fullWidthPostCoverHeight = 'h-[25vh] max-h-[25vh] min-h-[25vh]'
export const gapHeaderItems = 'mb-3'

type PostHeaderProps = {
  recordMap: ExtendedRecordMap
  post: Post
  hideMeta?: boolean
}

export const containerHeaderClass = 'max-w-full bg-slate-50 drop-shadow-sm py-4'

export default function HeadingPost(props: PostHeaderProps) {
  const ctx = useNotionContext()
  const { mapImageUrl } = ctx
  const id = Object.keys(props.recordMap.block)[0]
  const block = props.recordMap.block[id]?.value
  const {
    drawTitle: title,
    createdDate,
    updatedDate: modifiedDate,
    tags,
    icon,
    draft,
    cover,
    verified
  } = props.post
  const status = usePostDateStatus(
    createdDate!,
    modifiedDate!,
    get(defaultPostTypeOpts, 'maxDaysWinthin', 7)
  )

  return (
    <div className="w-full">
      {cover ? (
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <SimpleImage
            src={mapImageUrl(cover as any, block)}
            alt={getTextContent(title)}
            className="object-cover w-full h-full"
            imagePlaceholder={ImagePlaceholderPostHeader()}
          />
        </div>
      ) : (
        <div className="bg-indigo-50 dark:bg-neutral-800 absolute top-0 inset-x-0 h-48 w-full"></div>
      )}

      <div className={cn('container', { '-mt-10 lg:-mt-16': !!cover, 'pt-8 lg:pt-16': !cover })}>
        <div className="relative bg-white dark:bg-neutral-900 shadow-2xl px-4 sm:px-5 py-7 lg:p-11 rounded-2xl md:rounded-[40px] flex flex-col md:flex-row gap-8 lg:gap-10 items-center justify-center">
          {icon && (
            <div className="relative shrink-0 overflow-hidden dark:ring-0 h-24 lg:h-40 lg:w-40 ring-4 ring-white rounded-3xl sm:h-32 sm:w-32 w-24 wil-avatar z-0">
              <div className="items-center flex justify-center absolute bg-neutral-100 dark:bg-neutral-800 inset-0">
                <Suspense fallback={null}>
                  <PageIcon block={block} inline={false} />
                </Suspense>
              </div>
            </div>
          )}

          <div className="flex-1 space-y-4 lg:space-y-5">
            <h1 className="inline-flex items-center text-center md:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
              <Text value={title} block={block} />
            </h1>

            <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

            {!props.hideMeta && (
              <div className="flex flex-wrap justify-between sm:items-end gap-5">
                {/* Author & Date */}
                <div className="flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-base leading-none shrink-0">
                  <div className="flex items-center space-x-2">
                    <div className="relative shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full shadow-inner h-10 w-10 sm:h-11 sm:w-11 text-xl ring-1 ring-white dark:ring-neutral-900">
                      <Image
                        src={me.avatar}
                        alt={me.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ms-3">
                    <div className="flex items-center font-semibold">{me.name}</div>
                    <div className="text-xs mt-[6px]">
                      <span className="text-neutral-700 dark:text-neutral-300">
                        <DateComponent dateString={createdDate!} format="MMM DD, YYYY" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div>
                  <div className="hidden sm:flex flex-row space-x-2 sm:space-x-2.5 items-center">
                    {draft && (
                      <div
                        className={cn(
                          'px-3 py-0.5 text-[0.8rem] rounded-xl whitespace-nowrap',
                          'bg-slate-100 text-slate-700'
                        )}
                      >
                        draft
                      </div>
                    )}
                    {status !== 'normal' && (
                      <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                        {['updated', 'updatedWithin'].includes(status) && (
                          <div
                            className={cn(
                              'px-3 py-1 text-xs items-start rounded-md whitespace-nowrap font-medium',
                              {
                                'text-slate-700 bg-slate-100': status === 'updated',
                                'text-green-900 bg-green-200': status === 'updatedWithin'
                              }
                            )}
                          >
                            <DateComponent
                              dateLabel="updated"
                              humanize={true}
                              dateString={modifiedDate!}
                              format="MMM DD, YYYY"
                            />
                          </div>
                        )}

                        {status === 'new' && (
                          <div
                            className={cn(
                              'px-3 py-0.5 text-[0.8rem] rounded-xl whitespace-nowrap font-medium',
                              'bg-amber-200 text-amber-900'
                            )}
                          >
                            new
                          </div>
                        )}
                      </div>
                    )}
                    <div className="px-1">
                      <div className="border-s border-neutral-200 dark:border-neutral-700 h-5 sm:h-6"></div>
                    </div>
                    {verified && (
                      <div
                        className="relative tooltip-auto tooltip-right flex items-center text-neutral-600 transition-colors dark:text-neutral-200 hover:text-sky-600 dark:hover:text-sky-500"
                        data-title="Verified by me"
                      >
                        <span className="shrink-0 flex items-center justify-center rounded-full bg-neutral-50 transition-colors duration-75 dark:bg-neutral-800 hover:bg-sky-50 dark:hover:bg-sky-100 w-9 h-9">
                          <HiMiniCheckBadge className="w-5 h-5" />
                        </span>
                      </div>
                    )}
                    <a
                      href={`https://www.notion.so/namhoainguyen/${block.id.replace(/-/g, '')}`}
                      target="_blank"
                      className="relative tooltip-auto tooltip-right flex items-center text-neutral-600 transition-colors dark:text-neutral-200 hover:text-green-600 dark:hover:text-green-500"
                      data-title={'Edit this note (for me only)'}
                    >
                      <span className="shrink-0 flex items-center justify-center rounded-full bg-neutral-50 transition-colors duration-75 dark:bg-neutral-800 hover:bg-green-50 dark:hover:bg-green-100 w-9 h-9">
                        <HiOutlinePencilSquare className="w-4 h-4" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            )}
            {tags && !!tags.length && (
              <div className="flex flex-wrap items-center">
                <PostHeaderTopics
                  className="justify-center sm:justify-start"
                  tags={tags}
                  TiTagClass="dark:text-neutral-200"
                  tagClass="text-slate-700 bg-slate-50"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header with infos */}
    </div>
  )
}
