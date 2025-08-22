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
  // Metadata
  metadata: {
    homeTitle: string
    homeDescription: string
    mapTitle: string
    mapDescription: string
    keywords: string[]
  }
  
  // Navigation
  navigation: {
    home: string
    subproject1: string
    subproject2: string
    news: string
    about: string
    faq: string
    cookies: string
    switchLanguage: string
  }
  
  // Footer
  footer: {
    contact: string
    email: string
    cookies: string
    privacy: string
    description: string
    quickLinks: string
    map: string
    installation: string
    news: string
    rights: string
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
    loadingTitle: string
    loadingText: string
  }
  
  // Subproject pages
  subprojects: {
    subproject1FullDescription: string
    subproject1Details: string
    subproject2FullDescription: string
    subproject2Details: string
    relatedNews: string
    viewAllNews: string
  }
  
  // Map page
  map: {
    heroTexts: Array<{
      title: string
      subtitle: string
    }>
    heroTitle: string
    heroSubtitle: string
    infoSection: string
    googleMapsTitle: string
    englishMap: string
    germanMap: string
    addEnglishMap: string
    addGermanMap: string
    faqSectionTitle: string
    howMapWorks: string
    howRemoveMap: string
    moreQuestions: string
    footerCopyright: string
    contactEmail: string
    socialProof: string
    quickHelpTitle: string
    mapFeatures: string
    betaTesting: string
    waterSourceGuide: string

    whatYouGetTitle: string
    quickAnswersTitle: string
    commonQuestionsSubtitle: string
    freeToUse: string
    mapDescription: string
  }
  
  // About page
  about: {
    title: string
    intro: string
    programInfo: string
    programDescription: string
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
    email: string
  }
  
  // FAQ page
  faq: {
    title: string
    intro: string
    viewAllFaqs: string
    projectFaqsTitle: string
    mapFaqsTitle: string
    questions: Array<{
      id: string
      question: string
      answer: string
      category: string
    }>
  }
  
  // News
  news: NewsItem[]
  
  // News page
  newsPage: {
    title: string
    intro: string
    loadMore: string
  }
  
  // Cookies page
  cookies: {
    title: string
    intro: string
    whatAreCookies: string
    whatAreCookiesContent: string
    howWeUse: string
    howWeUseContent: string
    types: string
    essential: {
      title: string
      description: string
      duration: string
    }
    analytics: {
      title: string
      description: string
      duration: string
      provider: string
    }
    specificCookies: string
    table: {
      name: string
      purpose: string
      duration: string
      type: string
      analytics: string
      gaPurpose: string
      gaContainerPurpose: string
      gidPurpose: string
      gatPurpose: string
    }
    managing: {
      browser: string
      browserContent: string
      gaOptOut: string
      gaOptOutContent: string
      gaOptOutLink: string
    }
    updates: string
    updatesContent: string
    contact: string
    contactContent: string
  }
  
  // Cookie consent banner
  cookieConsent: {
    title: string
    description: string
    learnMore: string
    acceptAll: string
    essentialOnly: string
    decline: string
    updatePreferences: string
  }
}

const translations = {
  en: enTranslations as Translations,
  de: deTranslations as Translations,
  ru: ruTranslations as Translations,
}

export function getTranslations(language: Language): Translations {
  const result = translations[language]
  if (!result) {
    console.error(`Translations not found for language: ${language}`)
    return translations.en // fallback to English
  }
  return result
}

export const languages = {
  en: { code: "en", name: "English", nativeName: "English" },
  de: { code: "de", name: "German", nativeName: "Deutsch" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский" },
} 