"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { PageSection } from "@/components/ui/page-section"
import { renderParagraphs } from "@/lib/utils"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-white to-blue-50/20">
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {translations.home.subproject2Title}
          </h1>
        </div>

        {/* Main Content Section */}
        <section className="space-y-6">
          <div className="space-y-4">
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
          <div className="border-b border-border pb-2 group cursor-pointer">
            <h2 className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full group-hover:h-8 transition-all duration-300"></span>
              {translations.subprojects.relatedNews}
            </h2>
          </div>
          <NewsGrid projectFilter={2} limit={3} showViewAllButton={true} />
        </section>
      </div>
    </div>
  )
}
