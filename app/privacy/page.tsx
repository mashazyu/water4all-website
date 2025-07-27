"use client"

import { useLanguage } from "@/components/language-provider"

export default function Privacy() {
  const { language, translations } = useLanguage()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="font-semibold text-gray-800">{translations.privacyTitle}</h1>

      <div className="prose max-w-none">
        {language === "de" ? (
          <>
            <h2>Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von
              personenbezogenen Daten innerhalb unseres Onlineangebotes auf.
            </p>

            <h3>Verantwortliche</h3>
            <p>
              Berliner Trinkbrunnen Initiative
              <br />
              E-Mail: berlinertrinkbrunnen@gmail.com
            </p>

            <h3>Arten der verarbeiteten Daten</h3>
            <p>
              - Bestandsdaten (z.B., Namen)
              <br />- Kontaktdaten (z.B., E-Mail)
              <br />- Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten)
              <br />- Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen)
            </p>

            <h3>Zweck der Verarbeitung</h3>
            <p>
              - Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte
              <br />- Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern
              <br />- Sicherheitsmaßnahmen
            </p>

            <h3>Cookies</h3>
            <p>
              Diese Website verwendet nur technisch notwendige Cookies, die für den Betrieb der Website erforderlich
              sind.
            </p>

            <h3>Ihre Rechte</h3>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten.
            </p>
          </>
        ) : (
          <>
            <h2>Privacy Policy</h2>
            <p>
              This privacy policy informs you about the nature, scope, and purpose of the processing of personal data
              within our online offering.
            </p>

            <h3>Responsible Party</h3>
            <p>
              Berlin Drinking Fountains Initiative
              <br />
              Email: berlinertrinkbrunnen@gmail.com
            </p>

            <h3>Types of Data Processed</h3>
            <p>
              - Inventory data (e.g., names)
              <br />- Contact data (e.g., email)
              <br />- Usage data (e.g., websites visited, interest in content)
              <br />- Meta/communication data (e.g., device information, IP addresses)
            </p>

            <h3>Purpose of Processing</h3>
            <p>
              - Provision of the online offering, its functions, and content
              <br />- Answering contact requests and communicating with users
              <br />- Security measures
            </p>

            <h3>Cookies</h3>
            <p>
              This website only uses technically necessary cookies that are required for the operation of the website.
            </p>

            <h3>Your Rights</h3>
            <p>
              You have the right to information, correction, deletion, and restriction of the processing of your
              personal data.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
