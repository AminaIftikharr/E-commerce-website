"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void
  isLoading?: boolean
}

export interface CheckoutData {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerZipCode: string
  paymentMethod: "cash-on-delivery"
}

export function CheckoutForm({ onSubmit, isLoading = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    customerCity: "",
    customerZipCode: "",
    paymentMethod: "cash-on-delivery",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) newErrors.customerName = "Name is required"
    if (!formData.customerEmail.trim()) newErrors.customerEmail = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) newErrors.customerEmail = "Invalid email format"
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Phone is required"
    if (!formData.customerAddress.trim()) newErrors.customerAddress = "Address is required"
    if (!formData.customerCity.trim()) newErrors.customerCity = "City is required"
    if (!formData.customerZipCode.trim()) newErrors.customerZipCode = "Zip code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Checkout</h2>
        <p className="text-muted-foreground">Please provide your information to complete the order</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Personal Information</h3>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.customerName ? "border-destructive" : "border-border"
              }`}
              placeholder="John Doe"
            />
            {errors.customerName && <p className="text-sm text-destructive mt-1">{errors.customerName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.customerEmail ? "border-destructive" : "border-border"
                }`}
                placeholder="john@example.com"
              />
              {errors.customerEmail && <p className="text-sm text-destructive mt-1">{errors.customerEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.customerPhone ? "border-destructive" : "border-border"
                }`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.customerPhone && <p className="text-sm text-destructive mt-1">{errors.customerPhone}</p>}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Shipping Address</h3>

          <div>
            <label className="block text-sm font-medium mb-2">Address *</label>
            <input
              type="text"
              value={formData.customerAddress}
              onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.customerAddress ? "border-destructive" : "border-border"
              }`}
              placeholder="123 Main Street"
            />
            {errors.customerAddress && <p className="text-sm text-destructive mt-1">{errors.customerAddress}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                value={formData.customerCity}
                onChange={(e) => setFormData({ ...formData, customerCity: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.customerCity ? "border-destructive" : "border-border"
                }`}
                placeholder="New York"
              />
              {errors.customerCity && <p className="text-sm text-destructive mt-1">{errors.customerCity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Zip Code *</label>
              <input
                type="text"
                value={formData.customerZipCode}
                onChange={(e) => setFormData({ ...formData, customerZipCode: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.customerZipCode ? "border-destructive" : "border-border"
                }`}
                placeholder="10001"
              />
              {errors.customerZipCode && <p className="text-sm text-destructive mt-1">{errors.customerZipCode}</p>}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Payment Method</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg bg-primary/5">
              <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div>
                <span className="font-semibold block">Cash on Delivery</span>
                <span className="text-sm text-muted-foreground">Pay when you receive your order</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="flex gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-primary">
            All fields are mandatory. Please fill in all information before proceeding.
          </p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </Card>
  )
}
