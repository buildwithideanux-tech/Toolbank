#!/usr/bin/env node

/**
 * ToolBank Deployment Script
 * Automatically commits and pushes changes to trigger Netlify deployment
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 ToolBank Deployment Script');
console.log('==============================');

// Check if there are any changes
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (!status.trim()) {
    console.log('✅ No changes detected. Repository is up to date.');
    process.exit(0);
  }
  
  console.log('📝 Changes detected:');
  console.log(status);
  
} catch (error) {
  console.error('❌ Error checking git status:', error.message);
  process.exit(1);
}

// Ask for commit message
rl.question('💬 Enter commit message (or press Enter for auto-message): ', (commitMessage) => {
  
  // Generate auto commit message if none provided
  if (!commitMessage.trim()) {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    commitMessage = `Auto-deploy: Updates on ${timestamp}`;
  }
  
  console.log(`\n🔄 Deploying with message: "${commitMessage}"`);
  
  try {
    // Add all changes
    console.log('📦 Adding changes...');
    execSync('git add .', { stdio: 'inherit' });
    
    // Commit changes
    console.log('💾 Committing changes...');
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // Push to GitHub (triggers Netlify deployment)
    console.log('🚀 Pushing to GitHub...');
    execSync('git push origin master', { stdio: 'inherit' });
    
    console.log('\n✅ Deployment initiated successfully!');
    console.log('🌐 Your changes will be live on Netlify in 2-3 minutes.');
    console.log('📊 Check deployment status at: https://app.netlify.com');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
  
  rl.close();
});
