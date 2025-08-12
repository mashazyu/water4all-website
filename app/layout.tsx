import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import GTMProvider from "@/components/gtm-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wasser für alle",
  description: "Initiative for hydration during hot summer in Berlin",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KQG89G74');
              
              // Initialize dataLayer with UTM parameter support
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
                'gtm.allowlist': ['gcs', 'gcs2', 'gcs3', 'gcs4', 'gcs5'],
                'gtm.blocklist': ['gcs', 'gcs2', 'gcs3', 'gcs4', 'gcs5']
              });
            `
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} bg-white text-foreground min-h-screen flex flex-col antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQG89G74"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <GTMProvider>
          {children}
        </GTMProvider>
      </body>
    </html>
  )
}
