"use client"

import React, { use } from "react"
import { useStore } from "@/lib/store-context"
import ProductClient from "@/components/product/ProductClient"
import { Navbar } from "@/components/navbar"
import { Loader2 } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params)
  const { products, loading } = useStore()
  
  const product = products.find((p) => 
    p.slug === slug || 
    p._id === slug || 
    p.id === slug ||
    (p._id && p._id.toString() === slug) ||
    (p.id && p.id.toString() === slug)
  )

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <ProductClient product={product} />
    </>
  )
}
