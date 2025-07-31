'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function GoogleTagManager() {
  useEffect(() => {
    if (!GTM_ID) {
      console.warn('GTM_ID is not defined');
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
  }, []);

  if (!GTM_ID) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* Google Tag Manager NoScript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// GTM Event Tracking Functions
export const gtmTrack = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Tool-specific GTM events
export const gtmTrackToolUsage = (toolName: string, category: string) => {
  gtmTrack('tool_usage', {
    tool_name: toolName,
    tool_category: category,
    event_category: 'Tools',
    event_action: 'use',
    event_label: toolName,
  });
};

export const gtmTrackToolCompletion = (toolName: string, category: string, timeSpent?: number) => {
  gtmTrack('tool_completion', {
    tool_name: toolName,
    tool_category: category,
    time_spent: timeSpent,
    event_category: 'Tools',
    event_action: 'complete',
    event_label: toolName,
  });
};

export const gtmTrackDownload = (fileName: string, fileType: string, toolName?: string) => {
  gtmTrack('file_download', {
    file_name: fileName,
    file_type: fileType,
    tool_name: toolName,
    event_category: 'Downloads',
    event_action: 'download',
    event_label: fileName,
  });
};

export const gtmTrackFormSubmission = (formName: string, formType: string) => {
  gtmTrack('form_submission', {
    form_name: formName,
    form_type: formType,
    event_category: 'Forms',
    event_action: 'submit',
    event_label: formName,
  });
};

export const gtmTrackPageView = (pagePath: string, pageTitle: string) => {
  gtmTrack('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    event_category: 'Navigation',
    event_action: 'page_view',
  });
};

export const gtmTrackSearch = (searchTerm: string, resultsCount?: number) => {
  gtmTrack('search', {
    search_term: searchTerm,
    results_count: resultsCount,
    event_category: 'Search',
    event_action: 'search',
    event_label: searchTerm,
  });
};

export const gtmTrackSocialShare = (platform: string, toolName: string, url: string) => {
  gtmTrack('social_share', {
    social_platform: platform,
    tool_name: toolName,
    shared_url: url,
    event_category: 'Social',
    event_action: 'share',
    event_label: `${platform} - ${toolName}`,
  });
};

export const gtmTrackError = (errorMessage: string, errorLocation: string, toolName?: string) => {
  gtmTrack('error_tracking', {
    error_message: errorMessage,
    error_location: errorLocation,
    tool_name: toolName,
    event_category: 'Errors',
    event_action: 'error',
    event_label: errorMessage,
  });
};

export const gtmTrackConversion = (conversionType: string, value?: number) => {
  gtmTrack('conversion', {
    conversion_type: conversionType,
    conversion_value: value,
    event_category: 'Conversions',
    event_action: 'convert',
    event_label: conversionType,
  });
};

export const gtmTrackEngagement = (engagementType: string, details: Record<string, any> = {}) => {
  gtmTrack('engagement', {
    engagement_type: engagementType,
    event_category: 'Engagement',
    event_action: engagementType,
    ...details,
  });
};

// Enhanced ecommerce tracking
export const gtmTrackPurchase = (transactionId: string, items: any[], value: number) => {
  gtmTrack('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'USD',
    items: items,
    event_category: 'Ecommerce',
    event_action: 'purchase',
  });
};

// User identification
export const gtmSetUserId = (userId: string) => {
  gtmTrack('user_identification', {
    user_id: userId,
    event_category: 'User',
    event_action: 'identify',
  });
};

// Custom dimensions
export const gtmSetCustomDimension = (dimension: string, value: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      [dimension]: value,
    });
  }
};

// Debug function for development
export const gtmDebug = (eventName: string, parameters: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('GTM Event:', eventName, parameters);
  }
  gtmTrack(eventName, parameters);
};
