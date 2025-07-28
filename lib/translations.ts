import enTranslations from '../locales/en.json'
import deTranslations from '../locales/de.json'
import ruTranslations from '../locales/ru.json'

export type Language = "en" | "de" | "ru"

export type NewsItem = {
  id: number
  title: string
  content: string
  date: string
  project: number[] // Array of project IDs (1 and/or 2)
}

export type Translations = {
  // Navigation
  navigation: {
    home: string
    subproject1: string
    subproject2: string
    about: string
    faq: string
    switchLanguage: string
  }
  
  // Footer
  footer: {
    contact: string
    email: string
    privacy: string
  }
  
  // Home page
  home: {
    projectTitle: string
    projectIntro: string
    subproject1Title: string
    subproject1Description: string
    subproject2Title: string
    subproject2Description: string
    learnMore: string
    latestNews: string
  }
  
  // Subproject pages
  subprojects: {
    subproject1FullDescription: string
    subproject1Details: string
    subproject2FullDescription: string
    subproject2Details: string
    relatedNews: string
  }
  
  // About page
  about: {
    title: string
    intro: string
  }
  
  // Privacy page
  privacy: {
    title: string
    intro: string
    responsibleParty: string
    responsiblePartyContent: string
    dataProcessed: string
    dataProcessedContent: string
    analyticsService: string
    analyticsServiceContent: string
    purposeOfProcessing: string
    purposeOfProcessingContent: string
    cookies: string
    cookiesContent: string
    yourRights: string
    yourRightsIntro: string
    yourRightsList: string
    contactInfo: string
  }
  
  // FAQ page
  faq: {
    title: string
    intro: string
    questions: {
      faq1Question: string
      faq1Answer: string
      faq2Question: string
      faq2Answer: string
      faq5Question: string
      faq5Answer: string
      faq6Question: string
      faq6Answer: string
    }
  }
  
  // News
  news: NewsItem[]
}

const translations = {
  en: enTranslations as Translations,
  de: deTranslations as Translations,
  ru: ruTranslations as Translations,
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}

export const languages = {
  en: { code: "en", name: "English", nativeName: "English" },
  de: { code: "de", name: "German", nativeName: "Deutsch" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский" },
} 