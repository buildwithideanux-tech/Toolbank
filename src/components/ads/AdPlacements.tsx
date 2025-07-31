'use client';

import { ResponsiveBannerAd, RectangleAd, InArticleAd, AdContainer } from './GoogleAdsense';

// Header Banner Ad (Top of page)
export function HeaderBannerAd() {
  return (
    <div className="w-full bg-gray-50 py-4 border-b">
      <div className="container mx-auto px-4">
        <AdContainer title="Advertisement" className="max-w-4xl mx-auto">
          <ResponsiveBannerAd 
            adSlot="1234567890" // Replace with actual ad slot
            className="w-full"
          />
        </AdContainer>
      </div>
    </div>
  );
}

// Sidebar Ad (Right sidebar)
export function SidebarAd() {
  return (
    <div className="sticky top-20">
      <AdContainer title="Advertisement" className="mb-6">
        <RectangleAd 
          adSlot="1234567891" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// Tool Result Ad (After tool calculation)
export function ToolResultAd({ toolName }: { toolName: string }) {
  return (
    <div className="my-8 p-4 bg-gray-50 rounded-lg">
      <AdContainer title="Sponsored" className="max-w-md mx-auto">
        <RectangleAd 
          adSlot="1234567892" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// In-Content Ad (Between content sections)
export function InContentAd() {
  return (
    <div className="my-12">
      <AdContainer title="Advertisement" className="max-w-2xl mx-auto">
        <InArticleAd 
          adSlot="1234567893" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// Footer Banner Ad (Bottom of page)
export function FooterBannerAd() {
  return (
    <div className="w-full bg-gray-100 py-6 border-t">
      <div className="container mx-auto px-4">
        <AdContainer title="Advertisement" className="max-w-4xl mx-auto">
          <ResponsiveBannerAd 
            adSlot="1234567894" // Replace with actual ad slot
            className="w-full"
          />
        </AdContainer>
      </div>
    </div>
  );
}

// Mobile Sticky Ad (Bottom of mobile screen)
export function MobileStickyAd() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t lg:hidden">
      <div className="p-2">
        <AdContainer title="Ad" className="text-center">
          <ResponsiveBannerAd 
            adSlot="1234567895" // Replace with actual ad slot
            className="w-full"
          />
        </AdContainer>
      </div>
    </div>
  );
}

// Tool Category Ad (On category pages)
export function CategoryPageAd({ category }: { category: string }) {
  return (
    <div className="my-8">
      <AdContainer title="Related Services" className="max-w-lg mx-auto">
        <RectangleAd 
          adSlot="1234567896" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// Homepage Hero Ad (Below hero section)
export function HeroSectionAd() {
  return (
    <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <AdContainer title="Featured" className="max-w-4xl mx-auto">
          <ResponsiveBannerAd 
            adSlot="1234567897" // Replace with actual ad slot
            className="w-full"
          />
        </AdContainer>
      </div>
    </section>
  );
}

// Tool List Ad (Between tool listings)
export function ToolListAd({ position }: { position: number }) {
  if (position % 6 !== 0) return null; // Show ad every 6 tools

  return (
    <div className="col-span-full my-6">
      <AdContainer title="Sponsored Tools" className="max-w-2xl mx-auto">
        <InArticleAd 
          adSlot="1234567898" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// Search Results Ad (In search results)
export function SearchResultsAd({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <AdContainer title="Related Services" className="max-w-md mx-auto">
        <RectangleAd 
          adSlot="1234567899" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// Contact Page Ad (On contact/about pages)
export function ContactPageAd() {
  return (
    <div className="mt-8">
      <AdContainer title="Our Partners" className="max-w-lg mx-auto">
        <RectangleAd 
          adSlot="1234567800" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// Native Ad Component (Looks like content)
export function NativeAd({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 my-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          Sponsored
        </span>
      </div>
      <AdContainer className="border-0 bg-transparent p-0">
        <InArticleAd 
          adSlot="1234567801" // Replace with actual ad slot
        />
      </AdContainer>
    </div>
  );
}

// Ad Placement Strategy Hook
export function useAdPlacement() {
  const shouldShowAd = (placement: string, userInteractions: number = 0) => {
    // Don't show ads immediately - let users interact first
    if (userInteractions < 2 && placement !== 'header') {
      return false;
    }

    // Show different ads based on time of day, user behavior, etc.
    const hour = new Date().getHours();
    
    // Business hours - show more business-related ads
    if (hour >= 9 && hour <= 17) {
      return placement.includes('business') || placement.includes('tool');
    }

    // Evening - show more entertainment/personal ads
    return true;
  };

  const getAdSlotForPlacement = (placement: string, category?: string) => {
    const adSlots: Record<string, string> = {
      'header': '1234567890',
      'sidebar': '1234567891',
      'tool-result': '1234567892',
      'in-content': '1234567893',
      'footer': '1234567894',
      'mobile-sticky': '1234567895',
      'category': '1234567896',
      'hero': '1234567897',
      'tool-list': '1234567898',
      'search': '1234567899',
      'contact': '1234567800',
      'native': '1234567801',
    };

    return adSlots[placement] || adSlots['in-content'];
  };

  return {
    shouldShowAd,
    getAdSlotForPlacement,
  };
}

// Ad Performance Tracking
export function trackAdInteraction(adSlot: string, interaction: 'view' | 'click') {
  if (typeof window !== 'undefined') {
    // Track in Google Analytics
    if (window.gtag) {
      window.gtag('event', `ad_${interaction}`, {
        event_category: 'Advertising',
        event_label: adSlot,
        ad_slot: adSlot,
      });
    }

    // Track in Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: `ad_${interaction}`,
        ad_slot: adSlot,
        ad_interaction: interaction,
      });
    }
  }
}
