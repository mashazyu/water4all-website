import { Metadata } from "next"
import { type Language } from "@/lib/translations"
import { generateMapPageMetadata } from "@/components/metadata-generator"
import MapPageClient from "@/components/map-page-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>
}): Promise<Metadata> {
  const { lang } = await params
  return generateMapPageMetadata(lang)
}

export default function MapPage() {
  return <MapPageClient />
}
