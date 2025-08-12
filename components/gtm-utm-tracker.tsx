"use client"

import { useEffect } from 'react'
import { UTM_PARAMETERS, extractUTMParams, UTMParams } from '../lib/utm-config'

export default function GTMUTMTracker() {
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
      
      // Debug logging
      if (Object.keys(utmParams).length > 0) {
        console.log('🔍 UTM Parameters found in URL:', utmParams)
      }
      
      return utmParams
    }

    // Function to send UTM parameters to GTM
    const sendUTMParamsToGTM = (utmParams: UTMParams) => {
      if (typeof window === "undefined" || !window.dataLayer) return
      
      if (Object.keys(utmParams).length > 0) {
        console.log('📊 Sending UTM parameters to Google Tag Manager:', utmParams)
        
        // Send UTM parameters to GTM dataLayer
        window.dataLayer.push({
          event: 'utm_parameters_received',
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
        
        // Also send as a page view event with UTM parameters
        window.dataLayer.push({
          event: 'page_view',
          page_location: window.location.href,
          page_title: document.title,
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
          utm_term: utmParams.utm_term || '',
          utm_content: utmParams.utm_content || ''
        })
        
        // Store UTM parameters in localStorage for persistence
        localStorage.setItem('utm_params', JSON.stringify(utmParams))
        console.log('✅ UTM parameters sent to GTM and stored locally')
      }
    }

    // Check for UTM parameters on page load
    const utmParams = extractUTMParamsFromURL()
    if (Object.keys(utmParams).length > 0) {
      // Wait for GTM to be fully loaded
      setTimeout(() => {
        sendUTMParamsToGTM(utmParams)
      }, 1000)
    } else {
      // Check if we have stored UTM parameters from previous page
      const storedUTMParams = localStorage.getItem('utm_params')
      if (storedUTMParams) {
        try {
          const parsed = JSON.parse(storedUTMParams)
          if (Object.keys(parsed).length > 0) {
            setTimeout(() => {
              sendUTMParamsToGTM(parsed)
            }, 1000)
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
        setTimeout(() => {
          sendUTMParamsToGTM(newUTMParams)
        }, 1000)
      }
    }

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      const newUTMParams = extractUTMParamsFromURL()
      if (Object.keys(newUTMParams).length > 0) {
        setTimeout(() => {
          sendUTMParamsToGTM(newUTMParams)
        }, 1000)
      }
    }

    // Cleanup function
    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  return null // This component doesn't render anything
}
