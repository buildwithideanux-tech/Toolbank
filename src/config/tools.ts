import { Heart, DollarSign, Code, Clock, Calculator, User, FileText, Wrench, Globe, Hash, Zap, Target, TrendingUp, Shield, Smartphone, Database, Palette, Camera } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  href: string;
  description: string;
  keywords: string[];
  popular?: boolean;
  category: string;
  icon?: any;
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  lastUpdated?: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  tools: Tool[];
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
}

// All available tools with comprehensive SEO data
export const allTools: Tool[] = [
  // Health & Fitness Tools
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    href: '/bmi-calculator',
    description: 'Calculate your Body Mass Index (BMI) and understand your health status with our accurate BMI calculator.',
    keywords: ['BMI calculator', 'body mass index', 'health calculator', 'weight calculator', 'fitness tool'],
    popular: true,
    category: 'health-fitness',
    metaTitle: 'Free BMI Calculator - Calculate Body Mass Index Instantly',
    metaDescription: 'Calculate your BMI (Body Mass Index) instantly with our free, accurate calculator. Get health insights and understand your ideal weight range.',
    difficulty: 'beginner',
    estimatedTime: '1 minute',
    featured: true
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    href: '/calorie-calculator',
    description: 'Calculate daily calorie needs based on your age, gender, weight, height, and activity level.',
    keywords: ['calorie calculator', 'daily calories', 'TDEE calculator', 'metabolism calculator', 'diet planning'],
    popular: true,
    category: 'health-fitness',
    metaTitle: 'Daily Calorie Calculator - Calculate Your Caloric Needs',
    metaDescription: 'Calculate your daily calorie needs with our accurate calorie calculator. Perfect for weight loss, maintenance, or muscle gain goals.',
    difficulty: 'beginner',
    estimatedTime: '2 minutes'
  },
  {
    id: 'water-intake-calculator',
    name: 'Water Intake Calculator',
    href: '/water-intake-calculator',
    description: 'Calculate your daily water intake requirements based on your body weight and activity level.',
    keywords: ['water intake calculator', 'hydration calculator', 'daily water needs', 'health calculator'],
    category: 'health-fitness',
    metaTitle: 'Water Intake Calculator - Calculate Daily Hydration Needs',
    metaDescription: 'Calculate your optimal daily water intake with our hydration calculator. Stay healthy with proper hydration recommendations.',
    difficulty: 'beginner',
    estimatedTime: '1 minute'
  },
  {
    id: 'tdee-calculator',
    name: 'TDEE Calculator',
    href: '/tdee-calculator',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) for accurate calorie and nutrition planning.',
    keywords: ['TDEE calculator', 'total daily energy expenditure', 'metabolism calculator', 'calorie needs'],
    category: 'health-fitness',
    metaTitle: 'TDEE Calculator - Total Daily Energy Expenditure Calculator',
    metaDescription: 'Calculate your TDEE (Total Daily Energy Expenditure) to determine your exact calorie needs for weight management and fitness goals.',
    difficulty: 'intermediate',
    estimatedTime: '3 minutes'
  },

  // Finance & Business Tools
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    href: '/invoice-generator',
    description: 'Create professional invoices with our free invoice generator. Multiple templates, logo upload, and PDF download.',
    keywords: ['invoice generator', 'free invoice maker', 'business invoice', 'PDF invoice', 'professional invoicing'],
    popular: true,
    category: 'finance-business',
    metaTitle: 'Free Invoice Generator - Create Professional Invoices Online',
    metaDescription: 'Generate professional invoices instantly with our free invoice maker. Multiple templates, logo upload, and instant PDF download.',
    difficulty: 'beginner',
    estimatedTime: '5 minutes',
    featured: true
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    href: '/loan-calculator',
    description: 'Calculate loan payments, interest rates, and amortization schedules for mortgages, auto loans, and personal loans.',
    keywords: ['loan calculator', 'mortgage calculator', 'auto loan calculator', 'payment calculator', 'interest calculator'],
    popular: true,
    category: 'finance-business',
    metaTitle: 'Loan Calculator - Calculate Monthly Payments & Interest',
    metaDescription: 'Calculate loan payments, interest, and amortization schedules. Perfect for mortgages, auto loans, and personal loans.',
    difficulty: 'intermediate',
    estimatedTime: '3 minutes'
  },
  {
    id: 'interest-calculator',
    name: 'Interest Calculator',
    href: '/interest-calculator',
    description: 'Calculate simple and compound interest for investments, savings, and loans with detailed breakdowns.',
    keywords: ['interest calculator', 'compound interest', 'simple interest', 'investment calculator', 'savings calculator'],
    category: 'finance-business',
    metaTitle: 'Interest Calculator - Simple & Compound Interest Calculator',
    metaDescription: 'Calculate simple and compound interest for investments and loans. See detailed breakdowns and growth projections.',
    difficulty: 'intermediate',
    estimatedTime: '2 minutes'
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    href: '/tip-calculator',
    description: 'Calculate tips and split bills easily with our tip calculator. Perfect for restaurants, services, and group dining.',
    keywords: ['tip calculator', 'bill splitter', 'restaurant tip', 'gratuity calculator', 'dining calculator'],
    popular: true,
    category: 'finance-business',
    metaTitle: 'Tip Calculator - Calculate Tips & Split Bills Easily',
    metaDescription: 'Calculate tips and split bills with our easy tip calculator. Perfect for restaurants, services, and group dining.',
    difficulty: 'beginner',
    estimatedTime: '1 minute'
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    href: '/tax-calculator',
    description: 'Calculate income tax, sales tax, and other tax obligations with our comprehensive tax calculator.',
    keywords: ['tax calculator', 'income tax calculator', 'sales tax calculator', 'tax estimator', 'tax planning'],
    category: 'finance-business',
    metaTitle: 'Tax Calculator - Calculate Income & Sales Tax',
    metaDescription: 'Calculate your tax obligations with our comprehensive tax calculator. Estimate income tax, sales tax, and more.',
    difficulty: 'intermediate',
    estimatedTime: '4 minutes'
  },

  // Developer Tools
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    href: '/qr-code-generator',
    description: 'Generate QR codes for URLs, text, WiFi, and more. Free QR code generator with customization options.',
    keywords: ['QR code generator', 'QR code maker', 'free QR codes', 'barcode generator', 'QR scanner'],
    popular: true,
    category: 'developer-tools',
    metaTitle: 'Free QR Code Generator - Create QR Codes Instantly',
    metaDescription: 'Generate QR codes for URLs, text, WiFi, and more. Free QR code generator with customization options and instant download.',
    difficulty: 'beginner',
    estimatedTime: '1 minute',
    featured: true
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    href: '/password-generator',
    description: 'Generate strong, secure passwords with our advanced password generator. Customizable length and character sets.',
    keywords: ['password generator', 'secure password', 'random password', 'strong password', 'password maker'],
    popular: true,
    category: 'developer-tools',
    metaTitle: 'Secure Password Generator - Create Strong Passwords',
    metaDescription: 'Generate strong, secure passwords with our advanced password generator. Customizable options for maximum security.',
    difficulty: 'beginner',
    estimatedTime: '30 seconds'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    href: '/json-formatter',
    description: 'Format, validate, and beautify JSON data with our online JSON formatter and validator tool.',
    keywords: ['JSON formatter', 'JSON validator', 'JSON beautifier', 'JSON parser', 'JSON tool'],
    category: 'developer-tools',
    metaTitle: 'JSON Formatter & Validator - Format JSON Online',
    metaDescription: 'Format, validate, and beautify JSON data with our online JSON formatter. Perfect for developers and API testing.',
    difficulty: 'intermediate',
    estimatedTime: '1 minute'
  },
  {
    id: 'html-minifier',
    name: 'HTML Minifier',
    href: '/html-minifier',
    description: 'Minify HTML code to reduce file size and improve website performance with our HTML minification tool.',
    keywords: ['HTML minifier', 'HTML compressor', 'minify HTML', 'HTML optimization', 'web performance'],
    category: 'developer-tools',
    metaTitle: 'HTML Minifier - Compress HTML Code Online',
    metaDescription: 'Minify HTML code to reduce file size and improve website performance. Free online HTML minification tool.',
    difficulty: 'intermediate',
    estimatedTime: '1 minute'
  },

  // Daily Utilities
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    href: '/unit-converter',
    description: 'Convert between different units of measurement including length, weight, temperature, and more.',
    keywords: ['unit converter', 'measurement converter', 'metric converter', 'imperial converter', 'conversion tool'],
    popular: true,
    category: 'daily-utilities',
    metaTitle: 'Unit Converter - Convert Measurements Online',
    metaDescription: 'Convert between different units of measurement. Length, weight, temperature, volume, and more conversion tools.',
    difficulty: 'beginner',
    estimatedTime: '30 seconds'
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    href: '/word-counter',
    description: 'Count words, characters, paragraphs, and reading time with our comprehensive text analysis tool.',
    keywords: ['word counter', 'character counter', 'text counter', 'reading time calculator', 'text analysis'],
    popular: true,
    category: 'daily-utilities',
    metaTitle: 'Word Counter - Count Words & Characters Online',
    metaDescription: 'Count words, characters, paragraphs, and calculate reading time with our comprehensive text analysis tool.',
    difficulty: 'beginner',
    estimatedTime: '30 seconds'
  },
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    href: '/random-number-generator',
    description: 'Generate random numbers within custom ranges. Perfect for games, statistics, and random selections.',
    keywords: ['random number generator', 'random numbers', 'number picker', 'random generator', 'lottery numbers'],
    category: 'daily-utilities',
    metaTitle: 'Random Number Generator - Generate Random Numbers',
    metaDescription: 'Generate random numbers within custom ranges. Perfect for games, statistics, and random selections.',
    difficulty: 'beginner',
    estimatedTime: '30 seconds'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    href: '/age-calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes with our precise age calculator.',
    keywords: ['age calculator', 'calculate age', 'age in days', 'birthday calculator', 'date calculator'],
    category: 'daily-utilities',
    metaTitle: 'Age Calculator - Calculate Your Exact Age',
    metaDescription: 'Calculate your exact age in years, months, days, hours, and minutes. Precise age calculator with detailed breakdown.',
    difficulty: 'beginner',
    estimatedTime: '1 minute'
  },
  {
    id: 'time-zone-converter',
    name: 'Time Zone Converter',
    href: '/time-zone-converter',
    description: 'Convert time between different time zones worldwide. Perfect for scheduling and international communication.',
    keywords: ['time zone converter', 'timezone converter', 'world clock', 'time converter', 'international time'],
    category: 'daily-utilities',
    metaTitle: 'Time Zone Converter - Convert Time Zones Worldwide',
    metaDescription: 'Convert time between different time zones worldwide. Perfect for scheduling meetings and international communication.',
    difficulty: 'beginner',
    estimatedTime: '1 minute'
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    href: '/countdown-timer',
    description: 'Create countdown timers for events, deadlines, and special occasions with our customizable timer tool.',
    keywords: ['countdown timer', 'event countdown', 'timer', 'countdown clock', 'deadline timer'],
    category: 'daily-utilities',
    metaTitle: 'Countdown Timer - Create Event Countdowns',
    metaDescription: 'Create countdown timers for events, deadlines, and special occasions. Customizable countdown clock with alerts.',
    difficulty: 'beginner',
    estimatedTime: '1 minute'
  }
];

// Tool categories with SEO optimization
export const toolCategories: ToolCategory[] = [
  {
    id: 'health-fitness',
    name: 'Health & Fitness',
    description: 'Health and fitness calculators for BMI, calories, water intake, and wellness tracking.',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    seoTitle: 'Health & Fitness Calculators - BMI, Calorie & Wellness Tools',
    seoDescription: 'Free health and fitness calculators including BMI, calorie, water intake, and TDEE calculators for optimal wellness.',
    featured: true,
    tools: allTools.filter(tool => tool.category === 'health-fitness')
  },
  {
    id: 'finance-business',
    name: 'Finance & Business',
    description: 'Financial calculators and business tools for loans, taxes, invoices, and financial planning.',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    seoTitle: 'Finance & Business Tools - Calculators & Invoice Generator',
    seoDescription: 'Professional finance and business tools including loan calculators, invoice generator, tax calculators, and financial planning tools.',
    featured: true,
    tools: allTools.filter(tool => tool.category === 'finance-business')
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    description: 'Essential developer tools for QR codes, passwords, JSON formatting, and web development.',
    icon: Code,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    seoTitle: 'Developer Tools - QR Code, Password & JSON Tools',
    seoDescription: 'Essential developer tools including QR code generator, password generator, JSON formatter, and HTML minifier.',
    featured: true,
    tools: allTools.filter(tool => tool.category === 'developer-tools')
  },
  {
    id: 'daily-utilities',
    name: 'Daily Utilities',
    description: 'Everyday utility tools for unit conversion, word counting, time zones, and daily calculations.',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    seoTitle: 'Daily Utility Tools - Converters & Calculators',
    seoDescription: 'Useful daily utility tools including unit converter, word counter, time zone converter, and age calculator.',
    featured: true,
    tools: allTools.filter(tool => tool.category === 'daily-utilities')
  }
];

// Get tools by category
export const getToolsByCategory = (categoryId: string): Tool[] => {
  return allTools.filter(tool => tool.category === categoryId);
};

// Get popular tools
export const getPopularTools = (): Tool[] => {
  return allTools.filter(tool => tool.popular);
};

// Get featured tools
export const getFeaturedTools = (): Tool[] => {
  return allTools.filter(tool => tool.featured);
};

// Get tool by ID
export const getToolById = (id: string): Tool | undefined => {
  return allTools.find(tool => tool.id === id);
};

// Get category by ID
export const getCategoryById = (id: string): ToolCategory | undefined => {
  return toolCategories.find(category => category.id === id);
};

// Get related tools (same category, excluding current tool)
export const getRelatedTools = (currentToolId: string, limit: number = 4): Tool[] => {
  const currentTool = getToolById(currentToolId);
  if (!currentTool) return [];
  
  return allTools
    .filter(tool => tool.category === currentTool.category && tool.id !== currentToolId)
    .slice(0, limit);
};

// Generate tool sitemap data
export const generateToolSitemapData = () => {
  return allTools.map(tool => ({
    url: tool.href,
    lastModified: tool.lastUpdated || new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: tool.popular ? 0.8 : 0.6
  }));
};

// Generate category sitemap data
export const generateCategorySitemapData = () => {
  return toolCategories.map(category => ({
    url: `/tools/${category.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));
};
