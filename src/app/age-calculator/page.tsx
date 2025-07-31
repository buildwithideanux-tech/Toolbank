'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';

const ageSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required'),
  targetDate: z.string().optional(),
});

type AgeFormData = z.infer<typeof ageSchema>;

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    date: string;
    daysUntil: number;
  };
  zodiacSign: string;
  birthDayOfWeek: string;
}

const AgeCalculator = () => {
  const [result, setResult] = useState<AgeResult | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgeFormData>({
    resolver: zodResolver(ageSchema),
    defaultValues: {
      birthDate: '',
      targetDate: new Date().toISOString().split('T')[0],
    },
  });

  const calculateAge = (birthDate: Date, targetDate: Date): AgeResult => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    // Calculate exact age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate totals
    const timeDiff = target.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // Get zodiac sign
    const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());

    // Get day of week for birth
    const birthDayOfWeek = birth.toLocaleDateString('en-US', { weekday: 'long' });

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: {
        date: nextBirthday.toLocaleDateString(),
        daysUntil: daysUntilBirthday,
      },
      zodiacSign,
      birthDayOfWeek,
    };
  };

  const getZodiacSign = (month: number, day: number): string => {
    const signs = [
      { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
      { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces', start: [2, 19], end: [3, 20] },
      { sign: 'Aries', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer', start: [6, 21], end: [7, 22] },
      { sign: 'Leo', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo', start: [8, 23], end: [9, 22] },
      { sign: 'Libra', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
    ];

    for (const { sign, start, end } of signs) {
      if (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
      ) {
        return sign;
      }
    }
    return 'Capricorn'; // Default fallback
  };

  const onSubmit = (data: AgeFormData) => {
    const birthDate = new Date(data.birthDate);
    const targetDate = data.targetDate ? new Date(data.targetDate) : new Date();
    
    if (birthDate > targetDate) {
      return; // Birth date cannot be in the future
    }

    const ageResult = calculateAge(birthDate, targetDate);
    setResult(ageResult);
  };

  const relatedTools = [
    {
      name: 'Date Calculator',
      href: '/date-calculator',
      description: 'Calculate differences between dates',
    },
    {
      name: 'Days Until Calculator',
      href: '/days-until-calculator',
      description: 'Count days until a specific date',
    },
    {
      name: 'Calendar Generator',
      href: '/calendar-generator',
      description: 'Generate custom calendars',
    },
  ];
  return (
    <ToolLayout
        title="Age Calculator - Calculate Your Exact Age"
        description="Free age calculator to calculate your exact age in years, months, days, hours, minutes, and seconds. Find your zodiac sign and days until next birthday."
        slug="age-calculator"
        keywords={['age calculator', 'calculate age', 'age in days', 'age in hours', 'zodiac sign calculator']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Age Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate your exact age in years, months, days, hours, minutes, and seconds. 
              Discover your zodiac sign and find out when your next birthday is.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                  label="Birth Date" 
                  required
                  error={errors.birthDate}
                  description="Enter your date of birth"
                >
                  <Input
                    type="date"
                    {...register('birthDate')}
                    error={!!errors.birthDate}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </FormField>

                <FormField 
                  label="Calculate Age As Of" 
                  error={errors.targetDate}
                  description="Leave blank for current date"
                >
                  <Input
                    type="date"
                    {...register('targetDate')}
                    error={!!errors.targetDate}
                  />
                </FormField>

                <Button type="submit" size="lg" className="w-full">
                  Calculate Age
                </Button>
              </form>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {result ? (
                <>
                  <ResultBlock
                    title="Your Age"
                    type="success"
                    results={[
                      {
                        label: 'Exact Age',
                        value: `${result.years} years, ${result.months} months, ${result.days} days`,
                        description: 'Your precise age',
                      },
                      {
                        label: 'Total Days',
                        value: result.totalDays.toLocaleString(),
                        description: 'Days you have lived',
                      },
                      {
                        label: 'Total Hours',
                        value: result.totalHours.toLocaleString(),
                        description: 'Hours you have lived',
                      },
                    ]}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">Time Lived</h3>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex justify-between">
                          <span>Weeks:</span>
                          <span>{result.totalWeeks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Months:</span>
                          <span>{result.totalMonths.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Minutes:</span>
                          <span>{result.totalMinutes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Seconds:</span>
                          <span>{result.totalSeconds.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h3 className="font-medium text-purple-900 mb-2">Birth Information</h3>
                      <div className="space-y-2 text-sm text-purple-700">
                        <div className="flex justify-between">
                          <span>Day of Week:</span>
                          <span>{result.birthDayOfWeek}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Zodiac Sign:</span>
                          <span>{result.zodiacSign}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Birthday:</span>
                          <span>{result.nextBirthday.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Days Until:</span>
                          <span>{result.nextBirthday.daysUntil} days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <p className="text-gray-500">Enter your birth date to calculate your age</p>
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Age Calculation</h2>
            <p className="text-gray-600 mb-4">
              Age calculation involves determining the exact time elapsed since birth. This tool provides 
              comprehensive age information including precise years, months, days, and various time units.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Zodiac Signs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {[
                'Aries (Mar 21 - Apr 19)',
                'Taurus (Apr 20 - May 20)',
                'Gemini (May 21 - Jun 20)',
                'Cancer (Jun 21 - Jul 22)',
                'Leo (Jul 23 - Aug 22)',
                'Virgo (Aug 23 - Sep 22)',
                'Libra (Sep 23 - Oct 22)',
                'Scorpio (Oct 23 - Nov 21)',
                'Sagittarius (Nov 22 - Dec 21)',
                'Capricorn (Dec 22 - Jan 19)',
                'Aquarius (Jan 20 - Feb 18)',
                'Pisces (Feb 19 - Mar 20)',
              ].map((sign) => (
                <div key={sign} className="bg-gray-50 p-2 rounded text-xs text-center">
                  {sign}
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Age Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Legal Milestones</h4>
                <ul className="text-green-700 text-sm mt-2 space-y-1">
                  <li>• 16: Driving license (most states)</li>
                  <li>• 18: Voting, military service</li>
                  <li>• 21: Legal drinking age (US)</li>
                  <li>• 25: Car rental without fees</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Life Stages</h4>
                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                  <li>• 0-12: Childhood</li>
                  <li>• 13-19: Teenage years</li>
                  <li>• 20-39: Young adulthood</li>
                  <li>• 40-64: Middle age</li>
                  <li>• 65+: Senior years</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Interesting Age Facts</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-yellow-50 p-3 rounded">
                <strong>Leap Years:</strong> Born on Feb 29? You have a "real" birthday every 4 years!
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <strong>Life Expectancy:</strong> Global average is about 72 years (varies by country)
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <strong>Heart Beats:</strong> Average heart beats about 2.5 billion times in a lifetime
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">How accurate is this age calculator?</h4>
                <p className="text-gray-600">
                  This calculator is very accurate for standard calendar calculations. It accounts for leap years 
                  and varying month lengths to provide precise age calculations.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What if I was born on February 29?</h4>
                <p className="text-gray-600">
                  If you were born on a leap day (Feb 29), the calculator will correctly handle your age calculation. 
                  In non-leap years, your birthday is typically celebrated on Feb 28 or Mar 1.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Can I calculate age for future dates?</h4>
                <p className="text-gray-600">
                  Yes, you can set a future target date to see how old you'll be on that date. This is useful 
                  for planning birthdays or calculating age for specific future events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default AgeCalculator;
