"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import AntiSpamEmail from "./anti-spam-email"
import { Mail, Shield, FileText } from "lucide-react"
import { Container } from "@/components/ui/container"

export default function Footer() {
  const { language, translations } = useLanguage()

  // Safety check to prevent errors when translations are not yet loaded
  if (!translations || !translations.footer) {
    return (
      <footer className="bg-background border-t border-border">
        <Container>
          <div className="text-xs sm:text-sm text-muted-foreground">
            Loading...
          </div>
        </Container>
      </footer>
    )
  }

  return (
    <footer className="bg-background border-t border-border">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1 sm:gap-2 min-w-0">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span className="truncate">{translations.footer.contact}</span>
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-muted/50 rounded-md border border-border min-w-0 flex-wrap">
              <AntiSpamEmail
                email="berlinertrinkbrunnen@gmail.com"
                className="text-foreground font-mono text-xs sm:text-sm hover:text-primary transition-colors"
                copyMessage={translations.footer.email}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <Link href={`/${language}/cookies`} className="hover:text-primary transition-colors flex items-center gap-1 sm:gap-2 min-w-0">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span className="truncate">{translations.footer.cookies}</span>
            </Link>
            <Link href={`/${language}/privacy`} className="hover:text-primary transition-colors flex items-center gap-1 sm:gap-2 min-w-0">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span className="truncate">{translations.footer.privacy}</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
