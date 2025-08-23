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
      
      return utmParams
    }

    // Function to send UTM parameters to GTM and GA4
    const sendUTMParamsToGTM = (utmParams: Record<string, string>) => {
      if (typeof window === "undefined" || !window.dataLayer) return
      
      if (Object.keys(utmParams).length > 0) {
        // Send UTM parameters as a custom event to GTM
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
        
        // Send as page_view event with UTM parameters to GTM
        window.dataLayer.push({
          event: 'page_view',
          page_location: window.location.href,
          page_title: document.title,
          page_referrer: document.referrer,
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
        
        // Also send UTM parameters directly to GA4 via gtag
        if (window.gtag) {
          try {
            window.gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_referrer: document.referrer,
              utm_source: utmParams.utm_source || '',
              utm_medium: utmParams.utm_medium || '',
              utm_campaign: utmParams.utm_campaign || '',
              utm_term: utmParams.utm_term || '',
              utm_content: utmParams.utm_content || ''
            })
          } catch (error) {
            // Silently fail if gtag is not properly configured
          }
        }
        
        // Store UTM parameters in localStorage for persistence
        localStorage.setItem('utm_params', JSON.stringify(utmParams))
      }
    }

    // Function to send a standard page view
    const sendPageView = () => {
      if (typeof window === "undefined" || !window.dataLayer) return
      
      // Send to GTM dataLayer
      window.dataLayer.push({
        event: 'page_view',
        page_location: window.location.href,
        page_title: document.title,
        page_referrer: document.referrer,
        timestamp: Date.now()
      })
      
      // Also send via gtag to GA4
      if (window.gtag) {
        try {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_referrer: document.referrer
          })
        } catch (error) {
          // Silently fail if gtag is not properly configured
        }
      }
    }

    // Check for UTM parameters on page load
    const utmParams = extractUTMParams()
    if (Object.keys(utmParams).length > 0) {
      sendUTMParamsToGTM(utmParams)
      sendPageView()
    } else {
      // Check if we have stored UTM parameters from previous page
      const storedUTMParams = localStorage.getItem('utm_params')
      if (storedUTMParams) {
        try {
          const parsed = JSON.parse(storedUTMParams)
          if (Object.keys(parsed).length > 0) {
            sendUTMParamsToGTM(parsed)
            sendPageView()
          } else {
            sendPageView()
          }
        } catch (e) {
          sendPageView()
        }
      } else {
        sendPageView()
      }
    }

    // Override History API to detect URL changes
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      const newUTMParams = extractUTMParams()
      if (Object.keys(newUTMParams).length > 0) {
        sendUTMParamsToGTM(newUTMParams)
        sendPageView()
      } else {
        sendPageView()
      }
    }

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      const newUTMParams = extractUTMParams()
      if (Object.keys(newUTMParams).length > 0) {
        sendUTMParamsToGTM(newUTMParams)
        sendPageView()
      } else {
        sendPageView()
      }
    }

    // Listen for popstate events
    const handlePopState = () => {
      const newUTMParams = extractUTMParams()
      if (Object.keys(newUTMParams).length > 0) {
        sendUTMParamsToGTM(newUTMParams)
        sendPageView()
      } else {
        sendPageView()
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

  return null
}
