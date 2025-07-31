'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { toolCategories } from '@/config/tools';
import LoadingLink from '@/components/ui/LoadingLink';

interface DropdownContentProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DropdownContent({ onMouseEnter, onMouseLeave }: DropdownContentProps) {
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
