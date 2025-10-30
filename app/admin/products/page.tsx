"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import { ProductForm } from "@/components/admin/product-form"

export default function ProductsPage() {
  const router = useRouter()
  const { currentUser, isAdmin, products, addProduct, updateProduct, deleteProduct } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      router.push("/login")
    }
  }, [currentUser, isAdmin, router])

  if (!isAdmin) {
    return null
  }

  const handleAddProduct = (formData: any) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...formData,
      stock: Number.parseInt(formData.stock),
      price: Number.parseFloat(formData.price),
      image: "/placeholder.svg",
    }
    addProduct(newProduct)
    setShowForm(false)
  }

  const handleUpdateProduct = (id: string, formData: any) => {
    updateProduct(id, {
      ...formData,
      stock: Number.parseInt(formData.stock),
      price: Number.parseFloat(formData.price),
    })
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-background">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <ProductForm onSubmit={handleAddProduct} onCancel={() => setShowForm(false)} />
            </Card>
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <ProductForm
                product={products.find((p) => p.id === editingProduct)}
                onSubmit={(data) => handleUpdateProduct(editingProduct, data)}
                onCancel={() => setEditingProduct(null)}
              />
            </Card>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
              </div>

              <p className="text-sm text-foreground mb-4 line-clamp-2">{product.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-2xl font-bold text-primary">${product.price}</p>
                  <p className="text-sm text-muted-foreground">
                    Stock:{" "}
                    <span className={product.stock < 20 ? "text-destructive font-bold" : ""}>{product.stock}</span>
                  </p>
                </div>
                {product.customizable && (
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Customizable
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No products found</p>
            <Button onClick={() => setShowForm(true)}>Add your first product</Button>
          </Card>
        )}
      </div>
    </main>
  )
}
