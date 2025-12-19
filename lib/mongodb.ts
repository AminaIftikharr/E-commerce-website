import mongoose from "mongoose"

const PRIMARY_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce"
const FALLBACK_URI = process.env.MONGODB_FALLBACK_URI || "mongodb://127.0.0.1:27017/ecommerce"

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    // Try primary URI first; on failure, try local fallback
    cached.promise = mongoose
      .connect(PRIMARY_URI, opts)
      .then((m) => {
        console.log("✅ MongoDB connected successfully")
        return m
      })
      .catch(async (err) => {
        console.error("❌ Primary MongoDB connection failed:", err?.message || err)
        console.warn("Attempting fallback local MongoDB at", FALLBACK_URI)
        try {
          const m2 = await mongoose.connect(FALLBACK_URI, opts)
          console.log("✅ Fallback MongoDB connected successfully")
          return m2
        } catch (err2) {
          console.error("❌ Fallback MongoDB connection failed:", err2?.message || err2)
          throw err2
        }
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
