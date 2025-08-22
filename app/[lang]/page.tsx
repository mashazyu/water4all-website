import { Metadata } from "next"
import { type Language } from "@/lib/translations"
import { generateHomePageMetadata } from "@/components/metadata-generator"
import HomePageClient from "@/components/home-page-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>
}): Promise<Metadata> {
  const { lang } = await params
  return generateHomePageMetadata(lang)
}

export default function HomePage() {
  return <HomePageClient />
}
