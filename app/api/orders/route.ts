import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/lib/models/Order"

// GET all orders
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const email = searchParams.get("email")

    let query: any = {}

    if (status) {
      query.status = status
    }

    if (email) {
      query.customerEmail = email
    }

    const orders = await Order.find(query)
      .populate("items.productId")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: orders }, { status: 200 })
  } catch (error) {
    console.error("Error fetching orders:", error)
    if (process.env.NODE_ENV === "development") {
      console.warn("WARNING: DB unavailable, returning empty orders (development)")
      return NextResponse.json({ success: true, data: [], dev: true }, { status: 200 })
    }
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST create new order
export async function POST(request: NextRequest) {
  let body: any = {}
  
  try {
    // Parse request body first
    body = await request.json()
    
    await connectDB()
    const order = await Order.create(body)

    return NextResponse.json({ success: true, data: order }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    if (process.env.NODE_ENV === "development") {
      console.warn("WARNING: DB unavailable, echoing order payload (development)")
      const mocked = { ...body, _id: "dev-order-id", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      return NextResponse.json({ success: true, data: mocked, dev: true }, { status: 201 })
    }
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
