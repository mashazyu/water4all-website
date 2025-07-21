import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Berliner Trinkbrunnen",
  description: "Initiative for hydration and cooling during hot summer in Berlin",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col antialiased`}>
        <LanguageProvider>
          <Navigation />
          <main className="flex-1 container mx-auto px-6 py-16 max-w-6xl">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
