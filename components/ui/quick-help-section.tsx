"use client"

import { useLanguage } from "@/components/language-provider"
import { PageSection } from "@/components/ui/page-section"
import { MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <PageSection 
      titleSize="lg"
      accentLineHeight="h-8"
      background={background}
      fullHeight={true}
      className={cn("!p-0", className)}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Section Header */}
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                <span className="text-primary">
                  {translations.map.quickHelpTitle}
                </span>
              </h2>
            </div>
            
            {/* Feature Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* What You Get Tile */}
              <div className="group relative overflow-hidden bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {translations.map.whatYouGetTitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {translations.map.mapFeatures}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="text-primary mr-2 flex-shrink-0">•</span>
                      <span>{translations.map.freeToUse}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2 flex-shrink-0">•</span>
                      <span>{translations.map.betaTesting}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2 flex-shrink-0">•</span>
                      <span>{translations.map.waterSourceGuide}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick Answers Tile */}
              <div className="group relative overflow-hidden bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {translations.map.quickAnswersTitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {translations.map.commonQuestionsSubtitle}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-1 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <span className="text-primary mr-2 flex-shrink-0">•</span>
                      <a href={`/${language}/faq#faq3`} className="text-primary hover:text-secondary underline">
                        {translations.faq.questions.find(q => q.id === "faq3")?.question || ""}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2 flex-shrink-0">•</span>
                      <a href={`/${language}/faq#faq10`} className="text-primary hover:text-secondary underline">
                        {translations.faq.questions.find(q => q.id === "faq10")?.question || ""}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2 flex-shrink-0">•</span>
                      <a href={`/${language}/faq#faq9`} className="text-primary hover:text-secondary underline">
                        {translations.faq.questions.find(q => q.id === "faq9")?.question || ""}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  )
}
