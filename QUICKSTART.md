# 🚀 Quick Start Guide

## ✅ Your E-Commerce App is Ready!

All dependencies are installed and configured. Follow these simple steps to get started:

---

## Step 1: Start MongoDB

### Choose ONE of these options:

**🥇 Option A: MongoDB Atlas (Easiest - Cloud Based)**
- No installation needed!
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account & cluster
- Get connection string
- Update `.env.local`:
  ```
  MONGODB_URI=your-atlas-connection-string
  ```

**🥈 Option B: MongoDB Compass (Recommended for Local)**
- Download: https://www.mongodb.com/try/download/compass
- Install and open
- Connect to: `mongodb://localhost:27017`

**🥉 Option C: MongoDB Community Server**
- Download: https://www.mongodb.com/try/download/community
- Install as Windows Service
- It will run automatically

---

## Step 2: Start the Application

Open terminal in project folder and run:

```bash
npm run dev
```

Server will start at: **http://localhost:3000**

---

## Step 3: Initialize Database

### 🎯 Method 1: Setup Page (Recommended)

1. Open your browser
2. Go to: **http://localhost:3000/setup**
3. Click "Initialize Database" button
4. See your admin credentials!

### 🎯 Method 2: Direct API

Open browser and visit: **http://localhost:3000/api/init**

---

## Step 4: Login as Admin

1. Go to: **http://localhost:3000/login**
2. Use these credentials:
   ```
   Email: admin@craftmemories.com
   Password: admin123
   ```
3. You'll be redirected to admin dashboard

---

## 🎉 You're Done!

You can now:
- ✅ Add, edit, delete products
- ✅ Manage orders
- ✅ View analytics
- ✅ Customize products

---

## 📚 Important URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Setup | http://localhost:3000/setup |
| Login | http://localhost:3000/login |
| Admin | http://localhost:3000/admin |
| API Docs | http://localhost:3000/api/init |

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running (check Compass or Services)
- Verify `.env.local` has correct connection string
- Try MongoDB Atlas for cloud option

### "Port 3000 in use"
```bash
# Kill process using port 3000
taskkill /F /PID <PID>

# Or run on different port
npm run dev -- -p 3001
```

### "Module not found"
```bash
npm install --legacy-peer-deps
```

### Clear cache if needed
```bash
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 💡 Next Steps

1. ✅ Complete setup above
2. 📦 Add your own products
3. 🎨 Customize the design
4. 🚀 Deploy to production (Vercel, etc.)

---

## 📖 More Documentation

- `README.md` - Full documentation
- `MONGODB-SETUP.md` - MongoDB installation guide
- `TESTING.md` - Testing guide
- `SUMMARY.md` - Complete feature list

---

**Need Help?** Check the documentation files or the terminal console for detailed error messages.

**Happy Coding! 🎉**
