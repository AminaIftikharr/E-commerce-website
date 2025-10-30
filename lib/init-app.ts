import connectDB from "./mongodb"
import User from "./models/User"
import Product from "./models/Product"
import { mockProducts } from "./mock-data"

/**
 * Initialize database with default admin user and products
 * This runs automatically when the app starts
 */
export async function initializeApp() {
  try {
    console.log("\n🚀 Starting application initialization...")
    
    // Connect to MongoDB
    await connectDB()

    // Create default admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@craftmemories.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

    const existingAdmin = await User.findOne({ email: adminEmail })
    
    if (!existingAdmin) {
      await User.create({
        email: adminEmail,
        password: adminPassword,
        name: "Admin",
        role: "admin",
      })
      console.log("✅ Default admin user created")
      console.log(`   Email: ${adminEmail}`)
      console.log(`   Password: ${adminPassword}`)
    }

    // Seed products if empty
    const productCount = await Product.countDocuments()
    if (productCount === 0) {
      await Product.insertMany(mockProducts)
      console.log(`✅ Seeded ${mockProducts.length} products`)
    }

    console.log("✅ Application initialized successfully\n")
    return true
  } catch (error) {
    console.error("❌ Failed to initialize application:", error)
    console.log("⚠️  App will continue but features may not work without MongoDB\n")
    return false
  }
}
