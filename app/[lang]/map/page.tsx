"use client"

import { useLanguage } from "@/components/language-provider"
import { PageSection } from "@/components/ui/page-section"
import NewsGrid from "@/components/news-grid"

import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Droplets, Users, Star, ChevronDown } from "lucide-react"

export default function MapPage() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Hero Section - Minimalist with Progressive Disclosure */}
      {/* Mobile: Text First, Then Map */}
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
            </div></div>
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
          {/* Tablet Content */}
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
                
                {/* Tablet CTA Buttons - Side by Side */}
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
              <div className="w-full max-w-lg h-[500px]">
                <div className="relative w-full h-full overflow-hidden">
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





      {/* Quick Help Section - Progressive Disclosure */}
      <PageSection 
        titleSize="lg"
        accentLineHeight="h-8"
        background="muted"
        fullHeight={true}
        className="snap-start"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="text-primary">
                {translations.map.quickHelpTitle}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              {translations.map.mapDescription}
            </p>
          </div>

          {/* Enhanced Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Map Features - Enhanced */}
            <div className="group relative overflow-hidden bg-white border border-border/50 transition-all duration-500 sm:hover:scale-[1.02] sm:hover:-translate-y-1 h-full">
              
              <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
                {/* Enhanced Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{translations.map.whatYouGetTitle}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{translations.map.waterSourceGuide}</p>
                  </div>
                </div>

                {/* Enhanced Feature List */}
                <div className="space-y-1">
                  {[
                    translations.map.mapFeatures,
                    translations.map.betaTesting,
                    translations.map.freeToUse
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-3 hover:bg-white/50 transition-all duration-300 cursor-pointer group/feature"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p className="text-muted-foreground text-sm leading-relaxed font-medium group-hover/feature:text-foreground transition-colors duration-300">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>


              </div>
            </div>

            {/* FAQ Links - Enhanced */}
            <div className="group relative overflow-hidden bg-white border border-border/50 transition-all duration-500 sm:hover:scale-[1.02] sm:hover:-translate-y-1 h-full">
              
              <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
                {/* Enhanced Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{translations.map.quickAnswersTitle}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{translations.map.commonQuestionsSubtitle}</p>
                  </div>
                </div>

                {/* Enhanced FAQ Links */}
                <div className="space-y-1">
                  {[
                    { text: translations.faq.questions.find(q => q.id === "faq3")?.question || "", href: `/${language}/faq#faq3` },
                    { text: translations.faq.questions.find(q => q.id === "faq12")?.question || "", href: `/${language}/faq#faq12` },
                    { text: translations.faq.questions.find(q => q.id === "faq9")?.question || "", href: `/${language}/faq#faq9` }
                  ].map((faq, index) => (
                    <a 
                      key={index}
                      href={faq.href}
                      className="group/faq block p-4 hover:bg-white/50 transition-all duration-300 border border-transparent hover:border-border/30"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2.5"></div>
                        <div className="flex-1">
                          <p className="text-foreground font-medium text-sm leading-relaxed group-hover/faq:text-primary transition-colors duration-300">
                            {faq.text}
                          </p>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover/faq:text-primary transition-all duration-300 transform translate-x-2 group-hover/faq:translate-x-0">
                          <ChevronDown className="w-4 h-4 text-primary rotate-[-90deg]" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>


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
          {/* Enhanced Section Header */}
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
