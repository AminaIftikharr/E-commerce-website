import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

// POST login
export async function POST(request: NextRequest) {
  let email = ""
  let password = ""
  
  try {
    // Parse request body first
    const body = await request.json()
    email = body.email
    password = body.password

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    await connectDB()

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    // Simple password comparison (in production, use bcrypt)
    if (user.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    // Return user data without password
    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    }

    return NextResponse.json({ success: true, data: userData }, { status: 200 })
  } catch (error) {
    console.error("Error logging in:", error)
    if (process.env.NODE_ENV === "development") {
      // Dev fallback to keep site functional without DB
      console.warn("WARNING: DB unavailable, serving mock login user (development)")
      const mockUser = {
        id: "dev-admin-id",
        email: email || "admin@craftmemories.com",
        name: "Admin (Dev)",
        role: "admin" as const,
      }
      return NextResponse.json({ success: true, data: mockUser, dev: true }, { status: 200 })
    }
    return NextResponse.json({ success: false, error: "Failed to login" }, { status: 500 })
  }
}
