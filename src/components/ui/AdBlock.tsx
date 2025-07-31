'use client';

import { useEffect } from 'react';

interface AdBlockProps {
  position: 'top' | 'bottom' | 'sidebar';
}

const AdBlock = ({ position }: AdBlockProps) => {
  useEffect(() => {
    // Initialize Google AdSense ads
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const getAdDimensions = () => {
    switch (position) {
      case 'top':
        return 'w-full h-24 md:h-32';
      case 'bottom':
        return 'w-full h-24 md:h-32';
      case 'sidebar':
        return 'w-full h-64';
      default:
        return 'w-full h-24';
    }
  };

  const getAdSlot = () => {
    switch (position) {
      case 'top':
        return 'top-banner-ad';
      case 'bottom':
        return 'bottom-banner-ad';
      case 'sidebar':
        return 'sidebar-ad';
      default:
        return 'default-ad';
    }
  };

  return (
    <div className={`${getAdDimensions()} bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center`}>
      {/* Development placeholder */}
      {process.env.NODE_ENV === 'development' ? (
        <div className="text-gray-500 text-sm text-center">
          <div className="font-medium">Advertisement</div>
          <div className="text-xs mt-1">{position} ad placement</div>
        </div>
      ) : (
        /* Google AdSense ad unit */
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
          data-ad-slot={getAdSlot()}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};

export default AdBlock;
