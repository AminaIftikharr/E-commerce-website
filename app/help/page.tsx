import type { Metadata } from "next"
import HelpPageClient from "./help-client"

export const metadata: Metadata = {
  title: "Help & Support | Craft & Memories",
  description:
    "Contact our support team for help with orders, customization, shipping, returns, and more. Multiple support channels available.",
  keywords:
    "help, support, contact us, customer service, order support, shipping help, customization support, contact information",
  openGraph: {
    title: "Help & Support | Craft & Memories",
    description: "Get help from our dedicated support team.",
    type: "website",
  },
}

export default function HelpPage() {
  return <HelpPageClient />
}
