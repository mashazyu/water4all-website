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
    
    // Enable Google Analytics
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
          className="bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white"
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {translations.cookieConsent.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {translations.cookieConsent.description}
                  <a 
                    href="/cookies" 
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                  >
                    {translations.cookieConsent.learnMore}
                  </a>
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {translations.cookieConsent.acceptAll}
                  </Button>
                  <Button
                    onClick={acceptEssential}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    {translations.cookieConsent.essentialOnly}
                  </Button>
                  <Button
                    onClick={decline}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50 text-gray-600"
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
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
