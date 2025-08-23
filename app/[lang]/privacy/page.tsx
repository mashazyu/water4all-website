"use client"

import { useLanguage } from "@/components/language-provider"
import AntiSpamEmail from "@/components/anti-spam-email"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { Container } from "@/components/ui/container"

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
            className="text-primary hover:text-secondary underline"
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

  // Function to render text with anti-spam email protection
  const renderTextWithAntiSpamEmail = (text: string) => {
    const emailRegex = /(berlinertrinkbrunnen@gmail\.com)/g
    const parts = text.split(emailRegex)
    
    if (parts.length === 1) {
      return <span>{text}</span>
    }
    
    const elements = []
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 'berlinertrinkbrunnen@gmail.com') {
        elements.push(
          <AntiSpamEmail
            key={`email-${i}`}
            email="berlinertrinkbrunnen@gmail.com"
            className="text-primary hover:text-secondary underline"
            copyMessage={translations.privacy.email}
          />
        )
      } else if (parts[i]) {
        elements.push(<span key={`text-${i}`}>{parts[i]}</span>)
      }
    }
    return <>{elements}</>
  }

  return (
    <PageLayout>
      <FullScreenSection background="default">
        <Container>
          {/* Header Section */}
          <div className="space-y-6 mb-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.privacy.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{translations.privacy.intro}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Responsible Party */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.privacy.responsibleParty}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {renderTextWithAntiSpamEmail(translations.privacy.responsiblePartyContent)}
              </div>
            </section>

            {/* Data Processed */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.privacy.dataProcessed}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {translations.privacy.dataProcessedContent}
              </div>
            </section>

            {/* Analytics Service */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.privacy.analyticsService}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {renderTextWithLineBreaks(translations.privacy.analyticsServiceContent)}
              </div>
            </section>

            {/* Purpose of Processing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.privacy.purposeOfProcessing}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {translations.privacy.purposeOfProcessingContent}
              </div>
            </section>

            {/* Cookies */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.privacy.cookies}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {translations.privacy.cookiesContent}
              </div>
            </section>

            {/* Your Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{translations.privacy.yourRights}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>{translations.privacy.yourRightsIntro}</p>
                <div className="whitespace-pre-line">{translations.privacy.yourRightsList}</div>
              </div>
            </section>

            {/* Contact Info */}
            <section className="space-y-4">
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {renderTextWithAntiSpamEmail(translations.privacy.contactInfo)}
              </div>
            </section>
          </div>
        </Container>
      </FullScreenSection>
    </PageLayout>
  )
}
