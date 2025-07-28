"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const { language, translations } = useLanguage()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-6">
        <h1 className="font-semibold text-gray-800 leading-tight">{translations.home.projectTitle}</h1>
        <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">{translations.home.projectIntro}</p>
      </section>

      {/* Project Cards */}
      <section className="grid md:grid-cols-2 gap-6">
        <Card className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-blue-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-blue-800">{translations.home.subproject1Title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">{translations.home.subproject1Description}</p>
            <Link
              href="/subproject-1"
              className="inline-flex items-center gap-2 text-blue-700 font-normal hover:text-blue-800 transition-colors text-sm"
            >
              {translations.home.learnMore}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-blue-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-blue-800">{translations.home.subproject2Title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">{translations.home.subproject2Description}</p>
            <Link
              href="/subproject-2"
              className="inline-flex items-center gap-2 text-blue-700 font-normal hover:text-blue-800 transition-colors text-sm"
            >
              {translations.home.learnMore}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* News Section */}
      <section className="space-y-6">
        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-semibold text-gray-800">{translations.home.latestNews}</h2>
        </div>
        <NewsGrid />
      </section>
    </div>
  )
}
