"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem, Order, User, Product } from "./types"
import { mockProducts } from "./mock-data"

interface StoreContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateCart: (items: CartItem[]) => void
  clearCart: () => void
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  deleteOrder: (id: string) => void
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  isAdmin: boolean
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Load from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products")
    const savedCart = localStorage.getItem("cart")
    const savedOrders = localStorage.getItem("orders")
    const savedUser = localStorage.getItem("currentUser")

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
    if (savedUser) setCurrentUser(JSON.parse(savedUser))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
  }, [currentUser])

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product])
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
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

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order])
  }

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)))
  }

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        currentUser,
        setCurrentUser,
        isAdmin: currentUser?.role === "admin",
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
