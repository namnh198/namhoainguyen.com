import Image from 'next/image'
import aboutImg from '@/public/images/about-hero.webp'
import { ABOUT } from '@/data/about'
import BG from '@/components/ui/bg'
import CV from './cv'
import Skills from './skills'
import { Heading } from '@/components/ui/heading'
import { getMetadata } from '@/lib/utils'

export const metadata = getMetadata({
  title: ABOUT.title,
  description: ABOUT.description
})

export default function AboutPage() {
  return (
    <>
      <BG grassMorphism />
      <div className='relative container py-16 space-y-16'>
        <div className='flex flex-col items-center lg:flex-row lg:space-x-10 lg:space-y-0 lg:text-left relative rtl:space-x-reverse space-y-14 text-center'>
          <div className='w-screen lg:space-y-7 max-w-full space-y-5 xl:max-w-xl'>
            <h2 className='font-semibold text-neutral-900 dark:text-neutral-100 !leading-tight  md:text-4xl text-3xl xl:text-5xl'>
              <span className='inline-block animate-wave'>👋</span> {ABOUT.title}.
            </h2>
            <p className='block  text-base text-neutral-6000 xl:text-lg'>{ABOUT.description}</p>
          </div>
          <div className='grow'>
            <Image src={aboutImg} alt='About Us Image' priority />
          </div>
        </div>
        <div className='relative'>
          <Heading size='lg' className='mb-10 md:md-12' title='Languages' />
          <Skills skills={ABOUT.skills} />
        </div>
        <div className='relative py-16'>
          <BG />
          <CV cv={ABOUT.cv} />
        </div>
      </div>
    </>
  )
}
