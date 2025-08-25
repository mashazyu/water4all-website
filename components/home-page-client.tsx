"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ButtonNew } from "@/components/ui/button-new"
import { Hero } from "@/components/ui/hero"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { PageSectionWithContent } from "@/components/ui/page-section"
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
        <PageSectionWithContent 
          background="white"
          title={translations.home.projectTitle}
          subtitle={translations.home.projectIntro}
        >
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
        </PageSectionWithContent>



        {/* Latest News Section */}
        <NewsSection background="muted" />
      </div>
    </PageLayout>
  )
}
