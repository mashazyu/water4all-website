"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, translations, setLanguage, languages, availableLanguages } = useLanguage()
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
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
    { href: `/${currentLang}/about`, label: translations.navigation.about },
    // Development/Testing routes
    ...(process.env.NODE_ENV === 'development' ? [
      { href: `/${currentLang}/gtm-test`, label: 'GTM Test' }
    ] : [])
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

          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              className="text-sm font-normal text-foreground hover:text-primary flex items-center gap-1 px-2 h-8"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {language.toUpperCase()}
              <ChevronDown className="h-3 w-3" />
            </Button>
            
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[120px] bg-popover border border-border rounded-md shadow-lg z-[9999]">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setDropdownOpen(false)
                      // Navigate to the same page in the new language using Next.js router
                      const currentPath = pathname.split('/').slice(2).join('/')
                      const newPath = `/${lang}${currentPath ? `/${currentPath}` : ''}`
                      router.push(newPath)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                      language === lang ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {languages[lang].nativeName}
                  </button>
                ))}
              </div>
            )}
          </div>

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
