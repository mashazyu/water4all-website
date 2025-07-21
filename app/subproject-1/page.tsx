"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"

export default function Subproject1() {
  const { language, translations } = useLanguage()

  return (
    <div className="space-y-24">
      <section className="space-y-8">
        <h1 className="font-normal tracking-tight">{translations.subproject1Title}</h1>
        <div className="max-w-4xl space-y-6">
          <p className="text-lg">{translations.subproject1FullDescription}</p>
          <p>{translations.subproject1Details}</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-normal">{translations.relatedNews}</h2>
        <NewsGrid projectFilter={1} />
      </section>
    </div>
  )
}
