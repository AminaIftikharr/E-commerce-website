"use client"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function FAQClientPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqs = [
    {
      id: "1",
      question: "What is a customized magazine?",
      answer:
        "A customized magazine is a personalized publication that you can design with your own photos, text, and layouts. You can choose colors, designs, and add custom text to create a unique magazine that tells your story.",
    },
    {
      id: "2",
      question: "How long does it take to receive my order?",
      answer:
        "Standard orders typically ship within 5-7 business days. Expedited shipping options are available at checkout. You'll receive a tracking number via email once your order ships.",
    },
    {
      id: "3",
      question: "Can I customize all products?",
      answer:
        "Not all products are customizable. Customizable products are clearly marked on the product page. Magazines, journals, and scrapbooks are typically customizable, while tools and supplies are pre-designed.",
    },
    {
      id: "4",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and digital wallets. All payments are processed securely.",
    },
    {
      id: "5",
      question: "Do you offer bulk orders or wholesale?",
      answer:
        "Yes! We offer special pricing for bulk orders and wholesale inquiries. Please contact our support team at support@craftmemories.com for more information.",
    },
    {
      id: "6",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unused items in original condition. Customized products may have different return terms. Please contact support for details.",
    },
    {
      id: "7",
      question: "Can I upload my own images for customization?",
      answer:
        "Yes! When customizing a product, you can upload your own images. We support common image formats (JPG, PNG, GIF) up to 10MB.",
    },
    {
      id: "8",
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive an email with a tracking number. You can use this number to track your package on the carrier's website.",
    },
  ]

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition text-left"
              >
                <h3 className="font-semibold text-foreground">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openItems.includes(faq.id) ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems.includes(faq.id) && (
                <div className="px-6 py-4 border-t border-border bg-muted/50">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <a
            href="mailto:support@craftmemories.com"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            Contact Support
          </a>
        </Card>
      </div>
    </div>
  )
}
