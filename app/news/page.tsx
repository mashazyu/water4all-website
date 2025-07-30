"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2 } from "lucide-react"
import { type NewsItem } from "@/lib/translations"

export default function NewsPage() {
  const { language, translations } = useLanguage()
  const [displayCount, setDisplayCount] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  // Get all news data and sort by date (newest first)
  const allNews: NewsItem[] = translations.news.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime()
    }
    
    return b.id - a.id
  })

  const displayedNews = allNews.slice(0, displayCount)
  const hasMoreNews = displayCount < allNews.length

  const handleLoadMore = async () => {
    setIsLoading(true)
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500))
    setDisplayCount(prev => Math.min(prev + 10, allNews.length))
    setIsLoading(false)
  }

  // Function to format date as month and year only
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "de" ? "de-DE" : language === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="font-semibold text-gray-800">{translations.newsPage.title}</h1>
        <p className="text-base text-gray-600 max-w-4xl leading-relaxed">{translations.newsPage.intro}</p>
      </section>

      <section className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedNews.map((item) => (
            <Card key={item.id} className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-wrap gap-1">
                    {item.project.map((projectId) => (
                      <Badge
                        key={projectId}
                        variant="outline"
                        className={`text-xs font-normal px-2 py-1 ${
                          projectId === 1
                            ? "border-blue-300 text-blue-700 bg-blue-50"
                            : "border-gray-400 text-gray-700 bg-gray-50"
                        }`}
                      >
                        {projectId === 1 ? translations.navigation.subproject1 : translations.navigation.subproject2}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-base font-semibold text-gray-800 leading-tight">{item.title}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 leading-relaxed text-sm">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {hasMoreNews && (
          <div className="flex justify-center">
            <Button 
              onClick={handleLoadMore} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {translations.newsPage.loadMore}
            </Button>
          </div>
        )}
        
        {!hasMoreNews && allNews.length > 0 && (
          <div className="text-center text-gray-500 py-4">
            {translations.newsPage.noMoreNews}
          </div>
        )}
      </section>
    </div>
  )
} 