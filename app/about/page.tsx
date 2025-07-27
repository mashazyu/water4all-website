"use client"

import { useLanguage } from "@/components/language-provider"

export default function About() {
  const { language, translations } = useLanguage()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="font-semibold text-gray-800">{translations.aboutTitle}</h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 leading-relaxed">{translations.aboutIntro}</p>

        {language === "de" ? (
          <>
            <p>
              Wir, Nina und Maria, arbeiten derzeit an einem zivilgesellschaftlichen Projekt, das das Ziel verfolgt,
              Informationen über kostenlose Trinkwasserquellen in Berlin besser zugänglich zu machen. Im Rahmen unserer
              Teilnahme am Programm „Politische Partizipation" von Dialog e. V. möchten wir Sie um Unterstützung bitten:
              Wir möchten die Refill-Stationen für Berliner:innen und Gäste der Stadt durch die Eintragung in Google
              Maps sichtbarer machen.
            </p>

            <h2>Unser Projekt</h2>
            <p>
              1. Unser Projekt greift ein praktisches und aktuelles Problem auf: Obwohl Berlin viele kostenlose
              Trinkwasserstellen bietet, sind Informationen darüber oft schwer zu finden – insbesondere auf Plattformen,
              die täglich genutzt werden, wie Google Maps. Trotz einiger Datenschutzbedenken ist Google Maps das
              meistgenutzte Navigationsmittel für Einheimische und Tourist:innen. Unsere Recherche hat ergeben, dass es
              auf dieser Plattform nur sehr wenige Informationen zu kostenlosen Wasserquellen gibt.
            </p>

            <p>
              Um diese Informationslücke zu schließen, möchten wir die bestehenden Refill-Stationen gerne in Google Maps
              eintragen. So können noch mehr Menschen ihre Flaschen nachfüllen. Was halten Sie davon, wenn wir
              bestehende Refill-Stationen in die Google Maps eintragen würden?
            </p>

            <p>
              Wenn Sie damit einverstanden sind, könnten Sie uns bitte eine KMZ- oder KML-Datei mit den Berliner
              Refill-Standorten zur Verfügung stellen? Wenn diese Daten nicht verfügbar sind, ist es in Ordnung, wenn
              wir die Karte von Morgen kontaktieren und um die Einschaltung eines Regional- oder Themen-Piloten bitten,
              sodass wir die benötigten Daten selber herunterladen können.
            </p>

            <p>
              Zur besseren Einordnung: Wir haben bereits Trinkbrunnen der Berliner Wasserbetriebe in Google Maps
              eingetragen. Damit möchten wir eine umfassende Übersicht über kostenlose Wasserquellen in Berlin schaffen.
            </p>

            <p>
              2. Ein weiterer Teil unseres Projekts ist die Förderung der Einrichtung neuer Trinkbrunnen an stark
              frequentierten Orten in Pankow. Wir haben gesehen, dass Tip:Tap bereits an einem ähnlichen Projekt in
              Neukölln beteiligt war – das hat uns sehr beeindruckt. Deshalb wenden wir uns an Sie und bitten um Ihren
              Rat:
            </p>

            <p>
              Wir planen, mit diesem Anliegen sowohl die Berliner Wasserbetriebe als auch das Bezirksamt Pankow zu
              kontaktieren. Halten Sie diesen Ansatz für sinnvoll oder würden Sie uns eine andere Vorgehensweise
              empfehlen?
            </p>

            <h2>Über uns und das Programm „Politische Partizipation"</h2>
            <p>
              Wir nehmen am Programm „Politische Partizipation" des Club Dialog e. V. teil (weitere Informationen: Club
              Dialog – Politische Partizipation). Das Programm stärkt die politische und gesellschaftliche Teilhabe der
              russischsprachigen Community in Berlin. Es behandelt Themen von Demokratie und Zivilgesellschaft bis hin
              zu praktischen Fähigkeiten für die Umsetzung eigener Projekte.
            </p>

            <p>
              Für Ihre Aufmerksamkeit und Ihre Unterstützung danken wir Ihnen herzlich und freuen uns sehr auf Ihre
              Rückmeldung und Ihren Rat.
            </p>
          </>
        ) : (
          <>
            <p>
              We, Nina and Maria, are currently working on a civil society project that aims to make information about
              free drinking water sources in Berlin more accessible. As part of our participation in the "Political
              Participation" program of Dialog e.V., we would like to ask for your support: We want to make refill
              stations more visible for Berliners and visitors to the city by adding them to Google Maps.
            </p>

            <h2>Our Project</h2>
            <p>
              1. Our project addresses a practical and current problem: Although Berlin offers many free drinking water
              points, information about them is often difficult to find - especially on platforms that are used daily,
              such as Google Maps. Despite some privacy concerns, Google Maps is the most used navigation tool for
              locals and tourists. Our research has shown that there is very little information about free water sources
              on this platform.
            </p>

            <p>
              To close this information gap, we would like to add the existing refill stations to Google Maps. This way,
              more people can refill their bottles. What do you think about us adding existing refill stations to Google
              Maps?
            </p>

            <p>
              If you agree, could you please provide us with a KMZ or KML file with the Berlin refill locations? If this
              data is not available, it is okay if we contact the Map of Tomorrow and ask for a regional or thematic
              pilot to be activated so that we can download the needed data ourselves.
            </p>

            <p>
              For better context: We have already added drinking fountains from Berliner Wasserbetriebe to Google Maps.
              With this, we want to create a comprehensive overview of free water sources in Berlin.
            </p>

            <p>
              2. Another part of our project is promoting the installation of new drinking fountains in high-traffic
              areas in Pankow. We have seen that Tip:Tap was already involved in a similar project in Neukölln - that
              impressed us very much. That's why we're turning to you and asking for your advice:
            </p>

            <p>
              We plan to contact both Berliner Wasserbetriebe and the Pankow district office with this concern. Do you
              think this approach makes sense or would you recommend a different approach?
            </p>

            <h2>About us and the "Political Participation" program</h2>
            <p>
              We are participating in the "Political Participation" program of Club Dialog e.V. (more information: Club
              Dialog - Political Participation). The program strengthens the political and social participation of the
              Russian-speaking community in Berlin. It covers topics from democracy and civil society to practical
              skills for implementing one's own projects.
            </p>

            <p>We thank you very much for your attention and support and look forward to your feedback and advice.</p>
          </>
        )}
      </div>
    </div>
  )
}
