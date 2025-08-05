"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { renderParagraphs } from "@/lib/utils"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="font-semibold text-gray-800">{translations.home.subproject2Title}</h1>
        <div className="max-w-4xl space-y-3">
          <p className="text-base text-gray-700 leading-relaxed">{translations.subprojects.subproject2FullDescription}</p>
          {renderParagraphs(translations.subprojects.subproject2Details)}
        </div>
      </section>

      <section className="space-y-6">
        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-semibold text-gray-800">{translations.subprojects.relatedNews}</h2>
        </div>
        <NewsGrid projectFilter={2} limit={3} showViewAllButton={true} />
      </section>
    </div>
  )
}
