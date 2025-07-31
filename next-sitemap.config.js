/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://toolbank.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://toolbank.vercel.app/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };

    // Higher priority for main pages
    if (path === '/') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'daily';
    }

    // High priority for popular tools
    const popularTools = [
      '/bmi-calculator',
      '/loan-calculator',
      '/qr-code-generator',
      '/password-generator',
      '/calorie-calculator',
      '/invoice-generator',
      '/word-counter',
    ];

    if (popularTools.includes(path)) {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    }

    // Medium priority for other tools
    if (path.includes('-calculator') || path.includes('-generator') || path.includes('-converter') || path.includes('-timer')) {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'weekly';
    }

    // Medium priority for legal pages
    if (path === '/privacy' || path === '/terms' || path === '/contact') {
      customConfig.priority = 0.6;
      customConfig.changefreq = 'monthly';
    }

    return customConfig;
  },
};
