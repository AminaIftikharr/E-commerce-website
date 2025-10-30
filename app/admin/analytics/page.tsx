"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store-context"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Package } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

export default function AnalyticsPage() {
  const router = useRouter()
  const { currentUser, isAdmin, orders } = useStore()

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      router.push("/login")
    }
  }, [currentUser, isAdmin, router])

  if (!isAdmin) {
    return null
  }

  const categoryStats = mockProducts.reduce(
    (acc, product) => {
      const existing = acc.find((c) => c.category === product.category)
      if (existing) {
        existing.count += 1
        existing.value += product.price * product.stock
      } else {
        acc.push({
          category: product.category,
          count: 1,
          value: product.price * product.stock,
        })
      }
      return acc
    },
    [] as Array<{ category: string; count: number; value: number }>,
  )

  const lowStockProducts = mockProducts.filter((p) => p.stock < 20).length
  const customizableProducts = mockProducts.filter((p) => p.customizable).length

  return (
    <main className="min-h-screen bg-background">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Store performance and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">Total Products</p>
              <Package className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-2">{mockProducts.length}</p>
            <p className="text-xs text-muted-foreground">{customizableProducts} customizable</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <Users className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold mb-2">{orders.length}</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold mb-2">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">From {orders.length} orders</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <BarChart3 className="w-5 h-5 text-destructive" />
            </div>
            <p className="text-3xl font-bold mb-2">{lowStockProducts}</p>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </Card>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Products by Category</h2>
            <div className="space-y-4">
              {categoryStats.map((stat) => (
                <div key={stat.category}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium capitalize">{stat.category}</p>
                    <span className="text-sm text-muted-foreground">{stat.count} items</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{
                        width: `${(stat.count / mockProducts.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Inventory Value by Category</h2>
            <div className="space-y-4">
              {categoryStats.map((stat) => (
                <div key={`value-${stat.category}`}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium capitalize">{stat.category}</p>
                    <span className="text-sm font-bold text-primary">${stat.value.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent rounded-full h-2 transition-all"
                      style={{
                        width: `${(stat.value / categoryStats.reduce((sum, s) => sum + s.value, 0)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts > 0 && (
          <Card className="p-6 mt-6 border-destructive/50 bg-destructive/5">
            <h2 className="text-lg font-bold text-destructive mb-4">⚠️ Low Stock Alert</h2>
            <div className="space-y-2">
              {mockProducts
                .filter((p) => p.stock < 20)
                .map((product) => (
                  <div key={product.id} className="flex justify-between items-center">
                    <p className="font-medium">{product.name}</p>
                    <span className="text-sm font-bold text-destructive">{product.stock} left</span>
                  </div>
                ))}
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
