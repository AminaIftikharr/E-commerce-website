# Vercel Environment Variables Setup

## Critical: You MUST set these environment variables in Vercel Dashboard

Your deployment is failing to login because environment variables aren't set on Vercel.

### Steps to Fix:

1. **Go to Vercel Dashboard**: https://vercel.com/
2. **Select your project** (myjourmals or edm-p)
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://ahmad54nine:welcomepartyhuehue@welcomeparty.p0yiomr.mongodb.net/craftmemories` | Production, Preview, Development |
| `ADMIN_EMAIL` | `admin@myjourmals.me` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `admin123` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `production-secret-key-change-this-to-random-string` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://www.myjourmals.me` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://www.myjourmals.me` | Production, Preview, Development |

5. **After adding variables, click "Redeploy"** in Deployments tab

### Quick Fix Commands:

```bash
# Or use Vercel CLI (if installed)
vercel env add MONGODB_URI
# Paste: mongodb+srv://ahmad54nine:welcomepartyhuehue@welcomeparty.p0yiomr.mongodb.net/craftmemories

vercel env add ADMIN_EMAIL
# Paste: admin@myjourmals.me

vercel env add ADMIN_PASSWORD
# Paste: admin123
```

### After Setup:

1. Visit: https://www.myjourmals.me/api/init
2. This will initialize your production database
3. Then try logging in

---

**Note:** .env.production is in .gitignore (correct for security), so you must manually set these in Vercel.
