import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { LanguageProvider } from "@/components/language-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import GoogleAnalyticsComponent from "@/components/google-analytics"
import { languages, type Language } from "@/lib/translations"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({
    lang,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  
  return {
    title: "Wasser für alle",
    description: "Initiative for hydration during hot summer in Berlin",
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      languages: {
        'en': '/en',
        'de': '/de', 
        'ru': '/ru',
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const language = lang as Language
  
  return (
    <html lang={language} suppressHydrationWarning className="bg-white min-h-screen">
      <body className={`${inter.className} bg-white text-foreground min-h-screen flex flex-col antialiased`}>
        <GoogleAnalyticsComponent />
        <LanguageProvider initialLanguage={language}>
          <Navigation />
          <main className="flex-1 container mx-auto px-6 py-16 max-w-6xl bg-white">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
