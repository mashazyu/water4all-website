"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

interface HeroText {
  title: string
  subtitle: string
}

export default function HomePage() {
  const { language, translations } = useLanguage()
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // Get hero texts from translations
  const heroTexts: HeroText[] = translations?.map?.heroTexts || []

  // Auto-rotate hero texts every 4 seconds
  useEffect(() => {
    if (heroTexts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        prevIndex === heroTexts.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [heroTexts.length])

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth">
      <div className="snap-y snap-mandatory">
        {/* Animated Hero Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen flex items-center justify-center" style={{ backgroundColor: "#1800ad" }}>
          <div className="max-w-3xl mx-auto text-center">
            {heroTexts.length > 0 && (
              <>
                <h1 className="text-7xl md:text-9xl font-black mb-8 text-white tracking-tight leading-none transition-all duration-1000 ease-in-out">
                  {heroTexts[currentTextIndex]?.title}
                </h1>
                <div className="w-32 h-1 bg-white mx-auto mb-8 transition-all duration-1000 ease-in-out"></div>
                <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto transition-all duration-1000 ease-in-out">
                  {heroTexts[currentTextIndex]?.subtitle}
                </p>
                
                {/* Text rotation indicator dots */}
                {heroTexts.length > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {heroTexts.map((_: HeroText, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTextIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTextIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to hero text ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Project Overview Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen flex items-center justify-center bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground">{translations.home.projectTitle}</h1>
                <div className="max-w-4xl space-y-3">
                  <p className="text-lg text-muted-foreground leading-relaxed">{translations.home.projectIntro}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow border border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">{translations.home.subproject1Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{translations.home.subproject1Description}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href={`/${language}/map`}>
                        {translations.home.learnMore}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">{translations.home.subproject2Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen flex items-center justify-center bg-muted">
          <div className="max-w-4xl mx-auto px-4">
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
