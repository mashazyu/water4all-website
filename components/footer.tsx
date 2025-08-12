"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import AntiSpamEmail from "./anti-spam-email"
import { Mail, Shield, FileText } from "lucide-react"

export default function Footer() {
  const { language, translations } = useLanguage()

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{translations.footer.contact}</span>
            </span>
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-md border border-border">
              <AntiSpamEmail
                email="berlinertrinkbrunnen@gmail.com"
                className="text-foreground font-mono text-xs hover:text-primary transition-colors"
                copyMessage={translations.footer.email}
              />
            </div>
            <Link href={`/${language}/cookies`} className="hover:text-primary transition-colors flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{translations.footer.cookies}</span>
            </Link>
            <Link href={`/${language}/privacy`} className="hover:text-primary transition-colors flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{translations.footer.privacy}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
