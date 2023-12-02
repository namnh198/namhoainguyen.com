import img404 from '@/assets/images/404.webp'
import { defaultOpenGraphImage } from '@/lib/config'
import { getMetadata } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: getMetadata({ title: 'Page not found!' }),
  openGraph: {
    images: [defaultOpenGraphImage]
  }
}

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-5 sm:pb-20 lg:px-8">
      <div className="max-w-2xl text-center mx-auto">
        <Image src={img404} alt="404 Not Found" width={750} height={500} />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Page Not Found</h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="text-sm font-semibold leading-7 text-indigo-500 hover:text-indigo-600"
          >
            <span className="me-2">←</span>
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
