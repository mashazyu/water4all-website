"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "./ui/button"
import { X } from "lucide-react"

export default function CookieConsent() {
  const { translations } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("cookie-consent")
    if (!hasConsent) {
      setShowBanner(true)
    } else {
      setConsentGiven(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setConsentGiven(true)
    
    // Enable analytics via GTM
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
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setConsentGiven(true)
    
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
    localStorage.removeItem("cookie-consent")
    localStorage.removeItem("cookie-consent-date")
    setShowBanner(true)
    setConsentGiven(false)
  }

  if (!showBanner && consentGiven) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={updateConsent}
          variant="outline"
          size="sm"
          className="bg-background/90 backdrop-blur-sm border-border hover:bg-background"
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
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {translations.cookieConsent.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {translations.cookieConsent.description}
                  <a 
                    href="/cookies" 
                    className="text-primary hover:text-secondary underline ml-1"
                  >
                    {translations.cookieConsent.learnMore}
                  </a>
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {translations.cookieConsent.acceptAll}
                  </Button>
                  <Button
                    onClick={acceptEssential}
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                  >
                    {translations.cookieConsent.essentialOnly}
                  </Button>
                  <Button
                    onClick={decline}
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted text-muted-foreground"
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
