import FAQClientPage from "./client-page"

export const metadata = {
  title: "FAQ - Frequently Asked Questions | Craft & Memories",
  description:
    "Find answers to frequently asked questions about custom magazines, journals, scrapbooks, customization, shipping, returns, and more.",
  keywords:
    "FAQ, frequently asked questions, help, support, customization help, shipping information, return policy, product information",
  openGraph: {
    title: "FAQ - Frequently Asked Questions | Craft & Memories",
    description: "Get answers to your questions about our products and services.",
    type: "website",
  },
}

export default function FAQPage() {
  return <FAQClientPage />
}
