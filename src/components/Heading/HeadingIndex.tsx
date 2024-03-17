import me from '@/data/me'
import { socials } from '@/data/socials'
import homeImg from '@/public/images/index-home.webp'
import { cn } from '@notion-x/lib/utils'
import Image from 'next/image'
import BadgeSocial from '../Badge/BadgeSocials'

export default function HeadingIndex() {
  return (
    <div className={cn('relative flex flex-col-reverse md:flex-row justify-end')}>
      <div
        className={cn(
          'md:absolute z-10 md:start-0 md:top-1/2 md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-2/5'
        )}
      >
        <div
          className={cn(
            'p-4 sm:p-8 xl:py-14 md:px-10 md:backdrop-blur-lg shadow-lg  rounded-3xl space-y-3 sm:space-y-5',
            'bg-white/40',
            'dark:bg-neutral-900/40 dark:shadow-2xl'
          )}
        >
          <div>
            <h1 className="text-2xl xl:text-3xl font-semibold">
              Hi! <span className="inline-block animate-wave">👋</span> I&rsquo;m Nam
            </h1>
          </div>
          <p className="text-sm md:text-base">{me.shortIntro}</p>
          <p className="text-sm md:text-base">You can follow me more on:</p>
          <div className="flex flex-wrap justify-center">
            {socials.map(social => (
              <BadgeSocial social={social} key={social.id} showTitle />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/5 lg:w-2/3">
        <div className="aspect-w-16 aspect-h-12 bg-[#f8f8f8] rounded-3xl sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative">
          <Image
            src={homeImg}
            className="absolute inset-0 object-cover rounded-3xl"
            width={850}
            height={450}
            alt="Hi! I'm Nam"
            priority
          />
        </div>
      </div>
    </div>
  )
}
