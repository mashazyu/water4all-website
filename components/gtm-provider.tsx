"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default function GTMProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure dataLayer is initialized
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      
      // Push initial GTM event
      window.dataLayer.push({
        event: 'gtm.init',
        timestamp: Date.now()
      })
      
      console.log('🚀 GTM Provider initialized, dataLayer ready')
    }
  }, [])

  return <>{children}</>
}
