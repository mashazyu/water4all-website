"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, RefreshCw, Eye, EyeOff } from 'lucide-react'

declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
  }
}

export default function GTMDebug() {
  const [isVisible, setIsVisible] = useState(false)
  const [dataLayerEvents, setDataLayerEvents] = useState<any[]>([])
  const [gtmStatus, setGtmStatus] = useState<string>('Checking...')
  const [consentStatus, setConsentStatus] = useState<string>('Checking...')

  useEffect(() => {
    if (!isVisible) return

    // Check GTM status
    if (typeof window !== 'undefined') {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        setGtmStatus('✅ Available')
        setDataLayerEvents([...window.dataLayer])
      } else {
        setGtmStatus('❌ Not available')
      }

      // Check consent status
      const consent = localStorage.getItem('cookie-consent')
      setConsentStatus(consent || 'Not set')
    }

    // Monitor dataLayer changes
    const originalPush = Array.prototype.push
    if (typeof window !== 'undefined' && window.dataLayer) {
      Array.prototype.push = function(...args) {
        const result = originalPush.apply(this, args)
        if (this === window.dataLayer) {
          setDataLayerEvents([...window.dataLayer])
        }
        return result
      }
    }

    return () => {
      Array.prototype.push = originalPush
    }
  }, [isVisible])

  const clearDataLayer = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.length = 0
      setDataLayerEvents([])
    }
  }

  const refreshStatus = () => {
    if (typeof window !== 'undefined') {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        setGtmStatus('✅ Available')
        setDataLayerEvents([...window.dataLayer])
      } else {
        setGtmStatus('❌ Not available')
      }

      const consent = localStorage.getItem('cookie-consent')
      setConsentStatus(consent || 'Not set')
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          Show GTM Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-h-96 bg-background border border-border rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-semibold text-sm">GTM Debug Panel</h3>
        <div className="flex items-center gap-2">
          <Button
            onClick={refreshStatus}
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
          <Button
            onClick={() => setIsVisible(false)}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="p-3 space-y-3 max-h-80 overflow-y-auto">
        {/* Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>GTM Status:</span>
            <Badge variant={gtmStatus.includes('✅') ? 'default' : 'destructive'}>
              {gtmStatus}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Consent:</span>
            <Badge variant={consentStatus === 'all' ? 'default' : 'secondary'}>
              {consentStatus}
            </Badge>
          </div>
        </div>

        {/* DataLayer Events */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">DataLayer Events ({dataLayerEvents.length})</span>
            <Button
              onClick={clearDataLayer}
              size="sm"
              variant="outline"
              className="h-6 text-xs"
            >
              Clear
            </Button>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {dataLayerEvents.length === 0 ? (
              <p className="text-xs text-muted-foreground">No events</p>
            ) : (
              dataLayerEvents.map((event, index) => (
                <div key={index} className="p-2 bg-muted rounded text-xs">
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(event, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
