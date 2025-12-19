"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  amount: number
  onSuccess: (paymentIntentId: string) => void
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
  }
}

function CheckoutPaymentForm({ amount, onSuccess, customerInfo }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          receipt_email: customerInfo.email,
          shipping: {
            name: customerInfo.name,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.zipCode,
              country: "US",
            },
          },
        },
        redirect: "if_required",
      })

      if (error) {
        setErrorMessage(error.message || "Payment failed")
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id)
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred")
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <PaymentElement />
      </Card>

      {errorMessage && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  )
}

interface StripeCheckoutWrapperProps {
  amount: number
  onSuccess: (paymentIntentId: string) => void
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
  }
}

export function StripeCheckoutWrapper({
  amount,
  onSuccess,
  customerInfo,
}: StripeCheckoutWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/payment/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency: "usd",
            metadata: {
              customerName: customerInfo.name,
              customerEmail: customerInfo.email,
            },
          }),
        })

        const data = await response.json()

        if (data.success && data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          setError(data.error || "Failed to initialize payment")
        }
      } catch (err: any) {
        setError(err.message || "Failed to initialize payment")
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [amount, customerInfo])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-destructive/10 text-destructive rounded-lg">
        <p className="font-semibold">Payment Initialization Error</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    )
  }

  if (!clientSecret) {
    return null
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#0070f3",
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutPaymentForm
        amount={amount}
        onSuccess={onSuccess}
        customerInfo={customerInfo}
      />
    </Elements>
  )
}
