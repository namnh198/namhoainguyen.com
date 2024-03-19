import me from '@/data/me'
import aboutImg from '@/public/images/about-hero.webp'
import Image from 'next/image'

export default function HeadingAbout() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center lg:flex-row lg:space-x-10 lg:space-y-0 lg:text-left relative rtl:space-x-reverse space-y-14 text-center">
        <div className="w-screen lg:space-y-7 max-w-full space-y-5 xl:max-w-xl">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 !leading-tight  md:text-4xl text-3xl xl:text-5xl">
            <span className="inline-block animate-wave">👋</span> About Us.
          </h2>
          <p className="block  text-base text-neutral-6000 xl:text-lg">{me.longIntro}</p>
        </div>
        <div className="grow">
          <Image src={aboutImg} alt="About Us Image" />
        </div>
      </div>
    </div>
  )
}
