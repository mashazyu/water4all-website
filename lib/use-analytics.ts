'use client'

import { useCallback, useEffect } from 'react'
import { UTM_PARAMETERS, extractUTMParams, type UTMParams } from './utm-config'

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any> | string
    ) => void
  }
}

export const useAnalytics = () => {
  // Extract UTM parameters from current URL
  const getUTMParams = useCallback((): UTMParams => {
    if (typeof window === 'undefined') return {}
    
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams: UTMParams = {}
    
    UTM_PARAMETERS.forEach(key => {
      const value = urlParams.get(key)
      if (value) {
        utmParams[key] = value
      }
    })
    
    return utmParams
  }, [])

  const trackEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number,
    additionalParams?: Record<string, any>
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      const utmParams = getUTMParams()
      
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        // Include UTM parameters in all events
        ...utmParams,
        // Include any additional parameters
        ...additionalParams,
      })
    }
  }, [getUTMParams])

  const trackPageView = useCallback((url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      const utmParams = getUTMParams()
      const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      
      if (measurementId) {
        window.gtag('config', measurementId, {
          page_path: url,
          // Include UTM parameters in page views
          ...utmParams,
        })
      }
    }
  }, [getUTMParams])

  const trackUTMCapture = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const utmParams = getUTMParams()
      
      if (Object.keys(utmParams).length > 0) {
        // Track UTM capture as a specific event
        window.gtag('event', 'utm_capture', {
          event_category: 'traffic_source',
          event_label: JSON.stringify(utmParams),
          ...utmParams,
        })
        
        // Set UTM parameters as custom dimensions
        Object.entries(utmParams).forEach(([key, value]) => {
          window.gtag('set', key, value)
        })
      }
    }
  }, [getUTMParams])

  // New function for tracking exit links (external navigation)
  const trackExitLink = useCallback((
    destination: string,
    linkType: string,
    userLanguage: string,
    additionalContext?: Record<string, any>
  ) => {
    if (typeof window !== 'undefined') {
      const utmParams = getUTMParams()
      const timestamp = Date.now()
      
      // Track via gtag (Google Analytics)
      if (window.gtag) {
        window.gtag('event', 'exit_link', {
          event_category: 'navigation',
          event_label: `${linkType}_${userLanguage}`,
          destination: destination,
          link_type: linkType,
          user_language: userLanguage,
          page_location: window.location.href,
          page_title: document.title,
          timestamp: timestamp,
          // Include UTM parameters
          ...utmParams,
          // Include any additional context
          ...additionalContext,
        })
      }
      
      // Track via GTM dataLayer for additional flexibility
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'exit_link_click',
          exit_link_type: linkType,
          exit_destination: destination,
          user_language: userLanguage,
          page_location: window.location.href,
          page_title: document.title,
          timestamp: timestamp,
          // Include UTM parameters
          ...utmParams,
          // Include any additional context
          ...additionalContext,
        })
      }
    }
  }, [getUTMParams])

  // Auto-track UTM parameters when the hook is used
  useEffect(() => {
    trackUTMCapture()
  }, [trackUTMCapture])

  return {
    trackEvent,
    trackPageView,
    trackUTMCapture,
    trackExitLink,
    getUTMParams,
  }
}
