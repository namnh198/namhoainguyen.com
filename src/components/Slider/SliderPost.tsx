'use client'
import PostNoImage from '@/components/Post/PostNoImage'
import Glide from '@glidejs/glide'
import type { Post } from '@notion-x/interface'
import { useEffect, useRef } from 'react'

const SliderPost = ({ posts, perView = 4 }: { posts: Post[]; perView?: 2 | 3 | 4 }) => {
  const sliderHref = useRef(null)

  useEffect(() => {
    const glide = new Glide(sliderHref.current as any, {
      perView: perView,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: perView - 1
        },
        1023: {
          perView: perView - 2 || 1.2,
          gap: 20
        },
        767: {
          perView: perView - 2 || 1.2,
          gap: 20
        },
        639: {
          perView: 1.2,
          gap: 20
        }
      }
    })
    glide.mount()
    return () => {
      glide.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="glide" ref={sliderHref}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {posts.map((post, index) => (
            <li key={index} className={`glide__slide h-auto`}>
              <PostNoImage post={post} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
      <div data-glide-el="controls"></div>
    </div>
  )
}

export default SliderPost
