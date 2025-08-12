"use client"

import { useEffect } from 'react'

export default function GTMUTMTracker() {
  useEffect(() => {
    // Function to extract UTM parameters from URL
    const extractUTMParams = () => {
      if (typeof window === "undefined") return {}
      
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams: Record<string, string> = {}
      
      // Standard UTM parameters
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      
      utmKeys.forEach(key => {
        const value = urlParams.get(key)
        if (value) {
          utmParams[key] = value
        }
      })
      
      // Debug logging
      if (Object.keys(utmParams).length > 0) {
        console.log('🔍 UTM Parameters found in URL:', utmParams)
      }
      
      return utmParams
    }

    // Function to send UTM parameters to GTM following official Google documentation
    const sendUTMParamsToGTM = (utmParams: Record<string, string>) => {
      if (typeof window === "undefined" || !window.dataLayer) return
      
      if (Object.keys(utmParams).length > 0) {
        console.log('📊 Sending UTM parameters to Google Tag Manager:', utmParams)
        
        // Method 1: Send UTM parameters as a custom event (following Google's recommendation)
        window.dataLayer.push({
          event: 'custom_utm_tracking',
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || '',
          page_location: window.location.href,
          page_title: document.title,
          timestamp: Date.now()
        })
        
        // Method 2: Send as page_view event with UTM parameters (standard GA4 approach)
        window.dataLayer.push({
          event: 'page_view',
          page_location: window.location.href,
          page_title: document.title,
          page_referrer: document.referrer,
          // Include UTM parameters directly in the event
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
        
        // Method 3: Set UTM parameters as user properties (for GA4 user-level tracking)
        window.dataLayer.push({
          event: 'set_user_properties',
          user_properties: {
            utm_source: utmParams.utm_source || '',
            utm_medium: utmParams.utm_medium || '',
            utm_campaign: utmParams.utm_campaign || '',
            utm_term: utmParams.utm_term || '',
            utm_content: utmParams.utm_content || ''
          }
        })
        
        // Store UTM parameters in localStorage for persistence across page navigation
        localStorage.setItem('utm_params', JSON.stringify(utmParams))
        console.log('✅ UTM parameters sent to GTM via multiple methods following Google documentation')
      }
    }

    // Function to wait for GTM to be ready
    const waitForGTM = (callback: () => void, maxWait = 5000) => {
      const startTime = Date.now()
      
      const checkGTM = () => {
        if (typeof window !== "undefined" && window.dataLayer) {
          callback()
        } else if (Date.now() - startTime < maxWait) {
          setTimeout(checkGTM, 100)
        } else {
          console.warn('GTM not ready after', maxWait, 'ms, proceeding anyway')
          callback()
        }
      }
      
      checkGTM()
    }

    // Check for UTM parameters on page load
    const utmParams = extractUTMParams()
    if (Object.keys(utmParams).length > 0) {
      // Wait for GTM to be fully loaded (following Google's recommendation)
      waitForGTM(() => {
        sendUTMParamsToGTM(utmParams)
      })
    } else {
      // Check if we have stored UTM parameters from previous page
      const storedUTMParams = localStorage.getItem('utm_params')
      if (storedUTMParams) {
        try {
          const parsed = JSON.parse(storedUTMParams)
          if (Object.keys(parsed).length > 0) {
            waitForGTM(() => {
              sendUTMParamsToGTM(parsed)
            })
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
      const newUTMParams = extractUTMParams()
      if (Object.keys(newUTMParams).length > 0) {
        waitForGTM(() => {
          sendUTMParamsToGTM(newUTMParams)
        })
      }
    }

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      const newUTMParams = extractUTMParams()
      if (Object.keys(newUTMParams).length > 0) {
        waitForGTM(() => {
          sendUTMParamsToGTM(newUTMParams)
        })
      }
    }

    // Listen for popstate events (browser back/forward)
    const handlePopState = () => {
      const newUTMParams = extractUTMParams()
      if (Object.keys(newUTMParams).length > 0) {
        waitForGTM(() => {
          sendUTMParamsToGTM(newUTMParams)
        })
      }
    }

    window.addEventListener('popstate', handlePopState)

    // Cleanup function
    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return null // This component doesn't render anything
}
