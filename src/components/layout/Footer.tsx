import Link from 'next/link';
import { Wrench, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const toolLinks = [
    { name: 'BMI Calculator', href: '/bmi-calculator' },
    { name: 'Loan Calculator', href: '/loan-calculator' },
    { name: 'QR Code Generator', href: '/qr-code-generator' },
    { name: 'Password Generator', href: '/password-generator' },
    { name: 'Word Counter', href: '/word-counter' },
    { name: 'Time Zone Converter', href: '/time-zone-converter' },
  ];

  const categories = [
    {
      title: 'Health & Wellness',
      links: [
        { name: 'BMI Calculator', href: '/bmi-calculator' },
        { name: 'Calorie Calculator', href: '/calorie-calculator' },
        { name: 'Water Intake Calculator', href: '/water-intake-calculator' },
        { name: 'TDEE Calculator', href: '/tdee-calculator' },
      ]
    },
    {
      title: 'Finance & Business',
      links: [
        { name: 'Loan Calculator', href: '/loan-calculator' },
        { name: 'Interest Calculator', href: '/interest-calculator' },
        { name: 'Tax Calculator', href: '/tax-calculator' },
        { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      ]
    },
    {
      title: 'Developer Tools',
      links: [
        { name: 'QR Code Generator', href: '/qr-code-generator' },
        { name: 'Password Generator', href: '/password-generator' },
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'HTML Minifier', href: '/html-minifier' },
      ]
    },
    {
      title: 'Daily Utilities',
      links: [
        { name: 'Word Counter', href: '/word-counter' },
        { name: 'Time Zone Converter', href: '/time-zone-converter' },
        { name: 'Random Number Generator', href: '/random-number-generator' },
        { name: 'Countdown Timer', href: '/countdown-timer' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ToolBank</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Your one-stop destination for free online tools and calculators. 
              From health and finance to development and daily utilities - we've got you covered.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/toolbank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/toolbank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@toolbank.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tool Categories */}
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors text-sm">
                Sitemap
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} ToolBank. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
