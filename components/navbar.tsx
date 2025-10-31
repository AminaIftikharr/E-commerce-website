"use client"

import Link from "next/link"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, LogOut, LogIn, Settings, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { cart, currentUser, setCurrentUser, isAdmin } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/magazines", label: "Magazines" },
    { href: "/journals", label: "Journals" },
    { href: "/scrapbooks", label: "Scrapbooks" },
    { href: "/tools", label: "Tools" },
    { href: "/faq", label: "FAQ" },
    { href: "/help", label: "Help" },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground">Craft & Memories</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href as any}>
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">{currentUser.name}</span>
                {isAdmin && (
                  <Link href={'/admin' as any}>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent hidden sm:flex">
                      <Settings className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 hidden sm:flex">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}

            <Link href="/cart">
              <Button variant="outline" size="sm" className="gap-2 relative bg-transparent">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href as any} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start text-foreground">
                  {link.label}
                </Button>
              </Link>
            ))}
            {currentUser ? (
              <>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
                      <Settings className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
