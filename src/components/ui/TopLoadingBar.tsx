'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '@/components/providers/LoadingProvider';

const TopLoadingBar = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`,
          opacity: isLoading ? 1 : 0
        }}
      />
    </div>
  );
};

export default TopLoadingBar;
