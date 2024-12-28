import type { Colors, Post } from '@/types';
import clsx from 'clsx';
import { usePostDateStatus } from './usePostDateStatus';
import DateComponent from './date-component';

export default function PostBadge({ post }: { post: Post }) {
  const status = usePostDateStatus(post.createDate, post.updateDate);

  return (
    <span className="flex items-center whitespace-nowrap space-x-2">
      {post.verified && <Badge variant="blue">verified</Badge>}
      {post.draft && <Badge variant="peach">draft</Badge>}
      {status === 'new' && <Badge variant="red">new</Badge>}
      {status === 'updatedWithin' && post.updateDate && (
        <Badge variant="sapphire">
          <DateComponent date={post.updateDate} dateLabel="updated" />
        </Badge>
      )}
      {status === 'normal' && (
        <Badge variant="overlay0">
          <DateComponent date={post.createDate} dateLabel="added" />
        </Badge>
      )}
    </span>
  );
}

export const Badge = ({
  variant,
  className,
  children
}: {
  variant: Colors;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <span
      className={clsx(
        'inline-block py-0.5 px-2 rounded-[.25rem] text-sm leading-4 font-semibold',
        {
          'bg-rosewater text-background': variant === 'rosewater',
          'bg-flamingo text-background': variant === 'flamingo',
          'bg-pink text-background': variant === 'pink',
          'bg-mauve text-background': variant === 'mauve',
          'bg-red text-background': variant === 'red',
          'bg-maroon text-background': variant === 'maroon',
          'bg-peach text-background': variant === 'peach',
          'bg-yellow text-background': variant === 'yellow',
          'bg-green text-background': variant === 'green',
          'bg-teal text-background': variant === 'teal',
          'bg-sky text-background': variant === 'sky',
          'bg-lavender text-background': variant === 'lavender',
          'bg-sapphire text-background': variant === 'sapphire',
          'bg-blue text-background': variant === 'blue',
          'bg-overlay0 text-background': variant === 'overlay0'
        },
        [className]
      )}
    >
      {children}
    </span>
  );
};
