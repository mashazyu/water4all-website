"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQ() {
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

  const faqs = [
    {
      question: translations.faq.questions.faq1Question,
      answer: translations.faq.questions.faq1Answer,
    },
    {
      question: translations.faq.questions.faq2Question,
      answer: translations.faq.questions.faq2Answer,
    },
    {
      question: translations.faq.questions.faq5Question,
      answer: translations.faq.questions.faq5Answer,
    },
    {
      question: translations.faq.questions.faq6Question,
      answer: translations.faq.questions.faq6Answer,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{translations.faq.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{translations.faq.intro}</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-muted/50 border-b border-border">
                  <CardTitle className="text-lg font-semibold text-foreground">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-muted-foreground leading-relaxed">
                    {renderTextWithLinks(faq.answer)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
