'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import Loading from '@/components/ui/Loading';
import { calculateBMI, BMIResult } from '@/utils/calculations/health';
import { Download, Share2, Calculator } from 'lucide-react';

const bmiSchema = z.object({
  weight: z.number().min(1, 'Weight must be greater than 0').max(1000, 'Weight must be less than 1000'),
  height: z.number().min(1, 'Height must be greater than 0').max(300, 'Height must be less than 300'),
  unit: z.enum(['metric', 'imperial']),
});

type BMIFormData = z.infer<typeof bmiSchema>;

const BMICalculator = () => {
  const [result, setResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [history, setHistory] = useState<(BMIResult & { date: string })[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BMIFormData>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      weight: 70,
      height: 170,
      unit: 'metric',
    },
  });

  const unit = watch('unit');

  const onSubmit = async (data: BMIFormData) => {
    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const bmiResult = calculateBMI(data.weight, data.height, data.unit);
    setResult(bmiResult);

    // Add to history
    const historyEntry = {
      ...bmiResult,
      date: new Date().toLocaleDateString(),
    };
    setHistory(prev => [historyEntry, ...prev.slice(0, 4)]); // Keep last 5 entries

    setIsCalculating(false);
  };

  const downloadResults = () => {
    if (!result) return;

    const data = {
      bmi: result.bmi,
      category: result.category,
      healthyWeightRange: result.healthyWeightRange,
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bmi-results-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    if (!result) return;

    const shareData = {
      title: 'BMI Calculator Results',
      text: `My BMI is ${result.bmi} (${result.category}). Calculated using ToolBank BMI Calculator.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Results copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const relatedTools = [
    {
      name: 'Calorie Calculator',
      href: '/calorie-calculator',
      description: 'Calculate your daily calorie needs based on your goals',
    },
    {
      name: 'Water Intake Calculator',
      href: '/water-intake-calculator',
      description: 'Calculate how much water you should drink daily',
    },
    {
      name: 'TDEE Calculator',
      href: '/tdee-calculator',
      description: 'Calculate your Total Daily Energy Expenditure',
    },
  ];

  return (
    <ToolLayout
        title="BMI Calculator - Body Mass Index & Ideal Weight Calculator"
        description="Free BMI calculator to check if you're underweight, normal, overweight or obese. Calculate Body Mass Index, ideal weight range & health category with metric/imperial units."
        slug="bmi-calculator"
        keywords={['BMI calculator', 'body mass index calculator', 'ideal weight calculator', 'healthy weight range', 'BMI chart', 'weight category', 'obesity calculator']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">BMI Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate your Body Mass Index (BMI) to determine if you are underweight, normal weight, 
              overweight, or obese. BMI is a useful measure of overweight and obesity.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="Unit System" required>
                  <Select
                    {...register('unit')}
                    error={!!errors.unit}
                    options={[
                      { value: 'metric', label: 'Metric (kg, cm)' },
                      { value: 'imperial', label: 'Imperial (lbs, inches)' },
                    ]}
                  />
                </FormField>

                <FormField 
                  label={`Weight ${unit === 'metric' ? '(kg)' : '(lbs)'}`} 
                  required
                  error={errors.weight}
                >
                  <Input
                    type="number"
                    step="0.1"
                    {...register('weight', { valueAsNumber: true })}
                    error={!!errors.weight}
                    placeholder={unit === 'metric' ? '70' : '154'}
                  />
                </FormField>

                <FormField 
                  label={`Height ${unit === 'metric' ? '(cm)' : '(inches)'}`} 
                  required
                  error={errors.height}
                >
                  <Input
                    type="number"
                    step="0.1"
                    {...register('height', { valueAsNumber: true })}
                    error={!!errors.height}
                    placeholder={unit === 'metric' ? '170' : '67'}
                  />
                </FormField>
              </div>

              <Button type="submit" size="lg" disabled={isCalculating} className="w-full md:w-auto">
                {isCalculating ? <Loading size="sm" text="Calculating..." /> : 'Calculate BMI'}
              </Button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <ResultBlock
              title="Your BMI Results"
              type={result.bmi < 18.5 ? 'warning' : result.bmi < 25 ? 'success' : 'warning'}
              results={[
                {
                  label: 'BMI',
                  value: result.bmi,
                  description: `Category: ${result.category}`,
                },
                {
                  label: 'Healthy Weight Range',
                  value: `${result.healthyWeightRange.min} - ${result.healthyWeightRange.max}`,
                  unit: unit === 'metric' ? 'kg' : 'lbs',
                  description: 'Recommended weight range for your height',
                },
              ]}
            >
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-medium text-gray-900 mb-2">Interpretation</h4>
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={downloadResults}
                  className="flex items-center space-x-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Results</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={shareResults}
                  className="flex items-center space-x-1"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share Results</span>
                </Button>
              </div>
            </ResultBlock>
          )}

          {/* Calculation History */}
          {history.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calculations</h3>
              <div className="space-y-3">
                {history.map((entry, index) => (
                  <div key={index} className="bg-white rounded p-3 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-900">BMI: {entry.bmi}</span>
                      <span className="text-sm text-gray-600 ml-2">({entry.category})</span>
                    </div>
                    <span className="text-xs text-gray-500">{entry.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About BMI Calculator</h2>
            <p className="text-gray-600 mb-4">
              Body Mass Index (BMI) is a person's weight in kilograms divided by the square of height in meters. 
              BMI is an inexpensive and easy screening method for weight category—underweight, healthy weight, 
              overweight, and obesity.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">BMI Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Underweight</h4>
                <p className="text-blue-700">BMI less than 18.5</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Normal weight</h4>
                <p className="text-green-700">BMI 18.5-24.9</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Overweight</h4>
                <p className="text-yellow-700">BMI 25-29.9</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-red-900">Obese</h4>
                <p className="text-red-700">BMI 30 or greater</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Is BMI accurate for everyone?</h4>
                <p className="text-gray-600">
                  BMI is a useful screening tool, but it doesn't directly measure body fat. Athletes with high muscle mass 
                  may have a high BMI but low body fat. Consult with a healthcare provider for a complete health assessment.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">How often should I check my BMI?</h4>
                <p className="text-gray-600">
                  You can check your BMI whenever your weight changes significantly. For general health monitoring, 
                  checking monthly or quarterly is sufficient unless advised otherwise by your healthcare provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default BMICalculator;
