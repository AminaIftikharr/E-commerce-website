"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store-context"
import { Card } from "@/components/ui/card"
import { ChevronDown, Trash2 } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()
  const { currentUser, isAdmin, orders, updateOrder, deleteOrder } = useStore()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>({})
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      router.push("/login")
    }
    const initialStatus: Record<string, string> = {}
    orders.forEach((order) => {
      const orderId = order._id?.toString() || order.id || ""
      if (orderId) {
        initialStatus[orderId] = order.status
      }
    })
    setSelectedStatus(initialStatus)
  }, [currentUser, isAdmin, router, orders])

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }))
    updateOrder(orderId, { status: newStatus as any })
  }

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId)
    setDeleteConfirm(null)
  }

  if (!isAdmin) {
    return null
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Orders Management</h1>
          <p className="text-muted-foreground">View and manage customer orders with tracking</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => {
              const orderId = order._id?.toString() || order.id || ""
              return (
              <Card key={orderId} className="overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedOrder(expandedOrder === orderId ? null : orderId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-mono text-sm font-bold">{orderId}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Customer:</strong> {order.customerName} ({order.customerEmail})
                      </p>
                      <div className="flex gap-6 text-sm">
                        <span>
                          <strong>Items:</strong> {order.items.length}
                        </span>
                        <span>
                          <strong>Total:</strong> ${order.total.toFixed(2)}
                        </span>
                        <span>
                          <strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteConfirm(orderId)
                        }}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                        title="Delete order"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${expandedOrder === orderId ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                {deleteConfirm === orderId && (
                  <div className="border-t border-red-200 bg-red-50 p-4">
                    <p className="text-sm mb-3">
                      Are you sure you want to delete this order? This action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteOrder(orderId)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Delete Order
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {expandedOrder === orderId && (
                  <div className="border-t border-border p-6 bg-muted/30 space-y-6">
                    {/* Customer Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Customer Information</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Name:</strong> {order.customerName}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.customerEmail}
                          </p>
                          <p>
                            <strong>Phone:</strong> {order.customerPhone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Shipping Address</h4>
                        <div className="space-y-2 text-sm">
                          <p>{order.customerAddress}</p>
                          <p>
                            {order.customerCity}, {order.customerZipCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Payment Method</h4>
                        <p className="text-sm capitalize">{order.paymentMethod.replace("-", " ")}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Order Status</h4>
                        <select
                          value={selectedStatus[orderId] || order.status}
                          onChange={(e) => handleStatusUpdate(orderId, e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm p-2 bg-background rounded">
                            <span>
                              Product ID: {item.productId} x {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span className="text-primary">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )})
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No orders yet</p>
            </Card>
          )}
        </div>

        {/* Order Stats */}
        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
              <p className="text-3xl font-bold">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Pending Orders</p>
              <p className="text-3xl font-bold">{orders.filter((o) => o.status === "pending").length}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Delivered Orders</p>
              <p className="text-3xl font-bold">{orders.filter((o) => o.status === "delivered").length}</p>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
