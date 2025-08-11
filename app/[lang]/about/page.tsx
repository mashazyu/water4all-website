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
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {parts[i + 1]}
          </a>
        )
      }
    }
    return <>{elements}</>
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-semibold text-gray-800">{translations.about.title}</h1>
        <p className="text-base text-gray-600">{translations.about.intro}</p>
      </div>

      <div className="space-y-6">
        {/* Program Information */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.about.programInfo}</h2>
          <p className="text-gray-700">
            {renderTextWithLinks(translations.about.programDescription)}
          </p>
        </section>
      </div>
    </div>
  )
}
