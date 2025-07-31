'use client';

import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { toolCategories } from '@/config/tools';
import LoadingLink from '@/components/ui/LoadingLink';

// Lazy load the dropdown content for better performance
const DropdownContent = lazy(() => import('./DropdownContent'));

interface LazyDropdownProps {
  className?: string;
}

export default function LazyDropdown({ className = '' }: LazyDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => {
    setIsDropdownOpen(true);
    if (!hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [hasBeenOpened]);

  const handleMouseLeave = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  // Preload dropdown content on hover intent (when mouse gets close)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
      Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
    );
    
    // Preload when mouse is within 50px of the button
    if (distance < 50 && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [hasBeenOpened]);

  return (
    <div className={`relative ${className}`}>
      <button 
        className="text-gray-700 hover:text-blue-600 transition-colors flex items-center font-medium py-2 px-1 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="Browse all tools and calculators"
        id="tools-menu-button"
      >
        All Tools
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && hasBeenOpened && (
        <Suspense fallback={<DropdownSkeleton />}>
          <DropdownContent 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Suspense>
      )}
    </div>
  );
}

// Skeleton loader for dropdown content
function DropdownSkeleton() {
  return (
    <nav 
      className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[800px] bg-white rounded-xl shadow-2xl border animate-pulse"
      style={{ zIndex: 999999 }}
    >
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg mr-3"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-3 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Optimized dropdown content component
function DropdownContentComponent({ onMouseEnter, onMouseLeave }: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  // Memoize categories to prevent unnecessary re-renders
  const memoizedCategories = useMemo(() => toolCategories, []);

  return (
    <nav 
      className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[800px] bg-white rounded-xl shadow-2xl border"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
          {memoizedCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <CategorySection 
                key={category.id}
                category={category}
                IconComponent={IconComponent}
              />
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
  );
}

// Memoized category section component for better performance
const CategorySection = React.memo(({ category, IconComponent }: {
  category: any;
  IconComponent: any;
}) => {
  return (
    <section 
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
        {category.tools.map((tool: any) => (
          <ToolLink key={tool.id} tool={tool} />
        ))}
      </ul>
    </section>
  );
});

CategorySection.displayName = 'CategorySection';

// Memoized tool link component
const ToolLink = React.memo(({ tool }: { tool: any }) => {
  return (
    <li role="none">
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
  );
});

ToolLink.displayName = 'ToolLink';

// Export the dropdown content component for lazy loading
export { DropdownContentComponent as default };
