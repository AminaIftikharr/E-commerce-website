import React from "react"
import type { Product } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"
import ProductClient from "@/components/product/ProductClient"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug
  const product: Product | undefined = mockProducts.find((p) => p.slug === slug || p._id === slug || p.id === slug)

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    }
  }

  const title = product.seoTitle || product.name
  const description = product.seoDescription || product.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/product/${product.slug || product._id || product.id}`,
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
      // use 'website' to be compatible with Next's OpenGraph type
      type: "website",
    },
    // Add canonical URL using environment variable when available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/product/${product.slug || product._id || product.id}`,
    },
  }
}

export default function ProductBySlugPage({ params }: Props) {
  const { slug } = params
  const product: Product | undefined = mockProducts.find((p) => p.slug === slug || p._id === slug || p.id === slug)

  // If a product exists but was looked up by id and has a canonical slug, redirect to the slug URL
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        </div>
      </div>
    )
  }

  // If the requested slug is actually an id and the product has a slug, redirect to canonical slug
  if (product.slug && product.slug !== slug && (product._id === slug || product.id === slug)) {
    redirect(`/product/${product.slug}`)
  }

  // If the requested slug matches a previous slug, redirect to canonical slug
  if (product.previousSlugs && product.previousSlugs.includes(slug) && product.slug) {
    redirect(`/product/${product.slug}`)
  }

  return <ProductClient product={product} />
}
