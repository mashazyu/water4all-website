"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import AntiSpamEmail from "./anti-spam-email"

export default function Footer() {
  const { language, translations } = useLanguage()

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Wasser für alle</h3>
            <p className="text-sm text-muted-foreground">
              {translations.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{translations.footer.quickLinks}</h3>
            <div className="flex flex-col gap-2">
              <Link href={`/${language}/map`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {translations.footer.map}
              </Link>
              <Link href={`/${language}/installation`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {translations.footer.installation}
              </Link>
              <Link href={`/${language}/news`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {translations.footer.news}
              </Link>
            </div>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{translations.footer.contact}</h3>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <AntiSpamEmail
                  email="berlinertrinkbrunnen@gmail.com"
                  className="text-primary hover:text-secondary transition-colors"
                  copyMessage={translations.footer.email}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/${language}/cookies`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {translations.footer.cookies}
                </Link>
                <Link href={`/${language}/privacy`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {translations.footer.privacy}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wasser für alle. {translations.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
