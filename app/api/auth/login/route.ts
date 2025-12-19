import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

// POST login
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

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
      console.warn("⚠️ DB unavailable, serving mock login user (development)")
      const { email } = await request.json().catch(() => ({ email: "dev@example.com" }))
      const mockUser = {
        id: "dev-user-id",
        email: (email || "dev@example.com").toLowerCase(),
        name: "Developer",
        role: "admin" as const,
      }
      return NextResponse.json({ success: true, data: mockUser, dev: true }, { status: 200 })
    }
    return NextResponse.json({ success: false, error: "Failed to login" }, { status: 500 })
  }
}
