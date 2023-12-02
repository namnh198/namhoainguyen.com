import '@/assets/styles/styles.scss'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/Navbar'
import me from '@/data/me'
import LocalRouteChange from '@notion-x/components/LocalRouteChange'
import '@notion-x/style/notion-x.scss'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import { Providers } from './Providers'

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
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-3MB2TKP0VR`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-3MB2TKP0VR');
        `}
      </Script>
      <body
        className={`${poppins.className} text-base bg-white text-neutral-900 dark:bg-neutral-900/95 dark:text-neutral-200`}
        suppressHydrationWarning
      >
        <Providers attribute="class" defaultTheme="light" enableColorScheme={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        {process.env.ENV_MODE === 'dev' && <LocalRouteChange localHostname="localhost:3004" />}
      </body>
    </html>
  )
}
