import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Craft & Memories - Custom Journals, Magazines & Scrapbooks",
  description:
    "Shop personalized journals, custom magazines, scrapbooks, and craft supplies. Create beautiful memories with our customizable products.",
  keywords:
    "custom journals, personalized magazines, scrapbooks, craft supplies, wedding magazine, birthday magazine, couple magazine, customizable products",
  openGraph: {
    title: "Craft & Memories - Custom Journals & Magazines",
    description: "Create beautiful, personalized journals, magazines, and scrapbooks for your most precious memories.",
    type: "website",
  },
}

export default function HomePage() {
  return <HomePageClient />
}
