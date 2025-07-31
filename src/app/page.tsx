import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdBlock from '@/components/ui/AdBlock';
import LoadingLink from '@/components/ui/LoadingLink';
import SEOHead from '@/components/seo/SEOHead';
import { WebsiteStructuredData } from '@/components/seo/StructuredData';
import { PopularTools, CategoryNavigation } from '@/components/seo/InternalLinking';
import { HeroSectionAd, InContentAd, FooterBannerAd } from '@/components/ads/AdPlacements';
import { Calculator, Heart, DollarSign, Code, Clock, Search, Star, Users, Shield, Zap, TrendingUp, Award } from 'lucide-react';
import { toolCategories as seoToolCategories } from '@/config/tools';

export default function Home() {
  const toolCategories = [
    {
      title: 'Health & Wellness',
      description: 'Calculate BMI, calories, water intake, and more health metrics',
      icon: Heart,
      color: 'bg-red-500',
      tools: [
        { name: 'BMI Calculator', href: '/bmi-calculator', description: 'Calculate BMI, ideal weight range & health category with metric/imperial units' },
        { name: 'Calorie Calculator', href: '/calorie-calculator', description: 'Calculate daily calories for weight loss, gain or maintenance based on activity' },
        { name: 'Water Intake Calculator', href: '/water-intake-calculator', description: 'Calculate daily water intake based on weight, activity & climate' },
        { name: 'TDEE Calculator', href: '/tdee-calculator', description: 'Calculate total daily energy expenditure for accurate calorie planning' },
      ]
    },
    {
      title: 'Finance & Business',
      description: 'Loan calculators, tax tools, and financial planning utilities',
      icon: DollarSign,
      color: 'bg-green-500',
      tools: [
        { name: 'Invoice Generator', href: '/invoice-generator', description: 'Create professional invoices with itemized billing, tax calculations & PDF download' },
        { name: 'Loan Calculator', href: '/loan-calculator', description: 'Calculate monthly payments, total interest & amortization schedule for any loan' },
        { name: 'Interest Calculator', href: '/interest-calculator', description: 'Calculate compound interest, investment growth & savings projections' },
        { name: 'Tax Calculator', href: '/tax-calculator', description: 'Calculate 2024 federal income tax, brackets & effective tax rate' },
        { name: 'Bill Split Calculator', href: '/tip-calculator', description: 'Split restaurant bills, calculate tips & divide costs among friends' },
      ]
    },
    {
      title: 'Developer Tools',
      description: 'QR codes, password generation, JSON formatting, and more',
      icon: Code,
      color: 'bg-blue-500',
      tools: [
        { name: 'QR Code Generator', href: '/qr-code-generator', description: 'Generate QR codes for URLs, text, WiFi passwords & contact info' },
        { name: 'Password Generator', href: '/password-generator', description: 'Generate secure passwords with custom length, symbols & strength analysis' },
        { name: 'JSON Formatter', href: '/json-formatter', description: 'Format, validate, minify JSON data with syntax highlighting' },
        { name: 'HTML Minifier', href: '/html-minifier', description: 'Compress HTML code, remove comments & reduce file size for faster websites' },
      ]
    },
    {
      title: 'Daily Utilities',
      description: 'Time zones, word counting, random numbers, and daily tools',
      icon: Clock,
      color: 'bg-purple-500',
      tools: [
        { name: 'Unit Converter', href: '/unit-converter', description: 'Convert length, weight, temperature, volume & more with instant results' },
        { name: 'Word Counter', href: '/word-counter', description: 'Count words, characters, paragraphs & estimate reading time for any text' },
        { name: 'Time Zone Converter', href: '/time-zone-converter', description: 'Convert time between world time zones for meetings & travel planning' },
        { name: 'Random Number Generator', href: '/random-number-generator', description: 'Generate random numbers, lottery picks & secure random sequences' },
        { name: 'Pomodoro Timer', href: '/countdown-timer', description: 'Productivity timer for work sessions, breaks & time management' },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <SEOHead
          title="ToolBank - Free Online Tools & Calculators | 18+ Professional Tools"
          description="Access 18+ free online tools and calculators for health, finance, development, and daily utilities. BMI calculator, invoice generator, QR code maker, and more. No registration required."
          keywords={['free online tools', 'calculators', 'BMI calculator', 'invoice generator', 'QR code generator', 'password generator', 'utilities', 'web tools']}
          canonicalUrl="https://toolbank.vercel.app"
          ogImage="https://toolbank.vercel.app/images/og-homepage.png"
        />
        <WebsiteStructuredData />
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                {/* Badge */}
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Star className="h-4 w-4 text-yellow-300 mr-2" />
                  <span className="text-sm font-medium">18+ Professional Tools</span>
                  <span className="ml-2 bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold">FREE</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Free Online Tools & Calculators
                </h1>

                <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                  Professional-grade tools for health, finance, development, and daily tasks.
                  <span className="text-white font-semibold"> No registration, no limits, completely free.</span>
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">18+</div>
                    <div className="text-blue-200 text-sm">Tools Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-blue-200 text-sm">Free Forever</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-blue-200 text-sm">Registration Required</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="#tools"
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Browse All Tools
                  </Link>
                  <LoadingLink
                    href="/bmi-calculator"
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Try BMI Calculator
                  </LoadingLink>
                </div>
              </div>
            </div>
          </section>

          {/* Hero Section Ad */}
          <HeroSectionAd />

          {/* Features Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ToolBank?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Professional tools designed for accuracy, speed, and ease of use
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Calculator className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Results</h3>
                  <p className="text-gray-600">Industry-standard formulas and thoroughly tested calculations</p>
                </div>

                <div className="text-center group">
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                  <p className="text-gray-600">Instant results with optimized performance on all devices</p>
                </div>

                <div className="text-center group">
                  <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
                  <p className="text-gray-600">All calculations happen locally - your data never leaves your device</p>
                </div>

                <div className="text-center group">
                  <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <Heart className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Free</h3>
                  <p className="text-gray-600">No registration, no hidden fees, no limits - completely free forever</p>
                </div>
              </div>
            </div>
          </section>

          {/* Top Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdBlock position="top" />
          </div>

          {/* Tool Categories */}
          <section id="tools" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  18+ Professional Tools
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Choose Your Tool Category
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Professional-grade calculators and utilities organized by category for easy access.
                  All tools are mobile-friendly and work instantly in your browser.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {toolCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={category.title} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                      <div className="p-8">
                        <div className="flex items-center mb-6">
                          <div className={`${category.color} p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{category.title}</h3>
                            <p className="text-gray-600">{category.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {category.tools.map((tool) => (
                            <LoadingLink
                              key={tool.href}
                              href={tool.href}
                              className="block p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group/tool"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900 group-hover/tool:text-blue-600 transition-colors">
                                    {tool.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {tool.description}
                                  </p>
                                </div>
                                <div className="text-gray-400 group-hover/tool:text-blue-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </LoadingLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Trusted by Thousands</h2>
                <p className="text-xl text-blue-100">Join the community using our professional tools daily</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50K+</div>
                  <div className="text-blue-200">Monthly Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">1M+</div>
                  <div className="text-blue-200">Calculations Made</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">18+</div>
                  <div className="text-blue-200">Professional Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-blue-200">Uptime</div>
                </div>
              </div>
            </div>
          </section>

          {/* In-Content Ad */}
          <InContentAd />

          {/* Popular Tools Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Award className="h-4 w-4 mr-2" />
                  Most Popular
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Tools Everyone Uses</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Start with these popular tools that thousands of users rely on daily
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'BMI Calculator',
                    href: '/bmi-calculator',
                    description: 'Calculate your Body Mass Index with metric/imperial units',
                    icon: Heart,
                    color: 'bg-red-500',
                    users: '15K+ users'
                  },
                  {
                    name: 'Loan Calculator',
                    href: '/loan-calculator',
                    description: 'Calculate monthly payments and total interest for any loan',
                    icon: DollarSign,
                    color: 'bg-green-500',
                    users: '12K+ users'
                  },
                  {
                    name: 'Password Generator',
                    href: '/password-generator',
                    description: 'Generate secure passwords with custom complexity',
                    icon: Code,
                    color: 'bg-blue-500',
                    users: '20K+ users'
                  },
                  {
                    name: 'QR Code Generator',
                    href: '/qr-code-generator',
                    description: 'Create QR codes for URLs, text, and contact info',
                    icon: Code,
                    color: 'bg-purple-500',
                    users: '18K+ users'
                  },
                  {
                    name: 'Unit Converter',
                    href: '/unit-converter',
                    description: 'Convert between different units of measurement',
                    icon: Calculator,
                    color: 'bg-indigo-500',
                    users: '10K+ users'
                  },
                  {
                    name: 'Word Counter',
                    href: '/word-counter',
                    description: 'Count words, characters, and estimate reading time',
                    icon: Clock,
                    color: 'bg-orange-500',
                    users: '8K+ users'
                  }
                ].map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <LoadingLink
                      key={tool.href}
                      href={tool.href}
                      className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`${tool.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {tool.name}
                            </h3>
                            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                              {tool.users}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                    </LoadingLink>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="#tools"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  View All 18+ Tools
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* SEO Internal Linking Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PopularTools
                title="Most Popular Tools"
                limit={6}
              />

              <CategoryNavigation
                showToolCount={true}
              />
            </div>
          </section>
        </main>

        {/* Footer Banner Ad */}
        <FooterBannerAd />

        <Footer />
      </div>
  );
}
