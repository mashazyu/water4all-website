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
    { href: "/faq", label: translations.faq },
    { href: "/about", label: translations.about },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b-4 border-blue-700 shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-base font-semibold text-blue-700">
            <span className="hidden sm:inline">Berliner Trinkbrunnen</span>
            <span className="sm:hidden">BTB</span>
          </Link>

          <nav className="hidden md:flex gap-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-normal transition-colors px-3 py-2 ${
                  isActive(route.href)
                    ? "text-blue-700 bg-blue-50 border-b-2 border-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
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
                className="text-sm font-normal text-gray-700 hover:text-blue-700 flex items-center gap-1 px-2 h-8"
              >
                {language.toUpperCase()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-sm ${language === lang ? "bg-blue-50 text-blue-700" : ""}`}
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
              <nav className="flex flex-col gap-2 mt-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-normal transition-colors px-3 py-2 ${
                      isActive(route.href) ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:text-blue-700"
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
