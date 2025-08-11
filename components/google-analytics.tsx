'use client'

import { GoogleAnalytics } from '@next/third-parties/google'

export default function GoogleAnalyticsComponent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!measurementId) {
    console.warn('Google Analytics measurement ID not found')
    return null
  }

  return <GoogleAnalytics gaId={measurementId} />
}
