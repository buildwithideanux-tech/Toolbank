import Link from 'next/link';
import { Tool, ToolCategory, getRelatedTools, getPopularTools, toolCategories, allTools } from '@/config/tools';

interface RelatedToolsProps {
  currentTool: Tool;
  limit?: number;
  showCategory?: boolean;
}

export function RelatedTools({ currentTool, limit = 4, showCategory = true }: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentTool.id, limit);
  
  if (relatedTools.length === 0) return null;
  
  return (
    <section className="mt-12 p-6 bg-gray-50 rounded-xl" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="text-xl font-bold text-gray-900 mb-4">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
            title={tool.description}
          >
            <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
            {showCategory && (
              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {toolCategories.find(cat => cat.id === tool.category)?.name}
              </span>
            )}
            {tool.popular && (
              <span className="inline-block mt-2 ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                Popular
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

interface PopularToolsProps {
  limit?: number;
  excludeCurrentTool?: string;
  title?: string;
}

export function PopularTools({ limit = 6, excludeCurrentTool, title = "Popular Tools" }: PopularToolsProps) {
  const popularTools = getPopularTools()
    .filter(tool => tool.id !== excludeCurrentTool)
    .slice(0, limit);
  
  if (popularTools.length === 0) return null;
  
  return (
    <section className="mt-8" aria-labelledby="popular-tools-heading">
      <h2 id="popular-tools-heading" className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {popularTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border text-center"
            title={tool.description}
          >
            <h3 className="font-medium text-gray-900 text-sm mb-1">{tool.name}</h3>
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              Popular
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface CategoryNavigationProps {
  currentCategory?: string;
  showToolCount?: boolean;
}

export function CategoryNavigation({ currentCategory, showToolCount = true }: CategoryNavigationProps) {
  return (
    <nav className="mt-8" aria-labelledby="category-nav-heading">
      <h2 id="category-nav-heading" className="text-xl font-bold text-gray-900 mb-4">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {toolCategories.map((category) => {
          const IconComponent = category.icon;
          const isActive = currentCategory === category.id;
          
          return (
            <Link
              key={category.id}
              href={`/tools/${category.id}`}
              className={`block p-4 rounded-lg border transition-all ${
                isActive 
                  ? 'bg-blue-50 border-blue-200 shadow-md' 
                  : 'bg-white border-gray-200 hover:shadow-md hover:border-gray-300'
              }`}
              title={category.description}
            >
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <IconComponent className={`h-4 w-4 ${category.color}`} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-gray-900 ml-3">{category.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
              {showToolCount && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {category.tools.length} tools
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface BreadcrumbsProps {
  items: Array<{ name: string; href?: string }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface ToolGridProps {
  tools: Tool[];
  title?: string;
  showCategory?: boolean;
  columns?: 2 | 3 | 4;
}

export function ToolGrid({ tools, title, showCategory = true, columns = 3 }: ToolGridProps) {
  if (tools.length === 0) return null;
  
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };
  
  return (
    <section className="mt-8">
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      )}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
            title={tool.description}
          >
            <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tool.description}</p>
            <div className="flex items-center justify-between">
              {showCategory && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {toolCategories.find(cat => cat.id === tool.category)?.name}
                </span>
              )}
              {tool.popular && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              {tool.difficulty && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tool.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  tool.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {tool.difficulty}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// SEO-optimized footer links
export function FooterToolLinks() {
  const popularTools = getPopularTools().slice(0, 8);
  const categories = toolCategories.slice(0, 4);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Popular Tools */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Popular Tools</h3>
        <ul className="space-y-2">
          {popularTools.map((tool) => (
            <li key={tool.id}>
              <Link
                href={tool.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                title={tool.description}
              >
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/tools/${category.id}`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                title={category.description}
              >
                {category.name} ({category.tools.length})
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Quick Links */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              All Tools
            </Link>
          </li>
          <li>
            <Link href="/#tools" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Browse Categories
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
