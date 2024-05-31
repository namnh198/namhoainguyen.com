import { type VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center transition whitespace-nowrap font-medium transition duration-200 ease-in-out',
  {
    variants: {
      variant: {
        transparent: 'bg-transparent text-inherit',
        default: 'text-slate-800 bg-slate-200 dark:text-slate-200 dark:bg-slate-700',
        secondary: 'bg-white border border-neutral-200 dark:border-slate-800',
        pink: 'bg-pink-200 hover:bg-pink-300/90 text-pink-900',
        red: 'bg-red-200 hover:bg-red-300/90 text-red-900',
        teal: 'bg-teal-200 hover:bg-teal-300/90 text-teal-900',
        sky: 'bg-sky-200 hover:bg-sky-300/90 text-sky-900',
        blue: 'bg-blue-200 hover:bg-blue-300/90 text-blue-900',
        yellow: 'bg-amber-200 hover:bg-amber-300/90 text-amber-900'
      },
      size: {
        default: 'p-1.5 space-x-1 rounded-md text-sm',
        sm: 'px-3 py-1 rounded-md text-xs',
        lg: 'p-2.5 space-x-2 rounded-lg text-base',
        xl: 'p-4 gap-4 rounded-xl',
        icon: 'size-6'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.BaseHTMLAttributes<HTMLAnchorElement | HTMLDivElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ variant, size, className, href, ...props }: ButtonProps) => {
  const AnchorComp = href ? (href.startsWith('/') ? Link : 'a') : 'div'
  return href ? (
    <AnchorComp href={href} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ) : (
    <div className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}

export { buttonVariants, Button }
