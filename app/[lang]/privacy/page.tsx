"use client"

import { useLanguage } from "@/components/language-provider"

export default function Privacy() {
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

  // Function to render text with line breaks
  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {renderTextWithLinks(line)}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-semibold text-gray-800">{translations.privacy.title}</h1>
        <p className="text-base text-gray-600">{translations.privacy.intro}</p>
      </div>

      <div className="space-y-6">
        {/* Responsible Party */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.privacy.responsibleParty}</h2>
          <p className="text-gray-700 whitespace-pre-line">{translations.privacy.responsiblePartyContent}</p>
        </section>

        {/* Data Processed */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.privacy.dataProcessed}</h2>
          <p className="text-gray-700 whitespace-pre-line">{translations.privacy.dataProcessedContent}</p>
        </section>

        {/* Analytics Service */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.privacy.analyticsService}</h2>
          <p className="text-gray-700">
            {renderTextWithLineBreaks(translations.privacy.analyticsServiceContent)}
          </p>
        </section>

        {/* Purpose of Processing */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.privacy.purposeOfProcessing}</h2>
          <p className="text-gray-700 whitespace-pre-line">{translations.privacy.purposeOfProcessingContent}</p>
        </section>

        {/* Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.privacy.cookies}</h2>
          <p className="text-gray-700">{translations.privacy.cookiesContent}</p>
        </section>

        {/* Your Rights */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.privacy.yourRights}</h2>
          <p className="text-gray-700">{translations.privacy.yourRightsIntro}</p>
          <p className="text-gray-700 whitespace-pre-line">{translations.privacy.yourRightsList}</p>
        </section>

        {/* Contact Info */}
        <section className="space-y-2">
          <p className="text-gray-700">{translations.privacy.contactInfo}</p>
        </section>
      </div>
    </div>
  )
}
