import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import AdBlock from '../ui/AdBlock';
import RelatedTools from '../ui/RelatedTools';
import FAQSection, { toolFAQs } from '../seo/FAQSection';
import { generateStructuredData } from '@/utils/seo/metadata';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  slug: string;
  keywords?: string[];
  relatedTools?: Array<{
    name: string;
    href: string;
    description: string;
  }>;
  showFAQ?: boolean;
  customFAQs?: Array<{
    question: string;
    answer: string;
  }>;
}

const ToolLayout = ({
  children,
  title,
  description,
  slug,
  keywords = [],
  relatedTools = [],
  showFAQ = true,
  customFAQs
}: ToolLayoutProps) => {
  const canonicalUrl = `https://toolbank.vercel.app/${slug}`;
  const structuredData = generateStructuredData(slug);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ToolBank" />
        <meta property="og:image" content={`https://toolbank.vercel.app/og-images/${slug}.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`https://toolbank.vercel.app/og-images/${slug}.jpg`} />

        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )}
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
        <Header />
        
        <main className="flex-1">
          {/* Top Ad Block */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <AdBlock position="top" />
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Tool Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  {children}
                </div>

                {/* FAQ Section */}
                {showFAQ && (customFAQs || toolFAQs[slug]) && (
                  <FAQSection
                    faqs={customFAQs || toolFAQs[slug] || []}
                    toolName={title}
                  />
                )}

                {/* Bottom Ad Block */}
                <div className="mt-8">
                  <AdBlock position="bottom" />
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Sidebar Ad */}
                <div className="mb-8">
                  <AdBlock position="sidebar" />
                </div>

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                  <RelatedTools tools={relatedTools} />
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ToolLayout;
