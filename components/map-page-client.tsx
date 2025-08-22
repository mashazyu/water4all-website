"use client"

import { useLanguage } from "@/components/language-provider"
import { PageSection } from "@/components/ui/page-section"
import NewsGrid from "@/components/news-grid"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { MapPin, Star } from "lucide-react"

export default function MapPageClient() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Hero Section - Mobile */}
      <section className="max-md:block md:hidden w-full bg-background snap-start">
        <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                {translations.map.heroTitle}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {translations.map.infoSection}
              </p>
              
              {/* Mobile CTA Buttons */}
              <div className="space-y-3">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 text-base transition-all duration-300 hover:scale-105 text-center rounded-lg font-medium block"
                >
                  {translations.map.addEnglishMap}
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 px-4 text-base transition-all duration-300 hover:scale-105 text-center rounded-lg font-medium block"
                >
                  {translations.map.addGermanMap}
                </a>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-16">
            <div className="max-w-3xl mx-auto">
              <div className="w-full h-96 sm:h-[450px] lg:h-[450px] bg-muted/30 border border-border overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1v5s3GJCaaJwk2WRFqHz3XiBXYEIuw1Y&ll=52.547946812489116%2C13.452717799999995&z=17"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Berlin Water Sources Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tablet & Desktop: Split Layout */}
      <FullScreenSection background="default" className="max-md:hidden md:block snap-start">
        <div className="min-h-screen bg-background flex flex-col">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex min-h-screen">
              {/* Left Side - Content */}
              <div className="w-1/2 flex items-center justify-center px-8">
                <div className="w-full max-w-lg h-[500px] flex flex-col justify-center space-y-12">
                  {/* Hero Content */}
                  <div className="space-y-6">
                    <h1 className="text-5xl font-bold text-foreground leading-tight">
                      {translations.map.heroTitle}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {translations.map.infoSection}
                    </p>
                  </div>
                  
                  {/* Tablet CTA Buttons */}
                  <div className="flex gap-4">
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-auto bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-6 text-lg transition-all duration-300 hover:scale-105 text-center rounded-lg font-medium inline-block"
                    >
                      {translations.map.addEnglishMap}
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground py-4 px-6 text-lg transition-all duration-300 hover:scale-105 text-center rounded-lg font-medium inline-block"
                    >
                      {translations.map.addGermanMap}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Map */}
              <div className="w-1/2 flex items-center justify-center px-8">
                <div className="w-full h-[500px] bg-muted/30 border border-border overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1v5s3GJCaaJwk2WRFqHz3XiBXYEIuw1Y&ll=52.547946812489116%2C13.452717799999995&z=17"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Berlin Water Sources Map"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullScreenSection>

      {/* Quick Help Section */}
      <PageSection 
        titleSize="lg"
        accentLineHeight="h-8"
        background="muted"
        fullHeight={true}
        className="snap-start"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="text-primary">
                {translations.map.quickHelpTitle}
              </span>
            </h2>
          </div>
          
          {/* Feature Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* What You Get Tile */}
            <div className="group relative overflow-hidden bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="p-6 sm:p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {translations.map.whatYouGetTitle}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {translations.map.mapFeatures}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-2.5">•</span>
                    <span>{translations.map.freeToUse}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-2.5">•</span>
                    <span>{translations.map.betaTesting}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-2.5">•</span>
                    <span>{translations.map.waterSourceGuide}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Answers Tile */}
            <div className="group relative overflow-hidden bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="p-6 sm:p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {translations.map.quickAnswersTitle}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {translations.map.commonQuestionsSubtitle}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-1 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-2.5">•</span>
                    <a href={`/${language}/faq#faq3`} className="text-primary hover:text-secondary underline">
                      {translations.faq.questions.find(q => q.id === "faq3")?.question || ""}
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-2.5">•</span>
                    <a href={`/${language}/faq#faq10`} className="text-primary hover:text-secondary underline">
                      {translations.faq.questions.find(q => q.id === "faq10")?.question || ""}
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-2.5">•</span>
                    <a href={`/${language}/faq#faq9`} className="text-primary hover:text-secondary underline">
                      {translations.faq.questions.find(q => q.id === "faq9")?.question || ""}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Related News Section */}
      <PageSection 
        titleSize="lg"
        accentLineHeight="h-8"
        background="default"
        fullHeight={true}
        className="snap-start"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="text-primary">
                {translations.subprojects.relatedNews}
              </span>
            </h2>
          </div>
          
          <div className="group">
            <NewsGrid projectFilter={1} limit={3} showViewAllButton={true} />
          </div>
        </div>
      </PageSection>
    </PageLayout>
  )
}
