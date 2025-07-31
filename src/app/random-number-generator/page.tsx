'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Button, Select } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { RefreshCw, Copy } from 'lucide-react';

const randomSchema = z.object({
  min: z.number().min(-1000000, 'Minimum too low').max(1000000, 'Minimum too high'),
  max: z.number().min(-1000000, 'Maximum too low').max(1000000, 'Maximum too high'),
  count: z.number().min(1, 'Count must be at least 1').max(1000, 'Count too high'),
  allowDuplicates: z.boolean(),
  numberType: z.enum(['integer', 'decimal']),
  decimalPlaces: z.number().min(0, 'Decimal places cannot be negative').max(10, 'Too many decimal places'),
}).refine(data => data.max > data.min, {
  message: 'Maximum must be greater than minimum',
  path: ['max'],
});

type RandomFormData = z.infer<typeof randomSchema>;

const RandomNumberGenerator = () => {
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RandomFormData>({
    resolver: zodResolver(randomSchema),
    defaultValues: {
      min: 1,
      max: 100,
      count: 1,
      allowDuplicates: true,
      numberType: 'integer',
      decimalPlaces: 2,
    },
  });

  const numberType = watch('numberType');
  const count = watch('count');
  const allowDuplicates = watch('allowDuplicates');

  const generateNumbers = (data: RandomFormData) => {
    const numbers: number[] = [];
    const range = data.max - data.min;
    
    if (!data.allowDuplicates && data.count > range + 1 && data.numberType === 'integer') {
      // Can't generate more unique integers than the range allows
      return;
    }

    const usedNumbers = new Set<number>();

    for (let i = 0; i < data.count; i++) {
      let number: number;
      let attempts = 0;
      const maxAttempts = 10000;

      do {
        if (data.numberType === 'integer') {
          number = Math.floor(Math.random() * (data.max - data.min + 1)) + data.min;
        } else {
          number = Math.random() * (data.max - data.min) + data.min;
          number = parseFloat(number.toFixed(data.decimalPlaces));
        }
        attempts++;
      } while (!data.allowDuplicates && usedNumbers.has(number) && attempts < maxAttempts);

      if (attempts >= maxAttempts && !data.allowDuplicates) {
        break; // Couldn't find unique number
      }

      numbers.push(number);
      if (!data.allowDuplicates) {
        usedNumbers.add(number);
      }
    }

    setResults(numbers);
  };

  const onSubmit = (data: RandomFormData) => {
    generateNumbers(data);
  };

  const copyResults = async () => {
    if (results.length === 0) return;
    
    try {
      const text = results.join(', ');
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const generateQuick = (min: number, max: number, count: number = 1) => {
    const data = {
      min,
      max,
      count,
      allowDuplicates: true,
      numberType: 'integer' as const,
      decimalPlaces: 2,
    };
    generateNumbers(data);
  };

  const relatedTools = [
    {
      name: 'Password Generator',
      href: '/password-generator',
      description: 'Generate secure random passwords',
    },
    {
      name: 'QR Code Generator',
      href: '/qr-code-generator',
      description: 'Generate QR codes for any text',
    },
    {
      name: 'Word Counter',
      href: '/word-counter',
      description: 'Count words and characters in text',
    },
  ];
  const quickOptions = [
    { label: '1-10', min: 1, max: 10 },
    { label: '1-100', min: 1, max: 100 },
    { label: '1-1000', min: 1, max: 1000 },
    { label: 'Dice (1-6)', min: 1, max: 6 },
    { label: 'Coin (0-1)', min: 0, max: 1 },
  ];

  return (
    <ToolLayout
        title="Random Number Generator - Generate Random Numbers Online"
        description="Free random number generator to create random integers and decimals. Generate single numbers or lists with customizable ranges and options."
        slug="random-number-generator"
        keywords={['random number generator', 'random numbers', 'number generator', 'random integers', 'random decimals']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Random Number Generator</h1>
            <p className="text-lg text-gray-600">
              Generate random numbers with customizable ranges and options. Create single numbers or lists 
              of random integers and decimals for games, statistics, or any other purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generator Form */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Numbers</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField 
                      label="Minimum" 
                      required
                      error={errors.min}
                    >
                      <Input
                        type="number"
                        {...register('min', { valueAsNumber: true })}
                        error={!!errors.min}
                        placeholder="1"
                      />
                    </FormField>

                    <FormField 
                      label="Maximum" 
                      required
                      error={errors.max}
                    >
                      <Input
                        type="number"
                        {...register('max', { valueAsNumber: true })}
                        error={!!errors.max}
                        placeholder="100"
                      />
                    </FormField>
                  </div>

                  <FormField 
                    label="Number of Results" 
                    required
                    error={errors.count}
                    description="How many numbers to generate"
                  >
                    <Input
                      type="number"
                      min="1"
                      max="1000"
                      {...register('count', { valueAsNumber: true })}
                      error={!!errors.count}
                      placeholder="1"
                    />
                  </FormField>

                  <FormField label="Number Type" required>
                    <Select
                      {...register('numberType')}
                      options={[
                        { value: 'integer', label: 'Integers (whole numbers)' },
                        { value: 'decimal', label: 'Decimals (floating point)' },
                      ]}
                    />
                  </FormField>

                  {numberType === 'decimal' && (
                    <FormField 
                      label="Decimal Places" 
                      required
                      error={errors.decimalPlaces}
                    >
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        {...register('decimalPlaces', { valueAsNumber: true })}
                        error={!!errors.decimalPlaces}
                        placeholder="2"
                      />
                    </FormField>
                  )}

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('allowDuplicates')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Allow duplicate numbers</span>
                    </label>
                    {!allowDuplicates && count > 1 && (
                      <p className="text-xs text-gray-500">
                        Each number will be unique within the generated set
                      </p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Generate Numbers
                  </Button>
                </form>
              </div>

              {/* Quick Generate */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Generate</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickOptions.map((option) => (
                    <Button
                      key={option.label}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => generateQuick(option.min, option.max)}
                      className="text-sm"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {results.length > 0 ? (
                <ResultBlock
                  title={`Generated ${results.length} Number${results.length > 1 ? 's' : ''}`}
                  type="success"
                  results={[
                    {
                      label: 'Results',
                      value: results.length === 1 ? results[0].toString() : `${results.length} numbers`,
                      description: results.length === 1 ? 'Your random number' : 'Click to view all numbers',
                    },
                  ]}
                >
                  <div className="space-y-4">
                    {results.length === 1 ? (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {results[0]}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {results.map((number, index) => (
                            <div
                              key={index}
                              className="bg-white rounded px-2 py-1 text-center text-sm font-mono"
                            >
                              {number}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        onClick={() => generateNumbers(watch())}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Generate Again</span>
                      </Button>
                      <Button
                        onClick={copyResults}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Copy className="h-4 w-4" />
                        <span>{copied ? 'Copied!' : 'Copy All'}</span>
                      </Button>
                    </div>
                  </div>
                </ResultBlock>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <p className="text-gray-500">Generated numbers will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Random Number Generation</h2>
            <p className="text-gray-600 mb-4">
              Random number generators are essential tools for statistics, gaming, simulations, and cryptography. 
              This tool uses JavaScript's built-in Math.random() function to generate pseudorandom numbers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Gaming & Entertainment</h4>
                <p className="text-blue-700">Dice rolls, lottery numbers, random selections</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Statistics & Research</h4>
                <p className="text-green-700">Sampling, simulations, probability experiments</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Programming & Testing</h4>
                <p className="text-yellow-700">Test data generation, algorithm testing</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">Decision Making</h4>
                <p className="text-purple-700">Random choices, fair selections, contests</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Number Types</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Integers:</strong> Whole numbers without decimal points (1, 2, 3, ...)
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Decimals:</strong> Numbers with decimal points (1.23, 4.56, 7.89, ...)
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Are these numbers truly random?</h4>
                <p className="text-gray-600">
                  These are pseudorandom numbers generated by a mathematical algorithm. They're suitable for most 
                  applications but not for cryptographic purposes where true randomness is required.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What's the difference between allowing and not allowing duplicates?</h4>
                <p className="text-gray-600">
                  When duplicates are allowed, each number is generated independently. When not allowed, 
                  each number in the set will be unique within the specified range.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Can I generate negative numbers?</h4>
                <p className="text-gray-600">
                  Yes, you can set negative values for both minimum and maximum to generate negative numbers, 
                  or use a negative minimum with a positive maximum to include both.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default RandomNumberGenerator;
