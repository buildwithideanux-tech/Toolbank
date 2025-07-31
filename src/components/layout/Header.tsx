'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Calculator, Wrench, Search, ChevronDown } from 'lucide-react';
import LoadingLink from '@/components/ui/LoadingLink';
import { toolCategories } from '@/config/tools';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 overflow-hidden" style={{ zIndex: 999998 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 overflow-hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Wrench className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">ToolBank</span>
              <div className="text-xs text-gray-500 -mt-1">18+ Free Tools</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>

            {/* SEO-Optimized Tools Dropdown */}
            <div className="relative">
              <button
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center font-medium py-2 px-1 group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-label="Browse all tools and calculators"
                id="tools-menu-button"
              >
                All Tools
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <nav
                  className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[800px] bg-white rounded-xl shadow-2xl border"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  style={{ zIndex: 999999 }}
                  role="menu"
                  aria-labelledby="tools-menu-button"
                  aria-label="Tools and calculators navigation"
                >
                  <div className="p-6">
                    <header className="text-center mb-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-2">All Tools & Calculators</h2>
                      <p className="text-sm text-gray-600">18+ professional tools organized by category</p>
                    </header>

                    <div className="grid grid-cols-4 gap-4" role="menubar">
                      {toolCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <section
                            key={category.id}
                            className={`${category.bgColor} rounded-xl p-4`}
                            role="group"
                            aria-labelledby={`category-${category.id}`}
                          >
                            <header className="flex items-center mb-3">
                              <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                                <IconComponent className={`h-4 w-4 ${category.color}`} aria-hidden="true" />
                              </div>
                              <h3
                                id={`category-${category.id}`}
                                className="font-semibold text-gray-900 ml-3 text-sm"
                              >
                                {category.name}
                              </h3>
                            </header>
                            <ul className="space-y-1.5" role="menu">
                              {category.tools.map((tool) => (
                                <li key={tool.id} role="none">
                                  <LoadingLink
                                    href={tool.href}
                                    className="text-xs text-gray-600 hover:text-blue-600 transition-colors block py-1.5 px-2 rounded-md hover:bg-white/50 flex items-center justify-between"
                                    role="menuitem"
                                    title={tool.description}
                                    aria-label={`${tool.name} - ${tool.description}`}
                                  >
                                    <span>{tool.name}</span>
                                    {tool.popular && (
                                      <span
                                        className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium"
                                        aria-label="Popular tool"
                                      >
                                        Popular
                                      </span>
                                    )}
                                  </LoadingLink>
                                </li>
                              ))}
                            </ul>
                          </section>
                        );
                      })}
                    </div>

                    <footer className="border-t mt-6 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5" aria-hidden="true"></div>
                            All tools free forever
                          </span>
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1.5" aria-hidden="true"></div>
                            No registration required
                          </span>
                        </div>
                        <Link
                          href="/#tools"
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                          aria-label="View all tool categories on homepage"
                        >
                          View All Categories
                          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </footer>
                  </div>
                </nav>
              )}
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-gray-50 overflow-hidden max-h-[80vh] overflow-y-auto">
            <div className="space-y-4 max-w-full overflow-hidden">
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Tools Header */}
              <div className="px-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">All Tools & Calculators</h3>
                <p className="text-xs text-gray-600 mb-4">18+ professional tools, all free</p>
              </div>

              {toolCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.name} className={`mx-4 ${category.bgColor} rounded-lg p-4`}>
                    <div className="flex items-center mb-3">
                      <div className={`p-1.5 rounded-md ${category.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <IconComponent className={`h-4 w-4 ${category.color}`} />
                      </div>
                      <h4 className="font-semibold text-gray-900 ml-2 text-sm">{category.name}</h4>
                      <span className="ml-auto text-xs text-gray-500">
                        {category.tools.length} tools
                      </span>
                    </div>
                    <div className="space-y-1">
                      {category.tools.map((tool) => (
                        <LoadingLink
                          key={tool.href}
                          href={tool.href}
                          className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-md hover:bg-white/50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span>{tool.name}</span>
                          {tool.popular && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                        </LoadingLink>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="px-4 pt-4 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
