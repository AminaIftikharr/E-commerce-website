import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/lib/models/Order"

interface PaymentRequest {
  orderId: string
  amount: number
  currency: string
  paymentMethod: string
  cardDetails?: {
    cardNumber: string
    expiry: string
    cvc: string
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body: PaymentRequest = await request.json()

    // Validate payment details based on payment method
    if (body.paymentMethod === "credit-card" || body.paymentMethod === "debit-card") {
      if (!body.cardDetails) {
        return NextResponse.json(
          { success: false, error: "Card details are required" },
          { status: 400 }
        )
      }

      // Basic card validation
      const cardNumber = body.cardDetails.cardNumber.replace(/\s/g, "")
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        return NextResponse.json(
          { success: false, error: "Invalid card number" },
          { status: 400 }
        )
      }

      if (!body.cardDetails.expiry || !body.cardDetails.cvc) {
        return NextResponse.json(
          { success: false, error: "Incomplete card details" },
          { status: 400 }
        )
      }
    }

    // Update order status to processing
    const order = await Order.findByIdAndUpdate(
      body.orderId,
      {
        status: "processing",
        paymentStatus: "confirmed",
      },
      { new: true }
    )

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      )
    }

    // TODO: Integrate with Stripe or other payment gateway
    // For now, we're simulating successful payment
    // In production, you would call Stripe API or similar

    return NextResponse.json(
      {
        success: true,
        data: {
          orderId: order._id,
          status: "processing",
          amount: body.amount,
          currency: body.currency,
          paymentMethod: body.paymentMethod,
          message: "Payment processed successfully",
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process payment" },
      { status: 500 }
    )
  }
}
