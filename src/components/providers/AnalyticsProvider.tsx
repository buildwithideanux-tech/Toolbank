'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import { GoogleAdsenseScript, AutoAds, AdBlockerDetection } from '@/components/ads/GoogleAdsense';
import { initGA, trackPageView } from '@/lib/analytics';
import { gtmTrackPageView } from '@/components/analytics/GoogleTagManager';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  // Initialize analytics on mount
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      const url = window.location.origin + pathname;
      const title = document.title;

      // Track in Google Analytics
      trackPageView(url, title);

      // Track in Google Tag Manager
      gtmTrackPageView(pathname, title);
    }
  }, [pathname]);

  return (
    <>
      {/* Google Tag Manager */}
      <GoogleTagManager />

      {/* Google AdSense */}
      <GoogleAdsenseScript />
      <AutoAds />
      <AdBlockerDetection />

      {children}
    </>
  );
}

// Hook for tracking tool usage
export const useToolTracking = () => {
  const trackToolStart = (toolName: string, category: string) => {
    // Track in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_start', {
        event_category: 'Tools',
        event_label: toolName,
        tool_name: toolName,
        tool_category: category,
      });
    }

    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'tool_start',
        tool_name: toolName,
        tool_category: category,
      });
    }
  };

  const trackToolComplete = (toolName: string, category: string, timeSpent?: number) => {
    // Track in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_complete', {
        event_category: 'Tools',
        event_label: toolName,
        tool_name: toolName,
        tool_category: category,
        time_spent: timeSpent,
        value: 5,
      });
    }

    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'tool_complete',
        tool_name: toolName,
        tool_category: category,
        time_spent: timeSpent,
      });
    }
  };

  const trackToolError = (toolName: string, errorMessage: string) => {
    // Track in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: errorMessage,
        fatal: false,
        tool_name: toolName,
      });
    }

    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'tool_error',
        tool_name: toolName,
        error_message: errorMessage,
      });
    }
  };

  return {
    trackToolStart,
    trackToolComplete,
    trackToolError,
  };
};

// Hook for tracking downloads
export const useDownloadTracking = () => {
  const trackDownload = (fileName: string, fileType: string, toolName?: string) => {
    // Track in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        event_category: 'Downloads',
        event_label: fileName,
        file_name: fileName,
        file_type: fileType,
        tool_name: toolName,
      });
    }

    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'file_download',
        file_name: fileName,
        file_type: fileType,
        tool_name: toolName,
      });
    }
  };

  return { trackDownload };
};

// Hook for tracking form submissions
export const useFormTracking = () => {
  const trackFormSubmission = (formName: string, formType: string) => {
    // Track in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'Forms',
        event_label: formName,
        form_name: formName,
        form_type: formType,
      });
    }

    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submit',
        form_name: formName,
        form_type: formType,
      });
    }
  };

  return { trackFormSubmission };
};

// Hook for tracking search
export const useSearchTracking = () => {
  const trackSearch = (searchTerm: string, resultsCount?: number) => {
    // Track in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        results_count: resultsCount,
      });
    }

    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'search',
        search_term: searchTerm,
        results_count: resultsCount,
      });
    }
  };

  return { trackSearch };
};

// Hook for tracking social sharing
export const useSocialTracking = () => {
  const trackSocialShare = (platform: string, toolName: string, url: string) => {
    // Track in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'tool',
        item_id: toolName,
        content_id: url,
      });
    }

    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'social_share',
        platform: platform,
        tool_name: toolName,
        url: url,
      });
    }
  };

  return { trackSocialShare };
};
