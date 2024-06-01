import hashtagImg from '@/public/images/hashtag.svg'
import { StaticImageData } from 'next/image'
import { PreviewImage } from 'notion-types'
import { NavbarItemProps } from '@/types/app'

export const navItems: NavbarItemProps[] = [
  {
    name: 'Home',
    url: '/',
    freq: 'weekly'
  },
  {
    name: 'About',
    url: '/about',
    freq: 'monthly'
  },
  {
    name: 'Notes',
    url: '/notes',
    freq: 'daily'
  },
  {
    name: 'Topics',
    url: '/tags',
    freq: 'weekly'
  },
  {
    name: 'Projects',
    url: '/projects',
    freq: 'monthly'
  },
  {
    name: 'Tools',
    url: '/tools',
    freq: 'monthly'
  }
]

export const titleTemplate = '%title% | Site Of Nam'

export const defaultOpenGraphImage = {
  url: 'https://i.imgur.com/DvWuLpyh.png',
  width: 1024,
  height: 581
}

export const defaultBlurDataURL =
  'data:image/webp;base64,UklGRu4CAABXRUJQVlA4WAoAAAAgAAAA+wAApwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggAAEAAHAPAJ0BKvwAqAA+7Xa3VqmnJSOgKAEwHYlpbt1fqZxA/IArN2vFych77iezf2IwQKTtQI/RqjOdjq6pcOr5lpldrCjSn5FYIDAK5T0+7vcmKybbL6g6tSn7tWOv2ZxfWQNgEU/JeCq/k9zzuPl8W5gNqTbm15NB3zOe+XPb6vkmRHm8AAD+7o9aHj3aLa14yWQgMZs8TuamPLH5rZylxChra4B5dWHgwOps5SFJeulgIDP3UYKDX745YTtU1tek9VoKCM1AtUiD8IcS+R9XAhJ4zdKfFy6pI6GocwBeHqw2Ccx6spAjE6DfRuYxQAa1Low2YbwG8MRsesGFW6AAAAA='

export const defaultCustomPreviewImage: PreviewImage = {
  dataURIBase64: defaultBlurDataURL,
  originalWidth: 252,
  originalHeight: 168
}

export const defaultTagImage: StaticImageData = {
  src: hashtagImg.src,
  width: 24,
  height: 24
}

export const defaultPostDate = new Date().toISOString().split('T')[0]

export const defaultMaxDayWithThin = 7

export const notionSpace = process.env.NEXT_PUBLIC_NOTION_SPACE || 'https://www.notion.so/namnh98/'

export const defaultPostTypeOpts = {
  newLabel: 'new',
  updatedLabel: 'updated',
  humanizeDate: true,
  maxDaysWithin: 7
}
