"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { renderParagraphs } from "@/lib/utils"
import { Container } from "@/components/ui/container"

export default function FAQ() {
  const { translations } = useLanguage()
  const [expandedItem, setExpandedItem] = useState<number>(0)

  // Function to render markdown-like links with line break support
  const renderTextWithLinksAndBreaks = (text: string) => {
    // First split by double newlines to get paragraphs
    const paragraphs = text.split('\n\n')
    
    return paragraphs.map((paragraph, pIndex) => {
      // For each paragraph, handle links
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      const parts = paragraph.split(linkRegex)
      
      if (parts.length === 1) {
        return <p key={`p-${pIndex}`} className="mb-4 last:mb-0">{paragraph}</p>
      }
      
      const elements = []
      for (let i = 0; i < parts.length; i += 3) {
        if (parts[i]) elements.push(<span key={`text-${pIndex}-${i}`}>{parts[i]}</span>)
        if (parts[i + 1] && parts[i + 2]) {
          elements.push(
            <a 
              key={`link-${pIndex}-${i}`} 
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
      return <p key={`p-${pIndex}`} className="mb-4 last:mb-0">{elements}</p>
    })
  }

  const faqs = (translations.faq.questions as unknown) as any[]

  // Group FAQs by category
  const projectFaqs = faqs.filter((faq: any) => faq.category === 'project')
  const mapFaqs = faqs.filter((faq: any) => faq.category === 'map')

  // Toggle individual FAQ item
  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? -1 : index)
  }



  return (
    <PageLayout>
      <FullScreenSection background="default">
        <Container>
          {/* Header Section */}
          <div className="space-y-6 mb-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.faq.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{translations.faq.intro}</p>
            </div>
          </div>

          {/* Project FAQ Section */}
          <div className="space-y-6 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Project</h2>
              <p className="text-muted-foreground">{translations.faq.projectFaqsTitle}</p>
            </div>
            
            {projectFaqs.map((faq: any, index: number) => {
              const isExpanded = expandedItem === index
              
              return (
                <div key={faq.id} className="w-full" id={faq.id}>
                  <Card className="border border-border w-full min-w-full max-w-full">
                    <CardHeader 
                      className="bg-muted/50 border-b border-border cursor-pointer hover:bg-muted/70 transition-colors w-full"
                      onClick={() => toggleItem(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-lg font-semibold text-foreground pr-4 flex-1">
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
                      <CardContent className="pt-6 w-full">
                        <div className="text-muted-foreground leading-relaxed w-full">
                          {renderTextWithLinksAndBreaks(faq.answer)}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Map FAQ Section */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Map</h2>
              <p className="text-muted-foreground">{translations.faq.mapFaqsTitle}</p>
            </div>
            
            {mapFaqs.map((faq: any, index: number) => {
              const isExpanded = expandedItem === index
              
              return (
                <div key={faq.id} className="w-full" id={faq.id}>
                  <Card className="border border-border w-full min-w-full max-w-full">
                    <CardHeader 
                      className="bg-muted/50 border-b border-border cursor-pointer hover:bg-muted/70 transition-colors w-full"
                      onClick={() => toggleItem(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-lg font-semibold text-foreground pr-4 flex-1">
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
                      <CardContent className="pt-6 w-full">
                        <div className="text-muted-foreground leading-relaxed w-full">
                          {renderTextWithLinksAndBreaks(faq.answer)}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>
        </Container>
      </FullScreenSection>
    </PageLayout>
  )
}
