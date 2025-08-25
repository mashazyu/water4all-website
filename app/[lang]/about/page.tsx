"use client"

import { useLanguage } from "@/components/language-provider"
import { PageLayout } from "@/components/ui/page-layout"
import { PageSectionWithContent } from "@/components/ui/page-section"

export default function About() {
  const { translations } = useLanguage()

  // Function to render markdown-like links
  const renderTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = text.split(linkRegex)
    
    if (parts.length === 1) {
      return <span>{text}</span>
    }
    
    const elements = []
    for (let i = 0; i < parts.length; i += 3) {
      if (parts[i]) elements.push(<span key={`text-${i}`}>{parts[i]}</span>)
      if (parts[i + 1] && parts[i + 2]) {
        elements.push(
          <a 
            key={`link-${i}`} 
            href={parts[i + 2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary underline"
          >
            {parts[i + 1]}
          </a>
        )
      }
    }
    return <>{elements}</>
  }

  return (
    <PageLayout>
      <PageSectionWithContent 
        background="default"
        title={translations.about.title}
        subtitle={translations.about.intro}
        titleAlignment="left"
      >
        {/* Content Section */}
        <div className="space-y-8">
          {/* Program Information */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.about.programInfo}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {renderTextWithLinks(translations.about.programDescription)}
              </div>
            </div>
          </section>
        </div>
      </PageSectionWithContent>
    </PageLayout>
  )
}
