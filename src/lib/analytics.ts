// Google Analytics 4 configuration and event tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA_MEASUREMENT_ID is not defined');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
    // Enhanced measurement settings
    enhanced_measurement: {
      scrolls: true,
      outbound_clicks: true,
      site_search: true,
      video_engagement: true,
      file_downloads: true,
    },
    // Custom dimensions
    custom_map: {
      custom_dimension_1: 'tool_category',
      custom_dimension_2: 'tool_difficulty',
      custom_dimension_3: 'user_type',
    },
  });
};

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: title || document.title,
    page_location: url,
    send_page_view: true,
  });
};

// Tool usage events
export const trackToolUsage = (toolName: string, category: string, action: string = 'use') => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'tool_usage', {
    event_category: 'Tools',
    event_label: toolName,
    tool_name: toolName,
    tool_category: category,
    action_type: action,
    value: 1,
  });
};

// Tool completion events
export const trackToolCompletion = (toolName: string, category: string, timeSpent?: number) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'tool_completion', {
    event_category: 'Tools',
    event_label: toolName,
    tool_name: toolName,
    tool_category: category,
    time_spent: timeSpent,
    value: 5, // Higher value for completions
  });
};

// Download events (for PDFs, files, etc.)
export const trackDownload = (fileName: string, fileType: string, toolName?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'file_download', {
    event_category: 'Downloads',
    event_label: fileName,
    file_name: fileName,
    file_type: fileType,
    tool_name: toolName,
    value: 3,
  });
};

// Search events
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'search', {
    event_category: 'Search',
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Engagement events
export const trackEngagement = (eventName: string, details: Record<string, any> = {}) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, {
    event_category: 'Engagement',
    ...details,
  });
};

// Error tracking
export const trackError = (errorMessage: string, errorLocation: string, toolName?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'exception', {
    description: errorMessage,
    fatal: false,
    error_location: errorLocation,
    tool_name: toolName,
  });
};

// Conversion events
export const trackConversion = (conversionType: string, value?: number, currency: string = 'USD') => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    event_category: 'Conversions',
    conversion_type: conversionType,
    value: value,
    currency: currency,
  });
};

// Custom events for tool interactions
export const trackToolInteraction = (
  toolName: string,
  interactionType: string,
  details: Record<string, any> = {}
) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'tool_interaction', {
    event_category: 'Tool Interactions',
    event_label: `${toolName} - ${interactionType}`,
    tool_name: toolName,
    interaction_type: interactionType,
    ...details,
  });
};

// User timing events (for performance tracking)
export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'timing_complete', {
    name: variable,
    value: value,
    event_category: category,
    event_label: label,
  });
};

// Enhanced ecommerce events (for future monetization)
export const trackPurchase = (transactionId: string, items: any[], value: number) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'USD',
    items: items,
  });
};

// Social sharing events
export const trackSocialShare = (platform: string, toolName: string, url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'share', {
    method: platform,
    content_type: 'tool',
    item_id: toolName,
    content_id: url,
  });
};

// Newsletter signup
export const trackNewsletterSignup = (source: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'sign_up', {
    method: 'email',
    event_category: 'Newsletter',
    source: source,
  });
};

// Contact form submission
export const trackContactForm = (formType: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'form_submit', {
    event_category: 'Contact',
    form_type: formType,
  });
};

// Ad click tracking
export const trackAdClick = (adUnit: string, placement: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', 'ad_click', {
    event_category: 'Advertising',
    ad_unit: adUnit,
    placement: placement,
  });
};

// Utility function to check if analytics is loaded
export const isAnalyticsLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Debug function for development
export const debugAnalytics = (eventName: string, parameters: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters);
  }
};
