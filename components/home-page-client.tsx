"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import { PageSection } from "@/components/ui/page-section"
import { PageLayout } from "@/components/ui/page-layout"
import { QuickHelpSection } from "@/components/ui/quick-help-section"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Droplets, Waves } from "lucide-react"

interface HeroText {
  title: string
  subtitle: string
}

export default function HomePageClient() {
  const { language, translations } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [showFAB, setShowFAB] = useState(false)

  // Get hero texts from translations
  const heroTexts: HeroText[] = translations?.map?.heroTexts || []

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Show FAB after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowFAB(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Safety check for translations
  if (!translations || !translations.home) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">{translations.home.loadingTitle}</h2>
            <p className="text-muted-foreground">{translations.home.loadingText}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageLayout>
      {/* Floating Action Button */}
      {showFAB && (
        <div className="fixed bottom-6 right-6 z-50 animate-float">
          <Button
            variant="interactive"
            size="icon"
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </Button>
        </div>
      )}

      <div className="snap-y snap-mandatory">
        {/* Animated Hero Section */}
        <Hero 
          heroTexts={heroTexts}
          animated={true}
          className="snap-start min-h-screen py-20 md:py-20 lg:py-24"
          style={{ backgroundColor: "#1800ad" }}
        />

        {/* Project Overview Section */}
        <PageSection 
          background="white"
          fullHeight={true}
          className="snap-start"
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Section Header */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  {translations.home.projectTitle}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {translations.home.projectIntro}
                </p>
              </div>

              {/* Project Tiles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
                {/* Map Project Tile */}
                <div className="group relative overflow-hidden bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {translations.home.subproject1Title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {translations.home.subproject1Description}
                        </p>
                      </div>
                    </div>
                    <Link href={`/${language}/map`}>
                      <Button variant="outline" className="w-full">
                        {translations.home.learnMore}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Installation Project Tile */}
                <div className="group relative overflow-hidden bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {translations.home.subproject2Title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {translations.home.subproject2Description}
                        </p>
                      </div>
                    </div>
                    <Link href={`/${language}/installation`}>
                      <Button variant="outline" className="w-full">
                        {translations.home.learnMore}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Quick Help Section */}
        <QuickHelpSection background="default" className="snap-start" />

        {/* Latest News Section */}
        <PageSection 
          titleSize="lg"
          accentLineHeight="h-8"
          background="muted"
          fullHeight={true}
          className="snap-start"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Section Header */}
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                <span className="text-primary">
                  {translations.home.latestNews}
                </span>
              </h2>
            </div>
            
            <div className="group">
              <NewsGrid limit={3} showViewAllButton={true} />
            </div>
          </div>
        </PageSection>
      </div>
    </PageLayout>
  )
}
