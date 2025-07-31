#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 ToolBank Deployment Checklist\n');

const checks = [
  {
    name: 'All tool pages exist',
    check: () => {
      const tools = [
        'bmi-calculator', 'calorie-calculator', 'water-intake-calculator', 'tdee-calculator',
        'loan-calculator', 'interest-calculator', 'tip-calculator', 'tax-calculator', 'invoice-generator',
        'qr-code-generator', 'password-generator', 'json-formatter', 'html-minifier',
        'word-counter', 'random-number-generator', 'age-calculator', 'time-zone-converter', 
        'countdown-timer', 'unit-converter'
      ];
      
      const missing = [];
      tools.forEach(tool => {
        const toolPath = path.join(__dirname, '..', 'src', 'app', tool, 'page.tsx');
        if (!fs.existsSync(toolPath)) {
          missing.push(tool);
        }
      });
      
      return {
        passed: missing.length === 0,
        message: missing.length === 0 ? 
          `All ${tools.length} tool pages exist` : 
          `Missing tools: ${missing.join(', ')}`
      };
    }
  },
  {
    name: 'Legal pages exist',
    check: () => {
      const pages = ['privacy', 'terms', 'contact'];
      const missing = [];
      
      pages.forEach(page => {
        const pagePath = path.join(__dirname, '..', 'src', 'app', page, 'page.tsx');
        if (!fs.existsSync(pagePath)) {
          missing.push(page);
        }
      });
      
      return {
        passed: missing.length === 0,
        message: missing.length === 0 ? 
          'All legal pages exist' : 
          `Missing pages: ${missing.join(', ')}`
      };
    }
  },
  {
    name: 'Robots.txt exists',
    check: () => {
      const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
      const exists = fs.existsSync(robotsPath);
      return {
        passed: exists,
        message: exists ? 'robots.txt exists' : 'robots.txt missing'
      };
    }
  },
  {
    name: 'Sitemap config exists',
    check: () => {
      const sitemapPath = path.join(__dirname, '..', 'next-sitemap.config.js');
      const exists = fs.existsSync(sitemapPath);
      return {
        passed: exists,
        message: exists ? 'Sitemap config exists' : 'Sitemap config missing'
      };
    }
  },
  {
    name: 'Manifest file exists',
    check: () => {
      const manifestPath = path.join(__dirname, '..', 'public', 'site.webmanifest');
      const exists = fs.existsSync(manifestPath);
      return {
        passed: exists,
        message: exists ? 'Manifest file exists' : 'Manifest file missing'
      };
    }
  },
  {
    name: 'Favicon exists',
    check: () => {
      const faviconPath = path.join(__dirname, '..', 'src', 'app', 'favicon.ico');
      const exists = fs.existsSync(faviconPath);
      return {
        passed: exists,
        message: exists ? 'Favicon exists' : 'Favicon missing'
      };
    }
  },
  {
    name: 'SEO metadata utility exists',
    check: () => {
      const metadataPath = path.join(__dirname, '..', 'src', 'utils', 'seo', 'metadata.ts');
      const exists = fs.existsSync(metadataPath);
      return {
        passed: exists,
        message: exists ? 'SEO metadata utility exists' : 'SEO metadata utility missing'
      };
    }
  },
  {
    name: 'FAQ component exists',
    check: () => {
      const faqPath = path.join(__dirname, '..', 'src', 'components', 'seo', 'FAQSection.tsx');
      const exists = fs.existsSync(faqPath);
      return {
        passed: exists,
        message: exists ? 'FAQ component exists' : 'FAQ component missing'
      };
    }
  }
];

let passedChecks = 0;
let totalChecks = checks.length;

checks.forEach((check, index) => {
  const result = check.check();
  const status = result.passed ? '✅' : '❌';
  console.log(`${index + 1}. ${status} ${check.name}: ${result.message}`);
  
  if (result.passed) {
    passedChecks++;
  }
});

console.log(`\n📊 Results: ${passedChecks}/${totalChecks} checks passed`);

if (passedChecks === totalChecks) {
  console.log('🎉 All checks passed! Ready for deployment.');
} else {
  console.log('⚠️  Some checks failed. Please fix the issues before deploying.');
  process.exit(1);
}

// Additional deployment reminders
console.log('\n📋 Pre-deployment Reminders:');
console.log('1. Update SITE_URL in environment variables');
console.log('2. Add Google Analytics tracking ID');
console.log('3. Add Google AdSense publisher ID');
console.log('4. Generate sitemap: npm run postbuild');
console.log('5. Test all tools on mobile and desktop');
console.log('6. Verify HTTPS is enabled on Netlify');
console.log('7. Set up custom domain if needed');
console.log('8. Submit sitemap to Google Search Console');
console.log('9. Test Core Web Vitals with Lighthouse');
console.log('10. Monitor for 404 errors after deployment');

console.log('\n🚀 Ready to deploy to Netlify!');
