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
        
        // Initialize with UTM parameter mapping and custom dimensions
        window.gtag('config', measurementId, {
          send_page_view: true,
          // GA4 specific configuration for UTM tracking
          allow_google_signals: true,
          allow_ad_personalization_signals: false,
          // Custom parameters for UTM tracking
          custom_parameter_utm_source: '',
          custom_parameter_utm_medium: '',
          custom_parameter_utm_campaign: '',
          custom_parameter_utm_term: '',
          custom_parameter_utm_content: ''
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

    // Function to set UTM parameters in gtag and track them
    const setUTMParams = (utmParams: UTMParams) => {
      if (typeof window === "undefined" || !window.gtag) return
      
      if (Object.keys(utmParams).length > 0) {
        localStorage.setItem('utm_params', JSON.stringify(utmParams))
        
        // Method 1: Send UTM parameters as a custom event
        window.gtag('event', 'utm_parameters_received', {
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
        
        // Method 2: Send as page_view event with UTM parameters
        window.gtag('event', 'page_view', {
          page_location: window.location.href,
          page_title: document.title,
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
        
        // Method 3: Set as user properties
        window.gtag('set', 'user_properties', {
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
        
        // Method 4: Send as a standard GA4 event that will definitely show up
        window.gtag('event', 'select_content', {
          content_type: 'utm_tracking',
          item_id: 'utm_source_' + (utmParams.utm_source || 'none'),
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
      }
    }

    // Check for UTM parameters on page load
    const utmParams = extractUTMParamsFromURL()
    if (Object.keys(utmParams).length > 0) {
      // Wait for GA4 to be fully initialized before sending UTM parameters
      setTimeout(() => {
        setUTMParams(utmParams)
      }, 2000) // Wait 2 seconds for GA4 to initialize
    } else {
      // Check if we have stored UTM parameters from previous page
      const storedUTMParams = localStorage.getItem('utm_params')
      if (storedUTMParams) {
        try {
          const parsed = JSON.parse(storedUTMParams)
          if (Object.keys(parsed).length > 0) {
            setTimeout(() => {
              setUTMParams(parsed)
            }, 2000)
          }
        } catch (e) {
          console.warn('Failed to parse stored UTM parameters:', e)
        }
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
