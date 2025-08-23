"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { InfoTile } from "@/components/ui/info-tile"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const { translations } = useLanguage()
  const [expandedItem, setExpandedItem] = useState<number>(0)

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
              <p className="text-muted-foreground">{translations.faq.projectFaqsTitle}</p>
            </div>
            
            <div className="grid gap-6">
              {projectFaqs.map((faq: any, index: number) => {
                const isExpanded = expandedItem === index
                
                return (
                  <InfoTile
                    key={faq.id}
                    icon={<ChevronDown className="w-5 h-5 text-primary" />}
                    title={faq.question}
                    subtitle=""
                    content={
                      <div className="space-y-4">
                        <div className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                        <button
                          onClick={() => toggleItem(index)}
                          className="text-primary hover:text-secondary text-sm font-medium"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      </div>
                    }
                  />
                )
              })}
            </div>
          </div>

          {/* Map FAQ Section */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Map</h2>
              <p className="text-muted-foreground">{translations.faq.mapFaqsTitle}</p>
            </div>
            
            <div className="grid gap-6">
              {mapFaqs.map((faq: any, index: number) => {
                const isExpanded = expandedItem === index
                
                return (
                  <InfoTile
                    key={faq.id}
                    icon={<ChevronDown className="w-5 h-5 text-primary" />}
                    title={faq.question}
                    subtitle=""
                    content={
                      <div className="space-y-4">
                        <div className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                        <button
                          onClick={() => toggleItem(index)}
                          className="text-primary hover:text-secondary text-sm font-medium"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      </div>
                    }
                  />
                )
              })}
            </div>
          </div>
        </div>
      </FullScreenSection>
    </PageLayout>
  )
}
