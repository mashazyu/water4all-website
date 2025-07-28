"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"

export default function Subproject1() {
  const { language, translations } = useLanguage()

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="font-semibold text-gray-800">{translations.home.subproject1Title}</h1>
        <div className="max-w-4xl space-y-3">
          <p className="text-base text-gray-700 leading-relaxed">{translations.subprojects.subproject1FullDescription}</p>
          <p className="text-gray-700 leading-relaxed text-sm">{translations.subprojects.subproject1Details}</p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-semibold text-gray-800">{translations.subprojects.relatedNews}</h2>
        </div>
        <NewsGrid projectFilter={1} />
      </section>
    </div>
  )
}
