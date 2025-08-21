"use client"

import { useLanguage } from "@/components/language-provider"
import NewsGrid from "@/components/news-grid"
import { PageSection } from "@/components/ui/page-section"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { renderParagraphs } from "@/lib/utils"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Main Content Section - Full Screen */}
      <FullScreenSection background="gradient">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {translations.home.subproject2Title}
            </h1>
          </div>

          {/* Main Content Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">{translations.subprojects.subproject2FullDescription}</p>
                <div className="prose prose-lg max-w-none">
                  {renderParagraphs(translations.subprojects.subproject2Details)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullScreenSection>

      {/* Related News Section - Full Screen */}
      <PageSection 
        title={translations.subprojects.relatedNews}
        titleSize="md"
        accentLineHeight="h-6"
        background="muted"
        fullHeight={true}
        className="snap-start"
      >
        <div className="group">
          <NewsGrid projectFilter={2} limit={3} showViewAllButton={true} />
        </div>
      </PageSection>
    </PageLayout>
  )
}
