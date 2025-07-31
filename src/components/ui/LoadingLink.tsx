'use client';

import { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';
import { useLoading } from '@/components/providers/LoadingProvider';

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const LoadingLink = ({ href, children, className, onClick }: LoadingLinkProps) => {
  const { navigateWithLoading } = useLoading();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
    
    // Navigate with loading state
    navigateWithLoading(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default LoadingLink;
