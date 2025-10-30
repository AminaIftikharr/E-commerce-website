import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

export async function GET() {
  try {
    await connectDB()
    
    return NextResponse.json({
      success: true,
      message: "✅ MongoDB connected successfully!",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "❌ MongoDB connection failed",
        error: error.message,
        help: "Make sure MongoDB is running. Check .env.local for connection string.",
      },
      { status: 500 }
    )
  }
}
