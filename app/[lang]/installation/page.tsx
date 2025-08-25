"use client"

import { useLanguage } from "@/components/language-provider"
import { PageLayout } from "@/components/ui/page-layout"
import { PageSectionWithContent } from "@/components/ui/page-section"
import { NewsSection } from "@/components/ui/news-section"
import { renderParagraphs } from "@/lib/utils"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Main Content Section - Full Screen */}
      <PageSectionWithContent 
        background="default"
        title={translations.home.subproject2Title}
        titleAlignment="left"
      >
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
      </PageSectionWithContent>

      {/* Related News Section - Full Screen */}
      <NewsSection background="muted" limit={3} showViewAllButton={true} projectFilter={2} />
    </PageLayout>
  )
}
