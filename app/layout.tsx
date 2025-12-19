import type React from "react"
import { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { StoreProvider } from "@/lib/store-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.myjourmals.me'),
  title: {
    default: 'My Journalss - Custom Journals, Magazines & Scrapbooks',
    template: '%s | My Journals'
  },
  description: 'Create personalized journals, custom magazines, and scrapbooks. Premium craft supplies for your memories at My Journals.',
  keywords: ['custom journals', 'personalized magazines', 'scrapbooks', 'craft supplies', 'DIY crafts', 'memory books'],
  authors: [{ name: 'My Journals' }],
  openGraph: {
    title: 'My Journals - Custom Journals & Magazines',
    description: 'Create beautiful, personalized journals, magazines, and scrapbooks for your precious memories',
    url: 'https://www.myjourmals.me',
    siteName: 'My Journals',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Journals Store'
      }
    ],
    locale: 'en_US',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <StoreProvider>
          <Navbar />
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
