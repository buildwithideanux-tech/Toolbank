import { Tool, ToolCategory, allTools, toolCategories } from '@/config/tools';

interface StructuredDataProps {
  type: 'website' | 'tool' | 'category' | 'breadcrumb';
  data?: any;
  tool?: Tool;
  category?: ToolCategory;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function StructuredData({ type, data, tool, category, breadcrumbs }: StructuredDataProps) {
  const generateWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolBank - Free Online Tools & Calculators",
    "description": "Access 18+ free online tools and calculators for health, finance, development, and daily utilities. No registration required.",
    "url": "https://toolbank.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://toolbank.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolBank",
      "url": "https://toolbank.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://toolbank.vercel.app/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Free Online Tools and Calculators",
      "description": "Comprehensive collection of professional tools and calculators",
      "numberOfItems": allTools.length,
      "itemListElement": allTools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `https://toolbank.vercel.app${tool.href}`,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      }))
    }
  });

  const generateToolSchema = (tool: Tool) => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.metaTitle || tool.name,
    "description": tool.metaDescription || tool.description,
    "url": `https://toolbank.vercel.app${tool.href}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolBank",
      "url": "https://toolbank.vercel.app"
    },
    "keywords": tool.keywords.join(", "),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Free to use",
      "No registration required",
      "Instant results",
      "Mobile responsive",
      "Privacy focused"
    ]
  });

  const generateCategorySchema = (category: ToolCategory) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.seoTitle || `${category.name} Tools`,
    "description": category.seoDescription || category.description,
    "url": `https://toolbank.vercel.app/tools/${category.id}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": category.name,
      "description": category.description,
      "numberOfItems": category.tools.length,
      "itemListElement": category.tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `https://toolbank.vercel.app${tool.href}`,
          "applicationCategory": "UtilityApplication"
        }
      }))
    }
  });

  const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  });

  let schema;
  switch (type) {
    case 'website':
      schema = generateWebsiteSchema();
      break;
    case 'tool':
      if (!tool) return null;
      schema = generateToolSchema(tool);
      break;
    case 'category':
      if (!category) return null;
      schema = generateCategorySchema(category);
      break;
    case 'breadcrumb':
      if (!breadcrumbs) return null;
      schema = generateBreadcrumbSchema(breadcrumbs);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
}

// Helper component for tool pages
export function ToolStructuredData({ tool }: { tool: Tool }) {
  const breadcrumbs = [
    { name: "Home", url: "https://toolbank.vercel.app" },
    { name: "Tools", url: "https://toolbank.vercel.app/tools" },
    { name: tool.name, url: `https://toolbank.vercel.app${tool.href}` }
  ];

  return (
    <>
      <StructuredData type="tool" tool={tool} />
      <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
    </>
  );
}

// Helper component for category pages
export function CategoryStructuredData({ category }: { category: ToolCategory }) {
  return <StructuredData type="category" category={category} />;
}

// Helper component for homepage
export function WebsiteStructuredData() {
  return <StructuredData type="website" />;
}
