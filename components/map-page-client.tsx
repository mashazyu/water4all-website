"use client"

import { useLanguage } from "@/components/language-provider"
import { PageSection } from "@/components/ui/page-section"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { QuickHelpSection } from "@/components/ui/quick-help-section"
import { NewsSection } from "@/components/ui/news-section"
import { ButtonNew } from "@/components/ui/button-new"
import { MAP_URLS } from "@/lib/constants"

export default function MapPageClient() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Hero Section - Mobile */}
      <PageSection background="default" className="max-md:block md:hidden">
        <div className="max-w-6xl mx-auto px-2 md:px-8 lg:px-12 w-full">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {translations.map.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {translations.map.infoSection}
            </p>
            
            {/* Mobile CTA Buttons */}
            <div className="space-y-3">
              <ButtonNew 
                variant={language === 'en' || language === 'ru' ? "action" : "regular"}
                size="lg"
                className="w-full"
                onClick={() => window.open(MAP_URLS.ENGLISH_MAP, '_blank')}
              >
                {translations.map.addEnglishMap}
              </ButtonNew>
              <ButtonNew 
                variant={language === 'de' ? "action" : "regular"}
                size="lg"
                className="w-full"
                onClick={() => window.open(MAP_URLS.GERMAN_MAP, '_blank')}
              >
                {translations.map.addGermanMap}
              </ButtonNew>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-8">
            <div className="w-full h-96 sm:h-[450px] lg:h-[450px] bg-muted/30 overflow-hidden">
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
      </PageSection>

      {/* Tablet & Desktop: Split Layout */}
      <FullScreenSection background="default" className="max-md:hidden md:block">
        <div className="min-h-screen bg-background flex flex-col">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">
            <div className="flex min-h-screen">
              {/* Left Side - Content */}
              <div className="w-1/2 flex items-center justify-center pr-8">
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
                    <ButtonNew 
                      variant={language === 'en' || language === 'ru' ? "action" : "regular"}
                      size="lg"
                      onClick={() => window.open(MAP_URLS.ENGLISH_MAP, '_blank')}
                    >
                      {translations.map.addEnglishMap}
                    </ButtonNew>
                    <ButtonNew 
                      variant={language === 'de' ? "action" : "regular"}
                      size="lg"
                      onClick={() => window.open(MAP_URLS.GERMAN_MAP, '_blank')}
                    >
                      {translations.map.addGermanMap}
                    </ButtonNew>
                  </div>
                </div>
              </div>

              {/* Right Side - Map */}
              <div className="w-1/2 flex items-center justify-center pl-8">
                <div className="w-full h-[500px] bg-muted/30 overflow-hidden rounded-lg">
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
      <QuickHelpSection background="muted" />

      {/* Related News Section */}
      <NewsSection background="default" limit={3} showViewAllButton={true} />
    </PageLayout>
  )
}
