"use client"

import { useLanguage } from "@/components/language-provider"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { NewsSection } from "@/components/ui/news-section"
import { renderParagraphs } from "@/lib/utils"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Main Content Section - Full Screen */}
      <FullScreenSection background="default">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">
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
      <NewsSection background="muted" limit={3} showViewAllButton={true} />
    </PageLayout>
  )
}
