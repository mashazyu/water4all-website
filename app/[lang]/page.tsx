"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"

export default function HomePage() {
  const { translations } = useLanguage()

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">{translations.home.projectTitle}</h1>
        <div className="max-w-4xl space-y-3">
          <p className="text-lg text-gray-700 leading-relaxed">{translations.home.projectIntro}</p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{translations.home.subproject1Title}</h2>
            <p className="text-gray-700 leading-relaxed">{translations.home.subproject1Description}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{translations.home.subproject2Title}</h2>
            <p className="text-gray-700 leading-relaxed">{translations.home.subproject2Description}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="border-b border-gray-300 pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">{translations.home.latestNews}</h2>
        </div>
        <NewsGrid limit={3} showViewAllButton={true} />
      </section>
    </div>
  )
}
