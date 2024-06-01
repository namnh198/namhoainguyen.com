/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image, { ImageProps } from 'next/image'

import { isBrowser } from '@/lib/utils'

export const GracefulImage = (props: ImageProps) => {
  if (isBrowser) {
    return <Image {...props} />
  } else {
    return <img {...(props as any)} />
  }
}
