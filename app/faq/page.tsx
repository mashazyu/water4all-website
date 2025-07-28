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
            className="text-blue-600 hover:text-blue-800 underline"
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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-semibold text-gray-800">{translations.faq.title}</h1>
        <p className="text-base text-gray-600">{translations.faq.intro}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="border border-gray-300 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-base font-semibold text-gray-800">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 leading-relaxed text-sm">
                {renderTextWithLinks(faq.answer)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
