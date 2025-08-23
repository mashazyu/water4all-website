"use client"

import { useLanguage } from "@/components/language-provider"
import { FullScreenSection } from "@/components/ui/page-layout"
import { MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { InfoTile } from "@/components/ui/info-tile"

interface QuickHelpSectionProps {
  background?: "default" | "white" | "muted"
  className?: string
}

export function QuickHelpSection({ 
  background = "muted", 
  className = "" 
}: QuickHelpSectionProps) {
  const { language, translations } = useLanguage()

  return (
    <FullScreenSection background={background} className={cn("!p-0", className)}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full space-y-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            <span className="text-primary">
              {translations.map.quickHelpTitle}
            </span>
          </h2>
        </div>
        
        {/* Feature Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* What You Get Tile */}
              <InfoTile
                icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                title={translations.map.whatYouGetTitle}
                subtitle={translations.map.waterSourceGuide}
                content={
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="text-primary mr-3 flex-shrink-0 text-lg">•</span>
                      <span className="leading-relaxed">{translations.map.mapFeatures}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-3 flex-shrink-0 text-lg">•</span>
                      <span className="leading-relaxed">{translations.map.betaTesting}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-3 flex-shrink-0 text-lg">•</span>
                      <span className="leading-relaxed">{translations.map.freeToUse}</span>
                    </li>
                  </ul>
                }
              />

              {/* Quick Answers Tile */}
              <InfoTile
                icon={<Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                title={translations.map.quickAnswersTitle}
                subtitle={translations.map.commonQuestionsSubtitle}
                content={
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="text-primary mr-3 flex-shrink-0 text-lg">•</span>
                      <a href={`/${language}/faq#faq11`} className="text-primary hover:text-secondary underline leading-relaxed">
                        {translations.faq.questions.find(q => q.id === "faq3")?.question || ""}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-3 flex-shrink-0 text-lg">•</span>
                      <a href={`/${language}/faq#faq5`} className="text-primary hover:text-secondary underline leading-relaxed">
                        {translations.faq.questions.find(q => q.id === "faq10")?.question || ""}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-3 flex-shrink-0 text-lg">•</span>
                      <a href={`/${language}/faq#faq8`} className="text-primary hover:text-secondary underline leading-relaxed">
                        {translations.faq.questions.find(q => q.id === "faq9")?.question || ""}
                      </a>
                    </li>
                  </ul>
                }
              />
        </div>
      </div>
    </FullScreenSection>
  )
}
