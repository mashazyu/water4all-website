"use client"

import { useLanguage } from "@/components/language-provider"
import { FullScreenSection } from "@/components/ui/page-layout"
import NewsGrid from "@/components/news-grid"

interface NewsSectionProps {
  background?: "default" | "white" | "muted"
  className?: string
  titleSize?: "sm" | "md" | "lg" | "xl"
  accentLineHeight?: string
  limit?: number
  showViewAllButton?: boolean
}

export function NewsSection({ 
  background = "muted", 
  className = "",
  titleSize = "lg",
  accentLineHeight = "h-8",
  limit = 3,
  showViewAllButton = true
}: NewsSectionProps) {
  const { translations } = useLanguage()

  return (
    <FullScreenSection background={background} className={className}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            <span className="text-primary">
              {translations.home.latestNews}
            </span>
          </h2>
        </div>
        
        <div className="group">
          <NewsGrid limit={limit} showViewAllButton={showViewAllButton} />
        </div>
      </div>
    </FullScreenSection>
  )
}
