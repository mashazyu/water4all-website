"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function MapPage() {
  const { language, translations } = useLanguage()

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth">
      <div className="snap-y snap-mandatory">
        {/* Hero Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen flex items-center justify-center" style={{ backgroundColor: "#1800ad" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-7xl md:text-9xl font-black mb-8 text-white tracking-tight leading-none">
              {translations.map.heroTitle}
            </h1>
            <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
              {translations.map.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Information Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen flex items-center justify-center bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-lg leading-relaxed text-gray-700 mb-8 text-center">
              {translations.map.infoSection}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">{translations.map.englishMap}</h3>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      {translations.map.addEnglishMap}
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">{translations.map.germanMap}</h3>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      {translations.map.addGermanMap}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 w-full h-full flex items-center">
            <div className="relative w-full h-4/5 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1v5s3GJCaaJwk2WRFqHz3XiBXYEIuw1Y&ll=52.547946812489116%2C13.452717799999995&z=17"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Links Section */}
        <section className="snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen flex items-center justify-center bg-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="space-y-8">
              <div>
                <Link href="/faq" className="text-xl text-blue-600 hover:text-blue-800 underline font-medium">
                  {translations.map.howMapWorks}
                </Link>
              </div>

              <div>
                <Link href="/faq" className="text-xl text-blue-600 hover:text-blue-800 underline font-medium">
                  {translations.map.howRemoveMap}
                </Link>
              </div>

              <div>
                <Link href="/faq" className="text-xl text-blue-600 hover:text-blue-800 underline font-medium">
                  {translations.map.moreQuestions}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
