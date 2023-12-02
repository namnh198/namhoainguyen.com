import '@/assets/styles/styles.scss'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/Navbar'
import me from '@/data/me'
import '@notion-x/style/notion-x.scss'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'

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
    <html lang="en">
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
        className={`${poppins.className} text-base bg-white text-neutral-900`}
        suppressHydrationWarning
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
