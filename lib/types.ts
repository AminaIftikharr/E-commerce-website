export interface Product {
  _id?: string // MongoDB ID
  id?: string // Legacy ID
  name: string
  description: string
  price: number
  category: "magazines" | "journals" | "scrapbooks" | "tools"
  image: string
  stock: number
  customizable: boolean
  colors?: string[]
  designs?: string[]
  keywords?: string[]
  seoTitle?: string
  seoDescription?: string
  createdAt?: string
  updatedAt?: string
}

export interface CartItem {
  productId: string
  quantity: number
  customization?: {
    color?: string
    design?: string
    text?: string
  }
}

export interface Order {
  _id?: string // MongoDB ID
  id?: string // Legacy ID
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerZipCode: string
  paymentMethod: "cash-on-delivery" | "credit-card" | "debit-card" | "paypal" | "bank-transfer"
  date?: string
  updatedAt?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
}
