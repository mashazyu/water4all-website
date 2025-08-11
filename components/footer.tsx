"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import AntiSpamEmail from "./anti-spam-email"

export default function Footer() {
  const { translations, language } = useLanguage()

  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">{translations.footer.contact}</h3>
            <div className="text-sm text-gray-600">
              <AntiSpamEmail 
                email="berlinertrinkbrunnen@gmail.com"
                className="hover:text-blue-700 transition-colors"
                copyMessage={translations.footer.email}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link href={`/${language}/cookies`} className="text-sm text-gray-600 hover:text-blue-700 transition-colors">
              {translations.footer.cookies}
            </Link>
            <Link href={`/${language}/privacy`} className="text-sm text-gray-600 hover:text-blue-700 transition-colors">
              {translations.footer.privacy}
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Berliner Trinkbrunnen Initiative
        </div>
      </div>
    </footer>
  )
}
