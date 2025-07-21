"use client"

import { useLanguage } from "./language-provider"
import { Badge } from "@/components/ui/badge"

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
      date: "2023-06-15",
      project: 1,
    },
    {
      id: 2,
      title: translations.newsTitle2,
      content: translations.newsContent2,
      date: "2023-07-02",
      project: 2,
    },
    {
      id: 3,
      title: translations.newsTitle3,
      content: translations.newsContent3,
      date: "2023-07-10",
      project: 2,
    },
    {
      id: 4,
      title: translations.newsTitle4,
      content: translations.newsContent4,
      date: "2023-07-18",
      project: 1,
    },
    {
      id: 5,
      title: translations.newsTitle5,
      content: translations.newsContent5,
      date: "2023-07-25",
      project: 2,
    },
    {
      id: 6,
      title: translations.newsTitle6,
      content: translations.newsContent6,
      date: "2023-08-01",
      project: 1,
    },
  ]

  // Filter news if projectFilter is provided
  const filteredNews = projectFilter ? news.filter((item) => item.project === projectFilter) : news

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filteredNews.map((item) => (
        <div key={item.id} className="field-card group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="outline" className="text-xs font-normal px-2 py-1 border-foreground/20">
              {item.project === 1 ? translations.subproject1 : translations.subproject2}
            </Badge>
          </div>
          <h3 className="font-normal mb-4 group-hover:text-muted-foreground transition-colors">{item.title}</h3>
          <p className="text-sm mb-6">{item.content}</p>
          <div className="text-xs text-muted-foreground">
            {new Date(item.date).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
