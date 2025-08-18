"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import Link from "next/link"

interface HeroText {
  title: string
  subtitle: string
}

export default function HomePage() {
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
    <div className="h-screen overflow-y-scroll scroll-smooth">
      <div className="snap-y snap-mandatory">
        {/* Animated Hero Section */}
        <Hero 
          heroTexts={heroTexts}
          animated={true}
          className="snap-start min-h-screen py-8 md:py-12 lg:py-16"
          style={{ backgroundColor: "#1800ad" }}
        />

        {/* Project Overview Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-screen flex items-center justify-center bg-white py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground">{translations.home.projectTitle}</h1>
                <div className="max-w-4xl space-y-3">
                  <p className="text-lg text-muted-foreground leading-relaxed">{translations.home.projectIntro}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow border border-border flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">{translations.home.subproject1Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{translations.home.subproject1Description}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href={`/${language}/map`}>
                        {translations.home.learnMore}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border border-border flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">{translations.home.subproject2Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{translations.home.subproject2Description}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href={`/${language}/map`}>
                        {translations.home.learnMore}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-screen flex items-center justify-center bg-muted py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="space-y-6">
              <div className="border-b border-border pb-2">
                <h2 className="text-2xl font-semibold text-foreground">{translations.home.latestNews}</h2>
              </div>
              <NewsGrid limit={3} showViewAllButton={true} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
