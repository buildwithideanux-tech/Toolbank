import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { useStableId } from '@/hooks/useStableId';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: FieldError;
  description?: string;
  required?: boolean;
  id?: string;
}

const FormField = ({ label, children, error, description, required, id }: FormFieldProps) => {
  const generatedId = useStableId('field');
  const fieldId = id || generatedId;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      <div>
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          'aria-describedby': `${description ? descriptionId : ''} ${error ? errorId : ''}`.trim(),
          'aria-invalid': error ? 'true' : 'false',
        })}
      </div>
      {description && (
        <p id={descriptionId} className="text-xs text-gray-500">{description}</p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">{error.message}</p>
      )}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = ({ error, className = '', ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-300' : 'border-gray-300'}
        ${className}
      `}
      {...props}
    />
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = ({ error, className = '', options, ...props }: SelectProps) => {
  return (
    <select
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-300' : 'border-gray-300'}
        ${className}
      `}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = ({ error, className = '', ...props }: TextareaProps) => {
  return (
    <textarea
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-300' : 'border-gray-300'}
        ${className}
      `}
      {...props}
    />
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) => {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormField;
