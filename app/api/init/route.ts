import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import Product from "@/lib/models/Product"
import { mockProducts } from "@/lib/mock-data"

async function initializeDatabase() {
  try {
    console.log("🔄 Connecting to MongoDB...")
    await connectDB()
    console.log("✅ MongoDB connected")

    const results = {
      adminCreated: false,
      adminExists: false,
      productsSeeded: false,
      productsExist: false,
      adminEmail: "",
      adminPassword: "",
      productCount: 0,
    }

    // Create admin user if doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || "admin@craftmemories.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

    results.adminEmail = adminEmail
    results.adminPassword = adminPassword

    console.log("🔍 Checking for existing admin user...")
    const existingAdmin = await User.findOne({ email: adminEmail })
    
    if (!existingAdmin) {
      console.log("👤 Creating admin user...")
      await User.create({
        email: adminEmail,
        password: adminPassword, // In production, hash this with bcrypt
        name: "Admin",
        role: "admin",
      })
      console.log("✅ Admin user created successfully")
      results.adminCreated = true
    } else {
      console.log("✅ Admin user already exists")
      results.adminExists = true
    }

    // Seed products if database is empty
    console.log("🔍 Checking product count...")
    const productCount = await Product.countDocuments()
    results.productCount = productCount

    if (productCount === 0) {
      console.log("📦 Seeding products...")
      await Product.insertMany(mockProducts)
      results.productsSeeded = true
      results.productCount = mockProducts.length
      console.log(`✅ ${mockProducts.length} products seeded successfully`)
    } else {
      console.log(`✅ Database already has ${productCount} products`)
      results.productsExist = true
    }

    return {
      success: true,
      message: "Database initialized successfully",
      results,
    }
  } catch (error: any) {
    console.error("❌ Error initializing database:", error)
    throw error
  }
}

// GET method for browser access
export async function GET(request: NextRequest) {
  try {
    const result = await initializeDatabase()
    
    return new NextResponse(
      `
<!DOCTYPE html>
<html>
<head>
  <title>Database Initialization</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 { color: #10b981; margin-top: 0; }
    .success { color: #10b981; font-weight: bold; }
    .info { color: #3b82f6; }
    .credential-box {
      background: #f0fdf4;
      border: 2px solid #10b981;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .credential {
      font-family: 'Courier New', monospace;
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
    .status-item {
      padding: 10px;
      margin: 10px 0;
      border-left: 4px solid #10b981;
      background: #f9fafb;
    }
    code {
      background: #e5e7eb;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 10px 10px 10px 0;
      font-weight: 600;
    }
    .button:hover {
      background: #2563eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ Database Initialized Successfully!</h1>
    
    <div class="credential-box">
      <h2 style="margin-top: 0;">🔐 Admin Credentials</h2>
      <div class="credential">
        <strong>Email:</strong> ${result.results.adminEmail}
      </div>
      <div class="credential">
        <strong>Password:</strong> ${result.results.adminPassword}
      </div>
    </div>

    <h3>📊 Initialization Status:</h3>
    <div class="status-item">
      ${result.results.adminCreated ? '✅ Admin user created' : result.results.adminExists ? '✅ Admin user already exists' : '⚠️ Admin status unknown'}
    </div>
    <div class="status-item">
      ${result.results.productsSeeded ? `✅ ${result.results.productCount} products seeded` : result.results.productsExist ? `✅ ${result.results.productCount} products already exist` : '⚠️ Product status unknown'}
    </div>

    <h3>🚀 Next Steps:</h3>
    <ol>
      <li>Go to the <a href="/login" class="button">Login Page</a></li>
      <li>Use the credentials above to sign in</li>
      <li>Start managing your products!</li>
    </ol>

    <h3>📚 Useful Links:</h3>
    <a href="/" class="button">Home Page</a>
    <a href="/admin" class="button">Admin Dashboard</a>
    <a href="/api/products" class="button">View Products API</a>
  </div>
</body>
</html>
      `,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  } catch (error: any) {
    return new NextResponse(
      `
<!DOCTYPE html>
<html>
<head>
  <title>Database Initialization Error</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 { color: #ef4444; margin-top: 0; }
    .error-box {
      background: #fef2f2;
      border: 2px solid #ef4444;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    code {
      background: #e5e7eb;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background: #1f2937;
      color: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>❌ Database Initialization Failed</h1>
    
    <div class="error-box">
      <h3>Error Details:</h3>
      <pre>${error.message || 'Unknown error occurred'}</pre>
    </div>

    <h3>💡 Common Solutions:</h3>
    <ol>
      <li><strong>MongoDB Not Running:</strong> Make sure MongoDB is installed and running
        <ul>
          <li>Windows: Check Services for MongoDB</li>
          <li>Or use MongoDB Compass</li>
          <li>Or use MongoDB Atlas (cloud)</li>
        </ul>
      </li>
      <li><strong>Check Connection String:</strong> Verify <code>.env.local</code> has correct MongoDB URI</li>
      <li><strong>Check Console:</strong> Look at the terminal/console for detailed error messages</li>
    </ol>

    <h3>📚 Need Help?</h3>
    <p>Check the <code>MONGODB-SETUP.md</code> file for detailed MongoDB installation instructions.</p>
  </div>
</body>
</html>
      `,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  }
}

// POST method for programmatic access
export async function POST(request: NextRequest) {
  try {
    const result = await initializeDatabase()
    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error("❌ Error initializing database:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to initialize database",
        details: error.toString()
      }, 
      { status: 500 }
    )
  }
}
