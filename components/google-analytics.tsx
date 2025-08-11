"use client"

import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect } from 'react'
import { UTM_PARAMETERS, extractUTMParams, UTMParams } from '../lib/utm-config'

export default function GoogleAnalyticsComponent() {
  useEffect(() => {
    // Check cookie consent before initializing analytics
    const consent = localStorage.getItem("cookie-consent")
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    
    if (!measurementId) {
      console.warn('Google Analytics measurement ID not found')
      return
    }
    
    if (consent === "all") {
      // User accepted all cookies - enable analytics
      if (typeof window !== "undefined" && window.gtag) {
        // @ts-ignore - gtag consent API
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "denied",
          functionality_storage: "granted",
          personalization_storage: "denied",
          security_storage: "granted"
        })
        
        // Initialize with UTM parameter mapping
        window.gtag('config', measurementId, {
          send_page_view: true,
          custom_map: {
            custom_dimension1: 'utm_source',
            custom_dimension2: 'utm_medium',
            custom_dimension3: 'utm_campaign',
            custom_dimension4: 'utm_term',
            custom_dimension5: 'utm_content'
          }
        })
      }
    } else if (consent === "essential" || consent === "declined") {
      // User declined analytics cookies - disable analytics
      if (typeof window !== "undefined" && window.gtag) {
        // @ts-ignore - gtag consent API
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          functionality_storage: consent === "essential" ? "granted" : "denied",
          personalization_storage: "denied",
          security_storage: "granted"
        })
      }
    } else {
      // No consent given yet - set default consent state
      if (typeof window !== "undefined" && window.gtag) {
        // @ts-ignore - gtag consent API
        window.gtag("consent", "default", {
          analytics_storage: "denied",
          ad_storage: "denied",
          functionality_storage: "denied",
          personalization_storage: "denied",
          security_storage: "granted"
        })
      }
    }
  }, [])

  useEffect(() => {
    // Function to extract UTM parameters from URL
    const extractUTMParamsFromURL = (): UTMParams => {
      if (typeof window === "undefined") return {}
      
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams: UTMParams = {}
      
      UTM_PARAMETERS.forEach(param => {
        const value = urlParams.get(param)
        if (value) {
          utmParams[param] = value
        }
      })
      
      return utmParams
    }

    // Function to set UTM parameters in gtag
    const setUTMParams = (utmParams: UTMParams) => {
      if (typeof window === "undefined" || !window.gtag) return
      
      Object.entries(utmParams).forEach(([key, value]) => {
        window.gtag('set', key, value)
      })
    }

    // Check for UTM parameters on page load
    const utmParams = extractUTMParamsFromURL()
    if (Object.keys(utmParams).length > 0) {
      setUTMParams(utmParams)
      
      // Track UTM parameter capture
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag('event', 'utm_capture', {
          event_category: 'engagement',
          event_label: 'utm_parameters_captured',
          ...utmParams
        })
      }
    }

    // Override History API to detect URL changes (for SPA behavior)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      const newUTMParams = extractUTMParamsFromURL()
      if (Object.keys(newUTMParams).length > 0) {
        setUTMParams(newUTMParams)
      }
    }

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      const newUTMParams = extractUTMParamsFromURL()
      if (Object.keys(newUTMParams).length > 0) {
        setUTMParams(newUTMParams)
      }
    }

    // Cleanup function
    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!measurementId) {
    console.warn('Google Analytics measurement ID not found')
    return null
  }

  return <GoogleAnalytics gaId={measurementId} />
}
