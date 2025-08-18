"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { renderParagraphs } from "@/lib/utils"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Content Section */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{translations.home.subproject2Title}</h1>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">{translations.subprojects.subproject2FullDescription}</p>
                <div className="prose prose-lg max-w-none">
                  {renderParagraphs(translations.subprojects.subproject2Details)}
                </div>
              </div>
            </div>
          </section>

          {/* Related News Section */}
          <section className="space-y-8">
            <div className="border-b border-border pb-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.subprojects.relatedNews}</h2>
            </div>
            <NewsGrid projectFilter={2} limit={3} showViewAllButton={true} />
          </section>
        </div>
      </div>
    </div>
  )
}
