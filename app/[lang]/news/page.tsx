"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { PageLayout } from "@/components/ui/page-layout"
import { PageSectionWithContent } from "@/components/ui/page-section"
import NewsGrid from "@/components/news-grid"
import { ButtonNew } from "@/components/ui/button-new"
import { Loader2 } from "lucide-react"

export default function NewsPage() {
  const { language, translations } = useLanguage()
  const [displayCount, setDisplayCount] = useState(9)
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
      <PageSectionWithContent 
        background="default"
        title={translations.newsPage.title}
        subtitle={translations.newsPage.intro}
        titleAlignment="left"
      >
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
      </PageSectionWithContent>
    </PageLayout>
  )
}