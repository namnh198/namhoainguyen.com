'use client'
import type { ImageType } from '@/types'
import Image, { ImageProps, StaticImageData } from 'next/image'
type Props = {
  image?: ImageType
  defaultImage?: StaticImageData
  alt?: string
  className?: string
  imageProps?: Partial<ImageProps>
}

export default function ImageComponent(props: Props) {
  const getImage = () =>
    props.image?.staticImageData ? (
      <Image src={props.image.staticImageData} alt={props.alt || 'Image No Name'} />
    ) : props.image?.src && props.image?.blurDataURL ? (
      <Image
        src={props.image.src}
        alt={props.alt || 'Image No Name'}
        blurDataURL={props.image.blurDataURL}
        placeholder="blur"
        {...props.imageProps}
      />
    ) : props.defaultImage ? (
      <Image
        src={props.defaultImage}
        alt={props.alt || 'Image No Name'}
        className={props.className}
        {...props.imageProps}
      />
    ) : null
  return <>{getImage()}</>
}
