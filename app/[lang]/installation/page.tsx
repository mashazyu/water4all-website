"use client"

import { useLanguage } from "@/components/language-provider"
import { PageLayout } from "@/components/ui/page-layout"
import { PageSectionWithContent } from "@/components/ui/page-section"
import { NewsSection } from "@/components/ui/news-section"
import { renderParagraphs } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Subproject2() {
  const { language, translations } = useLanguage()

  const districts = [
    { name: translations.subprojects.districtPankow, pdfLink: "/pdfs/kleine-anfragen/pankow.pdf" },
    { name: translations.subprojects.districtSteglitzZehlendorf, pdfLink: "/pdfs/kleine-anfragen/steglitz-zehlendorf.pdf" },
    { name: translations.subprojects.districtNeukolln, pdfLink: "/pdfs/kleine-anfragen/neukolln.pdf" },
  ]

  return (
    <PageLayout>
      {/* Main Content Section - Full Screen */}
      <PageSectionWithContent 
        background="default"
        title={translations.home.subproject2Title}
        titleAlignment="left"
      >
        {/* Main Content Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">{translations.subprojects.subproject2FullDescription}</p>
              <div className="prose prose-lg max-w-none">
                {renderParagraphs(translations.subprojects.subproject2Details)}
              </div>
            </div>
          </div>
        </div>
      </PageSectionWithContent>

      {/* Kleine Anfragen Introduction Section */}
      <PageSectionWithContent 
        background="muted"
        title={translations.subprojects.kleineAnfragenTitle}
        titleAlignment="left"
      >
        <div className="space-y-6">
          <div className="prose prose-lg max-w-none">
            {renderParagraphs(translations.subprojects.kleineAnfragenIntro)}
          </div>
        </div>
      </PageSectionWithContent>

      {/* Kleine Anfragen Responses Table Section */}
      <PageSectionWithContent 
        background="default"
        title={translations.subprojects.kleineAnfragenResponsesTitle}
        titleAlignment="left"
      >
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base">{translations.subprojects.tableHeaderDistrict}</TableHead>
                <TableHead className="text-base">{translations.subprojects.tableHeaderDocument}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((district, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-base">{district.name}</TableCell>
                  <TableCell>
                    <a 
                      href={district.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors text-base underline"
                    >
                      {translations.subprojects.downloadPdf}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageSectionWithContent>

      {/* Related News Section - Full Screen */}
      <NewsSection background="muted" limit={3} showViewAllButton={true} projectFilter={2} />
    </PageLayout>
  )
}
