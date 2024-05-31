'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

const headingVariants = cva('flex flex-wrap font-semibold', {
  variants: {
    size: {
      sm: 'text-xl sm:text-2xl mb-4 md:mb-6',
      lg: 'text-3xl md:text-4xl mb-10 md:md-12'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
})

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  url?: string
  icon?: ImageProps
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  showMore?: boolean
  title: string
}

const Heading = ({ size, className, as: Comp = 'h2', url, icon, title, ...props }: HeadingProps) => {
  const { src, alt, ...iconProps } = icon || {}
  return (
    <div className={cn('relative flex text-neutral-900 dark:text-neutral-100')}>
      {src && (
        <div className='mr-3 shrink-0'>
          <Image src={src} alt={alt as string} {...iconProps} />
        </div>
      )}
      <Comp className={cn(headingVariants({ size, className }))} {...props}>
        {title}
        {url && (
          <Link
            href={url}
            className='text-[80%] text-slate-600 dark:text-slate-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-400 ml-3'
          >
            ...more
          </Link>
        )}
      </Comp>
    </div>
  )
}

export { headingVariants, Heading }
