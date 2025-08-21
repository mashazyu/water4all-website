"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react"

export default function FAQ() {
  const { translations } = useLanguage()
  const [expandedItem, setExpandedItem] = useState<number>(0)

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

  const faqs = (translations.faq.questions as unknown) as any[]

  // Toggle individual FAQ item
  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? -1 : index)
  }



  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.faq.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{translations.faq.intro}</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            {/* FAQ Items */}
            {faqs.map((faq: any, index: number) => {
              const isExpanded = expandedItem === index
              
              return (
                <div key={faq.id} className="max-w-4xl mx-auto">
                  <Card className="border border-border">
                    <CardHeader 
                      className="bg-muted/50 border-b border-border cursor-pointer hover:bg-muted/70 transition-colors"
                      onClick={() => toggleItem(index)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-foreground pr-4">
                          {faq.question}
                        </CardTitle>
                        <div className="flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="pt-6">
                        <div className="text-muted-foreground leading-relaxed">
                          {renderTextWithLinks(faq.answer)}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
