'use client'

import { useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { UTM_PARAMETERS, extractUTMParams, type UTMParams } from '../lib/utm-config'

export default function GoogleAnalyticsComponent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && measurementId) {
      // Enhanced configuration for UTM tracking
      window.gtag('config', measurementId, {
        // Automatically capture UTM parameters
        send_page_view: true,
      })

      // Function to extract UTM parameters from URL
      const extractUTMParamsFromURL = (): UTMParams => {
        const urlParams = new URLSearchParams(window.location.search)
        const utmParams: UTMParams = {}
        
        UTM_PARAMETERS.forEach(key => {
          const value = urlParams.get(key)
          if (value) {
            utmParams[key] = value
          }
        })
        
        return utmParams
      }

      // Function to set UTM parameters in GA4
      const setUTMParams = (utmParams: UTMParams) => {
        if (Object.keys(utmParams).length > 0) {
          // Set UTM parameters as custom dimensions
          Object.entries(utmParams).forEach(([key, value]) => {
            window.gtag('set', key, value)
          })
          
          // Also track as an event for better visibility
          window.gtag('event', 'utm_capture', {
            event_category: 'traffic_source',
            event_label: JSON.stringify(utmParams),
            ...utmParams
          })
        }
      }

      // Extract and set UTM parameters on page load
      const utmParams = extractUTMParamsFromURL()
      if (Object.keys(utmParams).length > 0) {
        setUTMParams(utmParams)
      }

      // Listen for navigation changes (for SPA behavior)
      const handleUrlChange = () => {
        const newUtmParams = extractUTMParamsFromURL()
        if (Object.keys(newUtmParams).length > 0) {
          setUTMParams(newUtmParams)
        }
      }

      // Use History API to detect navigation changes
      const originalPushState = history.pushState
      const originalReplaceState = history.replaceState

      history.pushState = function(...args) {
        originalPushState.apply(history, args)
        setTimeout(handleUrlChange, 100)
      }

      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args)
        setTimeout(handleUrlChange, 100)
      }

      // Cleanup function
      return () => {
        history.pushState = originalPushState
        history.replaceState = originalReplaceState
      }
    }
  }, [measurementId])

  if (!measurementId) {
    console.warn('Google Analytics measurement ID not found')
    return null
  }

  return <GoogleAnalytics gaId={measurementId} />
}
