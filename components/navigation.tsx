"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const pathname = usePathname()
  const { language, translations, setLanguage, languages, availableLanguages } = useLanguage()
  const [open, setOpen] = useState(false)

  const routes = [
    { href: "/", label: translations.home },
    { href: "/subproject-1", label: translations.subproject1 },
    { href: "/subproject-2", label: translations.subproject2 },
    { href: "/about", label: translations.about },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-border bg-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-lg font-normal text-foreground">
            <span className="hidden sm:inline">Berliner Trinkbrunnen</span>
            <span className="sm:hidden">BTB</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`field-nav-link ${isActive(route.href) ? "active" : ""}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-normal text-foreground/70 hover:text-foreground flex items-center gap-1 px-0"
              >
                {language.toUpperCase()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={language === lang ? "bg-accent" : ""}
                >
                  {languages[lang].nativeName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                      isActive(route.href) ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
