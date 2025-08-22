"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getTranslations, languages, type Language, type Translations } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Translations
  toggleLanguage: () => void
  languages: typeof languages
  availableLanguages: Language[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children, 
  initialLanguage 
}: { 
  children: React.ReactNode
  initialLanguage?: Language 
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage || "en")

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage)
      localStorage.setItem("language", initialLanguage)
    } else {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de" || savedLanguage === "ru")) {
        setLanguage(savedLanguage)
      }
    }
  }, [initialLanguage])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "de" : language === "de" ? "ru" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Update language when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const translations = getTranslations(language)
  
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        toggleLanguage,
        languages,
        availableLanguages: Object.keys(languages) as Language[],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
