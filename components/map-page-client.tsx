"use client"

import { useLanguage } from "@/components/language-provider"
import { PageLayout } from "@/components/ui/page-layout"
import { PageSectionWithContent } from "@/components/ui/page-section"
import { QuickHelpSection } from "@/components/ui/quick-help-section"
import { NewsSection } from "@/components/ui/news-section"
import { ButtonNew } from "@/components/ui/button-new"
import { MAP_URLS } from "@/lib/constants"

export default function MapPageClient() {
  const { language, translations } = useLanguage()

  return (
    <PageLayout>
      {/* Main Map Section */}
      <PageSectionWithContent 
        background="default"
        title={translations.map.heroTitle}
        titleAlignment="left"
      >
        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {/* Mobile Description Text */}
          <div className="text-lg text-muted-foreground leading-relaxed">
            {translations.map.infoSection}
          </div>
          
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
          
          {/* Mobile Map Section */}
          <div className="w-full h-96 sm:h-[450px] bg-muted/30 overflow-hidden rounded-lg">
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

        {/* Tablet & Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
            {/* Left Side - Text Content Column */}
            <div className="flex flex-col justify-between min-h-[400px] xl:h-[500px]">
              {/* Description Text */}
              <div className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
                {translations.map.infoSection}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-row gap-4 max-w-md">
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

            {/* Right Side - Map */}
            <div className="w-full h-[400px] xl:h-[500px] bg-muted/30 overflow-hidden rounded-lg">
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
      </PageSectionWithContent>

      {/* Quick Help Section */}
      <QuickHelpSection background="muted" />

      {/* Related News Section */}
      <NewsSection background="default" limit={3} showViewAllButton={true} projectFilter={1} />
    </PageLayout>
  )
}
