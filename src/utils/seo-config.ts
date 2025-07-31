import { DefaultSeoProps } from 'next-seo';

export const seoConfig: DefaultSeoProps = {
  titleTemplate: '%s | ToolBank',
  defaultTitle: 'ToolBank - Free Online Tools & Calculators',
  description: 'Access 50+ free online tools and calculators for health, finance, development, and daily utilities. BMI calculator, loan calculator, QR generator, and more.',
  canonical: 'https://toolbank.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolbank.vercel.app',
    siteName: 'ToolBank',
    title: 'ToolBank - Free Online Tools & Calculators',
    description: 'Access 50+ free online tools and calculators for health, finance, development, and daily utilities.',
    images: [
      {
        url: 'https://toolbank.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ToolBank - Free Online Tools & Calculators',
      },
    ],
  },
  twitter: {
    handle: '@toolbank',
    site: '@toolbank',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

export const generateToolSEO = (
  title: string,
  description: string,
  slug: string,
  keywords?: string[]
) => ({
  title,
  description,
  canonical: `https://toolbank.vercel.app/${slug}`,
  openGraph: {
    title,
    description,
    url: `https://toolbank.vercel.app/${slug}`,
    type: 'website',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: keywords ? keywords.join(', ') : '',
    },
  ],
});
