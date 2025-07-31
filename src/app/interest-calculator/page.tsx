'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { calculateCompoundInterest, CompoundInterestResult } from '@/utils/calculations/finance';

const interestSchema = z.object({
  principal: z.number().min(1, 'Principal must be greater than 0').max(10000000, 'Principal too large'),
  annualRate: z.number().min(0.01, 'Interest rate must be greater than 0').max(50, 'Interest rate too high'),
  years: z.number().min(0.1, 'Years must be greater than 0').max(100, 'Years too long'),
  compoundingFrequency: z.number().min(1, 'Compounding frequency must be at least 1'),
  monthlyContribution: z.number().min(0, 'Monthly contribution cannot be negative').max(100000, 'Monthly contribution too large'),
});

type InterestFormData = z.infer<typeof interestSchema>;

const InterestCalculator = () => {
  const [result, setResult] = useState<CompoundInterestResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterestFormData>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      principal: 10000,
      annualRate: 5,
      years: 10,
      compoundingFrequency: 12,
      monthlyContribution: 0,
    },
  });

  const onSubmit = (data: InterestFormData) => {
    const interestResult = calculateCompoundInterest(
      data.principal,
      data.annualRate,
      data.compoundingFrequency,
      data.years,
      data.monthlyContribution
    );
    setResult(interestResult);
    setShowBreakdown(false);
  };

  const relatedTools = [
    {
      name: 'Loan Calculator',
      href: '/loan-calculator',
      description: 'Calculate loan payments and schedules',
    },
    {
      name: 'Retirement Calculator',
      href: '/retirement-calculator',
      description: 'Plan for retirement savings',
    },
    {
      name: 'Investment Calculator',
      href: '/investment-calculator',
      description: 'Calculate investment returns',
    },
  ];
  const compoundingOptions = [
    { value: '1', label: 'Annually (1x per year)' },
    { value: '2', label: 'Semi-annually (2x per year)' },
    { value: '4', label: 'Quarterly (4x per year)' },
    { value: '12', label: 'Monthly (12x per year)' },
    { value: '52', label: 'Weekly (52x per year)' },
    { value: '365', label: 'Daily (365x per year)' },
  ];

  return (
    <ToolLayout
        title="Interest Calculator - Compound Interest Calculator"
        description="Free compound interest calculator to calculate investment growth over time. Calculate returns with regular contributions and different compounding frequencies."
        slug="interest-calculator"
        keywords={['interest calculator', 'compound interest', 'investment calculator', 'savings calculator', 'compound growth']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Interest Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate compound interest and investment growth over time. See how your money grows with 
              different interest rates, time periods, and regular contributions.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField 
                  label="Initial Investment ($)" 
                  required
                  error={errors.principal}
                  description="Starting amount to invest"
                >
                  <Input
                    type="number"
                    step="100"
                    {...register('principal', { valueAsNumber: true })}
                    error={!!errors.principal}
                    placeholder="10,000"
                  />
                </FormField>

                <FormField 
                  label="Annual Interest Rate (%)" 
                  required
                  error={errors.annualRate}
                  description="Expected annual return rate"
                >
                  <Input
                    type="number"
                    step="0.1"
                    {...register('annualRate', { valueAsNumber: true })}
                    error={!!errors.annualRate}
                    placeholder="5.0"
                  />
                </FormField>

                <FormField 
                  label="Time Period (years)" 
                  required
                  error={errors.years}
                  description="Investment duration"
                >
                  <Input
                    type="number"
                    step="0.5"
                    {...register('years', { valueAsNumber: true })}
                    error={!!errors.years}
                    placeholder="10"
                  />
                </FormField>

                <FormField 
                  label="Compounding Frequency" 
                  required
                  error={errors.compoundingFrequency}
                  description="How often interest compounds"
                >
                  <Select
                    {...register('compoundingFrequency', { valueAsNumber: true })}
                    error={!!errors.compoundingFrequency}
                    options={compoundingOptions}
                  />
                </FormField>

                <FormField 
                  label="Monthly Contribution ($)" 
                  error={errors.monthlyContribution}
                  description="Additional monthly investment (optional)"
                >
                  <Input
                    type="number"
                    step="10"
                    {...register('monthlyContribution', { valueAsNumber: true })}
                    error={!!errors.monthlyContribution}
                    placeholder="0"
                  />
                </FormField>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Calculate Interest
              </Button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <ResultBlock
                title="Investment Growth Summary"
                type="success"
                results={[
                  {
                    label: 'Final Amount',
                    value: `$${result.finalAmount.toLocaleString()}`,
                    description: 'Total value after compound growth',
                  },
                  {
                    label: 'Total Interest Earned',
                    value: `$${result.totalInterest.toLocaleString()}`,
                    description: 'Interest earned over the period',
                  },
                ]}
              >
                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    variant="outline"
                    size="sm"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Year-by-Year Breakdown
                  </Button>
                </div>
              </ResultBlock>

              {/* Year-by-Year Breakdown */}
              {showBreakdown && (
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-by-Year Growth</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Starting Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Interest Earned
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ending Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {result.yearlyBreakdown.map((year) => (
                          <tr key={year.year}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {year.year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${year.startingAmount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              ${year.interestEarned.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${year.endingAmount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Compound Interest</h2>
            <p className="text-gray-600 mb-4">
              Compound interest is the addition of interest to the principal sum of a loan or deposit. 
              It's "interest on interest" and can significantly accelerate wealth building over time.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">The Power of Compounding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Time Factor</h4>
                <p className="text-blue-700">The longer you invest, the more powerful compounding becomes</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Rate Impact</h4>
                <p className="text-green-700">Small differences in interest rates compound to large differences over time</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Frequency Matters</h4>
                <p className="text-yellow-700">More frequent compounding leads to higher returns</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">Regular Contributions</h4>
                <p className="text-purple-700">Consistent investing amplifies the compounding effect</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Compounding Frequency</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                <strong>Annual:</strong> Interest calculated once per year
              </p>
              <p className="text-gray-600">
                <strong>Monthly:</strong> Interest calculated 12 times per year (common for savings accounts)
              </p>
              <p className="text-gray-600">
                <strong>Daily:</strong> Interest calculated 365 times per year (highest compound effect)
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Investment Examples</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Savings Accounts:</strong> Typically 0.5-2% annual interest, compounded daily
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Stock Market:</strong> Historical average ~10% annual return (with volatility)
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Bonds:</strong> Typically 2-6% annual return, depending on type and duration
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">What's the difference between simple and compound interest?</h4>
                <p className="text-gray-600">
                  Simple interest is calculated only on the principal amount. Compound interest is calculated 
                  on the principal plus any previously earned interest, leading to exponential growth.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">How often should interest compound for maximum benefit?</h4>
                <p className="text-gray-600">
                  Daily compounding provides the maximum benefit, but the difference between daily and monthly 
                  compounding is usually small. The key is to start investing early and consistently.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Should I make regular contributions?</h4>
                <p className="text-gray-600">
                  Yes, regular contributions (dollar-cost averaging) can significantly boost your returns 
                  and help smooth out market volatility over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default InterestCalculator;
