'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { calculateLoan, LoanResult } from '@/utils/calculations/finance';

const loanSchema = z.object({
  principal: z.number().min(1, 'Loan amount must be greater than 0').max(10000000, 'Loan amount too large'),
  annualRate: z.number().min(0.01, 'Interest rate must be greater than 0').max(50, 'Interest rate too high'),
  termYears: z.number().min(0.1, 'Term must be greater than 0').max(50, 'Term too long'),
});

type LoanFormData = z.infer<typeof loanSchema>;

const LoanCalculator = () => {
  const [result, setResult] = useState<LoanResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      principal: 250000,
      annualRate: 4.5,
      termYears: 30,
    },
  });

  const onSubmit = (data: LoanFormData) => {
    const loanResult = calculateLoan(data.principal, data.annualRate, data.termYears);
    setResult(loanResult);
    setShowSchedule(false);
  };

  const relatedTools = [
    {
      name: 'Interest Calculator',
      href: '/interest-calculator',
      description: 'Calculate compound interest on investments',
    },
    {
      name: 'Mortgage Calculator',
      href: '/mortgage-calculator',
      description: 'Calculate mortgage payments with taxes and insurance',
    },
    {
      name: 'Tax Calculator',
      href: '/tax-calculator',
      description: 'Calculate your income tax',
    },
  ];
  return (
    <ToolLayout
        title="Loan Calculator - Mortgage, Auto & Personal Loan Calculator"
        description="Free loan calculator for monthly payments, total interest & amortization schedule. Calculate mortgage, auto, personal & student loan payments with detailed payment breakdown."
        slug="loan-calculator"
        keywords={['loan calculator', 'mortgage calculator', 'auto loan calculator', 'personal loan calculator', 'monthly payment calculator', 'amortization calculator', 'loan payment schedule']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loan Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate monthly loan payments, total interest, and view detailed payment schedules. 
              Perfect for mortgages, auto loans, personal loans, and any fixed-rate loan.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField 
                  label="Loan Amount ($)" 
                  required
                  error={errors.principal}
                  description="Total amount you want to borrow"
                >
                  <Input
                    type="number"
                    step="1000"
                    {...register('principal', { valueAsNumber: true })}
                    error={!!errors.principal}
                    placeholder="250,000"
                  />
                </FormField>

                <FormField 
                  label="Annual Interest Rate (%)" 
                  required
                  error={errors.annualRate}
                  description="Annual percentage rate (APR)"
                >
                  <Input
                    type="number"
                    step="0.01"
                    {...register('annualRate', { valueAsNumber: true })}
                    error={!!errors.annualRate}
                    placeholder="4.5"
                  />
                </FormField>

                <FormField 
                  label="Loan Term (years)" 
                  required
                  error={errors.termYears}
                  description="Length of the loan in years"
                >
                  <Input
                    type="number"
                    step="0.5"
                    {...register('termYears', { valueAsNumber: true })}
                    error={!!errors.termYears}
                    placeholder="30"
                  />
                </FormField>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Calculate Loan Payment
              </Button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <ResultBlock
                title="Loan Payment Summary"
                type="info"
                results={[
                  {
                    label: 'Monthly Payment',
                    value: `$${result.monthlyPayment.toLocaleString()}`,
                    description: 'Principal + Interest payment',
                  },
                  {
                    label: 'Total Payment',
                    value: `$${result.totalPayment.toLocaleString()}`,
                    description: 'Total amount paid over loan term',
                  },
                  {
                    label: 'Total Interest',
                    value: `$${result.totalInterest.toLocaleString()}`,
                    description: 'Total interest paid over loan term',
                  },
                ]}
              >
                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowSchedule(!showSchedule)}
                    variant="outline"
                    size="sm"
                  >
                    {showSchedule ? 'Hide' : 'Show'} Payment Schedule
                  </Button>
                </div>
              </ResultBlock>

              {/* Payment Schedule */}
              {showSchedule && (
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Schedule</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment #
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Principal
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Interest
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {result.paymentSchedule.slice(0, 12).map((payment) => (
                          <tr key={payment.month}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {payment.month}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${payment.payment.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${payment.principal.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${payment.interest.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${payment.balance.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {result.paymentSchedule.length > 12 && (
                    <p className="text-sm text-gray-500 mt-4">
                      Showing first 12 payments of {result.paymentSchedule.length} total payments
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Loan Calculations</h2>
            <p className="text-gray-600 mb-4">
              This loan calculator uses the standard amortization formula to calculate monthly payments 
              for fixed-rate loans. The calculation assumes equal monthly payments over the entire loan term.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How Loan Payments Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Principal</h4>
                <p className="text-blue-700">The amount you borrow that goes toward paying down the loan balance</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Interest</h4>
                <p className="text-green-700">The cost of borrowing money, calculated as a percentage of the remaining balance</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Loan Types</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Mortgage Loans:</strong> Typically 15-30 year terms with lower interest rates
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Auto Loans:</strong> Usually 3-7 year terms with moderate interest rates
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Personal Loans:</strong> Often 2-7 year terms with higher interest rates
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">What factors affect my loan payment?</h4>
                <p className="text-gray-600">
                  Three main factors determine your payment: loan amount (principal), interest rate, and loan term. 
                  Higher amounts and rates increase payments, while longer terms decrease monthly payments but increase total interest.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Should I choose a shorter or longer loan term?</h4>
                <p className="text-gray-600">
                  Shorter terms mean higher monthly payments but less total interest paid. Longer terms mean lower monthly 
                  payments but more total interest. Choose based on your budget and financial goals.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Can I pay off my loan early?</h4>
                <p className="text-gray-600">
                  Most loans allow early payoff, which can save significant interest. Check for prepayment penalties 
                  and consider the opportunity cost of using extra funds for loan payments versus other investments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default LoanCalculator;
