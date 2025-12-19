"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem, Order, User, Product } from "./types"

interface StoreContextType {
  products: Product[]
  addProduct: (product: Product) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  refreshProducts: () => Promise<void>
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateCart: (items: CartItem[]) => void
  clearCart: () => void
  orders: Order[]
  addOrder: (order: Order) => Promise<void>
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>
  deleteOrder: (id: string) => Promise<void>
  refreshOrders: () => Promise<void>
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  isAdmin: boolean
  loading: boolean
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch products from API
  const refreshProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const contentType = response.headers.get("content-type") || ""
      if (!response.ok || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Products API returned non-JSON or error:", response.status, text.slice(0, 200))
        return
      }
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // Fetch orders from API
  const refreshOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const contentType = response.headers.get("content-type") || ""
      if (!response.ok || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Orders API returned non-JSON or error:", response.status, text.slice(0, 200))
        return
      }
      const data = await response.json()
      if (data.success) {
        setOrders(data.data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  // Load from localStorage and API
  useEffect(() => {
    const loadData = async () => {
      const savedCart = localStorage.getItem("cart")
      const savedUser = localStorage.getItem("currentUser")

      if (savedCart) setCart(JSON.parse(savedCart))
      if (savedUser) setCurrentUser(JSON.parse(savedUser))

      // Fetch products from API
      await refreshProducts()

      // Fetch orders if user is logged in
      if (savedUser) {
        await refreshOrders()
      }

      setLoading(false)
    }

    loadData()
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Save user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  const addProduct = async (product: Product) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      const data = await response.json()
      if (data.success) {
        await refreshProducts()
      }
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      const data = await response.json()
      if (data.success) {
        await refreshProducts()
      }
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        await refreshProducts()
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId)
      if (existing) {
        return prev.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId))
  }

  const updateCart = (items: CartItem[]) => {
    setCart(items)
  }

  const clearCart = () => {
    setCart([])
  }

  const addOrder = async (order: Order) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
      const data = await response.json()
      if (data.success) {
        await refreshOrders()
      }
    } catch (error) {
      console.error("Error adding order:", error)
    }
  }

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      const data = await response.json()
      if (data.success) {
        await refreshOrders()
      }
    } catch (error) {
      console.error("Error updating order:", error)
    }
  }

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        await refreshOrders()
      }
    } catch (error) {
      console.error("Error deleting order:", error)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        refreshOrders,
        currentUser,
        setCurrentUser,
        isAdmin: currentUser?.role === "admin",
        loading,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within StoreProvider")
  }
  return context
}
