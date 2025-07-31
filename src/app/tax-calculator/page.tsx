'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { calculateTax, TaxResult } from '@/utils/calculations/finance';

const taxSchema = z.object({
  grossIncome: z.number().min(0, 'Income cannot be negative').max(10000000, 'Income too high'),
  deductions: z.number().min(0, 'Deductions cannot be negative').max(1000000, 'Deductions too high'),
  filingStatus: z.enum(['single', 'married_joint', 'married_separate', 'head_of_household']),
});

type TaxFormData = z.infer<typeof taxSchema>;

const TaxCalculator = () => {
  const [result, setResult] = useState<TaxResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxFormData>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      grossIncome: 75000,
      deductions: 13850, // 2024 standard deduction for single filers
      filingStatus: 'single',
    },
  });

  const onSubmit = (data: TaxFormData) => {
    const taxResult = calculateTax(data.grossIncome, data.deductions, data.filingStatus);
    setResult(taxResult);
    setShowBreakdown(false);
  };

  const relatedTools = [
    {
      name: 'Loan Calculator',
      href: '/loan-calculator',
      description: 'Calculate loan payments and interest',
    },
    {
      name: 'Interest Calculator',
      href: '/interest-calculator',
      description: 'Calculate compound interest and investment growth',
    },
    {
      name: 'Retirement Calculator',
      href: '/retirement-calculator',
      description: 'Plan for retirement savings',
    },
  ];
  const filingStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married_joint', label: 'Married Filing Jointly' },
    { value: 'married_separate', label: 'Married Filing Separately' },
    { value: 'head_of_household', label: 'Head of Household' },
  ];

  return (
    <ToolLayout
        title="Tax Calculator - Income Tax Calculator 2024"
        description="Free income tax calculator for 2024 tax year. Calculate federal income tax, effective tax rate, and marginal tax rate based on your income and filing status."
        slug="tax-calculator"
        keywords={['tax calculator', 'income tax', 'tax rate calculator', '2024 tax calculator', 'federal tax']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tax Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate your federal income tax for the 2024 tax year. Get estimates for your tax liability, 
              effective tax rate, and marginal tax rate based on current tax brackets.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField 
                  label="Annual Gross Income ($)" 
                  required
                  error={errors.grossIncome}
                  description="Total income before taxes"
                >
                  <Input
                    type="number"
                    step="1000"
                    {...register('grossIncome', { valueAsNumber: true })}
                    error={!!errors.grossIncome}
                    placeholder="75,000"
                  />
                </FormField>

                <FormField 
                  label="Deductions ($)" 
                  required
                  error={errors.deductions}
                  description="Standard or itemized deductions"
                >
                  <Input
                    type="number"
                    step="100"
                    {...register('deductions', { valueAsNumber: true })}
                    error={!!errors.deductions}
                    placeholder="13,850"
                  />
                </FormField>

                <FormField 
                  label="Filing Status" 
                  required
                  error={errors.filingStatus}
                  description="Your tax filing status"
                >
                  <Select
                    {...register('filingStatus')}
                    error={!!errors.filingStatus}
                    options={filingStatusOptions}
                  />
                </FormField>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Calculate Tax
              </Button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <ResultBlock
                title="Tax Calculation Results"
                type="info"
                results={[
                  {
                    label: 'Gross Income',
                    value: `$${result.grossIncome.toLocaleString()}`,
                    description: 'Total income before deductions',
                  },
                  {
                    label: 'Taxable Income',
                    value: `$${result.taxableIncome.toLocaleString()}`,
                    description: 'Income after deductions',
                  },
                  {
                    label: 'Federal Tax Owed',
                    value: `$${result.totalTax.toLocaleString()}`,
                    description: 'Total federal income tax',
                  },
                  {
                    label: 'Net Income',
                    value: `$${result.netIncome.toLocaleString()}`,
                    description: 'Income after federal taxes',
                  },
                ]}
              >
                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    variant="outline"
                    size="sm"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Tax Bracket Breakdown
                  </Button>
                </div>
              </ResultBlock>

              {/* Tax Rates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultBlock
                  title="Tax Rates"
                  type="success"
                  results={[
                    {
                      label: 'Effective Tax Rate',
                      value: `${result.effectiveRate}%`,
                      description: 'Average tax rate on total income',
                    },
                    {
                      label: 'Marginal Tax Rate',
                      value: `${result.marginalRate}%`,
                      description: 'Tax rate on next dollar earned',
                    },
                  ]}
                />

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Tax Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Gross Income:</span>
                      <span className="font-medium text-blue-900">${result.grossIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Less: Deductions:</span>
                      <span className="font-medium text-blue-900">-${(result.grossIncome - result.taxableIncome).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 pt-2">
                      <span className="text-blue-700">Taxable Income:</span>
                      <span className="font-medium text-blue-900">${result.taxableIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Federal Tax:</span>
                      <span className="font-medium text-blue-900">-${result.totalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 pt-2 font-semibold">
                      <span className="text-blue-900">Net Income:</span>
                      <span className="text-blue-900">${result.netIncome.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Bracket Breakdown */}
              {showBreakdown && (
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Bracket Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tax Bracket
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tax Rate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Taxable Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tax Owed
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {result.taxBreakdown.map((bracket, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {bracket.bracket}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {(bracket.rate * 100).toFixed(0)}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${bracket.taxableAmount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${bracket.tax.toLocaleString()}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Federal Income Tax</h2>
            <p className="text-gray-600 mb-4">
              The U.S. federal income tax system uses progressive tax brackets, meaning higher income levels 
              are taxed at higher rates. This calculator uses the 2024 tax brackets for single filers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2024 Tax Brackets (Single Filers)</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left">Tax Rate</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Income Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-200 px-4 py-2">10%</td><td className="border border-gray-200 px-4 py-2">$0 - $11,000</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2">12%</td><td className="border border-gray-200 px-4 py-2">$11,001 - $44,725</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2">22%</td><td className="border border-gray-200 px-4 py-2">$44,726 - $95,375</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2">24%</td><td className="border border-gray-200 px-4 py-2">$95,376 - $182,050</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2">32%</td><td className="border border-gray-200 px-4 py-2">$182,051 - $231,250</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2">35%</td><td className="border border-gray-200 px-4 py-2">$231,251 - $578,125</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2">37%</td><td className="border border-gray-200 px-4 py-2">$578,126+</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Tax Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Effective Tax Rate</h4>
                <p className="text-blue-700">Your average tax rate across all income</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Marginal Tax Rate</h4>
                <p className="text-green-700">Tax rate on your last dollar of income</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Standard Deduction</h4>
                <p className="text-yellow-700">Fixed amount you can deduct from income</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">Taxable Income</h4>
                <p className="text-purple-700">Income subject to tax after deductions</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2024 Standard Deductions</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600"><strong>Single:</strong> $13,850</p>
              <p className="text-gray-600"><strong>Married Filing Jointly:</strong> $27,700</p>
              <p className="text-gray-600"><strong>Married Filing Separately:</strong> $13,850</p>
              <p className="text-gray-600"><strong>Head of Household:</strong> $20,800</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Is this calculator accurate for my tax situation?</h4>
                <p className="text-gray-600">
                  This calculator provides estimates for federal income tax only. It doesn't include state taxes, 
                  FICA taxes, or other deductions. Consult a tax professional for comprehensive tax planning.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Should I take the standard deduction or itemize?</h4>
                <p className="text-gray-600">
                  Take the standard deduction if it's higher than your itemized deductions. Common itemized 
                  deductions include mortgage interest, state/local taxes, and charitable contributions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What's the difference between gross and taxable income?</h4>
                <p className="text-gray-600">
                  Gross income is your total income before any deductions. Taxable income is what remains 
                  after subtracting deductions and is what your tax is calculated on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default TaxCalculator;
