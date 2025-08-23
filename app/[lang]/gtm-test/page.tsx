"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

declare global {
  interface Window {
    dataLayer: any[]
    loadGTM?: () => void
    loadGoogleAnalytics?: () => void
  }
}

export default function GTMTestPage() {
  const [dataLayerStatus, setDataLayerStatus] = useState<string>('Checking...')
  const [gtmStatus, setGtmStatus] = useState<string>('Checking...')
  const [consentStatus, setConsentStatus] = useState<string>('Checking...')
  const [dataLayerEvents, setDataLayerEvents] = useState<any[]>([])

  useEffect(() => {
    // Check dataLayer status
    if (typeof window !== 'undefined') {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        setDataLayerStatus('✅ Available')
        setDataLayerEvents([...window.dataLayer])
      } else {
        setDataLayerStatus('❌ Not available')
      }

      // Check consent status
      const consent = localStorage.getItem('cookie-consent')
      setConsentStatus(consent || 'Not set')

      // Check GTM functions
      if (window.loadGTM) {
        setGtmStatus('✅ Available')
      } else {
        setGtmStatus('❌ Not available')
      }
    }
  }, [])

  const testGTMLoading = () => {
    if (typeof window !== 'undefined' && window.loadGTM) {
      console.log('🧪 Testing GTM loading...')
      try {
        window.loadGTM()
        console.log('✅ GTM loading test initiated')
      } catch (error) {
        console.error('❌ GTM loading test failed:', error)
      }
    }
  }

  const testDataLayerPush = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('🧪 Testing dataLayer push...')
      try {
        const testEvent = {
          event: 'test_event',
          test_param: 'test_value',
          timestamp: Date.now()
        }
        window.dataLayer.push(testEvent)
        setDataLayerEvents([...window.dataLayer])
        console.log('✅ Test event pushed to dataLayer:', testEvent)
      } catch (error) {
        console.error('❌ dataLayer push test failed:', error)
      }
    }
  }

  const testPageView = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('🧪 Testing page view tracking...')
      try {
        // Send a test page view event
        const pageViewEvent = {
          event: 'page_view',
          page_location: window.location.href,
          page_title: document.title,
          page_referrer: document.referrer,
          test_mode: true,
          timestamp: Date.now()
        }
        window.dataLayer.push(pageViewEvent)
        
        // Also try gtag if available
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_referrer: document.referrer,
            test_mode: true
          })
        }
        
        setDataLayerEvents([...window.dataLayer])
        console.log('✅ Test page view sent:', pageViewEvent)
      } catch (error) {
        console.error('❌ Page view test failed:', error)
      }
    }
  }

  const testUTMParams = () => {
    // Simulate UTM parameters
    const testUrl = new URL(window.location.href)
    testUrl.searchParams.set('utm_source', 'test')
    testUrl.searchParams.set('utm_medium', 'test_medium')
    testUrl.searchParams.set('utm_campaign', 'test_campaign')
    
    // Update URL without reload
    window.history.pushState({}, '', testUrl.toString())
    
    // Trigger a custom event to test UTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'test_utm_tracking',
        utm_source: 'test',
        utm_medium: 'test_medium',
        utm_campaign: 'test_campaign',
        page_location: window.location.href,
        page_title: document.title
      })
      setDataLayerEvents([...window.dataLayer])
    }
    
    console.log('🧪 UTM test parameters added to URL and dataLayer')
  }

  const testGTMStatus = () => {
    if (typeof window !== 'undefined') {
      console.log('🧪 Testing GTM status...')
      
      // Check if GTM is loaded
      const gtmScript = document.querySelector('script[src*="googletagmanager.com"]')
      console.log('GTM Script element:', gtmScript)
      
      // Check dataLayer
      console.log('DataLayer:', window.dataLayer)
      console.log('DataLayer length:', window.dataLayer?.length)
      
      // Check for GTM functions
      console.log('loadGTM function:', typeof window.loadGTM)
      console.log('gtag function:', typeof window.gtag)
      
      // Check cookies
      const cookies = document.cookie.split(';').map(c => c.trim())
      console.log('Cookies:', cookies)
      
      // Check localStorage
      const consent = localStorage.getItem('cookie-consent')
      console.log('Cookie consent:', consent)
      
      console.log('✅ GTM status check complete')
    }
  }

  const clearDataLayer = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.length = 0
      setDataLayerEvents([])
      console.log('🧹 dataLayer cleared')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">GTM Integration Test Page</h1>
        <p className="text-muted-foreground">
          Use this page to test and debug your Google Tag Manager integration.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Status Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>Current status of GTM components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>DataLayer:</span>
              <Badge variant={dataLayerStatus.includes('✅') ? 'default' : 'destructive'}>
                {dataLayerStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>GTM Functions:</span>
              <Badge variant={gtmStatus.includes('✅') ? 'default' : 'destructive'}>
                {gtmStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Cookie Consent:</span>
              <Badge variant={consentStatus === 'all' ? 'default' : 'secondary'}>
                {consentStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Test Actions</CardTitle>
            <CardDescription>Test various GTM functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={testGTMLoading} className="w-full">
              Test GTM Loading
            </Button>
            <Button onClick={testDataLayerPush} variant="outline" className="w-full">
              Test DataLayer Push
            </Button>
            <Button onClick={testPageView} variant="outline" className="w-full">
              Test Page View
            </Button>
            <Button onClick={testUTMParams} variant="outline" className="w-full">
              Test UTM Parameters
            </Button>
            <Button onClick={testGTMStatus} variant="outline" className="w-full">
              Test GTM Status
            </Button>
            <Button onClick={clearDataLayer} variant="destructive" className="w-full">
              Clear DataLayer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* DataLayer Events */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>DataLayer Events</CardTitle>
          <CardDescription>
            Current events in the dataLayer ({dataLayerEvents.length} events)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dataLayerEvents.length === 0 ? (
            <p className="text-muted-foreground">No events in dataLayer</p>
          ) : (
            <div className="space-y-2">
              {dataLayerEvents.map((event, index) => (
                <div key={index} className="p-3 bg-muted rounded-md">
                  <pre className="text-xs overflow-x-auto">
                    {JSON.stringify(event, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold">1. Check Console</h4>
            <p className="text-sm text-muted-foreground">
              Open browser console to see detailed logs and any errors.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">2. Test UTM Parameters</h4>
            <p className="text-sm text-muted-foreground">
              Click "Test UTM Parameters" to simulate UTM tracking.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">3. Verify GTM</h4>
            <p className="text-sm text-muted-foreground">
              Check GTM Preview mode to see if events are firing.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">4. Check GA4</h4>
            <p className="text-sm text-muted-foreground">
              Verify events appear in Google Analytics real-time reports.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
