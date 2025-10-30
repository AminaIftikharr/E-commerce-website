"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import { ShoppingCart, Sparkles, BookOpen, Heart, ArrowRight } from "lucide-react"

export default function HomePageClient() {
  const { products } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "All Products", icon: Sparkles },
    { id: "magazines", label: "Magazines", icon: BookOpen },
    { id: "journals", label: "Journals", icon: BookOpen },
    { id: "scrapbooks", label: "Scrapbooks", icon: Heart },
    { id: "tools", label: "Tools & Supplies", icon: ShoppingCart },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/10 pt-20 pb-16 sm:pt-32 sm:pb-24">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                    ✨ Premium Customizable Products
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                  Create Your Perfect{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Memories
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-balance leading-relaxed">
                  Craft beautiful, personalized journals, magazines, and scrapbooks. Express your creativity with our
                  premium collection of customizable products and craft supplies.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="#products">
                  <Button size="lg" className="gap-2 group">
                    <ShoppingCart className="w-5 h-5" />
                    Shop Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/magazines">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    Explore Magazines
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-border">
                <div>
                  <p className="text-sm font-semibold text-foreground">1000+</p>
                  <p className="text-xs text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">500+</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Right visual - Hero image showcase */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                {/* Main hero image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden">
                  <img
                    src="/premium-customized-journal-magazine-scrapbook-coll.jpg"
                    alt="Premium journals and magazines collection"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-4 max-w-xs border border-border">
                  <p className="text-sm font-semibold text-foreground">Fully Customizable</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose colors, designs, and personalize every detail
                  </p>
                </div>

                <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-4 max-w-xs border border-border">
                  <p className="text-sm font-semibold text-foreground">Premium Quality</p>
                  <p className="text-xs text-muted-foreground mt-1">High-quality materials and beautiful designs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </Button>
            )
          })}
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl sm:text-5xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium journals, magazines, and craft supplies
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      {product.customizable && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          Customizable
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.stock > 0 ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-destructive">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 my-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-4 p-6 rounded-2xl bg-secondary/5 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">✨</div>
            <h3 className="font-semibold text-lg">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Choose colors, designs, and personalize your products exactly how you want them
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-secondary/5 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">🎨</div>
            <h3 className="font-semibold text-lg">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">
              High-quality materials and beautiful pastel designs crafted with care
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-secondary/5 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">🚚</div>
            <h3 className="font-semibold text-lg">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">Quick and reliable delivery to your doorstep</p>
          </div>
        </div>
      </section>
    </main>
  )
}
