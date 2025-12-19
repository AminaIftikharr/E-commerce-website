import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

// POST register
export async function POST(request: NextRequest) {
  let email = ""
  let password = ""
  let name = ""
  
  try {
    // Parse request body first
    const body = await request.json()
    email = body.email
    password = body.password
    name = body.name

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 })
    }

    // Create new user (in production, hash the password with bcrypt)
    const user = await User.create({
      email: email.toLowerCase(),
      password, // In production, hash this password
      name,
      role: "customer",
    })

    // Return user data without password
    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    }

    return NextResponse.json({ success: true, data: userData }, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    if (process.env.NODE_ENV === "development") {
      // Dev fallback to keep site functional without DB
      console.warn("WARNING: DB unavailable, serving mock registered user (development)")
      const mockUser = {
        id: "dev-customer-id",
        email: email || "customer@example.com",
        name: name || "Customer (Dev)",
        role: "customer" as const,
      }
      return NextResponse.json({ success: true, data: mockUser, dev: true }, { status: 201 })
    }
    return NextResponse.json({ success: false, error: "Failed to register user" }, { status: 500 })
  }
}
