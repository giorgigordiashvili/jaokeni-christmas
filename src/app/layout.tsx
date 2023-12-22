import { FacebookPixelEvents } from '@/components/Pixel'
import CustomSnowfall from '@/components/Snowfall/Snowfall'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import type { Metadata } from 'next'
import LocalFont from 'next/font/local'
import { Suspense } from 'react'

import './globals.css'

const helvetica = LocalFont({
  src: [
    {
      path: '../../public/fonts/helvetica-65-medium.ttf',
      weight: '650'
    },
    {
      path: '../../public/fonts/bpg-nino-mtavruli-bold-webfont.ttf',
      weight: '700' // Bold (Standard)
    },
    {
      path: '../../public/fonts/helvetica-normal.ttf',
      weight: '400' // Normal (Standard)
    }
  ],
  display: 'swap',
  variable: '--helvetica'
})

export const metadata: Metadata = {
  title: 'ჯაოკენი',
  description: 'საახალწლო საჩუქრები ყველას'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={helvetica.variable}>
        <Suspense fallback={null}>
          <FacebookPixelEvents />
        </Suspense>
        <CustomSnowfall />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
