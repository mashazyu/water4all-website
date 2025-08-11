"use client"

import { useLanguage } from "@/components/language-provider"

export default function Cookies() {
  const { translations } = useLanguage()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-semibold text-gray-800">{translations.cookies.title}</h1>
        <p className="text-base text-gray-600">{translations.cookies.intro}</p>
      </div>

      <div className="space-y-6">
        {/* What are Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.cookies.whatAreCookies}</h2>
          <p className="text-gray-700">{translations.cookies.whatAreCookiesContent}</p>
        </section>

        {/* How We Use Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.cookies.howWeUse}</h2>
          <p className="text-gray-700">{translations.cookies.howWeUseContent}</p>
        </section>

        {/* Types of Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.cookies.types}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">{translations.cookies.essential.title}</h3>
              <p className="text-gray-700 text-sm mb-2">{translations.cookies.essential.description}</p>
              <p className="text-gray-700 text-sm">{translations.cookies.essential.duration}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">{translations.cookies.analytics.title}</h3>
              <p className="text-gray-700 text-sm mb-2">{translations.cookies.analytics.description}</p>
              <p className="text-gray-700 text-sm mb-2">{translations.cookies.analytics.duration}</p>
              <p className="text-gray-700 text-sm">{translations.cookies.analytics.provider}</p>
            </div>
          </div>
        </section>

        {/* Specific Cookies Table */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.cookies.specificCookies}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    {translations.cookies.table.name}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    {translations.cookies.table.purpose}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    {translations.cookies.table.duration}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    {translations.cookies.table.type}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 font-mono">_ga</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.gaPurpose}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">2 years</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 font-mono">_ga_[CONTAINER_ID]</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.gaContainerPurpose}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">2 years</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 font-mono">_gid</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.gidPurpose}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">24 hours</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 font-mono">_gat</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.gatPurpose}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">1 minute</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {translations.cookies.table.analytics}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.cookies.managing.browser}</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-800 mb-1">{translations.cookies.managing.browser}</h3>
              <p className="text-gray-700 text-sm">{translations.cookies.managing.browserContent}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">{translations.cookies.managing.gaOptOut}</h3>
              <p className="text-gray-700 text-sm mb-2">{translations.cookies.managing.gaOptOutContent}</p>
              <a 
                href="https://tools.google.com/dlpage/gaoptout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                {translations.cookies.managing.gaOptOutLink}
              </a>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.cookies.updates}</h2>
          <p className="text-gray-700">{translations.cookies.updatesContent}</p>
        </section>

        {/* Contact */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{translations.cookies.contact}</h2>
          <p className="text-gray-700">{translations.cookies.contactContent}</p>
        </section>
      </div>
    </div>
  )
}
