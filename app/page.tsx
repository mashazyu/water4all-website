"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import Link from "next/link"

export default function Home() {
  const { language, translations } = useLanguage()

  return (
    <div className="space-y-24">
      <section className="space-y-8">
        <h1 className="font-normal tracking-tight">{translations.projectTitle}</h1>
        <p className="text-lg max-w-4xl">{translations.projectIntro}</p>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="field-card">
            <h2 className="font-normal mb-6">{translations.subproject1Title}</h2>
            <p className="mb-8">{translations.subproject1Description}</p>
            <Link href="/subproject-1" className="field-button">
              {translations.learnMore}
            </Link>
          </div>

          <div className="field-card">
            <h2 className="font-normal mb-6">{translations.subproject2Title}</h2>
            <p className="mb-8">{translations.subproject2Description}</p>
            <Link href="/subproject-2" className="field-button">
              {translations.learnMore}
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-normal">{translations.latestNews}</h2>
        <NewsGrid />
      </section>
    </div>
  )
}
