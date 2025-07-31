import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const Loading = ({ size = 'md', text, className = '' }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-2">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
        {text && (
          <span className="text-gray-600 text-sm">{text}</span>
        )}
      </div>
    </div>
  );
};

// Page-level loading component
export const PageLoading = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-6">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto" />
            <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-blue-200 mx-auto"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">ToolBank</h2>
          <p className="text-gray-600 mb-4">{text}</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Button loading component
export const ButtonLoading = ({ text, size = 'sm' }: { text?: string; size?: 'sm' | 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
  };

  return (
    <div className="flex items-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      {text && <span>{text}</span>}
    </div>
  );
};

export default Loading;
