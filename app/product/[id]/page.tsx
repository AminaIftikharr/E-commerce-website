"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { products, addToCart } = useStore()
  const product = products.find((p) => p.id === params.id)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0])
  const [selectedDesign, setSelectedDesign] = useState(product?.designs?.[0])
  const [customText, setCustomText] = useState("")
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
      customization: product.customizable
        ? {
            color: selectedColor,
            design: selectedDesign,
            text: customText,
          }
        : undefined,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="aspect-square w-full max-w-md bg-muted rounded-xl overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>
                  <p className="text-muted-foreground mt-2">{product.description}</p>
                  {product.keywords && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.keywords.slice(0, 3).map((keyword) => (
                        <span key={keyword} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
              </div>
            </div>

            {/* Customization Options */}
            {product.customizable && (
              <Card className="p-6 space-y-4 bg-secondary/10 border-secondary/30">
                <h3 className="font-semibold text-lg">Customize Your Product</h3>

                {product.colors && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedColor === color
                              ? "bg-primary text-primary-foreground ring-2 ring-primary"
                              : "bg-muted text-foreground hover:bg-muted/80"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.designs && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Design</label>
                    <div className="flex flex-wrap gap-2">
                      {product.designs.map((design) => (
                        <button
                          key={design}
                          onClick={() => setSelectedDesign(design)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedDesign === design
                              ? "bg-primary text-primary-foreground ring-2 ring-primary"
                              : "bg-muted text-foreground hover:bg-muted/80"
                          }`}
                        >
                          {design}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Add Custom Text (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter your custom text..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    maxLength={50}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{customText.length}/50 characters</p>
                </div>
              </Card>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">
                    −
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">
                    +
                  </button>
                </div>
              </div>

              <Button size="lg" onClick={handleAddToCart} className="w-full gap-2">
                <ShoppingCart className="w-5 h-5" />
                {isAdded ? "Added to Cart!" : "Add to Cart"}
              </Button>
            </div>

            {/* Product Info */}
            <Card className="p-4 space-y-2 bg-muted/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Customizable:</span>
                <span className="font-medium">{product.customizable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SKU:</span>
                <span className="font-medium">{product.id}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
