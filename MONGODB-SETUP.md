# MongoDB Installation Guide for Windows

## Quick Setup (Recommended)

### Option 1: MongoDB Atlas (Cloud - Easiest)

**No installation required!**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account (free)
4. Create a free cluster (takes ~5 minutes)
5. Create database user:
   - Click "Database Access"
   - Add user with username and password
6. Whitelist your IP:
   - Click "Network Access"
   - Add IP address (or 0.0.0.0/0 for development)
7. Get connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
8. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

**Advantages**: No installation, automatic backups, always available

---

### Option 2: MongoDB Compass (GUI Tool)

**Easiest local setup**

1. Download: https://www.mongodb.com/try/download/compass
2. Install MongoDB Compass
3. Also installs MongoDB server locally
4. Open MongoDB Compass
5. Connect to: `mongodb://localhost:27017`
6. You're done! 

**Advantages**: Visual interface, easy to use, includes local server

---

### Option 3: MongoDB Community Server

**Full control**

1. Download: https://www.mongodb.com/try/download/community
2. Choose:
   - Version: 7.0 or latest
   - Platform: Windows
   - Package: MSI
3. Run installer:
   - Choose "Complete" installation
   - Install as Windows Service (recommended)
   - Check "Install MongoDB Compass" (optional)
4. MongoDB will start automatically
5. Verify installation:
   ```powershell
   mongo --version
   ```

**Default connection**: `mongodb://localhost:27017`

---

## Verify Installation

### Check if MongoDB is Running

```powershell
# Check MongoDB service
Get-Service MongoDB

# Should show "Running"
```

### Test Connection

```powershell
# Using MongoDB Shell (if installed)
mongosh

# Or use MongoDB Compass to connect
```

---

## Troubleshooting

### MongoDB Service Not Starting

```powershell
# Start MongoDB service
net start MongoDB

# Or in Services app:
# Press Win + R, type 'services.msc'
# Find MongoDB, right-click, Start
```

### Port 27017 Already in Use

```powershell
# Find process using port
netstat -ano | findstr :27017

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Connection Refused

1. Check if MongoDB service is running
2. Check firewall settings
3. Verify connection string
4. Try restarting MongoDB service

---

## Next Steps After MongoDB is Installed

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Initialize database**:
   Open browser: http://localhost:3000/api/init

3. **Login to admin**:
   - Go to: http://localhost:3000/login
   - Email: admin@craftmemories.com
   - Password: admin123

4. **Start managing products!**

---

## MongoDB Compass Usage

### Connect to Database
1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"

### View Collections
1. Click "ecommerce" database
2. See collections:
   - products
   - users
   - orders

### Query Data
1. Click a collection
2. Use filter bar to search:
   ```json
   {"category": "magazines"}
   ```

### Add Documents
1. Click collection
2. Click "Add Data" > "Insert Document"
3. Paste JSON and insert

---

## MongoDB Commands (if using mongosh)

```javascript
// Show databases
show dbs

// Use database
use ecommerce

// Show collections
show collections

// Find all products
db.products.find()

// Find specific product
db.products.findOne({name: "Wedding Magazine"})

// Count products
db.products.countDocuments()

// Find user
db.users.findOne({email: "admin@craftmemories.com"})

// Delete all products
db.products.deleteMany({})

// Exit
exit
```

---

## Backup & Restore

### Backup
```bash
mongodump --db ecommerce --out C:\backup
```

### Restore
```bash
mongorestore --db ecommerce C:\backup\ecommerce
```

---

## Production Recommendations

When deploying to production:

1. **Use MongoDB Atlas** (managed service)
2. **Enable authentication** (already done in Atlas)
3. **Use connection pooling** (already implemented)
4. **Enable SSL/TLS**
5. **Regular backups** (automatic in Atlas)
6. **Monitor performance**
7. **Set up alerts**

---

## Resources

- MongoDB Manual: https://docs.mongodb.com/manual/
- MongoDB University: https://university.mongodb.com/ (Free courses)
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Compass: https://docs.mongodb.com/compass/

---

**You're all set! Now run `npm run dev` and visit `/api/init` to get started! 🚀**
