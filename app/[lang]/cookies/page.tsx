"use client"

import { useLanguage } from "@/components/language-provider"
import { PageLayout, FullScreenSection } from "@/components/ui/page-layout"
import { Container } from "@/components/ui/container"

export default function Cookies() {
  const { translations } = useLanguage()

  return (
    <PageLayout>
      <FullScreenSection background="default">
        <Container>
          <div className="space-y-6 mb-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{translations.cookies.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{translations.cookies.intro}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* What are Cookies */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{translations.cookies.whatAreCookies}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  {translations.cookies.whatAreCookiesContent}
                </div>
              </div>
            </section>

            {/* How We Use Cookies */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{translations.cookies.howWeUse}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  {translations.cookies.howWeUseContent}
                </div>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{translations.cookies.types}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{translations.cookies.essential.title}</h3>
                    <p className="mb-2">{translations.cookies.essential.description}</p>
                    <p>{translations.cookies.essential.duration}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{translations.cookies.analytics.title}</h3>
                    <p className="mb-2">{translations.cookies.analytics.description}</p>
                    <p className="mb-2">{translations.cookies.analytics.duration}</p>
                    <p>{translations.cookies.analytics.provider}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Specific Cookies Table */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{translations.cookies.specificCookies}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                    <table className="min-w-full border border-border text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border px-4 py-2 text-left font-medium text-foreground">
                            {translations.cookies.table.name}
                          </th>
                          <th className="border border-border px-4 py-2 text-left font-medium text-foreground">
                            {translations.cookies.table.purpose}
                          </th>
                          <th className="border border-border px-4 py-2 text-left font-medium text-foreground">
                            {translations.cookies.table.duration}
                          </th>
                          <th className="border border-border px-4 py-2 text-left font-medium text-foreground">
                            {translations.cookies.table.type}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2 font-mono">_ga</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.gaPurpose}
                          </td>
                          <td className="border border-border px-4 py-2">2 years</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.analytics}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 font-mono">_ga_[CONTAINER_ID]</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.gaContainerPurpose}
                          </td>
                          <td className="border border-border px-4 py-2">2 years</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.analytics}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 font-mono">_gid</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.gidPurpose}
                          </td>
                          <td className="border border-border px-4 py-2">24 hours</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.analytics}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 font-mono">_gat</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.gatPurpose}
                          </td>
                          <td className="border border-border px-4 py-2">1 minute</td>
                          <td className="border border-border px-4 py-2">
                            {translations.cookies.table.analytics}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{translations.cookies.managing.browser}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{translations.cookies.managing.browser}</h3>
                    <p className="mb-2">{translations.cookies.managing.browserContent}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{translations.cookies.managing.gaOptOut}</h3>
                    <p className="mb-2">{translations.cookies.managing.gaOptOutContent}</p>
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary underline"
                    >
                      {translations.cookies.managing.gaOptOutLink}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{translations.cookies.updates}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  {translations.cookies.updatesContent}
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{translations.cookies.contact}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  {translations.cookies.contactContent}
                </div>
              </div>
            </section>
          </div>
        </Container>
      </FullScreenSection>
    </PageLayout>
  )
}
