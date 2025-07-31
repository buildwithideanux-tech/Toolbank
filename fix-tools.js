const fs = require('fs');
const path = require('path');

// List of tool files to fix
const toolFiles = [
  'src/app/water-intake-calculator/page.tsx',
  'src/app/tdee-calculator/page.tsx',
  'src/app/loan-calculator/page.tsx',
  'src/app/qr-code-generator/page.tsx',
  'src/app/password-generator/page.tsx',
  'src/app/word-counter/page.tsx',
  'src/app/interest-calculator/page.tsx',
  'src/app/tip-calculator/page.tsx',
  'src/app/json-formatter/page.tsx',
  'src/app/random-number-generator/page.tsx',
  'src/app/tax-calculator/page.tsx',
  'src/app/age-calculator/page.tsx'
];

function fixToolFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove StructuredData import
    content = content.replace(/import StructuredData from '@\/components\/seo\/StructuredData';\n/, '');
    
    // Remove generateCalculatorStructuredData import
    content = content.replace(/import { generateCalculatorStructuredData } from '@\/utils\/structured-data';\n/, '');
    
    // Remove the structuredData variable declaration
    content = content.replace(/\s*const structuredData = generateCalculatorStructuredData\([^;]+\);\n/s, '');
    
    // Remove StructuredData component usage
    content = content.replace(/\s*<StructuredData data={structuredData} \/>\n/, '');
    
    // Fix return statement
    content = content.replace(/return \(\s*<>\s*<ToolLayout/s, 'return (\n    <ToolLayout');
    content = content.replace(/<\/ToolLayout>\s*<\/>\s*\);/s, '</ToolLayout>\n  );');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Fix all tool files
toolFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fixToolFile(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log('All tools fixed!');
