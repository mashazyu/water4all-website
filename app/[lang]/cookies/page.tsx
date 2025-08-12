"use client"

import { useLanguage } from "@/components/language-provider"

export default function Cookies() {
  const { translations } = useLanguage()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-semibold text-foreground">{translations.cookies.title}</h1>
        <p className="text-base text-muted-foreground">{translations.cookies.intro}</p>
      </div>

      <div className="space-y-6">
        {/* What are Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{translations.cookies.whatAreCookies}</h2>
          <p className="text-foreground">{translations.cookies.whatAreCookiesContent}</p>
        </section>

        {/* How We Use Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{translations.cookies.howWeUse}</h2>
          <p className="text-foreground">{translations.cookies.howWeUseContent}</p>
        </section>

        {/* Types of Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{translations.cookies.types}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-foreground mb-2">{translations.cookies.essential.title}</h3>
              <p className="text-foreground text-sm mb-2">{translations.cookies.essential.description}</p>
              <p className="text-foreground text-sm">{translations.cookies.essential.duration}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-2">{translations.cookies.analytics.title}</h3>
              <p className="text-foreground text-sm mb-2">{translations.cookies.analytics.description}</p>
              <p className="text-foreground text-sm mb-2">{translations.cookies.analytics.duration}</p>
              <p className="text-foreground text-sm">{translations.cookies.analytics.provider}</p>
            </div>
          </div>
        </section>

        {/* Specific Cookies Table */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{translations.cookies.specificCookies}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left text-sm font-medium text-foreground">
                    {translations.cookies.table.name}
                  </th>
                  <th className="border border-border px-4 py-2 text-left text-sm font-medium text-foreground">
                    {translations.cookies.table.purpose}
                  </th>
                  <th className="border border-border px-4 py-2 text-left text-sm font-medium text-foreground">
                    {translations.cookies.table.duration}
                  </th>
                  <th className="border border-border px-4 py-2 text-left text-sm font-medium text-foreground">
                    {translations.cookies.table.type}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground font-mono">_ga</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.gaPurpose}
                  </td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">2 years</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground font-mono">_ga_[CONTAINER_ID]</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.gaContainerPurpose}
                  </td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">2 years</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground font-mono">_gid</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.gidPurpose}
                  </td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">24 hours</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground font-mono">_gat</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.gatPurpose}
                  </td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">1 minute</td>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{translations.cookies.managing.browser}</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-foreground mb-1">{translations.cookies.managing.browser}</h3>
              <p className="text-foreground text-sm">{translations.cookies.managing.browserContent}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-1">{translations.cookies.managing.gaOptOut}</h3>
              <p className="text-foreground text-sm mb-2">{translations.cookies.managing.gaOptOutContent}</p>
              <a 
                href="https://tools.google.com/dlpage/gaoptout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary underline text-sm"
              >
                {translations.cookies.managing.gaOptOutLink}
              </a>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{translations.cookies.updates}</h2>
          <p className="text-foreground">{translations.cookies.updatesContent}</p>
        </section>

        {/* Contact */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{translations.cookies.contact}</h2>
          <p className="text-foreground">{translations.cookies.contactContent}</p>
        </section>
      </div>
    </div>
  )
}
