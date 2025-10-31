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
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Craft Memories - Creative Supplies Store',
    template: '%s | Craft Memories'
  },
  description: 'Find the best crafting supplies, magazines, journals and scrapbooking materials at Craft Memories.',
  keywords: ['craft supplies', 'scrapbooking', 'journals', 'magazines', 'DIY crafts'],
  authors: [{ name: 'Craft Memories' }],
  openGraph: {
    title: 'Craft Memories',
    description: 'Your one-stop shop for creative supplies',
    url: 'http://localhost:3000',
    siteName: 'Craft Memories',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Craft Memories Store'
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
      <head>
        <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
