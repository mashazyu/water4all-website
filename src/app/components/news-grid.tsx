"use client"

import { useLanguage } from "./language-provider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

type NewsItem = {
  id: number
  title: string
  content: string
  date: string
  project: number // 1 or 2
}

export default function NewsGrid({ projectFilter }: { projectFilter?: number }) {
  const { language, translations } = useLanguage()

  // Sample news data
  const news: NewsItem[] = [
    {
      id: 1,
      title: translations.newsTitle1,
      content: translations.newsContent1,
      date: "2024-01-15",
      project: 1,
    },
    {
      id: 2,
      title: translations.newsTitle2,
      content: translations.newsContent2,
      date: "2024-01-22",
      project: 2,
    },
    {
      id: 3,
      title: translations.newsTitle3,
      content: translations.newsContent3,
      date: "2024-01-28",
      project: 2,
    },
    {
      id: 4,
      title: translations.newsTitle4,
      content: translations.newsContent4,
      date: "2024-02-05",
      project: 1,
    },
    {
      id: 5,
      title: translations.newsTitle5,
      content: translations.newsContent5,
      date: "2024-02-12",
      project: 2,
    },
    {
      id: 6,
      title: translations.newsTitle6,
      content: translations.newsContent6,
      date: "2024-02-18",
      project: 1,
    },
  ]

  // Filter news if projectFilter is provided
  const filteredNews = projectFilter ? news.filter((item) => item.project === projectFilter) : news

  // Sort by date (newest first)
  const sortedNews = filteredNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedNews.map((item) => (
        <Card key={item.id} className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start mb-2">
              <Badge
                variant="outline"
                className={`text-xs font-normal px-2 py-1 ${
                  item.project === 1
                    ? "border-blue-300 text-blue-700 bg-blue-50"
                    : "border-gray-400 text-gray-700 bg-gray-50"
                }`}
              >
                {item.project === 1 ? translations.subproject1 : translations.subproject2}
              </Badge>
            </div>
            <CardTitle className="text-base font-semibold text-gray-800 leading-tight">{item.title}</CardTitle>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
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
