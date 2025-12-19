"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import type { Order } from "@/lib/types"
import { ArrowLeft, Loader2, Package, Calendar, MapPin, Zap } from "lucide-react"

export default function MyOrdersPage() {
  const router = useRouter()
  const { currentUser } = useStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
      return
    }

    const fetchOrders = async () => {
      try {
        const url = currentUser.email
          ? `/api/orders?email=${encodeURIComponent(currentUser.email)}`
          : `/api/orders`

        const response = await fetch(url)
        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data)
        } else {
          setError("Failed to load orders")
        }
      } catch (err) {
        console.error("Error fetching orders:", err)
        setError("An error occurred while loading orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [currentUser, router])

  const filteredOrders =
    filterStatus === "all" ? orders : orders.filter((order) => order.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30"
      case "shipped":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30"
      case "delivered":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-600 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳"
      case "processing":
        return "⚙️"
      case "shipped":
        return "🚚"
      case "delivered":
        return "✅"
      case "cancelled":
        return "❌"
      default:
        return "📦"
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading your orders...</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2 mb-6 hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your orders</p>
            </div>
          </div>

          {error && (
            <Card className="p-4 bg-destructive/10 border-destructive/30 mb-6">
              <p className="text-destructive">{error}</p>
            </Card>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No orders found</h2>
              <p className="text-muted-foreground mb-6">
                {filterStatus === "all"
                  ? "You haven't placed any orders yet. Start shopping to create your first order!"
                  : `No ${filterStatus} orders found.`}
              </p>
              <Link href="/">
                <Button>Start Shopping</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order._id || order.id}
                  className="p-6 hover:shadow-lg transition-shadow border-border/50"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getStatusIcon(order.status)}</span>
                        <div>
                          <p className="text-sm text-muted-foreground">Order ID</p>
                          <p className="font-mono text-sm font-semibold">
                            {(order._id || order.id || "").toString().slice(-12)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="font-medium flex items-center gap-1 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.createdAt || order.date || "").toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="font-bold text-lg text-primary">Rs {order.total.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Payment</p>
                          <p className="font-medium capitalize text-sm">
                            {order.paymentMethod.replace("-", " ")}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Items</p>
                          <p className="font-medium">{order.items.length} items</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {order.customerCity}, {order.customerZipCode}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge and Action */}
                    <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                      <span
                        className={`px-4 py-2 rounded-lg font-semibold text-sm border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <Link href={`/order-confirmation/${order._id || order.id}`}>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Zap className="w-4 h-4" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
