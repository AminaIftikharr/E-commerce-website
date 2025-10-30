"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import { mockProducts } from "@/lib/mock-data"
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { CheckoutForm, type CheckoutData } from "@/components/checkout-form"

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateCart, clearCart, addOrder } = useStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  const cartItems = cart.map((item) => ({
    ...item,
    product: mockProducts.find((p) => p.id === item.productId),
  }))

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  const handleCheckout = async (checkoutData: CheckoutData) => {
    setIsCheckingOut(true)
    
    const order = {
      items: cart,
      total: total * 1.1,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
      customerName: checkoutData.customerName,
      customerEmail: checkoutData.customerEmail,
      customerPhone: checkoutData.customerPhone,
      customerAddress: checkoutData.customerAddress,
      customerCity: checkoutData.customerCity,
      customerZipCode: checkoutData.customerZipCode,
      paymentMethod: checkoutData.paymentMethod,
    }
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
      
      const data = await response.json()
      
      if (data.success && data.data) {
        clearCart()
        // Use the MongoDB _id from the created order
        router.push(`/order-confirmation/${data.data._id}`)
      } else {
        alert("Failed to create order. Please try again.")
        setIsCheckingOut(false)
      }
    } catch (error) {
      console.error("Error creating order:", error)
      alert("An error occurred. Please try again.")
      setIsCheckingOut(false)
    }
  }

  if (cart.length === 0 && !showCheckoutForm) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-center space-y-6 py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              </div>
              <Link href="/">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => {
              if (showCheckoutForm) {
                setShowCheckoutForm(false)
              } else {
                router.back()
              }
            }}
            className="gap-2 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {!showCheckoutForm ? (
            <>
              <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.productId} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden shrink-0">
                          <img
                            src={item.product?.image || "/placeholder.svg"}
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                          {item.customization && (
                            <div className="text-sm text-muted-foreground space-y-1">
                              {item.customization.color && <p>Color: {item.customization.color}</p>}
                              {item.customization.design && <p>Design: {item.customization.design}</p>}
                              {item.customization.text && <p>Text: "{item.customization.text}"</p>}
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Qty:</span>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newCart = cart.map((i) =>
                                    i.productId === item.productId
                                      ? {
                                          ...i,
                                          quantity: Math.max(1, Number.parseInt(e.target.value) || 1),
                                        }
                                      : i,
                                  )
                                  updateCart(newCart)
                                }}
                                className="w-12 px-2 py-1 border border-border rounded text-center"
                              />
                            </div>
                            <span className="font-semibold">
                              ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-destructive hover:bg-destructive/10 p-2 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="p-6 space-y-4 sticky top-20">
                    <h2 className="text-xl font-bold">Order Summary</h2>

                    <div className="space-y-2 border-t border-border pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax:</span>
                        <span>${(total * 0.1).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">${(total * 1.1).toFixed(2)}</span>
                    </div>

                    <Button
                      size="lg"
                      onClick={() => setShowCheckoutForm(true)}
                      disabled={isCheckingOut}
                      className="w-full"
                    >
                      {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                    </Button>

                    <Link href="/">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-2xl mx-auto">
              <CheckoutForm onSubmit={handleCheckout} isLoading={isCheckingOut} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
