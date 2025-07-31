# 🔧 Netlify Deployment Troubleshooting Guide

## 🚨 Common Issues & Solutions

### **Issue 1: Build Fails with Plugin Error**
```
Error: Plugin "netlify-plugin-sitemap" not found
```

**✅ Solution**: We've removed this plugin. Use the updated `netlify.toml`

### **Issue 2: Build Fails with Dependencies**
```
Error: Module not found
```

**✅ Solutions**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Try building locally: `npm run build`

### **Issue 3: Build Succeeds but Site Doesn't Work**
```
Site loads but tools don't function
```

**✅ Solutions**:
1. Check browser console for errors
2. Verify environment variables in Netlify
3. Test locally with production build: `npm run build && npm start`

### **Issue 4: Next.js Build Issues**
```
Error: Build optimization failed
```

**✅ Solutions**:
1. Update Next.js: `npm install next@latest`
2. Check for TypeScript errors
3. Verify all imports are correct

## 🎯 Manual Deployment Methods

### **Method 1: Drag & Drop (Easiest)**

1. **Build locally**:
   ```bash
   npm run deploy
   ```

2. **Go to Netlify**: [app.netlify.com](https://app.netlify.com)

3. **Drag the `.next` folder** to the deploy area

4. **Wait for deployment** (30 seconds)

5. **Test your live site**

### **Method 2: Netlify CLI**

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Build and deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

### **Method 3: GitHub Integration (When Ready)**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Netlify auto-deploys** from GitHub

## 🔍 Debugging Steps

### **Step 1: Test Local Build**
```bash
# Clean build
npm run build:clean

# If build fails, check:
# - TypeScript errors
# - Missing dependencies
# - Import/export issues
```

### **Step 2: Check Dependencies**
```bash
# Update all dependencies
npm update

# Check for vulnerabilities
npm audit fix
```

### **Step 3: Verify Environment**
```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version
```

## ⚙️ Netlify Configuration

### **Simplified netlify.toml**
```toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
```

### **Required Environment Variables**
Add these in Netlify Dashboard → Site Settings → Environment Variables:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
NODE_ENV=production

# Optional (for analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## 🎯 Step-by-Step Deployment

### **First Time Setup**

1. **Create Netlify Account**: [netlify.com](https://netlify.com)

2. **Choose Deployment Method**:
   - **Drag & Drop**: Easiest, manual control
   - **GitHub**: Automatic, but we'll disable auto-deploy

3. **Build Locally**:
   ```bash
   npm run deploy
   ```

4. **Deploy to Netlify**:
   - Drag `.next` folder to Netlify
   - Or use Netlify CLI

5. **Configure Domain** (optional):
   - Custom domain in Netlify settings
   - Update DNS records

### **Regular Updates**

1. **Make your changes**

2. **Test locally**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run deploy
   ```

4. **Deploy manually**:
   - Drag `.next` to Netlify
   - Or use CLI: `netlify deploy --prod --dir=.next`

## 🚨 Emergency Fixes

### **Site is Down**
1. Check Netlify status page
2. Rollback to previous deployment in Netlify dashboard
3. Check build logs for errors

### **Build Keeps Failing**
1. Test build locally first
2. Check Node.js version compatibility
3. Verify all dependencies are installed
4. Check for TypeScript errors

### **Features Not Working**
1. Check browser console for JavaScript errors
2. Verify environment variables are set
3. Test API endpoints if any
4. Check for missing dependencies

## 📞 Getting Help

### **Netlify Support**
- Documentation: [docs.netlify.com](https://docs.netlify.com)
- Community: [community.netlify.com](https://community.netlify.com)
- Support: [support.netlify.com](https://support.netlify.com)

### **Next.js Issues**
- Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: [github.com/vercel/next.js](https://github.com/vercel/next.js)

### **Quick Fixes**
```bash
# Clear everything and start fresh
rm -rf node_modules package-lock.json .next
npm install
npm run build

# If still failing, check:
# 1. Node.js version (18+)
# 2. TypeScript errors
# 3. Missing environment variables
```

---

## 🎉 Success Checklist

✅ **Build completes locally**
✅ **Site loads on Netlify**
✅ **All tools function correctly**
✅ **Mobile responsive**
✅ **No console errors**
✅ **Analytics tracking** (if configured)

**You're ready to go live!** 🚀
