/**
 * Small utility to create unique index on `products.slug` in MongoDB.
 * Usage: set MONGODB_URI in environment (or .env), then run:
 * node scripts/create-mongo-index.js
 */
const { MongoClient } = require('mongodb')

async function run() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI
  if (!uri) {
    console.error('MONGODB_URI not set in env. Set it before running this script.')
    process.exit(1)
  }

  const client = new MongoClient(uri)
  try {
    await client.connect()
    const dbName = process.env.DATABASE_NAME || 'edm_db'
    const db = client.db(dbName)
    const products = db.collection('products')
    // Create a unique index on slug (sparse so documents without slug are ignored)
    await products.createIndex({ slug: 1 }, { unique: true, sparse: true })
    console.log('Created unique sparse index on products.slug')
  } catch (err) {
    console.error('Failed to create index', err)
  } finally {
    await client.close()
  }
}

run()
