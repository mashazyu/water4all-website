"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function MapPage() {
  const { language, translations } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container with Width Constraint */}
      <div className="max-w-4xl mx-auto">
        {/* Split Screen Layout */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Side - Description and Buttons */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="max-w-lg mx-auto lg:mx-0">
              {/* Description Section */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {translations.map.heroTitle}
                </h1>
                <p className="text-base leading-relaxed text-gray-700">
                  {translations.map.infoSection}
                </p>
              </div>

              {/* Buttons Section */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {translations.map.googleMapsTitle}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-base" 
                    asChild
                  >
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      {translations.map.addEnglishMap}
                    </Link>
                  </Button>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-base" 
                    asChild
                  >
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      {translations.map.addGermanMap}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* FAQ Links */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <Link href="/faq" className="block text-blue-600 hover:text-blue-800 underline font-medium text-sm">
                    {translations.map.howMapWorks}
                  </Link>
                  <Link href="/faq" className="block text-blue-600 hover:text-blue-800 underline font-medium text-sm">
                    {translations.map.howRemoveMap}
                  </Link>
                  <Link href="/faq" className="block text-blue-600 hover:text-blue-800 underline font-medium text-sm">
                    {translations.map.moreQuestions}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Map Preview */}
          <div className="lg:w-1/2 bg-gray-50 p-4 lg:p-6 flex items-center justify-center">
            <div className="w-full h-full max-h-[400px] lg:max-h-[500px]">
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
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
    </div>
  )
}
