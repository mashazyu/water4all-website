"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"

export default function Footer() {
  const { translations } = useLanguage()

  return (
    <footer className="border-t border-border bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h3 className="text-sm font-normal mb-2">{translations.contact}</h3>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:berlinertrinkbrunnen@gmail.com" className="hover:text-foreground transition-colors">
                berlinertrinkbrunnen@gmail.com
              </a>
            </p>
          </div>

          <div>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {translations.privacy}
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Berliner Trinkbrunnen Initiative
        </div>
      </div>
    </footer>
  )
}
