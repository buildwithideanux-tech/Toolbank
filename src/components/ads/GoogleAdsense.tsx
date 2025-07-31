'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdsenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GoogleAdsense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = {},
}: GoogleAdsenseProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  if (!ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

// AdSense Script Component
export function GoogleAdsenseScript() {
  if (!ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Responsive Banner Ad (728x90 / 320x50)
export function ResponsiveBannerAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="auto"
      className={`responsive-banner-ad ${className}`}
      style={{ minHeight: '90px' }}
    />
  );
}

// Rectangle Ad (300x250)
export function RectangleAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="rectangle"
      className={`rectangle-ad ${className}`}
      style={{ width: '300px', height: '250px' }}
    />
  );
}

// Leaderboard Ad (728x90)
export function LeaderboardAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="horizontal"
      className={`leaderboard-ad ${className}`}
      style={{ width: '728px', height: '90px' }}
    />
  );
}

// Skyscraper Ad (160x600)
export function SkyscraperAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="vertical"
      className={`skyscraper-ad ${className}`}
      style={{ width: '160px', height: '600px' }}
    />
  );
}

// Mobile Banner Ad (320x50)
export function MobileBannerAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="auto"
      className={`mobile-banner-ad ${className}`}
      style={{ width: '320px', height: '50px' }}
    />
  );
}

// Large Rectangle Ad (336x280)
export function LargeRectangleAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="rectangle"
      className={`large-rectangle-ad ${className}`}
      style={{ width: '336px', height: '280px' }}
    />
  );
}

// In-Article Ad (responsive)
export function InArticleAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <div className={`in-article-ad-container ${className}`}>
      <GoogleAdsense
        adSlot={adSlot}
        adFormat="auto"
        className="in-article-ad"
        style={{ display: 'block', textAlign: 'center', minHeight: '100px' }}
      />
    </div>
  );
}

// Multiplex Ad (responsive)
export function MultiplexAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="auto"
      className={`multiplex-ad ${className}`}
      style={{ display: 'block', minHeight: '200px' }}
    />
  );
}

// Auto Ads Component
export function AutoAds() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: ADSENSE_CLIENT_ID,
          enable_page_level_ads: true,
        });
      } catch (error) {
        console.error('Auto Ads error:', error);
      }
    }
  }, []);

  return null;
}

// Ad Container with Loading State
export function AdContainer({
  children,
  title = 'Advertisement',
  className = '',
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="ad-label text-xs text-gray-500 text-center mb-2 uppercase tracking-wide">
        {title}
      </div>
      <div className="ad-content flex justify-center items-center bg-gray-50 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}

// Sticky Ad Component
export function StickyAd({
  adSlot,
  position = 'bottom',
  className = '',
}: {
  adSlot: string;
  position?: 'top' | 'bottom';
  className?: string;
}) {
  const positionClasses = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div className={`fixed left-0 right-0 ${positionClasses} z-40 bg-white shadow-lg ${className}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-center">
          <ResponsiveBannerAd adSlot={adSlot} />
        </div>
      </div>
    </div>
  );
}

// Ad Blocker Detection
export function AdBlockerDetection() {
  useEffect(() => {
    const detectAdBlocker = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      document.body.appendChild(testAd);

      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          console.log('Ad blocker detected');
          // You can track this event or show a message to users
        }
        document.body.removeChild(testAd);
      }, 100);
    };

    detectAdBlocker();
  }, []);

  return null;
}

// Utility function to track ad performance
export const trackAdPerformance = (adSlot: string, event: 'impression' | 'click') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `ad_${event}`, {
      event_category: 'Advertising',
      event_label: adSlot,
      ad_slot: adSlot,
    });
  }
};
