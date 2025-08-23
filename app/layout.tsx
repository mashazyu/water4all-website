import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import GTMProvider from "@/components/gtm-provider"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: {
    default: "Wasser für alle - Free Drinking Water in Berlin",
    template: "%s | Wasser für alle"
  },
  description: "Berlin has over 220 public drinking fountains — but fewer than 40 are visible on Google Maps. Our project makes it easy for everyone to locate free, safe drinking water across the city.",
  keywords: [
    "drinking water", "water fountains", "Berlin", "free water", 
    "hydration", "water refill", "public water", "drinking fountains",
    "tap water fountains", "water access"
  ],
  authors: [{ name: "Wasser für alle" }],
  creator: "Wasser für alle",
  publisher: "Wasser für alle",
  metadataBase: new URL('https://www.water4all.com.de'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'de': '/de', 
      'ru': '/ru',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.water4all.com.de',
    siteName: 'Wasser für alle',
    title: 'Wasser für alle - Free Drinking Water in Berlin',
    description: 'Berlin has over 220 public drinking fountains — but fewer than 40 are visible on Google Maps. Our project makes it easy for everyone to locate free, safe drinking water across the city.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Wasser für alle - Free Drinking Water in Berlin',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Wasser für alle - Free Drinking Water in Berlin',
    description: 'Berlin has over 220 public drinking fountains — but fewer than 40 are visible on Google Maps. Our project makes it easy for everyone to locate free, safe drinking water across the city.',
    images: ['/android-chrome-512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#1800ad',
    'msapplication-TileColor': '#1800ad',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning className="bg-white min-h-screen">
      <head>
        {/* Google Tag Manager and Google Analytics will be loaded by @next/third-parties */}
      </head>
      <body className={`${inter.className} ${poppins.variable} bg-white text-foreground antialiased`}>
        <GTMProvider>
          {children}
        </GTMProvider>
        
        {/* Official Next.js Google Analytics and GTM Integration */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        <GoogleTagManager gtmId="GTM-KQG89G74" />
      </body>
    </html>
  )
}
