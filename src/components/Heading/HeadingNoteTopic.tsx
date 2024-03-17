import Link from 'next/link'

import SimpleImage from '@notion-x/components/SimpleImage'
type HeadingNoteTopicProps = {
  icon?: string
  slug?: string
  permalink?: string
  name: string
}

export default function HeadingNoteTopic(props: HeadingNoteTopicProps) {
  return (
    <div className="relative flex gap-3 text-neutral-900 dark:text-neutral-100">
      {props.icon && (
        <div>
          <SimpleImage
            src={props.icon}
            alt={`Image of topic ${props.name}`}
            width={28}
            height={28}
          />
        </div>
      )}
      <h2
        id={props.slug}
        className="font-semibold text-xl sm:text-2xl flex flex-wrap gap-x-3 items-center scroll-mt-[70px]"
      >
        <span>
          {props.name}
          {props.permalink && (
            <Link
              href={props.permalink}
              className="text-[80%] ml-2 italic text-slate-600 dark:text-slate-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-400"
            >
              ...more
            </Link>
          )}
        </span>
      </h2>
    </div>
  )
}
