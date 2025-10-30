"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Craft & Memories</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Creating beautiful, personalized journals, magazines, and scrapbooks for your most precious memories.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#magazines" className="text-muted-foreground hover:text-primary transition">
                  Magazines
                </Link>
              </li>
              <li>
                <Link href="/#journals" className="text-muted-foreground hover:text-primary transition">
                  Journals
                </Link>
              </li>
              <li>
                <Link href="/#scrapbooks" className="text-muted-foreground hover:text-primary transition">
                  Scrapbooks
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="text-muted-foreground hover:text-primary transition">
                  Tools & Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@craftmemories.com" className="hover:text-primary transition">
                  support@craftmemories.com
                </a>
              </li>
              <li className="flex gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="hover:text-primary transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>123 Craft Street, Creative City, CC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <p>&copy; 2025 Craft & Memories. All rights reserved.</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="#" className="hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition">
                Terms of Service
              </Link>
            </div>
            <div className="text-right">
              <p>Handcrafted with love for your memories</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
