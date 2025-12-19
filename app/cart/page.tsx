"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { StripeCheckoutWrapper } from "@/components/stripe-checkout"

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateCart, clearCart, addOrder, products } = useStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => (p._id || p.id) === item.productId),
  }))

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  const validateCustomerInfo = () => {
    const errors: Record<string, string> = {}
    
    if (!customerInfo.name.trim()) errors.name = "Name is required"
    if (!customerInfo.email.trim()) errors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = "Invalid email format"
    }
    if (!customerInfo.phone.trim()) errors.phone = "Phone is required"
    if (!customerInfo.address.trim()) errors.address = "Address is required"
    if (!customerInfo.city.trim()) errors.city = "City is required"
    if (!customerInfo.zipCode.trim()) errors.zipCode = "Zip code is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleProceedToPayment = () => {
    if (validateCustomerInfo()) {
      setShowPaymentForm(true)
    }
  }

  const handlePaymentSuccess = async (paymentIntentId: string) => {
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setIsCheckingOut(true)
    
    const order = {
      items: cart,
      total: total * 1.1, // Including tax
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      customerAddress: customerInfo.address,
      customerCity: customerInfo.city,
      customerZipCode: customerInfo.zipCode,
      paymentMethod: "credit-card" as const,
      paymentStatus: "paid",
      stripePaymentId: paymentIntentId,
    }
    
    try {
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
      
      const orderData = await orderResponse.json()
      
      if (orderData.success && orderData.data) {
        clearCart()
        router.push(`/order-confirmation/${orderData.data._id}`)
      } else {
        alert("Failed to create order. Please contact support.")
        setIsCheckingOut(false)
      }
    } catch (error) {
      console.error("Error creating order:", error)
      alert("An error occurred. Please contact support.")
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
                              Rs {((item.product?.price || 0) * item.quantity).toLocaleString()}
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
                        <span>Rs {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax:</span>
                        <span>Rs {(total * 0.1).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">Rs {(total * 1.1).toLocaleString()}</span>
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
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-2xl font-bold">Checkout</h2>

              {!showPaymentForm ? (
                <div className="space-y-6">
                  <Card className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Customer Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                          placeholder="John Doe"
                        />
                        {formErrors.name && (
                          <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                          placeholder="john@example.com"
                        />
                        {formErrors.email && (
                          <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                          placeholder="+1 (555) 123-4567"
                        />
                        {formErrors.phone && (
                          <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Address *</label>
                        <input
                          type="text"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                          placeholder="123 Main St"
                        />
                        {formErrors.address && (
                          <p className="text-sm text-destructive mt-1">{formErrors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">City *</label>
                          <input
                            type="text"
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                            placeholder="New York"
                          />
                          {formErrors.city && (
                            <p className="text-sm text-destructive mt-1">{formErrors.city}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Zip Code *</label>
                          <input
                            type="text"
                            value={customerInfo.zipCode}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, zipCode: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                            placeholder="10001"
                          />
                          {formErrors.zipCode && (
                            <p className="text-sm text-destructive mt-1">{formErrors.zipCode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%)</span>
                        <span>${(total * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(total * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </Card>

                  <Button onClick={handleProceedToPayment} className="w-full" size="lg">
                    Proceed to Payment
                  </Button>
                </div>
              ) : (
                <StripeCheckoutWrapper
                  amount={total * 1.1}
                  onSuccess={handlePaymentSuccess}
                  customerInfo={customerInfo}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}