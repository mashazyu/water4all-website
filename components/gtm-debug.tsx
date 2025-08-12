"use client"

import { useEffect, useState } from 'react'

export default function GTMDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const checkGTMStatus = () => {
      const info: any = {
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : 'N/A',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'N/A',
        cookieConsent: typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') : 'N/A'
      }

      // Check GTM status
      if (typeof window !== 'undefined') {
        info.gtmLoaded = !!window.dataLayer
        info.dataLayerLength = window.dataLayer?.length || 0
        info.dataLayerContent = window.dataLayer || []
        
        // Check for UTM parameters
        const urlParams = new URLSearchParams(window.location.search)
        info.utmSource = urlParams.get('utm_source')
        info.utmMedium = urlParams.get('utm_medium')
        info.utmCampaign = urlParams.get('utm_campaign')
        
        // Check if gtag is available (GA4)
        info.gtagAvailable = typeof window.gtag !== 'undefined'
        
        // Check for any blocked requests
        info.blockedRequests = []
        if (typeof window !== 'undefined') {
          const originalFetch = window.fetch
          window.fetch = function(...args) {
            info.blockedRequests.push(args[0])
            return originalFetch.apply(this, args)
          }
        }
      }

      setDebugInfo(info)
      console.log('🔍 GTM Debug Info:', info)
    }

    // Check immediately
    checkGTMStatus()
    
    // Check after a delay
    setTimeout(checkGTMStatus, 2000)
    setTimeout(checkGTMStatus, 5000)
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md">
      <h3 className="text-sm font-bold mb-2">🔍 GTM Debug Panel</h3>
      <div className="text-xs space-y-1">
        <div><strong>GTM Loaded:</strong> {debugInfo.gtmLoaded ? '✅' : '❌'}</div>
        <div><strong>DataLayer Length:</strong> {debugInfo.dataLayerLength}</div>
        <div><strong>Cookie Consent:</strong> {debugInfo.cookieConsent}</div>
        <div><strong>GA4 (gtag):</strong> {debugInfo.gtagAvailable ? '✅' : '❌'}</div>
        <div><strong>UTM Source:</strong> {debugInfo.utmSource || 'None'}</div>
        <div><strong>UTM Medium:</strong> {debugInfo.utmMedium || 'None'}</div>
        <div><strong>UTM Campaign:</strong> {debugInfo.utmCampaign || 'None'}</div>
        <div><strong>URL:</strong> {debugInfo.url}</div>
        <div><strong>Timestamp:</strong> {debugInfo.timestamp}</div>
      </div>
      
      <div className="mt-2">
        <button 
          onClick={() => {
            if (typeof window !== 'undefined' && window.dataLayer) {
              window.dataLayer.push({
                event: 'debug_test_event',
                debug_info: debugInfo
              })
              console.log('🧪 Debug test event sent to GTM')
            }
          }}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Send Test Event
        </button>
        
        <button 
          onClick={() => {
            if (typeof window !== 'undefined' && window.dataLayer) {
              // Test if we can manually trigger GA4
              window.dataLayer.push({
                event: 'page_view',
                page_location: window.location.href,
                page_title: document.title,
                test_ga4: true
              })
              console.log('🧪 GA4 test page_view event sent to GTM')
            }
          }}
          className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 ml-2"
        >
          Test GA4 Event
        </button>
      </div>
    </div>
  )
}
