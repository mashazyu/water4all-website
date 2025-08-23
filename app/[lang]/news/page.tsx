"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import NewsGrid from "@/components/news-grid"
import { ButtonNew } from "@/components/ui/button-new"
import { Loader2 } from "lucide-react"

export default function NewsPage() {
  const { language, translations } = useLanguage()
  const [displayCount, setDisplayCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)

  // Get all news data and sort by date (newest first)
  const allNews = translations.news.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime()
    }
    
    return b.id - a.id
  })

  const hasMoreNews = displayCount < allNews.length

  const handleLoadMore = async () => {
    setIsLoading(true)
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500))
    setDisplayCount(prev => Math.min(prev + 9, allNews.length))
    setIsLoading(false)
  }

  return (
    <PageLayout>
      <FullScreenSection background="default">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 lg:px-12">
          {/* Header Section */}
          <section className="space-y-6 mb-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.newsPage.title}</h1>
              <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">{translations.newsPage.intro}</p>
            </div>
          </section>

          {/* News Grid Section */}
          <section className="space-y-8">
            <NewsGrid limit={displayCount} />
            
            {hasMoreNews && (
              <div className="flex justify-center">
                <ButtonNew 
                  onClick={handleLoadMore} 
                  disabled={isLoading}
                  variant="action"
                  size="md"
                  className="flex items-center gap-2"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {translations.newsPage.loadMore}
                </ButtonNew>
              </div>
            )}
          </section>
        </div>
      </FullScreenSection>
    </PageLayout>
  )
}