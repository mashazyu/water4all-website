"use client"

import { useLanguage } from "@/components/language-provider"
import { trackMapExit } from "@/lib/exit-tracking"
import { PageLayout } from "@/components/ui/page-layout"
import { PageSectionWithContent } from "@/components/ui/page-section"
import { QuickHelpSection } from "@/components/ui/quick-help-section"
import { NewsSection } from "@/components/ui/news-section"
import { ButtonNew } from "@/components/ui/button-new"
import { Skeleton } from "@/components/ui/skeleton"
import { MAP_URLS, getMapEmbedUrl } from "@/lib/constants"
import { useState } from "react"

export default function MapPageClient() {
  const { language, translations } = useLanguage()
  const [isMapLoading, setIsMapLoading] = useState(true)

  // Get the appropriate map embed URL based on user language
  const mapEmbedUrl = getMapEmbedUrl(language)

  // Handler for English map button click with enhanced tracking
  const handleEnglishMapClick = () => {
    trackMapExit('english', language, {
      button_variant: language === 'en' || language === 'ru' ? 'action' : 'regular',
      user_preferred_language: language,
      utm_source: 'map_page',
      utm_medium: 'button_click',
      utm_campaign: 'water_sources_map'
    })
    
    // Small delay to ensure tracking fires before navigation
    setTimeout(() => {
      window.open(MAP_URLS.ENGLISH_MAP, '_blank')
    }, 100)
  }

  // Handler for German map button click with enhanced tracking
  const handleGermanMapClick = () => {
    trackMapExit('german', language, {
      button_variant: language === 'de' ? 'action' : 'regular',
      user_preferred_language: language,
      utm_source: 'map_page',
      utm_medium: 'button_click',
      utm_campaign: 'water_sources_map'
    })
    
    // Small delay to ensure tracking fires before navigation
    setTimeout(() => {
      window.open(MAP_URLS.GERMAN_MAP, '_blank')
    }, 100)
  }

  // Handle iframe load event
  const handleMapLoad = () => {
    setIsMapLoading(false)
  }

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
              onClick={handleEnglishMapClick}
            >
              {translations.map.addEnglishMap}
            </ButtonNew>
            <ButtonNew 
              variant={language === 'de' ? "action" : "regular"}
              size="lg"
              className="w-full"
              onClick={handleGermanMapClick}
            >
              {translations.map.addGermanMap}
            </ButtonNew>
          </div>
          
          {/* Mobile Map Section */}
          <div className="w-full h-96 sm:h-[450px] bg-muted/30 overflow-hidden rounded-lg relative">
            {isMapLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                <div className="text-center space-y-3">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-muted-foreground">{translations.map.loadingMap}</p>
                </div>
              </div>
            )}
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Berlin Water Sources Map"
              onLoad={handleMapLoad}
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
                  onClick={handleEnglishMapClick}
                >
                  {translations.map.addEnglishMap}
                </ButtonNew>
                <ButtonNew 
                  variant={language === 'de' ? "action" : "regular"}
                  size="lg"
                  onClick={handleGermanMapClick}
                >
                  {translations.map.addGermanMap}
                </ButtonNew>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="w-full h-[400px] xl:h-[500px] bg-muted/30 overflow-hidden rounded-lg relative">
              {isMapLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                  <div className="text-center space-y-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-muted-foreground">{translations.map.loadingMap}</p>
                  </div>
                </div>
              )}
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Berlin Water Sources Map"
                onLoad={handleMapLoad}
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
