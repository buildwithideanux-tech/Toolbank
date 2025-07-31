#!/usr/bin/env node

/**
 * ToolBank Manual Deployment Script
 * Build locally and deploy manually to Netlify
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 ToolBank Manual Deployment');
console.log('=============================');

// Step 1: Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }
  console.log('✅ Cleaned successfully');
} catch (error) {
  console.log('⚠️  Clean step skipped:', error.message);
}

// Step 2: Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Step 3: Build the project
console.log('\n🔨 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.log('\n🔍 Common build issues:');
  console.log('- Check for TypeScript errors');
  console.log('- Verify all imports are correct');
  console.log('- Make sure all dependencies are installed');
  process.exit(1);
}

// Step 4: Verify build output
console.log('\n🔍 Verifying build output...');
if (!fs.existsSync('.next')) {
  console.error('❌ Build output not found (.next directory missing)');
  process.exit(1);
}

const buildSize = execSync('du -sh .next 2>/dev/null || echo "Unknown"', { encoding: 'utf8' }).trim();
console.log(`✅ Build output verified (Size: ${buildSize})`);

// Step 5: Deployment instructions
console.log('\n🌐 Manual Deployment Options:');
console.log('=====================================');

console.log('\n📋 Option 1: Netlify Drag & Drop');
console.log('1. Go to https://app.netlify.com');
console.log('2. Drag the ".next" folder to the deploy area');
console.log('3. Your site will be live instantly!');

console.log('\n📋 Option 2: Netlify CLI (if installed)');
console.log('1. Install: npm install -g netlify-cli');
console.log('2. Login: netlify login');
console.log('3. Deploy: netlify deploy --prod --dir=.next');

console.log('\n📋 Option 3: GitHub + Netlify (Auto)');
console.log('1. Commit changes: git add . && git commit -m "Update"');
console.log('2. Push: git push origin master');
console.log('3. Netlify will auto-deploy from GitHub');

console.log('\n✅ Build ready for deployment!');
console.log('📁 Deploy folder: .next');
console.log('🌐 Your site will be live after deployment');

// Step 6: Create deployment package info
const deployInfo = {
  buildTime: new Date().toISOString(),
  buildSize: buildSize,
  nodeVersion: process.version,
  deployFolder: '.next',
  instructions: [
    'Drag .next folder to Netlify',
    'Or use Netlify CLI: netlify deploy --prod --dir=.next',
    'Or push to GitHub for auto-deploy'
  ]
};

fs.writeFileSync('deploy-info.json', JSON.stringify(deployInfo, null, 2));
console.log('📄 Deployment info saved to deploy-info.json');
