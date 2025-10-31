"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { X, Upload } from "lucide-react"

interface ProductFormProps {
  product?: Product
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price.toString() || "",
    category: product?.category || "magazines",
    stock: product?.stock.toString() || "",
    customizable: product?.customizable || false,
    colors: product?.colors?.join(", ") || "",
    designs: product?.designs?.join(", ") || "",
    image: product?.image || "",
    keywords: product?.keywords?.join(", ") || "",
    seoTitle: product?.seoTitle || "",
    seoDescription: product?.seoDescription || "",
  })

  const [imagePreview, setImagePreview] = useState<string>(product?.image || "")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      colors: formData.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      designs: formData.designs
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean),
      keywords: formData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-background pb-4">
        <h2 className="text-2xl font-bold">{product ? "Edit Product" : "Add New Product"}</h2>
        <button type="button" onClick={onCancel} className="p-1 hover:bg-muted rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image Upload */}
      <div>
        <label className="text-sm font-medium mb-2 block">Product Image</label>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload image</span>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          {imagePreview && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-border">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Product Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="magazines">Magazines</option>
            <option value="journals">Journals</option>
            <option value="scrapbooks">Scrapbooks</option>
            <option value="tools">Tools & Supplies</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Price ($) *</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Stock *</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium mb-2 block">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          required
        />
      </div>

      {/* SEO Section */}
      <div className="border-t border-border pt-4">
        <h3 className="font-semibold mb-3">SEO Information</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">SEO Title</label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              placeholder="e.g., Custom Wedding Magazine - Personalized Wedding Planner"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">SEO Description</label>
            <textarea
              value={formData.seoDescription}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              placeholder="e.g., Create your personalized wedding magazine with custom colors and designs..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Keywords (comma-separated)</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="e.g., wedding magazine, custom wedding, personalized wedding"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Customization */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            id="customizable"
            checked={formData.customizable}
            onChange={(e) => setFormData({ ...formData, customizable: e.target.checked })}
            className="w-4 h-4 rounded border-border"
          />
          <label htmlFor="customizable" className="text-sm font-medium">
            Customizable Product
          </label>
        </div>

        {formData.customizable && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Colors (comma-separated)</label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="e.g., Blush Pink, Sage Green, Lavender"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Designs (comma-separated)</label>
              <input
                type="text"
                value={formData.designs}
                onChange={(e) => setFormData({ ...formData, designs: e.target.value })}
                placeholder="e.g., Modern, Classic, Romantic"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-border sticky bottom-0 bg-background">
        <Button type="submit" className="flex-1">
          {product ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
