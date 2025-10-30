"use client"

import { useStore } from "@/lib/store-context"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function JournalsPage() {
  const { products } = useStore()
  const journals = products.filter((p) => p.category === "journals")

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Custom Journals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our collection of personalized journals perfect for daily reflection, reading notes, gratitude
            practice, and travel memories. Each journal can be customized with your favorite colors and designs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.map((product) => (
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

        {journals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No journals available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
