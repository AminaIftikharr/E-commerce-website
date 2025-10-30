import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

// POST register
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

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
    return NextResponse.json({ success: false, error: "Failed to register user" }, { status: 500 })
  }
}
