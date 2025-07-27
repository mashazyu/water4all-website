"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQ() {
  const { translations } = useLanguage()

  const faqs = [
    {
      question: translations.faq1Question,
      answer: translations.faq1Answer,
    },
    {
      question: translations.faq2Question,
      answer: translations.faq2Answer,
    },
    {
      question: translations.faq3Question,
      answer: translations.faq3Answer,
    },
    {
      question: translations.faq4Question,
      answer: translations.faq4Answer,
    },
    {
      question: translations.faq5Question,
      answer: translations.faq5Answer,
    },
    {
      question: translations.faq6Question,
      answer: translations.faq6Answer,
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-semibold text-gray-800">{translations.faqTitle}</h1>
        <p className="text-base text-gray-600">{translations.faqIntro}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="border border-gray-300 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-base font-semibold text-gray-800">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
