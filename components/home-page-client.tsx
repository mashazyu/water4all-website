"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ButtonNew } from "@/components/ui/button-new"
import { Hero } from "@/components/ui/hero"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { NewsSection } from "@/components/ui/news-section"
import { InfoTile } from "@/components/ui/info-tile"
import Link from "next/link"
import { Droplets, Waves } from "lucide-react"

interface HeroText {
  title: string
  subtitle: string
}

export default function HomePageClient() {
  const { language, translations } = useLanguage()

  // Get hero texts from translations
  const heroTexts: HeroText[] = translations?.map?.heroTexts || []

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

      <div className="snap-y snap-mandatory">
        {/* Animated Hero Section */}
        <Hero 
          heroTexts={heroTexts}
          animated={true}
          className="min-h-screen py-20 md:py-20 lg:py-24"
          style={{ backgroundColor: "#1800ad" }}
        />

        {/* Project Overview Section */}
        <FullScreenSection background="white">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Map Project Tile */}
                <InfoTile
                  icon={<Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                  title={translations.home.subproject1Title}
                  subtitle=""
                  content={
                    <div className="flex flex-col h-full justify-between">
                      <p className="text-muted-foreground leading-relaxed">
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
                    <div className="flex flex-col h-full justify-between">
                      <p className="text-muted-foreground leading-relaxed">
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
        </FullScreenSection>



        {/* Latest News Section */}
        <NewsSection background="muted" />
      </div>
    </PageLayout>
  )
}
