# E-Commerce Website - MongoDB Backend Setup

This is a Next.js e-commerce application with MongoDB backend integration.

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or pnpm package manager

## Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: MongoDB should start automatically
   - Mac/Linux: `sudo systemctl start mongod`
3. The default connection string in `.env.local` should work: `mongodb://localhost:27017/ecommerce`

### Option 2: MongoDB Atlas (Cloud)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create database user and get connection string
4. Update `.env.local` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## Configuration

The `.env.local` file is already created with default values:
- Default admin email: admin@craftmemories.com
- Default admin password: admin123
- MongoDB URI: mongodb://localhost:27017/ecommerce

**Important:** Change these values in production!

## Initialize Database

**Option 1: Using Setup Page (Easiest)**

1. Start the development server:
```bash
npm run dev
```

2. Open browser and navigate to:
```
http://localhost:3000/setup
```

3. Click "Initialize Database" button
4. You'll see admin credentials and confirmation

**Option 2: Using API Endpoint**

Navigate to:
```
http://localhost:3000/api/init
```

This will:
- Create the admin user
- Seed the database with sample products

You should see a success message with admin credentials.

## Usage

### Admin Login
- Email: admin@craftmemories.com
- Password: admin123

### Features
- ✅ Product management (CRUD operations)
- ✅ Order management
- ✅ User authentication
- ✅ Shopping cart
- ✅ MongoDB integration
- ✅ RESTful API routes

## API Routes

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get single order
- `PUT /api/orders/[id]` - Update order
- `DELETE /api/orders/[id]` - Delete order

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Utilities
- `POST /api/init` - Initialize database with admin and sample data
- `POST /api/seed` - Reseed products

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check connection string in `.env.local`
- For local MongoDB, ensure port 27017 is not blocked

### Module Not Found Errors
- Run `npm install --legacy-peer-deps` again
- Delete `node_modules` and `package-lock.json`, then reinstall

### TypeScript Errors
- Run `npm run build` to see detailed errors
- Make sure all dependencies are installed

## Project Structure

```
├── app/
│   ├── api/           # API routes
│   │   ├── auth/      # Authentication endpoints
│   │   ├── products/  # Product endpoints
│   │   ├── orders/    # Order endpoints
│   │   ├── init/      # Database initialization
│   │   └── seed/      # Database seeding
│   ├── admin/         # Admin dashboard pages
│   └── ...            # Other pages
├── lib/
│   ├── models/        # MongoDB models
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   └── User.ts
│   ├── mongodb.ts     # Database connection
│   └── store-context.tsx  # Global state management
└── .env.local         # Environment variables
```

## Security Notes

⚠️ **Important for Production:**
- Hash passwords using bcrypt
- Implement proper JWT authentication
- Use environment variables for secrets
- Enable HTTPS
- Implement rate limiting
- Add input validation and sanitization
- Use MongoDB transactions for critical operations

## License

MIT
