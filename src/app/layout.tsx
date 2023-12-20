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
      path: '../../public/fonts/helvetica-25-ultra-light.ttf',
      weight: '250'
    },
    {
      path: '../../public/fonts/helvetica-35-thin.ttf',
      weight: '350'
    },
    {
      path: '../../public/fonts/helvetica-45-light.ttf',
      weight: '450'
    },
    {
      path: '../../public/fonts/helvetica-55-roman.ttf',
      weight: '550'
    },
    {
      path: '../../public/fonts/helvetica-65-medium.ttf',
      weight: '650'
    },
    {
      path: '../../public/fonts/helvetica-75-bold.ttf',
      weight: '750'
    },
    {
      path: '../../public/fonts/helvetica-85-heavy.ttf',
      weight: '850'
    },
    {
      path: '../../public/fonts/helvetica-95-black.ttf',
      weight: '950'
    },
    {
      path: '../../public/fonts/bpg-nino-mtavruli-bold-webfont.ttf',
      weight: '700' // Bold (Standard)
    },
    {
      path: '../../public/fonts/helvetica-light.ttf',
      weight: '300' // Light (Standard)
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
