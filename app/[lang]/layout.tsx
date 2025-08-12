import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { getTranslations } from "@/lib/translations"
import { languages, type Language } from "@/lib/translations"
import { LanguageProvider } from "@/components/language-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import GTMUTMTracker from "@/components/gtm-utm-tracker"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>
}) {
  const { lang } = await params
  const translations = getTranslations(lang)

  return {
    title: "Wasser für alle",
    description: "Initiative for hydration during hot summer in Berlin",
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Language }
}) {
  const { lang: language } = await params
  const translations = getTranslations(language)

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${language}';`
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-KQG89G74"
          height="0" 
          width="0" 
          style={{display:'none',visibility:'hidden'}}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      <GTMUTMTracker />
      <LanguageProvider initialLanguage={language}>
        <Navigation />
        <main className="flex-1 bg-background">{children}</main>
        <Footer />
        <CookieConsent />
      </LanguageProvider>
    </>
  )
}
