"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default function GTMProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure dataLayer is initialized for the official Next.js GTM integration
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      
      // Initialize gtag if not already present
      if (!window.gtag) {
        window.gtag = function() {
          window.dataLayer.push(arguments)
        }
      }
    }
  }, [])

  return <>{children}</>
}
