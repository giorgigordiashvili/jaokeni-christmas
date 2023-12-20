'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { clarity } from 'react-microsoft-clarity'

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    clarity.init('k8u695ripd')

    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('691070256463566') //don't forget to change this
        ReactPixel.pageView()
      })
  }, [pathname, searchParams])

  return null
}
