'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PageLoading } from '@/components/ui/Loading';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  navigateWithLoading: (href: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const pathname = usePathname();
  const router = useRouter();

  // Show loading on route changes
  useEffect(() => {
    setIsLoading(true);
    setLoadingText('Loading tool...');

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Longer delay to show loading state properly

    return () => clearTimeout(timer);
  }, [pathname]);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const navigateWithLoading = (href: string) => {
    setIsLoading(true);

    // Set specific loading text based on destination
    const getLoadingText = (path: string) => {
      if (path.includes('bmi-calculator')) return 'Loading BMI Calculator...';
      if (path.includes('password-generator')) return 'Loading Password Generator...';
      if (path.includes('qr-code-generator')) return 'Loading QR Code Generator...';
      if (path.includes('tip-calculator')) return 'Loading Bill Split Calculator...';
      if (path.includes('loan-calculator')) return 'Loading Loan Calculator...';
      if (path.includes('time-zone-converter')) return 'Loading Time Zone Converter...';
      if (path.includes('countdown-timer')) return 'Loading Pomodoro Timer...';
      if (path.includes('word-counter')) return 'Loading Word Counter...';
      if (path.includes('json-formatter')) return 'Loading JSON Formatter...';
      if (path.includes('html-minifier')) return 'Loading HTML Minifier...';
      if (path.includes('calorie-calculator')) return 'Loading Calorie Calculator...';
      if (path.includes('water-intake-calculator')) return 'Loading Water Intake Calculator...';
      if (path.includes('tdee-calculator')) return 'Loading TDEE Calculator...';
      if (path.includes('interest-calculator')) return 'Loading Interest Calculator...';
      if (path.includes('tax-calculator')) return 'Loading Tax Calculator...';
      if (path.includes('random-number-generator')) return 'Loading Random Number Generator...';
      if (path.includes('invoice-generator')) return 'Loading Invoice Generator...';
      if (path.includes('unit-converter')) return 'Loading Unit Converter...';
      return 'Loading tool...';
    };

    setLoadingText(getLoadingText(href));

    // Small delay to show loading state before navigation
    setTimeout(() => {
      router.push(href);
    }, 150);
  };

  if (isLoading) {
    return <PageLoading text={loadingText} />;
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, navigateWithLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
