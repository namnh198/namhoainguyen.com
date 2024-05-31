import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${poppins.className} text-base bg-white dark:bg-[#1d2333] text-neutral-900 dark:text-neutral-100`}
      >
        {children}
      </body>
    </html>
  )
}
