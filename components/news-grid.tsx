"use client"

import { useLanguage } from "./language-provider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ButtonNew } from "@/components/ui/button-new"
import { Calendar, ArrowRight } from "lucide-react"
import { type NewsItem } from "@/lib/translations"
import Link from "next/link"

export default function NewsGrid({ 
  projectFilter, 
  limit,
  showViewAllButton = false 
}: { 
  projectFilter?: number
  limit?: number
  showViewAllButton?: boolean
}) {
  const { language, translations } = useLanguage()

  // Get news data from translations
  const news: NewsItem[] = translations.news

  // Filter news if projectFilter is provided
  const filteredNews = projectFilter ? news.filter((item) => item.project.includes(projectFilter)) : news

  // Sort by date (newest first), then by ID (descending) if dates are the same
  const sortedNews = filteredNews.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    
    // First sort by date (newest first)
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime()
    }
    
    // If dates are the same, sort by ID (descending)
    return b.id - a.id
  })

  // Apply limit if specified
  const displayedNews = limit ? sortedNews.slice(0, limit) : sortedNews

  // Function to format date as month and year only
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "de" ? "de-DE" : language === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedNews.map((item) => (
          <Card key={item.id} className="border border-border shadow-none hover:shadow-none transition-none">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-wrap gap-1">
                  {item.project.map((projectId) => (
                    <Badge
                      key={projectId}
                      variant="outline"
                      className={`text-xs font-normal px-2 py-1 rounded-none ${
                        projectId === 1
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-[#9a89b4] text-white border-[#9a89b4]"
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
      
      {showViewAllButton && limit && sortedNews.length > limit && (
        <div className="flex justify-center">
          <Link href={`/${language}/news`}>
            <ButtonNew variant="action" size="sm">
              {translations.subprojects.viewAllNews}
            </ButtonNew>
          </Link>
        </div>
      )}
    </div>
  )
}
