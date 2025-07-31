'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { calculateTip } from '@/utils/calculations/finance';

const tipSchema = z.object({
  billAmount: z.number().min(0.01, 'Bill amount must be greater than 0').max(100000, 'Bill amount too large'),
  tipPercent: z.number().min(0, 'Tip percentage cannot be negative').max(100, 'Tip percentage too high'),
  numberOfPeople: z.number().min(1, 'Number of people must be at least 1').max(100, 'Too many people'),
});

type TipFormData = z.infer<typeof tipSchema>;

const TipCalculator = () => {
  const [result, setResult] = useState<{ tipAmount: number; totalAmount: number; perPerson: number } | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TipFormData>({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      billAmount: 50,
      tipPercent: 18,
      numberOfPeople: 1,
    },
  });

  const billAmount = watch('billAmount');
  const numberOfPeople = watch('numberOfPeople');

  const onSubmit = (data: TipFormData) => {
    const tipResult = calculateTip(data.billAmount, data.tipPercent, data.numberOfPeople);
    setResult(tipResult);
  };

  const setTipPercent = (percent: number) => {
    setValue('tipPercent', percent);
    const currentData = watch();
    const tipResult = calculateTip(currentData.billAmount, percent, currentData.numberOfPeople);
    setResult(tipResult);
  };

  const relatedTools = [
    {
      name: 'Tax Calculator',
      href: '/tax-calculator',
      description: 'Calculate income tax and deductions',
    },
    {
      name: 'Discount Calculator',
      href: '/discount-calculator',
      description: 'Calculate discounts and savings',
    },
    {
      name: 'Currency Converter',
      href: '/currency-converter',
      description: 'Convert between different currencies',
    },
  ];
  const commonTipPercentages = [15, 18, 20, 22, 25];

  return (
    <ToolLayout
        title="Bill Split Calculator - Split Restaurant Bills & Calculate Tips"
        description="Free bill splitter to divide restaurant costs, calculate tips, and split bills among friends. Perfect for group dining, parties, and shared expenses."
        slug="tip-calculator"
        keywords={['bill split calculator', 'restaurant bill splitter', 'tip calculator', 'divide bill', 'split costs', 'group dining calculator', 'shared expenses']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bill Split Calculator</h1>
            <p className="text-lg text-gray-600">
              Split restaurant bills, calculate tips, and divide costs among friends. Choose from common tip percentages
              or enter a custom amount. Perfect for group dining, parties, and shared expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                  label="Bill Amount ($)" 
                  required
                  error={errors.billAmount}
                  description="Total bill before tip"
                >
                  <Input
                    type="number"
                    step="0.01"
                    {...register('billAmount', { valueAsNumber: true })}
                    error={!!errors.billAmount}
                    placeholder="50.00"
                  />
                </FormField>

                <FormField 
                  label="Tip Percentage (%)" 
                  required
                  error={errors.tipPercent}
                  description="Percentage to tip"
                >
                  <Input
                    type="number"
                    step="0.1"
                    {...register('tipPercent', { valueAsNumber: true })}
                    error={!!errors.tipPercent}
                    placeholder="18"
                  />
                </FormField>

                {/* Quick Tip Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Tip Percentages
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {commonTipPercentages.map((percent) => (
                      <Button
                        key={percent}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setTipPercent(percent)}
                        className="text-xs"
                      >
                        {percent}%
                      </Button>
                    ))}
                  </div>
                </div>

                <FormField 
                  label="Number of People" 
                  required
                  error={errors.numberOfPeople}
                  description="How many people to split the bill"
                >
                  <Input
                    type="number"
                    min="1"
                    {...register('numberOfPeople', { valueAsNumber: true })}
                    error={!!errors.numberOfPeople}
                    placeholder="1"
                  />
                </FormField>

                <Button type="submit" size="lg" className="w-full">
                  Calculate Tip
                </Button>
              </form>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {result && (
                <>
                  <ResultBlock
                    title="Tip Calculation"
                    type="success"
                    results={[
                      {
                        label: 'Tip Amount',
                        value: `$${result.tipAmount.toFixed(2)}`,
                        description: 'Amount to tip',
                      },
                      {
                        label: 'Total Amount',
                        value: `$${result.totalAmount.toFixed(2)}`,
                        description: 'Bill + tip',
                      },
                      {
                        label: numberOfPeople > 1 ? 'Per Person' : 'Total',
                        value: `$${result.perPerson.toFixed(2)}`,
                        description: numberOfPeople > 1 ? `Split among ${numberOfPeople} people` : 'Total amount to pay',
                      },
                    ]}
                  />

                  {numberOfPeople > 1 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">Bill Split Summary</h3>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex justify-between">
                          <span>Original Bill:</span>
                          <span>${billAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tip ({watch('tipPercent')}%):</span>
                          <span>${result.tipAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t border-blue-200 pt-2">
                          <span>Each Person Pays:</span>
                          <span>${result.perPerson.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {!result && (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <p className="text-gray-500">Enter bill details to calculate tip</p>
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipping Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Tipping customs vary by location and type of service. Here are general guidelines for 
              tipping in restaurants and other service industries.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Restaurant Tipping Standards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Excellent Service</h4>
                <p className="text-green-700">20-25% - Outstanding service, attentive staff</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Good Service</h4>
                <p className="text-blue-700">18-20% - Standard good service, no issues</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Average Service</h4>
                <p className="text-yellow-700">15-18% - Acceptable service with minor issues</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-red-900">Poor Service</h4>
                <p className="text-red-700">10-15% - Below average service, consider speaking to manager</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Other Service Tipping</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Delivery Drivers:</strong> 15-20% or minimum $3-5
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Bartenders:</strong> $1-2 per drink or 15-20% of total
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Hair Stylists:</strong> 15-20% of service cost
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Taxi/Rideshare:</strong> 15-20% of fare
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Tipping Etiquette</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                <strong>Calculate on pre-tax amount:</strong> Base your tip on the bill before taxes
              </p>
              <p className="text-gray-600">
                <strong>Round up:</strong> It's common to round up to the nearest dollar
              </p>
              <p className="text-gray-600">
                <strong>Cash is preferred:</strong> Servers often prefer cash tips when possible
              </p>
              <p className="text-gray-600">
                <strong>Consider the service:</strong> Adjust tip based on quality of service received
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Should I tip on the pre-tax or post-tax amount?</h4>
                <p className="text-gray-600">
                  It's standard to calculate tips on the pre-tax amount. However, some people prefer 
                  to tip on the total including tax, which is also acceptable.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What if service charge is already included?</h4>
                <p className="text-gray-600">
                  If a service charge or gratuity is already included (common for large groups), 
                  additional tipping is optional but appreciated for exceptional service.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">How do I handle poor service?</h4>
                <p className="text-gray-600">
                  For genuinely poor service, you can reduce the tip to 10-15%, but consider speaking 
                  with a manager about the issues rather than leaving no tip.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Should I tip differently for takeout?</h4>
                <p className="text-gray-600">
                  For takeout orders, 10-15% is appropriate if the staff prepared and packaged your order. 
                  Some people tip less for takeout since there's no table service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default TipCalculator;
