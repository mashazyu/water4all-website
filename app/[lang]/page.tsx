"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import { PageSection } from "@/components/ui/page-section"
import { PageLayout } from "@/components/ui/page-layout"
import Link from "next/link"
import { useState, useEffect } from "react"

interface HeroText {
  title: string
  subtitle: string
}

export default function HomePage() {
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
          className="snap-start min-h-screen py-8 md:py-12 lg:py-16"
          style={{ backgroundColor: "#1800ad" }}
        />

        {/* Project Overview Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="space-y-8">
              <div className="space-y-4 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {translations.home.projectTitle}
                </h1>
                <div className="max-w-4xl space-y-3">
                  <p className="text-lg text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
                    {translations.home.projectIntro}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow border border-border flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">{translations.home.subproject1Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{translations.home.subproject1Description}</p>
                    <div className="mt-auto">
                      <a 
                        href={`/${language}/map`}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-center py-3 px-4 rounded-lg font-medium transition-colors duration-300 block"
                      >
                        {translations.home.learnMore}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border border-border flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">{translations.home.subproject2Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{translations.home.subproject2Description}</p>
                    <div className="mt-auto">
                      <a 
                        href={`/${language}/installation`}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-center py-3 px-4 rounded-lg font-medium transition-colors duration-300 block"
                      >
                        {translations.home.learnMore}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <PageSection 
          titleSize="lg"
          accentLineHeight="h-8"
          background="default"
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
