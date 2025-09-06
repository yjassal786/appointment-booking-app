# Deployment Instructions

## Quick Deploy Options (Free)

### 1. Netlify (Recommended)
1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder to Netlify
4. Your site is live instantly!

### 2. Vercel
1. Run `npm run build` locally
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel --prod` in project directory
4. Follow the prompts

### 3. Firebase Hosting (Google)
1. Install Firebase CLI: `npm i -g firebase-tools`
2. Run `firebase login`
3. Run `firebase init hosting`
4. Set public directory to `dist`
5. Run `npm run build`
6. Run `firebase deploy`

## Shared Hosting Setup

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Upload Files
Upload everything from the `dist` folder to your hosting provider's:
- `public_html` (most common)
- `www` directory
- `htdocs` directory

### Step 3: Configure URL Rewriting
The `.htaccess` file is already included in the `public` folder and will be copied during build.

### Popular Shared Hosting Providers
- **Hostinger** (₹59/month)
- **Bluehost** (₹199/month)
- **GoDaddy** (₹99/month)
- **SiteGround** (₹249/month)

## File Structure After Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── .htaccess
└── vite.svg
```

## Important Notes
- This is a static site (no server-side code)
- All functionality runs in the browser
- Email sending requires a backend service or form handler
- For production, consider adding a contact form service like Formspree or EmailJS

## Testing Locally
```bash
npm run preview
```

This serves the built files locally to test before deployment.