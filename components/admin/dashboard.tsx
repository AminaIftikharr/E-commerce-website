"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockProducts } from "@/lib/mock-data"
import { Plus, Edit2, Trash2, BarChart3 } from "lucide-react"
import { ProductForm } from "./product-form"
import { Product, ProductFormData } from "@/lib/types"

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"products" | "analytics">("products")

  const handleAddProduct = (formData: any) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...formData,
      previousSlugs: [],
      stock: Number.parseInt(formData.stock),
      price: Number.parseFloat(formData.price),
    }
    setProducts([...products, newProduct])
    setShowForm(false)
  }

  const handleUpdateProduct = (id: string, formData: Partial<Product>) => {
    setProducts(
      products.map((p) =>
        p._id === id
          ? ((): Product => {
              const oldSlug = p.slug
              const newSlug = formData.slug
              const prev = p.previousSlugs ? [...p.previousSlugs] : []
              if (newSlug && oldSlug && newSlug !== oldSlug && !prev.includes(oldSlug)) {
                prev.push(oldSlug)
              }
              return {
                ...p,
                ...formData,
                stock: Number(formData.stock),
                price: Number(formData.price),
                previousSlugs: prev,
              }
            })()
          : p,
      ),
    )
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p._id !== id))
  }

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
    lowStock: products.filter((p) => p.stock < 20).length,
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === "products"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "analytics"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
        </div>

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 space-y-2">
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-3xl font-bold text-primary">{stats.totalProducts}</p>
            </Card>
            <Card className="p-6 space-y-2">
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <p className="text-3xl font-bold text-primary">${stats.totalValue.toFixed(2)}</p>
            </Card>
            <Card className="p-6 space-y-2">
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <p className="text-3xl font-bold text-accent">{stats.lowStock}</p>
            </Card>
          </div>
        )}

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
                      product={products.find((p) => p._id === editingProduct)}
                      onSubmit={(data) => handleUpdateProduct(editingProduct as string, data)}
                      onCancel={() => setEditingProduct(null)}
                    />
                  </Card>
          </div>
        )}

        {/* Products Table */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold">Customizable</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id || product.id || product.slug} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4 capitalize">{product.category}</td>
                      <td className="py-3 px-4">${product.price}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            product.stock < 20 ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-600"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">{product.customizable ? "✓" : "−"}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                             onClick={() => product._id && setEditingProduct(product._id)}
                            className="p-2 hover:bg-muted rounded text-primary"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => product._id && handleDeleteProduct(product._id)}
                            className="p-2 hover:bg-muted rounded text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
