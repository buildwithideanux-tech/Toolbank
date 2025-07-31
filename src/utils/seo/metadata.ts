import { Metadata } from 'next';

export interface ToolMetadata {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  category: string;
  faqSchema?: any;
  toolSchema?: any;
}

export const toolsMetadata: Record<string, ToolMetadata> = {
  'bmi-calculator': {
    title: 'BMI Calculator – Accurate Body Mass Index Tool Online',
    description: 'Calculate your BMI (Body Mass Index) instantly with our free online calculator. Get accurate results with metric/imperial units, ideal weight range, and health category analysis.',
    keywords: ['BMI calculator', 'body mass index', 'BMI chart', 'ideal weight calculator', 'health calculator', 'weight calculator', 'obesity calculator'],
    slug: 'bmi-calculator',
    category: 'Health & Fitness'
  },
  'calorie-calculator': {
    title: 'Calorie Calculator – Daily Calorie Needs & Weight Loss Tool',
    description: 'Calculate daily calorie needs for weight loss, gain, or maintenance. Free calorie calculator based on age, gender, activity level, and fitness goals.',
    keywords: ['calorie calculator', 'daily calories', 'weight loss calculator', 'TDEE calculator', 'calorie needs', 'diet calculator', 'nutrition calculator'],
    slug: 'calorie-calculator',
    category: 'Health & Fitness'
  },
  'loan-calculator': {
    title: 'Loan Calculator – Monthly Payment & Interest Calculator',
    description: 'Calculate loan payments, total interest, and amortization schedule. Free loan calculator for mortgages, auto loans, personal loans, and more.',
    keywords: ['loan calculator', 'mortgage calculator', 'auto loan calculator', 'monthly payment calculator', 'interest calculator', 'amortization calculator'],
    slug: 'loan-calculator',
    category: 'Finance & Business'
  },
  'qr-code-generator': {
    title: 'QR Code Generator – Free QR Code Maker Online',
    description: 'Generate QR codes for URLs, text, WiFi passwords, and contact info. Free QR code generator with customizable size and download options.',
    keywords: ['QR code generator', 'QR code maker', 'free QR codes', 'WiFi QR code', 'URL QR code', 'contact QR code', 'QR code creator'],
    slug: 'qr-code-generator',
    category: 'Developer Tools'
  },
  'password-generator': {
    title: 'Password Generator – Secure Random Password Creator',
    description: 'Generate strong, secure passwords with customizable length, symbols, and complexity. Free password generator with strength analysis and security tips.',
    keywords: ['password generator', 'secure password', 'random password', 'strong password generator', 'password creator', 'password maker'],
    slug: 'password-generator',
    category: 'Developer Tools'
  },
  'invoice-generator': {
    title: 'Invoice Generator – Professional Invoice Maker Free',
    description: 'Create professional invoices with itemized billing, tax calculations, and instant PDF download. Free invoice generator for businesses and freelancers.',
    keywords: ['invoice generator', 'invoice maker', 'free invoice', 'business invoice', 'PDF invoice', 'professional invoice', 'invoice template'],
    slug: 'invoice-generator',
    category: 'Finance & Business'
  },
  'word-counter': {
    title: 'Word Counter – Character & Reading Time Calculator',
    description: 'Count words, characters, paragraphs, and estimate reading time for any text. Free word counter tool for writers, students, and content creators.',
    keywords: ['word counter', 'character counter', 'text counter', 'reading time calculator', 'word count tool', 'text analysis'],
    slug: 'word-counter',
    category: 'Daily Utilities'
  },
  'unit-converter': {
    title: 'Unit Converter – Length, Weight, Temperature Converter',
    description: 'Convert units of length, weight, temperature, volume, and more. Free online unit converter with instant results and multiple measurement systems.',
    keywords: ['unit converter', 'measurement converter', 'length converter', 'weight converter', 'temperature converter', 'metric converter'],
    slug: 'unit-converter',
    category: 'Daily Utilities'
  },
  'tax-calculator': {
    title: 'Tax Calculator – 2024 Income Tax Calculator Free',
    description: 'Calculate 2024 federal income tax, tax brackets, and effective tax rate. Free tax calculator for accurate tax planning and preparation.',
    keywords: ['tax calculator', '2024 tax calculator', 'income tax calculator', 'tax brackets', 'federal tax calculator', 'tax planning'],
    slug: 'tax-calculator',
    category: 'Finance & Business'
  },
  'tip-calculator': {
    title: 'Tip Calculator – Bill Split & Tip Calculator Free',
    description: 'Calculate tips and split restaurant bills among friends. Free tip calculator with customizable tip percentages and bill splitting options.',
    keywords: ['tip calculator', 'bill split calculator', 'restaurant calculator', 'tip percentage calculator', 'bill splitter'],
    slug: 'tip-calculator',
    category: 'Finance & Business'
  },
  'interest-calculator': {
    title: 'Interest Calculator – Compound Interest & Investment Calculator',
    description: 'Calculate compound interest, investment growth, and savings projections. Free interest calculator for financial planning and investment analysis.',
    keywords: ['interest calculator', 'compound interest calculator', 'investment calculator', 'savings calculator', 'financial calculator'],
    slug: 'interest-calculator',
    category: 'Finance & Business'
  },
  'json-formatter': {
    title: 'JSON Formatter – Validate, Format & Minify JSON Online',
    description: 'Format, validate, and minify JSON data with syntax highlighting. Free JSON formatter tool for developers with error detection and beautification.',
    keywords: ['JSON formatter', 'JSON validator', 'JSON minifier', 'JSON beautifier', 'JSON parser', 'JSON tool'],
    slug: 'json-formatter',
    category: 'Developer Tools'
  },
  'html-minifier': {
    title: 'HTML Minifier – Compress HTML Code Online Free',
    description: 'Compress HTML code, remove comments, and reduce file size for faster websites. Free HTML minifier tool for web developers and optimization.',
    keywords: ['HTML minifier', 'HTML compressor', 'HTML optimizer', 'minify HTML', 'compress HTML', 'web optimization'],
    slug: 'html-minifier',
    category: 'Developer Tools'
  },
  'water-intake-calculator': {
    title: 'Water Intake Calculator – Daily Water Needs Calculator',
    description: 'Calculate daily water intake based on weight, activity level, and climate. Free water calculator for optimal hydration and health.',
    keywords: ['water intake calculator', 'daily water needs', 'hydration calculator', 'water calculator', 'fluid intake calculator'],
    slug: 'water-intake-calculator',
    category: 'Health & Fitness'
  },
  'tdee-calculator': {
    title: 'TDEE Calculator – Total Daily Energy Expenditure Calculator',
    description: 'Calculate total daily energy expenditure (TDEE) for accurate calorie planning. Free TDEE calculator based on activity level and metabolism.',
    keywords: ['TDEE calculator', 'total daily energy expenditure', 'metabolism calculator', 'calorie expenditure', 'energy calculator'],
    slug: 'tdee-calculator',
    category: 'Health & Fitness'
  },
  'age-calculator': {
    title: 'Age Calculator – Calculate Age in Years, Months, Days',
    description: 'Calculate exact age in years, months, days, hours, and minutes. Free age calculator with precise date calculations and age statistics.',
    keywords: ['age calculator', 'calculate age', 'age in days', 'age in months', 'date calculator', 'birthday calculator'],
    slug: 'age-calculator',
    category: 'Daily Utilities'
  },
  'time-zone-converter': {
    title: 'Time Zone Converter – World Time Zone Calculator',
    description: 'Convert time between world time zones for meetings and travel planning. Free time zone converter with major cities and UTC offsets.',
    keywords: ['time zone converter', 'world time converter', 'timezone calculator', 'time converter', 'world clock'],
    slug: 'time-zone-converter',
    category: 'Daily Utilities'
  },
  'random-number-generator': {
    title: 'Random Number Generator – Lottery & Secure Random Numbers',
    description: 'Generate random numbers, lottery picks, and secure random sequences. Free random number generator with customizable ranges and options.',
    keywords: ['random number generator', 'lottery number generator', 'random numbers', 'number picker', 'random generator'],
    slug: 'random-number-generator',
    category: 'Daily Utilities'
  },
  'countdown-timer': {
    title: 'Countdown Timer – Pomodoro Timer & Productivity Timer',
    description: 'Productivity timer for work sessions, breaks, and time management. Free countdown timer with Pomodoro technique and custom intervals.',
    keywords: ['countdown timer', 'pomodoro timer', 'productivity timer', 'work timer', 'break timer', 'time management'],
    slug: 'countdown-timer',
    category: 'Daily Utilities'
  }
};

export function generateMetadata(slug: string): Metadata {
  const tool = toolsMetadata[slug];
  if (!tool) {
    return {
      title: 'Tool Not Found | ToolBank',
      description: 'The requested tool was not found.'
    };
  }

  const canonicalUrl = `https://toolbank.vercel.app/${slug}`;

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    authors: [{ name: 'ToolBank' }],
    creator: 'ToolBank',
    publisher: 'ToolBank',
    robots: 'index, follow',
    canonical: canonicalUrl,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'ToolBank',
      title: tool.title,
      description: tool.description,
      images: [
        {
          url: `/og-images/${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      images: [`/og-images/${slug}.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export function generateStructuredData(slug: string) {
  const tool = toolsMetadata[slug];
  if (!tool) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.description,
    url: `https://toolbank.vercel.app/${slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    provider: {
      '@type': 'Organization',
      name: 'ToolBank',
      url: 'https://toolbank.vercel.app'
    }
  };
}
