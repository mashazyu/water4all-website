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
    title: translations.metadata.homeTitle,
    description: translations.metadata.homeDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'de': '/de',
        'ru': '/ru',
      },
    },
    openGraph: {
      title: translations.metadata.homeTitle,
      description: translations.metadata.homeDescription,
      locale: lang === "en" ? "en_US" : lang === "de" ? "de_DE" : "ru_RU",
      url: `https://www.water4all.com.de/${lang}`,
    },
    twitter: {
      title: translations.metadata.homeTitle,
      description: translations.metadata.homeDescription,
    },
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
      <GTMUTMTracker />
      <LanguageProvider initialLanguage={language}>
        <Navigation />
        <main className="bg-background">{children}</main>
        <Footer />
        <CookieConsent />
      </LanguageProvider>
    </>
  )
}
