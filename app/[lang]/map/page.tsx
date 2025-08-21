"use client"

import { useLanguage } from "@/components/language-provider"
import { PageSection } from "@/components/ui/page-section"
import NewsGrid from "@/components/news-grid"
import { MapSection } from "@/components/ui/map-section"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"

export default function MapPage() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Map Section - Full Screen */}
      <FullScreenSection background="gradient">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {translations.map.heroTitle}
            </h1>
          </div>

          {/* Split Screen Layout */}
          <div className="flex flex-col lg:flex-row min-h-[70vh]">
            {/* Left Side - Description and Buttons */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="max-w-lg mx-auto lg:mx-0">
                {/* Description Section */}
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {translations.map.infoSection}
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    {translations.map.googleMapsTitle}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center rounded-lg font-medium block"
                    >
                      {translations.map.addEnglishMap}
                    </a>

                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center rounded-lg font-medium block"
                    >
                      {translations.map.addGermanMap}
                    </a>
                  </div>
                </div>

                {/* FAQ Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-3">
                    <a href="/faq" className="block text-primary hover:text-primary/80 underline font-medium text-sm transition-colors duration-300">
                      {translations.map.howMapWorks}
                    </a>
                    <a href="/faq" className="block text-primary hover:text-primary/80 underline font-medium text-sm transition-colors duration-300">
                      {translations.map.howRemoveMap}
                    </a>
                    <a href="/faq" className="block text-primary hover:text-primary/80 underline font-medium text-sm transition-colors duration-300">
                      {translations.map.moreQuestions}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Map Preview */}
            <div className="lg:w-1/2 bg-white/50 backdrop-blur-sm p-6 lg:p-8 flex items-center justify-center mt-8 lg:mt-0">
              <div className="w-full h-full max-h-[400px] lg:max-h-[500px]">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1v5s3GJCaaJwk2WRFqHz3XiBXYEIuw1Y&ll=52.547946812489116%2C13.452717799999995&z=17"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Berlin Water Sources Map"
                  />
                  {/* Theme Color Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-lg" 
                    style={{ backgroundColor: 'rgba(24, 0, 173, 0.1)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullScreenSection>

      {/* Related News Section - Full Screen */}
      <PageSection 
        title={translations.subprojects.relatedNews}
        titleSize="md"
        accentLineHeight="h-6"
        background="muted"
        fullHeight={true}
        className="snap-start"
      >
        <div className="group">
          <NewsGrid projectFilter={1} limit={3} showViewAllButton={true} />
        </div>
      </PageSection>
    </PageLayout>
  )
}
