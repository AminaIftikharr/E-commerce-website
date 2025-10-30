"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import { ArrowLeft, Package } from "lucide-react"

export default function OrdersPage() {
  const { orders, currentUser } = useStore()

  if (!currentUser) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in</h1>
            <Link href="/login">
              <Button>Go to Login</Button>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>

          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <Card className="p-12 text-center space-y-4">
              <Package className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-4">Start shopping to place your first order</p>
              </div>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-lg font-bold text-primary">Rs {order.total.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-semibold capitalize text-primary">{order.status}</p>
                      </div>
                      <Link href={`/order-confirmation/${order.id}`}>
                        <Button variant="outline" size="sm">
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
