import { ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ResultItem {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
}

interface ResultBlockProps {
  title: string;
  results: ResultItem[];
  type?: 'success' | 'warning' | 'info';
  children?: ReactNode;
}

const ResultBlock = ({ title, results, type = 'info', children }: ResultBlockProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className={`rounded-lg border p-6 ${getBorderColor()}`}>
      <div className="flex items-center space-x-2 mb-4">
        {getIcon()}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex justify-between items-start">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-700">{result.label}</dt>
              {result.description && (
                <dd className="text-xs text-gray-500 mt-1">{result.description}</dd>
              )}
            </div>
            <dd className="text-lg font-semibold text-gray-900 ml-4">
              {result.value}
              {result.unit && <span className="text-sm font-normal text-gray-600 ml-1">{result.unit}</span>}
            </dd>
          </div>
        ))}
      </div>

      {children && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

interface SimpleResultProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}

export const SimpleResult = ({ label, value, unit, className = '' }: SimpleResultProps) => {
  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-1">{label}</div>
        <div className="text-2xl font-bold text-gray-900">
          {value}
          {unit && <span className="text-lg font-normal text-gray-600 ml-1">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default ResultBlock;
