"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const pathname = usePathname()
  const { language, translations, setLanguage, languages, availableLanguages } = useLanguage()
  const [open, setOpen] = useState(false)

  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'
  
  // Safety check - don't render until translations are loaded
  if (!translations || !translations.navigation) {
    return (
      <header className="bg-background border-b-4 border-primary shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </header>
    )
  }
  
  const routes = [
    { href: `/${currentLang}/map`, label: translations.navigation.subproject1 },
    { href: `/${currentLang}/installation`, label: translations.navigation.subproject2 },
    { href: `/${currentLang}/news`, label: translations.navigation.news },
    { href: `/${currentLang}/faq`, label: translations.navigation.faq },
    { href: `/${currentLang}/about`, label: translations.navigation.about }
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-background border-b-4 border-primary shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href={`/${currentLang}`} className="flex items-center gap-2 text-base font-semibold text-primary">
            <span className="hidden sm:inline">Wasser für alle</span>
            <span className="sm:hidden">WfA</span>
          </Link>

          <nav className="hidden md:flex gap-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-normal transition-colors px-3 py-2 ${
                  isActive(route.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
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
                className="text-sm font-normal text-foreground hover:text-primary flex items-center gap-1 px-2 h-8"
              >
                {language.toUpperCase()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => {
                    setLanguage(lang)
                    // Navigate to the same page in the new language
                    const currentPath = pathname.split('/').slice(2).join('/')
                    window.location.href = `/${lang}${currentPath ? `/${currentPath}` : ''}`
                  }}
                  className={`text-sm ${language === lang ? "bg-primary/10 text-primary" : ""}`}
                >
                  {languages[lang].nativeName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-normal transition-colors px-3 py-2 rounded-md ${
                      isActive(route.href)
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-muted"
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
