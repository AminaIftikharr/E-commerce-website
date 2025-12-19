# Domain Setup - www.myjourmals.me

## Files Created/Updated for Domain Configuration

### Environment Files
- ✅ `.env.production` - Production environment variables with domain
- ✅ `.env.local` - Updated admin email to match domain

### Deployment Configuration
- ✅ `vercel.json` - Vercel deployment config with:
  - Security headers (HSTS, XSS Protection, etc.)
  - Domain redirect (myjourmals.me → www.myjourmals.me)
  - Environment variable references

### App Configuration
- ✅ `next.config.mjs` - Updated with:
  - Image domains for www.myjourmals.me
  - Security headers
  - DNS prefetch control

### Metadata & SEO
- ✅ `app/layout.tsx` - Updated metadata with production domain
- ✅ `public/robots.txt` - Updated sitemap URL
- ✅ `public/sitemap.xml` - Complete sitemap with all pages

## Deployment Steps

### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### 2. Domain Configuration in Vercel Dashboard

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domains:
   - `www.myjourmals.me` (primary)
   - `myjourmals.me` (redirects to www)

### 3. DNS Configuration

Add these DNS records at your domain registrar:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Or use ALIAS/ANAME (if supported):**
```
Type: ALIAS/ANAME
Name: @
Value: cname.vercel-dns.com
```

### 4. Environment Variables in Vercel

Add these secrets in Vercel Dashboard → Settings → Environment Variables:

- `MONGODB_URI` = `mongodb+srv://amnaiftikhar2908:StoreAPI@cluster0.4gzfppy.mongodb.net/craftmemories`
- `NEXTAUTH_SECRET` = (generate a random 32-char string)
- `ADMIN_EMAIL` = `admin@myjourmals.me`
- `ADMIN_PASSWORD` = `admin123`
- `NEXT_PUBLIC_SITE_URL` = `https://www.myjourmals.me`

### 5. MongoDB Atlas Whitelist

In MongoDB Atlas → Network Access:
- Add Vercel's IP ranges, or
- Use "Allow access from anywhere" (0.0.0.0/0)

### 6. Test After Deployment

- Visit https://www.myjourmals.me
- Test https://myjourmals.me (should redirect to www)
- Check `/api/products` returns data
- Verify products display on homepage

## Alternative: Custom Server Deployment

If deploying to your own server:

```bash
# Build the production app
npm run build

# Start production server
npm start
```

Configure nginx/Apache to point www.myjourmals.me to port 3000.

## Post-Deployment Checklist

- [ ] Domain DNS configured and propagated
- [ ] SSL certificate active (Vercel handles this automatically)
- [ ] Environment variables set in production
- [ ] MongoDB accessible from production server
- [ ] Test all pages load correctly
- [ ] Verify admin login works
- [ ] Check products API returns data
- [ ] Test order placement flow
- [ ] Submit sitemap to Google Search Console
