// Utility functions for the e-commerce application

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Calculate cart total
 */
export function calculateCartTotal(cart: any[], products: any[]): number {
  return cart.reduce((total, item) => {
    const product = products.find((p) => p._id?.toString() === item.productId || p.id === item.productId)
    return total + (product?.price || 0) * item.quantity
  }, 0)
}

/**
 * Get product by ID (works with both MongoDB _id and legacy id)
 */
export function getProductById(products: any[], id: string): any {
  return products.find((p) => p._id?.toString() === id || p.id === id)
}

/**
 * Convert MongoDB product to legacy format
 */
export function normalizeProduct(product: any): any {
  if (!product) return null
  
  return {
    ...product,
    id: product._id?.toString() || product.id,
  }
}

/**
 * Convert array of MongoDB products to legacy format
 */
export function normalizeProducts(products: any[]): any[] {
  return products.map(normalizeProduct)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generate order ID
 */
export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get order status color
 */
export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "text-yellow-600",
    processing: "text-blue-600",
    shipped: "text-purple-600",
    delivered: "text-green-600",
    cancelled: "text-red-600",
  }
  return colors[status] || "text-gray-600"
}

/**
 * Get order status badge color
 */
export function getOrderStatusBadge(status: string): string {
  const badges: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return badges[status] || "bg-gray-100 text-gray-800"
}
