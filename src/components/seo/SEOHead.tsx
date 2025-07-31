import Head from 'next/head';
import { Tool, ToolCategory } from '@/config/tools';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  tool?: Tool;
  category?: ToolCategory;
  noIndex?: boolean;
  alternateUrls?: Record<string, string>;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  tool,
  category,
  noIndex = false,
  alternateUrls = {}
}: SEOHeadProps) {
  const baseUrl = 'https://toolbank.vercel.app';
  
  // Generate title and description based on tool or category
  const finalTitle = title || 
    (tool ? tool.metaTitle || `${tool.name} - Free Online Tool | ToolBank` : 
     category ? category.seoTitle || `${category.name} Tools | ToolBank` :
     'ToolBank - Free Online Tools & Calculators');
  
  const finalDescription = description ||
    (tool ? tool.metaDescription || tool.description :
     category ? category.seoDescription || category.description :
     'Access 18+ free online tools and calculators for health, finance, development, and daily utilities. No registration required.');
  
  const finalKeywords = keywords.length > 0 ? keywords :
    (tool ? tool.keywords :
     category ? [`${category.name} tools`, `${category.name} calculators`, 'free online tools'] :
     ['free online tools', 'calculators', 'utilities', 'web tools']);
  
  const finalCanonicalUrl = canonicalUrl ||
    (tool ? `${baseUrl}${tool.href}` :
     category ? `${baseUrl}/tools/${category.id}` :
     baseUrl);
  
  const finalOgImage = ogImage ||
    (tool ? `${baseUrl}/images/tools/${tool.id}-og.png` :
     category ? `${baseUrl}/images/categories/${category.id}-og.png` :
     `${baseUrl}/images/og-default.png`);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="ToolBank" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@toolbank" />
      <meta name="twitter:creator" content="@toolbank" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="ToolBank" />
      <meta name="publisher" content="ToolBank" />
      <meta name="application-name" content="ToolBank" />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="ToolBank" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Alternate URLs for internationalization */}
      {Object.entries(alternateUrls).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Tool-specific meta tags */}
      {tool && (
        <>
          <meta name="tool:name" content={tool.name} />
          <meta name="tool:category" content={tool.category} />
          <meta name="tool:difficulty" content={tool.difficulty || 'beginner'} />
          <meta name="tool:estimated-time" content={tool.estimatedTime || '1 minute'} />
          {tool.popular && <meta name="tool:popular" content="true" />}
          {tool.featured && <meta name="tool:featured" content="true" />}
        </>
      )}
      
      {/* Category-specific meta tags */}
      {category && (
        <>
          <meta name="category:name" content={category.name} />
          <meta name="category:id" content={category.id} />
          <meta name="category:tool-count" content={category.tools.length.toString()} />
          {category.featured && <meta name="category:featured" content="true" />}
        </>
      )}
      
      {/* Performance and Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Rich Snippets Support */}
      <meta name="rating" content="5" />
      <meta name="price" content="0" />
      <meta name="priceCurrency" content="USD" />
      <meta name="availability" content="InStock" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="copyright" content="ToolBank" />
      
      {/* Structured Data for Breadcrumbs */}
      {tool && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": baseUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tools",
                  "item": `${baseUrl}/tools`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": tool.name,
                  "item": `${baseUrl}${tool.href}`
                }
              ]
            })
          }}
        />
      )}
    </Head>
  );
}

// Helper function to generate meta tags for specific tool types
export function generateToolMetaTags(tool: Tool) {
  const baseKeywords = ['free', 'online', 'tool', 'calculator', 'no registration'];
  const combinedKeywords = [...tool.keywords, ...baseKeywords];
  
  return {
    title: tool.metaTitle || `${tool.name} - Free Online Tool | ToolBank`,
    description: tool.metaDescription || `${tool.description} Free to use, no registration required.`,
    keywords: combinedKeywords,
    canonicalUrl: `https://toolbank.vercel.app${tool.href}`,
    ogImage: `https://toolbank.vercel.app/images/tools/${tool.id}-og.png`,
  };
}

// Helper function to generate meta tags for categories
export function generateCategoryMetaTags(category: ToolCategory) {
  const baseKeywords = ['free tools', 'online calculators', 'utilities'];
  const categoryKeywords = [`${category.name} tools`, `${category.name} calculators`];
  const combinedKeywords = [...categoryKeywords, ...baseKeywords];
  
  return {
    title: category.seoTitle || `${category.name} Tools & Calculators | ToolBank`,
    description: category.seoDescription || `${category.description} All tools are free and require no registration.`,
    keywords: combinedKeywords,
    canonicalUrl: `https://toolbank.vercel.app/tools/${category.id}`,
    ogImage: `https://toolbank.vercel.app/images/categories/${category.id}-og.png`,
  };
}
