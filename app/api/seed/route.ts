import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/Product"
import { mockProducts } from "@/lib/mock-data"

// POST seed database with mock data
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Clear existing products
    await Product.deleteMany({})

    // Insert mock products
    const products = await Product.insertMany(mockProducts)

    return NextResponse.json(
      { success: true, message: "Database seeded successfully", count: products.length },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}
