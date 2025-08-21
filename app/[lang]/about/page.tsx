"use client"

import { useLanguage } from "@/components/language-provider"

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.about.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{translations.about.intro}</p>
            </div>
          </div>

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
        </div>
      </div>
    </div>
  )
}
