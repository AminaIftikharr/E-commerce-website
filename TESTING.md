# Testing Guide

## Test Checklist

### 1. Test MongoDB Connection
```bash
# Start development server
npm run dev
```

Expected: Server starts at http://localhost:3000

### 2. Initialize Database
Visit: http://localhost:3000/api/init

Expected Response:
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "admin": {
    "email": "admin@craftmemories.com",
    "password": "admin123"
  }
}
```

### 3. Test API Endpoints

#### Get All Products
```bash
curl http://localhost:3000/api/products
```

Expected: JSON array of products

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@craftmemories.com","password":"admin123"}'
```

Expected: User object with role: "admin"

### 4. Test Frontend

#### Login Page
1. Visit: http://localhost:3000/login
2. Enter:
   - Email: admin@craftmemories.com
   - Password: admin123
3. Click "Sign In"

Expected: Redirect to /admin

#### Admin Dashboard
1. Should see admin sidebar
2. Should see product list
3. Click "Add Product" button

Expected: Product form opens

#### Add Product
1. Fill in product details
2. Click "Save Product"

Expected: Product appears in list

### 5. Database Verification

Using MongoDB Compass:
1. Connect to: mongodb://localhost:27017
2. Open database: ecommerce
3. Check collections:
   - products (should have items)
   - users (should have admin)
   - orders (empty initially)

## Common Issues

### Issue: Cannot connect to MongoDB
**Solution**: 
- Install MongoDB locally or use MongoDB Atlas
- Verify connection string in `.env.local`
- Check if MongoDB service is running

### Issue: API returns 500 error
**Solution**:
- Check terminal for error messages
- Verify MongoDB connection
- Check if collections exist

### Issue: Login doesn't work
**Solution**:
- Run /api/init first to create admin user
- Check credentials match `.env.local`
- Check browser console for errors

### Issue: Products don't load
**Solution**:
- Run /api/init to seed products
- Check API response in Network tab
- Verify MongoDB has products collection

## Manual Testing Steps

1. ✅ Install dependencies
2. ✅ Start MongoDB
3. ✅ Start dev server
4. ✅ Initialize database (/api/init)
5. ✅ Login as admin
6. ✅ Add new product
7. ✅ Edit product
8. ✅ Delete product
9. ✅ View products on homepage
10. ✅ Add to cart
11. ✅ Checkout

## Automated Tests (Future)

Create tests for:
- API endpoints
- Database operations
- Authentication flow
- CRUD operations
- Cart functionality

## Performance Tests

- Load time for products page
- API response time
- Database query performance
- Frontend rendering speed

---

**Status**: Ready for testing after MongoDB is running!
