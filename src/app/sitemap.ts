import { MetadataRoute } from 'next';
import { allTools, toolCategories } from '@/config/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolbank.vercel.app';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Tool pages - dynamically generated from tools config
  const toolPages = allTools.map(tool => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: tool.popular ? 0.9 : tool.featured ? 0.8 : 0.7,
  }));

  // Category pages
  const categoryPages = toolCategories.map(category => ({
    url: `${baseUrl}/tools/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: category.featured ? 0.8 : 0.6,
  }));

  // Tools overview page
  const toolsOverview = {
    url: `${baseUrl}/tools`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  };

  return [
    ...staticPages,
    toolsOverview,
    ...categoryPages,
    ...toolPages,
  ];
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  const baseUrl = 'https://toolbank.vercel.app';
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all search engines to index our tools
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block access to admin areas (if any)
Disallow: /admin/
Disallow: /api/internal/

# Allow access to all tools and calculators
Allow: /bmi-calculator
Allow: /calorie-calculator
Allow: /water-intake-calculator
Allow: /tdee-calculator
Allow: /invoice-generator
Allow: /loan-calculator
Allow: /interest-calculator
Allow: /tip-calculator
Allow: /tax-calculator
Allow: /qr-code-generator
Allow: /password-generator
Allow: /json-formatter
Allow: /html-minifier
Allow: /unit-converter
Allow: /word-counter
Allow: /random-number-generator
Allow: /age-calculator
Allow: /time-zone-converter
Allow: /countdown-timer
`;
}

// Generate additional sitemap for news/blog if needed
export function generateNewsSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolbank.vercel.app';
  
  // This would be populated with blog posts or news articles
  // For now, return empty array as we don't have blog functionality
  return [];
}

// Generate image sitemap for tool screenshots/previews
export function generateImageSitemap() {
  const baseUrl = 'https://toolbank.vercel.app';
  
  return allTools.map(tool => ({
    url: `${baseUrl}${tool.href}`,
    images: [
      {
        url: `${baseUrl}/images/tools/${tool.id}-preview.png`,
        title: `${tool.name} - Free Online Tool`,
        caption: tool.description,
      },
      {
        url: `${baseUrl}/images/tools/${tool.id}-screenshot.png`,
        title: `${tool.name} Screenshot`,
        caption: `Screenshot of ${tool.name} in action`,
      }
    ]
  }));
}

// Generate video sitemap if we add tutorial videos
export function generateVideoSitemap() {
  const baseUrl = 'https://toolbank.vercel.app';
  
  return allTools
    .filter(tool => tool.featured) // Only featured tools get video tutorials
    .map(tool => ({
      url: `${baseUrl}${tool.href}`,
      videos: [
        {
          url: `${baseUrl}/videos/${tool.id}-tutorial.mp4`,
          title: `How to use ${tool.name}`,
          description: `Step-by-step tutorial on using our ${tool.name} tool`,
          thumbnailUrl: `${baseUrl}/images/videos/${tool.id}-thumbnail.jpg`,
          duration: 120, // 2 minutes
          publicationDate: new Date().toISOString(),
        }
      ]
    }));
}

// SEO-friendly URL generation helper
export function generateSEOUrl(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Generate canonical URLs for tools
export function getCanonicalUrl(toolId: string): string {
  const baseUrl = 'https://toolbank.vercel.app';
  const tool = allTools.find(t => t.id === toolId);
  return tool ? `${baseUrl}${tool.href}` : baseUrl;
}

// Generate alternate URLs for internationalization (future feature)
export function generateAlternateUrls(toolId: string) {
  const baseUrl = 'https://toolbank.vercel.app';
  const tool = allTools.find(t => t.id === toolId);
  
  if (!tool) return {};
  
  // Future: Add support for multiple languages
  return {
    'en': `${baseUrl}${tool.href}`,
    'es': `${baseUrl}/es${tool.href}`,
    'fr': `${baseUrl}/fr${tool.href}`,
    'de': `${baseUrl}/de${tool.href}`,
  };
}

// Generate structured sitemap index for large sites
export function generateSitemapIndex(): string {
  const baseUrl = 'https://toolbank.vercel.app';
  const lastModified = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-tools.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-categories.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Generate tools-specific sitemap
export function generateToolsSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolbank.vercel.app';
  
  return allTools.map(tool => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: tool.popular ? 0.9 : tool.featured ? 0.8 : 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}${tool.href}`,
        // Future: Add other languages
      }
    }
  }));
}

// Generate categories-specific sitemap
export function generateCategoriesSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolbank.vercel.app';
  
  return toolCategories.map(category => ({
    url: `${baseUrl}/tools/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: category.featured ? 0.8 : 0.6,
  }));
}
