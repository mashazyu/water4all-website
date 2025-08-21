"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"

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
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
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
              <p className="text-muted-foreground">Questions about our initiative and goals</p>
            </div>
            
            {projectFaqs.map((faq: any, index: number) => {
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

          {/* Map FAQ Section */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Map</h2>
              <p className="text-muted-foreground">Questions about using our water map</p>
            </div>
            
            {mapFaqs.map((faq: any, index: number) => {
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
      </FullScreenSection>
    </PageLayout>
  )
}
