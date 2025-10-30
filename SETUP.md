# E-Commerce Setup Guide

## Quick Start

### 1. Install MongoDB (if not already installed)

#### Option A: MongoDB Compass (Recommended for Windows)
1. Download MongoDB Compass from: https://www.mongodb.com/try/download/compass
2. Install and run MongoDB Compass
3. Connect using: `mongodb://localhost:27017`

#### Option B: MongoDB Community Server
1. Download from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB should start automatically

#### Option C: Use MongoDB Atlas (Cloud - No Installation)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `.env.local` with your connection string

### 2. Install Project Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Start Development Server

```bash
npm run dev
```

The server will start at http://localhost:3000

### 4. Initialize Database

Open your browser and go to:
```
http://localhost:3000/api/init
```

This will:
- ✅ Create admin user (admin@craftmemories.com / admin123)
- ✅ Load sample products into MongoDB

### 5. Login to Admin Panel

1. Go to: http://localhost:3000/login
2. Use credentials:
   - Email: admin@craftmemories.com
   - Password: admin123

## If Server Doesn't Start

1. Make sure port 3000 is not in use
2. Try clearing Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. Check if MongoDB is running:
   - Open MongoDB Compass and try to connect
   - Or check services: `net start MongoDB`

## Project is Ready!

✅ All dependencies installed
✅ MongoDB connection configured
✅ API routes created
✅ Models defined
✅ Admin authentication ready
✅ No TypeScript errors

## Next Steps

1. Ensure MongoDB is running (local or Atlas)
2. Visit http://localhost:3000/api/init to setup database
3. Login and start managing products!

## API Endpoints

- `POST /api/init` - Initialize database
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order

## MongoDB Connection Status

The app will try to connect to: `mongodb://localhost:27017/ecommerce`

You can change this in `.env.local` file.
