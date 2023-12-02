import { StaticImageData } from 'next/image'
export type ImageType = {
  src: string
  sizes?: string
  alt?: string
  blurDataURL?: string
  width?: number
  height?: number
  staticImageData?: StaticImageData // for default featured image
  imgur?: string // image uploaded to imgur
} | null

export type Project = {
  id: string
  title: string
  type?: string
  permalink?: string
  description?: string
  techs?: string[]
}

export type Tool = {
  id: string
  title: string
  url?: string
  isFree?: boolean
  icon: string
  description?: string
  tags?: string[]
}

export type ParamsProps = {
  slug?: string | string[]
  page?: string
}
