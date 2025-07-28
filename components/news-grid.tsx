"use client"

import { useLanguage } from "./language-provider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { type NewsItem } from "@/lib/translations"

export default function NewsGrid({ projectFilter }: { projectFilter?: number }) {
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

  // Function to format date as month and year only
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "de" ? "de-DE" : language === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedNews.map((item) => (
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
  )
}
