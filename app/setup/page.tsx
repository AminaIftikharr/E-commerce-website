"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Database, User, Package } from "lucide-react"

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInitialize = async () => {
    setStatus("loading")
    setError(null)

    try {
      const response = await fetch("/api/init", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setResult(data.results)
      } else {
        setStatus("error")
        setError(data.error || "Failed to initialize database")
      }
    } catch (err: any) {
      setStatus("error")
      setError(err.message || "An error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <Database className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold mb-2">Database Setup</h1>
          <p className="text-muted-foreground">
            Initialize your e-commerce database with default admin user and sample products
          </p>
        </div>

        {status === "idle" && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Database className="w-5 h-5" />
                What will be created:
              </h3>
              <ul className="space-y-2 ml-7 text-sm">
                <li className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Default admin user (admin@craftmemories.com)
                </li>
                <li className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Sample products (magazines, journals, scrapbooks, tools)
                </li>
              </ul>
            </div>

            <Button onClick={handleInitialize} size="lg" className="w-full gap-2">
              <Database className="w-5 h-5" />
              Initialize Database
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Note: Make sure MongoDB is running before initializing
            </p>
          </div>
        )}

        {status === "loading" && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
            <p className="text-lg font-medium">Initializing database...</p>
            <p className="text-sm text-muted-foreground mt-2">This may take a few seconds</p>
          </div>
        )}

        {status === "success" && result && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
              <p className="text-muted-foreground">Database initialized successfully</p>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">🔐 Admin Credentials</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-white p-3 rounded">
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <span className="font-bold">{result.adminEmail}</span>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <span className="text-muted-foreground">Password:</span>{" "}
                    <span className="font-bold">{result.adminPassword}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <User className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Admin User</p>
                  <p className="text-lg font-bold">
                    {result.adminCreated ? "Created" : "Already Exists"}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <Package className="w-8 h-8 text-purple-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="text-lg font-bold">{result.productCount} Items</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild className="flex-1">
                  <a href="/login">Go to Login</a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href="/">View Products</a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-2xl font-bold text-red-600 mb-2">Initialization Failed</h2>
              <p className="text-muted-foreground">Something went wrong</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-red-800">Error Details:</h3>
              <p className="text-sm font-mono text-red-700">{error}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">💡 Common Solutions:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Make sure MongoDB is installed and running</li>
                <li>Check your .env.local file has correct MongoDB URI</li>
                <li>Verify MongoDB connection string format</li>
                <li>Check terminal/console for detailed error messages</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleInitialize} className="flex-1" variant="outline">
                Try Again
              </Button>
              <Button asChild className="flex-1">
                <a href="/">Go to Home</a>
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <p className="text-xs text-center text-muted-foreground">
            Need help? Check the MONGODB-SETUP.md file for installation instructions
          </p>
        </div>
      </Card>
    </div>
  )
}
