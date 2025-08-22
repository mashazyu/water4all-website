import { Metadata } from "next"
import { getTranslations, type Language } from "@/lib/translations"

export interface MetadataConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
}

export function generatePageMetadata(
  lang: Language,
  config: MetadataConfig,
  path: string = ''
): Metadata {
  const baseUrl = 'https://www.water4all.com.de'
  const fullUrl = path ? `${baseUrl}/${lang}${path}` : `${baseUrl}/${lang}`

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': '/en',
        'de': '/de',
        'ru': '/ru',
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      locale: lang === "en" ? "en_US" : lang === "de" ? "de_DE" : "ru_RU",
      url: fullUrl,
      type: config.type || 'website',
      images: config.image ? [
        {
          url: config.image,
          width: 1200,
          height: 630,
          alt: config.title,
        }
      ] : undefined,
    },
    twitter: {
      title: config.title,
      description: config.description,
      images: config.image ? [config.image] : undefined,
    },
  }
}

export function generateHomePageMetadata(lang: Language): Metadata {
  const translations = getTranslations(lang)
  
  const langConfig: Record<Language, { title: string; description: string }> = {
    en: {
      title: translations.metadata.homeTitle,
      description: translations.metadata.homeDescription,
    },
    de: {
      title: translations.metadata.homeTitle,
      description: translations.metadata.homeDescription,
    },
    ru: {
      title: translations.metadata.homeTitle,
      description: translations.metadata.homeDescription,
    },
  }

  const config = langConfig[lang]

  return generatePageMetadata(lang, {
    title: config.title,
    description: config.description,
    keywords: translations.metadata.keywords,
    image: '/android-chrome-512x512.png',
  })
}

export function generateMapPageMetadata(lang: Language): Metadata {
  const translations = getTranslations(lang)
  
  const langConfig: Record<Language, { title: string; description: string }> = {
    en: {
      title: translations.metadata.mapTitle,
      description: translations.metadata.mapDescription,
    },
    de: {
      title: translations.metadata.mapTitle,
      description: translations.metadata.mapDescription,
    },
    ru: {
      title: translations.metadata.mapTitle,
      description: translations.metadata.mapDescription,
    },
  }

  const config = langConfig[lang]

  return generatePageMetadata(lang, {
    title: config.title,
    description: config.description,
    keywords: translations.metadata.keywords,
    image: '/android-chrome-512x512.png',
  })
}
