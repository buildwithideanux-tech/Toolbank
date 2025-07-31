'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { calculateCalories, CalorieResult } from '@/utils/calculations/health';

const tdeeSchema = z.object({
  weight: z.number().min(1, 'Weight must be greater than 0').max(1000, 'Weight must be less than 1000'),
  height: z.number().min(1, 'Height must be greater than 0').max(300, 'Height must be less than 300'),
  age: z.number().min(1, 'Age must be greater than 0').max(120, 'Age must be less than 120'),
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  unit: z.enum(['metric', 'imperial']),
});

type TDEEFormData = z.infer<typeof tdeeSchema>;

const TDEECalculator = () => {
  const [result, setResult] = useState<CalorieResult | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TDEEFormData>({
    resolver: zodResolver(tdeeSchema),
    defaultValues: {
      weight: 70,
      height: 170,
      age: 30,
      gender: 'male',
      activityLevel: 'moderate',
      unit: 'metric',
    },
  });

  const unit = watch('unit');

  const onSubmit = (data: TDEEFormData) => {
    const tdeeResult = calculateCalories(
      data.weight,
      data.height,
      data.age,
      data.gender,
      data.activityLevel,
      data.unit
    );
    setResult(tdeeResult);
  };

  const relatedTools = [
    {
      name: 'BMI Calculator',
      href: '/bmi-calculator',
      description: 'Calculate your Body Mass Index',
    },
    {
      name: 'Calorie Calculator',
      href: '/calorie-calculator',
      description: 'Calculate your daily calorie needs',
    },
    {
      name: 'BMR Calculator',
      href: '/bmr-calculator',
      description: 'Calculate your Basal Metabolic Rate',
    },
  ];
  const activityOptions = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
    { value: 'light', label: 'Light (light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (moderate exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
    { value: 'very_active', label: 'Very Active (very hard exercise, physical job)' },
  ];

  return (
    <ToolLayout
        title="TDEE Calculator - Total Daily Energy Expenditure Calculator"
        description="Free TDEE calculator to determine your total daily energy expenditure based on your BMR and activity level. Essential for weight management and fitness goals."
        slug="tdee-calculator"
        keywords={['TDEE calculator', 'total daily energy expenditure', 'BMR calculator', 'metabolism calculator', 'daily calories']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">TDEE Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate your Total Daily Energy Expenditure (TDEE) - the total number of calories you burn per day. 
              TDEE combines your Basal Metabolic Rate (BMR) with your activity level to determine your daily calorie needs.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <FormField label="Gender" required error={errors.gender}>
                  <Select
                    {...register('gender')}
                    error={!!errors.gender}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                    ]}
                  />
                </FormField>

                <FormField label="Age (years)" required error={errors.age}>
                  <Input
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                    error={!!errors.age}
                    placeholder="30"
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

                <FormField label="Activity Level" required error={errors.activityLevel}>
                  <Select
                    {...register('activityLevel')}
                    error={!!errors.activityLevel}
                    options={activityOptions}
                  />
                </FormField>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Calculate TDEE
              </Button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <ResultBlock
                title="Your TDEE Results"
                type="info"
                results={[
                  {
                    label: 'BMR (Basal Metabolic Rate)',
                    value: result.bmr,
                    unit: 'calories/day',
                    description: 'Calories burned at complete rest',
                  },
                  {
                    label: 'TDEE (Total Daily Energy Expenditure)',
                    value: result.tdee,
                    unit: 'calories/day',
                    description: 'Total calories burned including activity',
                  },
                ]}
              >
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-medium text-gray-900 mb-2">What This Means</h4>
                  <p className="text-sm text-gray-600">
                    Your TDEE of {result.tdee} calories represents the total energy you expend in a typical day. 
                    This includes your BMR plus calories burned through physical activity and digestion.
                  </p>
                </div>
              </ResultBlock>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultBlock
                  title="For Weight Loss"
                  type="warning"
                  results={[
                    {
                      label: 'Mild Deficit (0.5 lbs/week)',
                      value: result.weightLoss.mild,
                      unit: 'calories/day',
                      description: '250 calorie deficit',
                    },
                    {
                      label: 'Moderate Deficit (1 lb/week)',
                      value: result.weightLoss.moderate,
                      unit: 'calories/day',
                      description: '500 calorie deficit',
                    },
                    {
                      label: 'Aggressive Deficit (1.5 lbs/week)',
                      value: result.weightLoss.aggressive,
                      unit: 'calories/day',
                      description: '750 calorie deficit',
                    },
                  ]}
                />

                <ResultBlock
                  title="For Weight Gain"
                  type="success"
                  results={[
                    {
                      label: 'Mild Surplus (0.5 lbs/week)',
                      value: result.weightGain.mild,
                      unit: 'calories/day',
                      description: '250 calorie surplus',
                    },
                    {
                      label: 'Moderate Surplus (1 lb/week)',
                      value: result.weightGain.moderate,
                      unit: 'calories/day',
                      description: '500 calorie surplus',
                    },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding TDEE</h2>
            <p className="text-gray-600 mb-4">
              Total Daily Energy Expenditure (TDEE) is the total number of calories you burn in a day. 
              It's calculated by multiplying your Basal Metabolic Rate (BMR) by an activity factor that 
              represents your daily activity level.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">TDEE Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">BMR (60-75%)</h4>
                <p className="text-blue-700">Energy needed for basic bodily functions</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Physical Activity (15-30%)</h4>
                <p className="text-green-700">Exercise and planned physical activities</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">TEF (8-15%)</h4>
                <p className="text-yellow-700">Thermic Effect of Food (digestion)</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">NEAT (15-30%)</h4>
                <p className="text-purple-700">Non-Exercise Activity Thermogenesis</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Activity Level Guide</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Sedentary (1.2):</strong> Desk job, little to no exercise
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Light (1.375):</strong> Light exercise 1-3 days per week
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Moderate (1.55):</strong> Moderate exercise 3-5 days per week
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Active (1.725):</strong> Hard exercise 6-7 days per week
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Very Active (1.9):</strong> Very hard exercise, physical job
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">How accurate is TDEE calculation?</h4>
                <p className="text-gray-600">
                  TDEE calculations provide estimates that are accurate for most people within ±10-15%. 
                  Individual variations in metabolism, genetics, and activity can affect actual values.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Should I eat exactly my TDEE calories?</h4>
                <p className="text-gray-600">
                  Eating at your TDEE should maintain your current weight. Eat below TDEE for weight loss, 
                  above for weight gain. Adjust based on your goals and results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default TDEECalculator;
