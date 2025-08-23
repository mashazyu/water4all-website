"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ButtonNew } from "@/components/ui/button-new"
import { Hero } from "@/components/ui/hero"
import { PageSection } from "@/components/ui/page-section"
import { PageLayout } from "@/components/ui/page-layout"
import { QuickHelpSection } from "@/components/ui/quick-help-section"
import { NewsSection } from "@/components/ui/news-section"
import { InfoTile } from "@/components/ui/info-tile"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Droplets, Waves } from "lucide-react"

interface HeroText {
  title: string
  subtitle: string
}

export default function HomePageClient() {
  const { language, translations } = useLanguage()
  const [showFAB, setShowFAB] = useState(false)

  // Get hero texts from translations
  const heroTexts: HeroText[] = translations?.map?.heroTexts || []

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



  return (
    <PageLayout>
      {/* Floating Action Button */}
      {showFAB && (
        <div className="fixed bottom-6 right-6 z-50 animate-float">
          <ButtonNew
            variant="action"
            size="lg"
            className="w-14 h-14 rounded-full shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </ButtonNew>
        </div>
      )}

      <div className="snap-y snap-mandatory">
        {/* Animated Hero Section */}
        <Hero 
          heroTexts={heroTexts}
          animated={true}
          className="min-h-screen py-20 md:py-20 lg:py-24"
          style={{ backgroundColor: "#1800ad" }}
        />

        {/* Project Overview Section */}
        <PageSection 
          background="white"
          fullHeight={true}
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
                <InfoTile
                  icon={<Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                  title={translations.home.subproject1Title}
                  subtitle=""
                  content={
                    <div className="flex flex-col">
                      <p className="text-muted-foreground leading-relaxed flex-1">
                        {translations.home.subproject1Description}
                      </p>
                      <div className="mt-8">
                        <Link href={`/${language}/map`}>
                          <ButtonNew variant="action" className="w-full">
                            {translations.home.learnMore}
                          </ButtonNew>
                        </Link>
                      </div>
                    </div>
                  }
                />

                {/* Installation Project Tile */}
                <InfoTile
                  icon={<Waves className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                  title={translations.home.subproject2Title}
                  subtitle=""
                  content={
                    <div className="flex flex-col">
                      <p className="text-muted-foreground leading-relaxed flex-1">
                        {translations.home.subproject2Description}
                      </p>
                      <div className="mt-8">
                        <Link href={`/${language}/installation`}>
                          <ButtonNew variant="action" className="w-full">
                            {translations.home.learnMore}
                          </ButtonNew>
                        </Link>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </PageSection>

        {/* Quick Help Section */}
        <QuickHelpSection background="default" />

        {/* Latest News Section */}
        <NewsSection background="muted" />
      </div>
    </PageLayout>
  )
}
