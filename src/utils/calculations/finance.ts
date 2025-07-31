// Financial calculation utilities

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export const calculateLoan = (
  principal: number,
  annualRate: number,
  termYears: number
): LoanResult => {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;

  // Calculate monthly payment using the formula
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  // Generate payment schedule
  const paymentSchedule = [];
  let remainingBalance = principal;

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    paymentSchedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.max(0, Math.round(remainingBalance * 100) / 100)
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    paymentSchedule
  };
};

export interface CompoundInterestResult {
  finalAmount: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    startingAmount: number;
    interestEarned: number;
    endingAmount: number;
  }>;
}

export const calculateCompoundInterest = (
  principal: number,
  annualRate: number,
  compoundingFrequency: number,
  years: number,
  monthlyContribution: number = 0
): CompoundInterestResult => {
  const rate = annualRate / 100;
  const yearlyBreakdown = [];
  let currentAmount = principal;

  for (let year = 1; year <= years; year++) {
    const startingAmount = currentAmount;
    
    // Add monthly contributions throughout the year
    const contributionsThisYear = monthlyContribution * 12;
    
    // Calculate compound interest
    const amountWithContributions = currentAmount + contributionsThisYear;
    const endingAmount = amountWithContributions * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency);
    
    const interestEarned = endingAmount - amountWithContributions;
    
    yearlyBreakdown.push({
      year,
      startingAmount: Math.round(startingAmount * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      endingAmount: Math.round(endingAmount * 100) / 100
    });

    currentAmount = endingAmount;
  }

  const totalContributions = principal + (monthlyContribution * 12 * years);
  const finalAmount = currentAmount;
  const totalInterest = finalAmount - totalContributions;

  return {
    finalAmount: Math.round(finalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    yearlyBreakdown
  };
};

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  marginalRate: number;
  taxBreakdown: Array<{
    bracket: string;
    rate: number;
    taxableAmount: number;
    tax: number;
  }>;
}

// US Federal Tax Brackets for 2024 (single filer)
const TAX_BRACKETS_2024 = [
  { min: 0, max: 11000, rate: 0.10 },
  { min: 11000, max: 44725, rate: 0.12 },
  { min: 44725, max: 95375, rate: 0.22 },
  { min: 95375, max: 182050, rate: 0.24 },
  { min: 182050, max: 231250, rate: 0.32 },
  { min: 231250, max: 578125, rate: 0.35 },
  { min: 578125, max: Infinity, rate: 0.37 }
];

export const calculateTax = (
  grossIncome: number,
  deductions: number = 13850, // Standard deduction for 2024
  filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_of_household' = 'single'
): TaxResult => {
  const taxableIncome = Math.max(0, grossIncome - deductions);
  const taxBreakdown = [];
  let totalTax = 0;
  let marginalRate = 0;

  for (const bracket of TAX_BRACKETS_2024) {
    if (taxableIncome > bracket.min) {
      const taxableInThisBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
      const taxInThisBracket = taxableInThisBracket * bracket.rate;
      
      if (taxableInThisBracket > 0) {
        taxBreakdown.push({
          bracket: `${bracket.rate * 100}%`,
          rate: bracket.rate,
          taxableAmount: Math.round(taxableInThisBracket * 100) / 100,
          tax: Math.round(taxInThisBracket * 100) / 100
        });
        
        totalTax += taxInThisBracket;
        marginalRate = bracket.rate;
      }
    }
  }

  const netIncome = grossIncome - totalTax;
  const effectiveRate = grossIncome > 0 ? totalTax / grossIncome : 0;

  return {
    grossIncome: Math.round(grossIncome * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    totalTax: Math.round(totalTax * 100) / 100,
    netIncome: Math.round(netIncome * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 10000) / 100,
    marginalRate: Math.round(marginalRate * 10000) / 100,
    taxBreakdown
  };
};

export const calculateDiscount = (
  originalPrice: number,
  discountPercent: number
): { discountAmount: number; finalPrice: number; savings: number } => {
  const discountAmount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discountAmount;
  
  return {
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savings: Math.round(discountAmount * 100) / 100
  };
};

export const calculateTip = (
  billAmount: number,
  tipPercent: number,
  numberOfPeople: number = 1
): { tipAmount: number; totalAmount: number; perPerson: number } => {
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / numberOfPeople;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    perPerson: Math.round(perPerson * 100) / 100
  };
};
