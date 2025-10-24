"use client"

import { useLanguage } from "@/components/language-provider"
import { PageSectionWithContent } from "@/components/ui/page-section"
import { OrgTile } from "@/components/ui/org-tile"

interface SupportSectionProps {
  className?: string
}

export function SupportSection({ className = "" }: SupportSectionProps) {
  const { translations } = useLanguage()

  if (!translations?.home?.supporterOrganizations) {
    return null
  }

  return (
    <PageSectionWithContent 
      background="muted"
      title={translations.home.supportTitle}
      subtitle={translations.home.supportSubtitle}
      className={className}
    >
      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-8 sm:gap-16">
        {translations.home.supporterOrganizations.map((organization, index) => (
          <OrgTile 
            key={index}
            organization={organization}
          />
        ))}
      </div>
    </PageSectionWithContent>
  )
}
