// Structured data utilities for SEO

export interface StructuredDataProps {
  title: string;
  description: string;
  url: string;
  type?: 'WebPage' | 'WebApplication' | 'SoftwareApplication';
}

export const generateWebPageStructuredData = ({
  title,
  description,
  url,
  type = 'WebPage'
}: StructuredDataProps) => {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'ToolBank',
      url: 'https://toolbank.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://toolbank.vercel.app/logo.png',
      },
    },
    mainEntity: {
      '@type': 'WebSite',
      name: 'ToolBank',
      url: 'https://toolbank.vercel.app',
    },
  };
};

export const generateCalculatorStructuredData = (
  title: string,
  description: string,
  url: string,
  calculatorType: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ToolBank',
      url: 'https://toolbank.vercel.app',
    },
    featureList: [
      'Free to use',
      'No registration required',
      'Mobile responsive',
      'Instant calculations',
    ],
    keywords: [calculatorType, 'calculator', 'free', 'online', 'tool'],
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
};

export const generateOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ToolBank',
    url: 'https://toolbank.vercel.app',
    logo: 'https://toolbank.vercel.app/logo.png',
    description: 'Free online tools and calculators for health, finance, development, and daily utilities.',
    sameAs: [
      'https://twitter.com/toolbank',
      'https://github.com/toolbank',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@toolbank.com',
    },
  };
};

export const generateWebSiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ToolBank',
    url: 'https://toolbank.vercel.app',
    description: 'Free online tools and calculators for health, finance, development, and daily utilities.',
    publisher: {
      '@type': 'Organization',
      name: 'ToolBank',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://toolbank.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// Helper function to inject structured data into the page
export const injectStructuredData = (data: object) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
};
