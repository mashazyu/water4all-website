"use client"

import { useLanguage } from "@/components/language-provider"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TextParser } from "@/components/ui/text-parser"
import { Lightbulb, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function FAQ() {
  const { translations } = useLanguage()
  const router = useRouter()
  const [openProjectItem, setOpenProjectItem] = useState<string | undefined>(undefined)
  const [openMapItem, setOpenMapItem] = useState<string | undefined>(undefined)

  const faqs = (translations.faq.questions as unknown) as any[]

  // Group FAQs by category
  const projectFaqs = faqs.filter((faq: any) => faq.category === 'project')
  const mapFaqs = faqs.filter((faq: any) => faq.category === 'map')

  // Function to handle hash navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash) {
        const faqNumber = hash.replace('#faq', '')
        const faqIndex = parseInt(faqNumber) - 1
        
        if (faqIndex >= 0 && faqIndex < projectFaqs.length) {
          // FAQ is in Project section
          setOpenProjectItem(`project-${projectFaqs[faqIndex].id}`)
          setOpenMapItem(undefined)
        } else if (faqIndex >= projectFaqs.length && faqIndex < projectFaqs.length + mapFaqs.length) {
          // FAQ is in Map section
          setOpenProjectItem(undefined)
          setOpenMapItem(`map-${mapFaqs[faqIndex - projectFaqs.length].id}`)
        }
      }
    }
  }, [projectFaqs.length, mapFaqs.length])

  return (
    <PageLayout>
      <FullScreenSection background="default">
        <div className="w-full px-6 md:px-8 lg:px-12">
          {/* Header Section */}
          <div className="space-y-6 mb-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.faq.title}</h1>
            </div>
          </div>

          {/* Project FAQ Section */}
          <div className="space-y-6 mt-20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Project</h2>
              </div>
              <p className="text-muted-foreground">{translations.faq.projectFaqsTitle}</p>
            </div>
            
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              value={openProjectItem}
              onValueChange={setOpenProjectItem}
            >
              {projectFaqs.map((faq: any, index: number) => (
                <AccordionItem 
                  key={`project-${faq.id}`} 
                  value={`project-${faq.id}`}
                  className="mb-6"
                  id={`faq${index + 1}`}
                >
                  <AccordionTrigger className="text-left py-6 hover:bg-muted/30 rounded-lg transition-colors duration-200">
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <TextParser 
                      text={faq.answer} 
                      className="text-muted-foreground leading-relaxed"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Map FAQ Section */}
          <div className="space-y-6 mt-20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Map</h2>
              </div>
              <p className="text-muted-foreground">{translations.faq.mapFaqsTitle}</p>
            </div>
            
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              value={openMapItem}
              onValueChange={setOpenMapItem}
            >
              {mapFaqs.map((faq: any, index: number) => (
                <AccordionItem 
                  key={`map-${faq.id}`} 
                  value={`map-${faq.id}`}
                  className="mb-6"
                  id={`faq${projectFaqs.length + index + 1}`}
                >
                  <AccordionTrigger className="text-left py-6 hover:bg-muted/30 rounded-lg transition-colors duration-200">
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <TextParser 
                      text={faq.answer} 
                      className="text-muted-foreground leading-relaxed"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </FullScreenSection>
    </PageLayout>
  )
}
