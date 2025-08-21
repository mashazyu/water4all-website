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
  const [displayCount, setDisplayCount] = useState(9)
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
    setDisplayCount(prev => Math.min(prev + 9, allNews.length))
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.newsPage.title}</h1>
              <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">{translations.newsPage.intro}</p>
            </div>
          </section>

          {/* News Grid Section */}
          <section className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedNews.map((item) => (
            <Card key={item.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-wrap gap-1">
                    {item.project.map((projectId) => (
                      <Badge
                        key={projectId}
                        variant="outline"
                        className={`text-xs font-normal px-2 py-1 rounded-none ${
                          projectId === 1
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
                            : "bg-[#9a89b4] hover:bg-[#9a89b4]/90 text-white border-[#9a89b4]"
                        }`}
                      >
                        {projectId === 1 ? translations.navigation.subproject1 : translations.navigation.subproject2}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-base font-semibold text-foreground leading-tight">{item.title}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-foreground leading-relaxed text-sm">{item.content}</p>
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
          </section>
        </div>
      </div>
    </div>
  )
}