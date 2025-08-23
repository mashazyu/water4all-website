"use client"

import { useLanguage } from "@/components/language-provider"
import { PageSection } from "@/components/ui/page-section"
import { PageLayout } from "@/components/ui/page-layout"
import { QuickHelpSection } from "@/components/ui/quick-help-section"
import { NewsSection } from "@/components/ui/news-section"
import { renderParagraphs } from "@/lib/utils"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Main Content Section - Full Screen */}
      <PageSection background="gradient" fullHeight={true}>
        <div className="max-w-4xl mx-auto">
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
      </PageSection>

      {/* Quick Help Section */}
      <QuickHelpSection background="default" />

      {/* Related News Section - Full Screen */}
      <NewsSection background="muted" limit={3} showViewAllButton={true} />
    </PageLayout>
  )
}
