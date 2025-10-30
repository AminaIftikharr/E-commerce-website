"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store-context"
import { Card } from "@/components/ui/card"
import { BarChart3, Package, ShoppingCart, TrendingUp } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const { currentUser, isAdmin, orders, products } = useStore()

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      router.push("/login")
    }
  }, [currentUser, isAdmin, router])

  if (!isAdmin) {
    return null
  }

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalInventoryValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
  }

  const lowStockItems = products.filter((p) => p.stock < 20)

  return (
    <main className="min-h-screen bg-background">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 space-y-2 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Products</p>
              <Package className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </Card>

          <Card className="p-6 space-y-2 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <ShoppingCart className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </Card>

          <Card className="p-6 space-y-2 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold">Rs {stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">From orders</p>
          </Card>

          <Card className="p-6 space-y-2 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <BarChart3 className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl font-bold">Rs {stats.totalInventoryValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Current stock</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {orders
                .slice(-5)
                .reverse()
                .map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                    <p className="font-bold text-primary">Rs {order.total.toLocaleString()}</p>
                  </div>
                ))}
              {orders.length === 0 && <p className="text-muted-foreground text-center py-4">No orders yet</p>}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Low Stock Items</h2>
            <div className="space-y-3">
              {lowStockItems.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                    {product.stock} left
                  </span>
                </div>
              ))}
              {lowStockItems.length === 0 && (
                <p className="text-muted-foreground text-center py-4">All items well stocked</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
