import { cn } from '@/lib/utils'

type BlockYoutubeEmbedProps = {
  id: string
  width?: number
  height?: number
  title?: string
  className?: string
}

export default function YoutubeEmbed({ width, className, height, id, title }: BlockYoutubeEmbedProps) {
  return (
    <div className={className}>
      <iframe
        width={width || 853}
        height={height || 480}
        src={`https://www.youtube.com/embed/${id}`}
        rel='nofollow'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title={title || 'A video from YouTube'}
        className={cn('border-0 rounded-xl', { 'w-full': !width })}
      />
    </div>
  )
}
