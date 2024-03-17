import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Poppins } from 'next/font/google'
import Script from 'next/script'

import '@/app/global.scss'
import '@notion-x/style/notion-x.scss'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/Navbar'
import me from '@/data/me'
import { cn } from '@notion-x/lib/utils'

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export const revalidate = 20

export const metadata: Metadata = {
  metadataBase: new URL(me.website),
  robots: {
    index: process.env.ENV_MODE !== 'prod' ? false : true,
    follow: process.env.ENV_MODE !== 'prod' ? false : true,
    nocache: process.env.ENV_MODE !== 'prod' ? true : false,
    googleBot: {
      index: process.env.ENV_MODE !== 'prod' ? false : true,
      follow: process.env.ENV_MODE !== 'prod' ? false : true,
      noimageindex: process.env.ENV_MODE !== 'prod' ? true : false
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {process.env.ENV_MODE === 'prod' && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=G-3MB2TKP0VR`}
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-3MB2TKP0VR');
        `
            }}
          />
        </>
      )}

      <body
        className={cn(
          poppins.className,
          'text-base bg-white text-neutral-900',
          'dark:bg-[#1d2333] dark:text-neutral-100'
        )}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
