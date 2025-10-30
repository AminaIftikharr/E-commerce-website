import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { StoreProvider } from "@/lib/store-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Craft & Memories - Custom Journals, Magazines & Scrapbooks",
  description:
    "Shop personalized journals, custom magazines, scrapbooks, and craft supplies. Create beautiful memories with our customizable products.",
  keywords:
    "custom journals, personalized magazines, scrapbooks, craft supplies, wedding magazine, birthday magazine, couple magazine",
  openGraph: {
    title: "Craft & Memories - Custom Journals & Magazines",
    description: "Create beautiful, personalized journals, magazines, and scrapbooks for your most precious memories.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5e6d3" />
      </head>
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
