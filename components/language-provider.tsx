"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "de" | "fr" | "es" // Example of easily expandable languages

type Translations = {
  [key: string]: string
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    subproject1: "Water Sources Map",
    subproject2: "Drinking Fountains",
    about: "About",
    switchLanguage: "Deutsch",

    // Footer
    contact: "Contact",
    email: "Email",
    privacy: "Privacy Policy",

    // Home page
    projectTitle: "Berlin Drinking Fountains Initiative",
    projectIntro:
      "Our initiative aims to improve access to free drinking water in Berlin, helping people stay hydrated and cool during hot summer days. We focus on making information about existing water sources more accessible and advocating for new drinking fountains in public spaces.",
    subproject1Title: "Water Sources Map",
    subproject1Description:
      "We're working to make information about free drinking water sources in Berlin more accessible by adding refill stations to Google Maps.",
    subproject2Title: "Public Drinking Fountains",
    subproject2Description:
      "We're advocating for the installation of new drinking fountains in high-traffic areas in Pankow to provide free access to drinking water.",
    learnMore: "Learn More",
    latestNews: "Latest News",

    // Subproject pages
    subproject1FullDescription:
      "Although Berlin offers many free drinking water points, information about them is often difficult to find - especially on platforms that are used daily, such as Google Maps.",
    subproject1Details:
      "Our project addresses this practical problem by adding existing refill stations to Google Maps, making them more visible for Berliners and visitors. We've already added drinking fountains from Berliner Wasserbetriebe and aim to create a comprehensive overview of free water sources in Berlin.",

    subproject2FullDescription:
      "Another part of our initiative is promoting the installation of new drinking fountains in high-traffic areas in Pankow.",
    subproject2Details:
      "We plan to contact both Berliner Wasserbetriebe and the Pankow district office with this concern. We're inspired by similar successful projects in other districts like Neukölln.",

    relatedNews: "Related News",

    // About page
    aboutTitle: "About Our Initiative",
    aboutIntro: "Learn more about our project and the team behind the Berlin Drinking Fountains Initiative.",

    // Privacy page
    privacyTitle: "Privacy Policy",

    // News
    newsTitle1: "Mapping Project Started",
    newsContent1: "We've begun adding the first drinking fountains to Google Maps to improve visibility.",
    newsTitle2: "Meeting with Berliner Wasserbetriebe",
    newsContent2: "Productive discussion about potential new fountain locations in Pankow.",
    newsTitle3: "Community Workshop",
    newsContent3: "Join us for a workshop on water conservation and accessibility on July 30.",
    newsTitle4: "Data Collection Complete",
    newsContent4: "We've finished collecting data on all existing refill stations in central Berlin.",
    newsTitle5: "Proposal Submitted",
    newsContent5: "Our proposal for five new drinking fountains has been submitted to the district office.",
    newsTitle6: "Summer Campaign Launch",
    newsContent6: "Our awareness campaign about staying hydrated launches next week.",
  },
  de: {
    // Navigation
    home: "Startseite",
    subproject1: "Wasserquellen-Karte",
    subproject2: "Trinkbrunnen",
    about: "Über uns",
    switchLanguage: "English",

    // Footer
    contact: "Kontakt",
    email: "E-Mail",
    privacy: "Datenschutzerklärung",

    // Home page
    projectTitle: "Berliner Trinkbrunnen Initiative",
    projectIntro:
      "Unsere Initiative zielt darauf ab, den Zugang zu kostenlosem Trinkwasser in Berlin zu verbessern und Menschen zu helfen, während heißer Sommertage hydratisiert und kühl zu bleiben. Wir konzentrieren uns darauf, Informationen über bestehende Wasserquellen zugänglicher zu machen und uns für neue Trinkbrunnen im öffentlichen Raum einzusetzen.",
    subproject1Title: "Wasserquellen-Karte",
    subproject1Description:
      "Wir arbeiten daran, Informationen über kostenlose Trinkwasserquellen in Berlin zugänglicher zu machen, indem wir Refill-Stationen in Google Maps eintragen.",
    subproject2Title: "Öffentliche Trinkbrunnen",
    subproject2Description:
      "Wir setzen uns für die Installation neuer Trinkbrunnen an stark frequentierten Orten in Pankow ein, um kostenlosen Zugang zu Trinkwasser zu ermöglichen.",
    learnMore: "Mehr erfahren",
    latestNews: "Neueste Nachrichten",

    // Subproject pages
    subproject1FullDescription:
      "Obwohl Berlin viele kostenlose Trinkwasserstellen bietet, sind Informationen darüber oft schwer zu finden – insbesondere auf Plattformen, die täglich genutzt werden, wie Google Maps.",
    subproject1Details:
      "Unser Projekt greift dieses praktische Problem auf, indem wir bestehende Refill-Stationen in Google Maps eintragen und sie für Berliner:innen und Besucher:innen sichtbarer machen. Wir haben bereits Trinkbrunnen der Berliner Wasserbetriebe eingetragen und möchten eine umfassende Übersicht über kostenlose Wasserquellen in Berlin schaffen.",

    subproject2FullDescription:
      "Ein weiterer Teil unserer Initiative ist die Förderung der Einrichtung neuer Trinkbrunnen an stark frequentierten Orten in Pankow.",
    subproject2Details:
      "Wir planen, mit diesem Anliegen sowohl die Berliner Wasserbetriebe als auch das Bezirksamt Pankow zu kontaktieren. Wir sind inspiriert von ähnlichen erfolgreichen Projekten in anderen Bezirken wie Neukölln.",

    relatedNews: "Verwandte Nachrichten",

    // About page
    aboutTitle: "Über unsere Initiative",
    aboutIntro: "Erfahren Sie mehr über unser Projekt und das Team hinter der Berliner Trinkbrunnen Initiative.",

    // Privacy page
    privacyTitle: "Datenschutzerklärung",

    // News
    newsTitle1: "Kartierungsprojekt gestartet",
    newsContent1:
      "Wir haben begonnen, die ersten Trinkbrunnen in Google Maps einzutragen, um die Sichtbarkeit zu verbessern.",
    newsTitle2: "Treffen mit den Berliner Wasserbetrieben",
    newsContent2: "Produktive Diskussion über mögliche neue Brunnenstandorte in Pankow.",
    newsTitle3: "Community-Workshop",
    newsContent3: "Nehmen Sie an unserem Workshop zu Wasserschutz und Zugänglichkeit am 30. Juli teil.",
    newsTitle4: "Datenerfassung abgeschlossen",
    newsContent4:
      "Wir haben die Erfassung von Daten zu allen bestehenden Refill-Stationen im Zentrum Berlins abgeschlossen.",
    newsTitle5: "Vorschlag eingereicht",
    newsContent5: "Unser Vorschlag für fünf neue Trinkbrunnen wurde beim Bezirksamt eingereicht.",
    newsTitle6: "Start der Sommerkampagne",
    newsContent6: "Unsere Aufklärungskampagne zum Thema Hydration startet nächste Woche.",
  },
}

const languages = {
  en: { code: "en", name: "English", nativeName: "English" },
  de: { code: "de", name: "German", nativeName: "Deutsch" },
  // fr: { code: "fr", name: "French", nativeName: "Français" },
  // es: { code: "es", name: "Spanish", nativeName: "Español" },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Translations
  toggleLanguage: () => void
  languages: typeof languages
  availableLanguages: Language[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "de" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations: translations[language],
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
