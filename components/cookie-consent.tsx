"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "./ui/button"
import { X } from "lucide-react"

declare global {
  interface Window {
    loadGTM?: () => void
    loadGoogleAnalytics?: () => void
    createAnalyticsCookies?: () => void
  }
}

export default function CookieConsent() {
  const { translations } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Function to remove analytics cookies
  const removeAnalyticsCookies = () => {
    if (typeof window !== "undefined") {
      // Remove Google Analytics cookies
      const cookiesToRemove = [
        '_ga',
        '_gid',
        '_gat'
      ]
      
      // Remove cookies by setting them to expire in the past
      cookiesToRemove.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      })
      
      // Remove GTM-specific cookies (replace with your actual GTM ID)
      const gtmCookies = [
        '_ga_GTMKQG89G74' // Your GTM container ID
      ]
      
      gtmCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      })
      
      // Also remove any other analytics-related cookies
      const allCookies = document.cookie.split(';')
      allCookies.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim()
        if (cookieName && (cookieName.includes('analytics') || cookieName.includes('gtm'))) {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        }
      })
      

    }
  }



  // Function to remove ALL cookies (for decline option)
  const removeAllCookies = () => {
    if (typeof window !== "undefined") {
      // Get all cookies from current domain
      const allCookies = document.cookie.split(';')
      
      // Remove each cookie by setting it to expire in the past
      allCookies.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim()
        if (cookieName) {
          // Remove cookie from current domain
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        }
      })
      
      // Also try to remove common cross-domain cookies
      const commonCrossDomainCookies = [
        '_ga', '_gid', '_gat', '_ga_GTMKQG89G74',
        'NID', 'SID', 'HSID', 'SSID', 'APISID', 'SAPISID',
        '__Secure-1PSID', '__Secure-3PSID', '__Secure-1PAPISID', '__Secure-3PAPISID',
        '1P_JAR', 'AEC', 'OTZ'
      ]
      
      commonCrossDomainCookies.forEach(cookieName => {
        // Try to remove from various domains and paths
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.google.com`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=google.com`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.google.de`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=google.de`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.google.co.uk`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=google.co.uk`
      })
      

    }
  }





  // Function to ensure essential cookies are set
  const ensureEssentialCookies = () => {
    if (typeof window !== "undefined") {
      // Set sidebar state cookie if it doesn't exist (default to expanded)
      const sidebarCookie = document.cookie.split(';').find(cookie => 
        cookie.trim().startsWith('sidebar:state=')
      )
      
      if (!sidebarCookie) {
        document.cookie = `sidebar:state=true; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      }
      
      // Set language cookie if it doesn't exist
      const language = localStorage.getItem('language') || 'en'
      const languageCookie = document.cookie.split(';').find(cookie => 
        cookie.trim().startsWith('language=')
      )
      
      if (!languageCookie) {
        document.cookie = `language=${language}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year
      }
    }
  }

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("cookie-consent")
    if (!hasConsent) {
      // No consent given yet, show banner
      setShowBanner(true)
      setConsentGiven(false)
    } else {
      // User already made a choice, don't show banner
      setShowBanner(false)
      setConsentGiven(true)
      
      // If user didn't consent to analytics, ensure cookies are removed
      if (hasConsent !== 'all') {
        removeAnalyticsCookies()
      }
    }
    setIsInitialized(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setConsentGiven(true)
    
    // Enable Google Analytics via gtag
    if (typeof window !== "undefined" && window.gtag) {
      // @ts-ignore - gtag consent API
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted"
      })
    }
    
    // Enable analytics via GTM dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_update',
        consent_type: 'all',
        analytics_storage: 'granted',
        ad_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted'
      })
    }
    
    // Send a page view event to confirm tracking is working
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_referrer: document.referrer
      })
    }
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setConsentGiven(true)
    
    // Disable Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      // @ts-ignore - gtag consent API
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted"
      })
    }
    
    // Disable analytics via GTM
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_update',
        consent_type: 'essential',
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted'
      })
    }
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setConsentGiven(true)
    
    // Disable Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      // @ts-ignore - gtag consent API
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted"
      })
    }
    
    // Disable analytics via GTM
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_update',
        consent_type: 'declined',
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted'
      })
    }
  }

  const updateConsent = () => {
    // Remove existing consent
    localStorage.removeItem("cookie-consent")
    localStorage.removeItem("cookie-consent-date")
    
    // Remove all cookies when updating consent
    removeAllCookies()
    
    setShowBanner(true)
    setConsentGiven(false)
  }

  // Don't render anything until we've checked localStorage
  if (!isInitialized) {
    return null
  }

  if (!showBanner && consentGiven) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]">
        <Button
          onClick={updateConsent}
          variant="outline"
          size="sm"
          className="bg-background/90 backdrop-blur-sm border-border hover:bg-background text-xs sm:text-sm whitespace-nowrap"
        >
          {translations.cookieConsent.updatePreferences}
        </Button>
      </div>
    )
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-medium text-foreground mb-1">
                  {translations.cookieConsent.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  {translations.cookieConsent.description}
                  <a 
                    href="/cookies" 
                    className="text-primary hover:text-secondary underline ml-1"
                  >
                    {translations.cookieConsent.learnMore}
                  </a>
                </p>
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm"
                  >
                    {translations.cookieConsent.acceptAll}
                  </Button>
                  <Button
                    onClick={acceptEssential}
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted text-xs sm:text-sm"
                  >
                    {translations.cookieConsent.essentialOnly}
                  </Button>
                  <Button
                    onClick={decline}
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted text-muted-foreground text-xs sm:text-sm"
                  >
                    {translations.cookieConsent.decline}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={decline}
            variant="ghost"
            size="sm"
            className="flex-shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
