import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wasser für alle",
  description: "Initiative for hydration during hot summer in Berlin",
  icons: {
    icon: 'favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-white min-h-screen">
      <body className={`${inter.className} bg-white text-foreground min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  )
}
