'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { calculateCalories, CalorieResult } from '@/utils/calculations/health';

const calorieSchema = z.object({
  weight: z.number().min(1, 'Weight must be greater than 0').max(1000, 'Weight must be less than 1000'),
  height: z.number().min(1, 'Height must be greater than 0').max(300, 'Height must be less than 300'),
  age: z.number().min(1, 'Age must be greater than 0').max(120, 'Age must be less than 120'),
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  unit: z.enum(['metric', 'imperial']),
});

type CalorieFormData = z.infer<typeof calorieSchema>;

const CalorieCalculator = () => {
  const [result, setResult] = useState<CalorieResult | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CalorieFormData>({
    resolver: zodResolver(calorieSchema),
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

  const onSubmit = (data: CalorieFormData) => {
    const calorieResult = calculateCalories(
      data.weight,
      data.height,
      data.age,
      data.gender,
      data.activityLevel,
      data.unit
    );
    setResult(calorieResult);
  };

  const relatedTools = [
    {
      name: 'BMI Calculator',
      href: '/bmi-calculator',
      description: 'Calculate your Body Mass Index',
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

  const activityOptions = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
    { value: 'light', label: 'Light (light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (moderate exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
    { value: 'very_active', label: 'Very Active (very hard exercise, physical job)' },
  ];

  return (
    <ToolLayout
        title="Calorie Calculator - Daily Calorie Needs Calculator"
        description="Free calorie calculator to determine your daily calorie needs for weight loss, maintenance, or weight gain. Calculate BMR and TDEE based on your activity level."
        slug="calorie-calculator"
        keywords={['calorie calculator', 'daily calories', 'BMR calculator', 'TDEE calculator', 'weight loss calories']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Calorie Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate your daily calorie needs based on your age, gender, weight, height, and activity level. 
              Get personalized recommendations for weight loss, maintenance, or weight gain.
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
                Calculate Calories
              </Button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <ResultBlock
                title="Your Daily Calorie Needs"
                type="info"
                results={[
                  {
                    label: 'BMR (Basal Metabolic Rate)',
                    value: result.bmr,
                    unit: 'calories/day',
                    description: 'Calories needed at rest',
                  },
                  {
                    label: 'TDEE (Total Daily Energy Expenditure)',
                    value: result.tdee,
                    unit: 'calories/day',
                    description: 'Calories needed including activity',
                  },
                ]}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultBlock
                  title="Weight Loss Goals"
                  type="warning"
                  results={[
                    {
                      label: 'Mild Weight Loss (0.5 lbs/week)',
                      value: result.weightLoss.mild,
                      unit: 'calories/day',
                    },
                    {
                      label: 'Moderate Weight Loss (1 lb/week)',
                      value: result.weightLoss.moderate,
                      unit: 'calories/day',
                    },
                    {
                      label: 'Aggressive Weight Loss (1.5 lbs/week)',
                      value: result.weightLoss.aggressive,
                      unit: 'calories/day',
                    },
                  ]}
                />

                <ResultBlock
                  title="Weight Gain Goals"
                  type="success"
                  results={[
                    {
                      label: 'Mild Weight Gain (0.5 lbs/week)',
                      value: result.weightGain.mild,
                      unit: 'calories/day',
                    },
                    {
                      label: 'Moderate Weight Gain (1 lb/week)',
                      value: result.weightGain.moderate,
                      unit: 'calories/day',
                    },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Calorie Calculator</h2>
            <p className="text-gray-600 mb-4">
              This calorie calculator uses the Mifflin-St Jeor Equation to calculate your Basal Metabolic Rate (BMR) 
              and then multiplies it by your activity level to determine your Total Daily Energy Expenditure (TDEE).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Understanding Your Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">BMR</h4>
                <p className="text-blue-700">Calories your body needs at complete rest</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">TDEE</h4>
                <p className="text-green-700">Total calories needed including daily activities</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">How accurate is this calorie calculator?</h4>
                <p className="text-gray-600">
                  This calculator provides estimates based on established formulas. Individual metabolism can vary by ±10-15%. 
                  Use these numbers as a starting point and adjust based on your results.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Should I eat exactly these calories?</h4>
                <p className="text-gray-600">
                  These are guidelines. Monitor your weight and energy levels, and adjust your intake accordingly. 
                  Consult with a healthcare provider or nutritionist for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default CalorieCalculator;
