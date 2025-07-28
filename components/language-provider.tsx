"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "de" | "ru"

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
    faq: "FAQ",
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

    // FAQ page
    faqTitle: "Frequently Asked Questions",
    faqIntro: "Find answers to common questions about our drinking fountains initiative.",

    // FAQ Questions and Answers
    faq1Question: "How can I find drinking fountains near me?",
    faq1Answer:
      "We're working on adding all drinking fountains and refill stations to Google Maps. You can also check the official Berlin Water Works website or use apps like Refill Deutschland.",

    faq2Question: "Are the drinking fountains safe to use?",
    faq2Answer:
      "Yes, all public drinking fountains in Berlin are regularly tested and maintained by the Berlin Water Works (Berliner Wasserbetriebe). The water quality meets all EU drinking water standards.",

    faq3Question: "How can I suggest a new location for a drinking fountain?",
    faq3Answer:
      "You can contact your local district office (Bezirksamt) or reach out to us directly. We collect suggestions and forward them to the appropriate authorities.",

    faq4Question: "What is a refill station?",
    faq4Answer:
      "Refill stations are businesses, cafes, or public buildings that allow people to refill their water bottles for free. Look for the Refill sticker in windows.",

    faq5Question: "How can I support your initiative?",
    faq5Answer:
      "You can help by spreading awareness, suggesting new fountain locations, or volunteering to help us map existing water sources. Contact us at berlinertrinkbrunnen@gmail.com.",

    faq6Question: "Why focus on Pankow district?",
    faq6Answer:
      "We're starting with Pankow as a pilot project because we live there and can better assess the local needs. We plan to expand to other districts based on our experience.",

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
    faq: "FAQ",
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
    latestNews: "Aktuelle Meldungen",

    // Subproject pages
    subproject1FullDescription:
      "Obwohl Berlin viele kostenlose Trinkwasserstellen bietet, sind Informationen darüber oft schwer zu finden – insbesondere auf Plattformen, die täglich genutzt werden, wie Google Maps.",
    subproject1Details:
      "Unser Projekt greift dieses praktische Problem auf, indem wir bestehende Refill-Stationen in Google Maps eintragen und sie für Berliner:innen und Besucher:innen sichtbarer machen. Wir haben bereits Trinkbrunnen der Berliner Wasserbetriebe eingetragen und möchten eine umfassende Übersicht über kostenlose Wasserquellen in Berlin schaffen.",

    subproject2FullDescription:
      "Ein weiterer Teil unserer Initiative ist die Förderung der Einrichtung neuer Trinkbrunnen an stark frequentierten Orten in Pankow.",
    subproject2Details:
      "Wir planen, mit diesem Anliegen sowohl die Berliner Wasserbetriebe als auch das Bezirksamt Pankow zu kontaktieren. Wir sind inspiriert von ähnlichen erfolgreichen Projekten in anderen Bezirken wie Neukölln.",

    relatedNews: "Verwandte Meldungen",

    // About page
    aboutTitle: "Über unsere Initiative",
    aboutIntro: "Erfahren Sie mehr über unser Projekt und das Team hinter der Berliner Trinkbrunnen Initiative.",

    // Privacy page
    privacyTitle: "Datenschutzerklärung",

    // FAQ page
    faqTitle: "Häufig gestellte Fragen",
    faqIntro: "Hier finden Sie Antworten auf häufige Fragen zu unserer Trinkbrunnen-Initiative.",

    // FAQ Questions and Answers
    faq1Question: "Wie finde ich Trinkbrunnen in meiner Nähe?",
    faq1Answer:
      "Wir arbeiten daran, alle Trinkbrunnen und Refill-Stationen in Google Maps einzutragen. Sie können auch die offizielle Website der Berliner Wasserbetriebe besuchen oder Apps wie Refill Deutschland nutzen.",

    faq2Question: "Sind die Trinkbrunnen sicher zu benutzen?",
    faq2Answer:
      "Ja, alle öffentlichen Trinkbrunnen in Berlin werden regelmäßig von den Berliner Wasserbetrieben getestet und gewartet. Die Wasserqualität entspricht allen EU-Trinkwasserstandards.",

    faq3Question: "Wie kann ich einen neuen Standort für einen Trinkbrunnen vorschlagen?",
    faq3Answer:
      "Sie können sich an Ihr örtliches Bezirksamt wenden oder uns direkt kontaktieren. Wir sammeln Vorschläge und leiten sie an die zuständigen Behörden weiter.",

    faq4Question: "Was ist eine Refill-Station?",
    faq4Answer:
      "Refill-Stationen sind Geschäfte, Cafés oder öffentliche Gebäude, die Menschen erlauben, ihre Wasserflaschen kostenlos nachzufüllen. Achten Sie auf den Refill-Aufkleber in den Fenstern.",

    faq5Question: "Wie kann ich Ihre Initiative unterstützen?",
    faq5Answer:
      "Sie können helfen, indem Sie Bewusstsein schaffen, neue Brunnenstandorte vorschlagen oder sich freiwillig melden, um uns beim Kartieren bestehender Wasserquellen zu helfen. Kontaktieren Sie uns unter berlinertrinkbrunnen@gmail.com.",

    faq6Question: "Warum konzentrieren Sie sich auf den Bezirk Pankow?",
    faq6Answer:
      "Wir beginnen mit Pankow als Pilotprojekt, weil wir dort leben und die lokalen Bedürfnisse besser einschätzen können. Wir planen, basierend auf unseren Erfahrungen auf andere Bezirke zu expandieren.",

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
  ru: {
    // Navigation
    home: "Главная",
    subproject1: "Карта источников воды",
    subproject2: "Питьевые фонтанчики",
    about: "О нас",
    faq: "FAQ",
    switchLanguage: "English",

    // Footer
    contact: "Контакты",
    email: "Email",
    privacy: "Политика конфиденциальности",

    // Home page
    projectTitle: "Инициатива питьевых фонтанчиков Берлина",
    projectIntro:
      "Наша инициатива направлена на улучшение доступа к бесплатной питьевой воде в Берлине, помогая людям оставаться гидратированными и прохладными в жаркие летние дни. Мы сосредоточены на том, чтобы сделать информацию о существующих источниках воды более доступной и выступаем за установку новых питьевых фонтанчиков в общественных местах.",
    subproject1Title: "Карта источников воды",
    subproject1Description:
      "Мы работаем над тем, чтобы сделать информацию о бесплатных источниках питьевой воды в Берлине более доступной, добавляя станции пополнения в Google Maps.",
    subproject2Title: "Общественные питьевые фонтанчики",
    subproject2Description:
      "Мы выступаем за установку новых питьевых фонтанчиков в местах с высокой проходимостью в Панкове для обеспечения бесплатного доступа к питьевой воде.",
    learnMore: "Узнать больше",
    latestNews: "Последние новости",

    // Subproject pages
    subproject1FullDescription:
      "Хотя Берлин предлагает множество бесплатных точек питьевой воды, информацию о них часто трудно найти - особенно на платформах, которые используются ежедневно, таких как Google Maps.",
    subproject1Details:
      "Наш проект решает эту практическую проблему, добавляя существующие станции пополнения в Google Maps, делая их более видимыми для берлинцев и посетителей. Мы уже добавили питьевые фонтанчики от Berliner Wasserbetriebe и стремимся создать комплексный обзор бесплатных источников воды в Берлине.",

    subproject2FullDescription:
      "Другая часть нашей инициативы - продвижение установки новых питьевых фонтанчиков в местах с высокой проходимостью в Панкове.",
    subproject2Details:
      "Мы планируем связаться как с Berliner Wasserbetriebe, так и с районным управлением Панкова с этим вопросом. Мы вдохновлены похожими успешными проектами в других районах, таких как Нойкёльн.",

    relatedNews: "Связанные новости",

    // About page
    aboutTitle: "О нашей инициативе",
    aboutIntro: "Узнайте больше о нашем проекте и команде, стоящей за инициативой питьевых фонтанчиков Берлина.",

    // Privacy page
    privacyTitle: "Политика конфиденциальности",

    // FAQ page
    faqTitle: "Часто задаваемые вопросы",
    faqIntro: "Найдите ответы на общие вопросы о нашей инициативе питьевых фонтанчиков.",

    // FAQ Questions and Answers
    faq1Question: "Как найти питьевые фонтанчики рядом со мной?",
    faq1Answer:
      "Мы работаем над добавлением всех питьевых фонтанчиков и станций пополнения в Google Maps. Вы также можете проверить официальный сайт Berlin Water Works или использовать приложения, такие как Refill Deutschland.",

    faq2Question: "Безопасно ли пользоваться питьевыми фонтанчиками?",
    faq2Answer:
      "Да, все общественные питьевые фонтанчики в Берлине регулярно тестируются и обслуживаются Berlin Water Works (Berliner Wasserbetriebe). Качество воды соответствует всем стандартам питьевой воды ЕС.",

    faq3Question: "Как я могу предложить новое место для питьевого фонтанчика?",
    faq3Answer:
      "Вы можете связаться с местным районным управлением (Bezirksamt) или обратиться к нам напрямую. Мы собираем предложения и передаем их соответствующим властям.",

    faq4Question: "Что такое станция пополнения?",
    faq4Answer:
      "Станции пополнения - это предприятия, кафе или общественные здания, которые позволяют людям бесплатно пополнять свои бутылки с водой. Ищите наклейку Refill в окнах.",

    faq5Question: "Как я могу поддержать вашу инициативу?",
    faq5Answer:
      "Вы можете помочь, распространяя информацию, предлагая новые места для фонтанчиков или добровольно помогая нам наносить на карту существующие источники воды. Свяжитесь с нами по адресу berlinertrinkbrunnen@gmail.com.",

    faq6Question: "Почему вы сосредоточились на районе Панков?",
    faq6Answer:
      "Мы начинаем с Панкова как пилотного проекта, потому что мы живем там и можем лучше оценить местные потребности. Мы планируем расшириться на другие районы на основе нашего опыта.",

    // News
    newsTitle1: "Проект картографирования начат",
    newsContent1: "Мы начали добавлять первые питьевые фонтанчики в Google Maps для улучшения видимости.",
    newsTitle2: "Встреча с Berliner Wasserbetriebe",
    newsContent2: "Продуктивное обсуждение потенциальных новых мест для фонтанчиков в Панкове.",
    newsTitle3: "Общественный семинар",
    newsContent3: "Присоединяйтесь к нам на семинаре по сохранению воды и доступности 30 июля.",
    newsTitle4: "Сбор данных завершен",
    newsContent4: "Мы завершили сбор данных о всех существующих станциях пополнения в центральном Берлине.",
    newsTitle5: "Предложение подано",
    newsContent5: "Наше предложение о пяти новых питьевых фонтанчиках было подано в районное управление.",
    newsTitle6: "Запуск летней кампании",
    newsContent6: "Наша кампания по информированию о поддержании гидратации запускается на следующей неделе.",
  },
}

const languages = {
  en: { code: "en", name: "English", nativeName: "English" },
  de: { code: "de", name: "German", nativeName: "Deutsch" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский" },
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
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de" || savedLanguage === "ru")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "de" : language === "de" ? "ru" : "en"
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
