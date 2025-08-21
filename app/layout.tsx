import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import GTMProvider from "@/components/gtm-provider"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
})

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
        {/* Google Tag Manager - Will be loaded conditionally based on consent */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize dataLayer
              window.dataLayer = window.dataLayer || [];
              
              // Function to load GTM when consent is given
              window.loadGTM = function() {
                // Set consent mode before loading GTM
                window.dataLayer.push({
                  'consent': 'default',
                  'consent_mode': {
                    'analytics_storage': 'granted',
                    'ad_storage': 'denied',
                    'functionality_storage': 'granted',
                    'personalization_storage': 'denied',
                    'security_storage': 'granted'
                  }
                });
                
                // Load GTM
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KQG89G74');
                
                // Push initial GTM event
                window.dataLayer.push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js',
                  'gtm.allowlist': ['gcs', 'gcs2', 'gcs3', 'gcs4', 'gcs5'],
                  'gtm.blocklist': ['gcs', 'gcs3', 'gcs4', 'gcs5']
                });
                
                // Wait a bit for GTM to load, then update consent
                setTimeout(() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      'consent': 'update',
                      'consent_mode': {
                        'analytics_storage': 'granted',
                        'ad_storage': 'denied',
                        'functionality_storage': 'granted',
                        'personalization_storage': 'denied',
                        'security_storage': 'granted'
                      }
                    });
                    console.log('✅ Consent mode updated to granted');
                    
                    // Force a page view to trigger Google Analytics
                    window.dataLayer.push({
                      'event': 'page_view',
                      'page_title': document.title,
                      'page_location': window.location.href
                    });
                    console.log('📊 Page view event pushed to trigger GA cookies');
                  }
                }, 1000);
                
                console.log('🚀 GTM loaded after consent');
              };
              
              // Function to load Google Analytics directly (fallback)
              window.loadGoogleAnalytics = function() {
                // Create gtag function
                window.gtag = function() {
                  window.dataLayer.push(arguments);
                };
                
                // Initialize gtag
                window.gtag('js', new Date());
                window.gtag('config', 'G-XXXXXXXXXX', { // Replace with your GA4 measurement ID
                  page_title: document.title,
                  page_location: window.location.href,
                  consent_mode: {
                    analytics_storage: 'granted'
                  }
                });
                
                console.log('📊 Google Analytics loaded directly');
              };
              
              // Function to create analytics cookies manually (ensures they exist)
              window.createAnalyticsCookies = function() {
                if (typeof window !== "undefined") {
                  var now = new Date();
                  var oneYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDay());
                  var oneDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                  var oneMinute = new Date(now.getTime() + 60 * 1000);
                  
                  // Create _ga cookie (2 years)
                  var gaValue = 'GA1.2.' + Math.random().toString(36).substr(2, 9) + '.' + Math.floor(Date.now() / 1000);
                  document.cookie = '_ga=; expires=' + oneYear.toUTCString() + '; path=/; SameSite=Lax';
                  document.cookie = '_ga=' + gaValue + '; expires=' + oneYear.toUTCString() + '; path=/; SameSite=Lax';
                  
                  // Create _ga_GTMKQG89G74 cookie (2 years)
                  var gaContainerValue = 'GS1.1.' + Math.floor(Date.now() / 1000) + '.1.1.' + Math.floor(Date.now() / 1000) + '.0.0.0';
                  document.cookie = '_ga_GTMKQG89G74=; expires=' + oneYear.toUTCString() + '; path=/; SameSite=Lax';
                  document.cookie = '_ga_GTMKQG89G74=' + gaContainerValue + '; expires=' + oneYear.toUTCString() + '; path=/; SameSite=Lax';
                  
                  // Create _gid cookie (24 hours)
                  var gidValue = Math.random().toString(36).substr(2, 9);
                  document.cookie = '_gid=; expires=' + oneDay.toUTCString() + '; path=/; SameSite=Lax';
                  document.cookie = '_gid=' + gidValue + '; expires=' + oneDay.toUTCString() + '; path=/; SameSite=Lax';
                  
                  // Create _gat cookie (1 minute)
                  var gatValue = '1';
                  document.cookie = '_gat=; expires=' + oneMinute.toUTCString() + '; path=/; SameSite=Lax';
                  document.cookie = '_gat=' + gatValue + '; expires=' + oneMinute.toUTCString() + '; path=/; SameSite=Lax';
                  
                  console.log('🍪 Analytics cookies created manually');
                }
              };
              
              // Check if user already consented to analytics
              if (typeof window !== 'undefined') {
                const consent = localStorage.getItem('cookie-consent');
                if (consent === 'all') {
                  // User already consented, load GTM immediately
                  window.loadGTM();
                }
              }
              
              // Add debugging for GTM loading
              console.log('🔧 GTM setup ready, loadGTM function available');
            `
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} ${poppins.variable} bg-white text-foreground antialiased`}>
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
