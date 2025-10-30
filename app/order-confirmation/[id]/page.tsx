"use client"

import { use } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import { CheckCircle, Package } from "lucide-react"

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { orders } = useStore()
  const { id } = use(params)
  const order = orders.find((o) => (o._id || o.id) === id)

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order not found</h1>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">Thank you for your purchase. Your order has been received.</p>
            </div>
          </div>

          <Card className="p-6 space-y-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-semibold capitalize text-primary">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="font-semibold text-lg text-primary">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items ({order.items.length})
              </h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.productId} x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              A confirmation email has been sent to your email address. You can track your order status anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Link href="/orders">
                <Button>View My Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
