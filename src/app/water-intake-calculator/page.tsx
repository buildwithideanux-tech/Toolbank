'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import { calculateWaterIntake } from '@/utils/calculations/health';

const waterSchema = z.object({
  weight: z.number().min(1, 'Weight must be greater than 0').max(1000, 'Weight must be less than 1000'),
  activityLevel: z.enum(['low', 'moderate', 'high']),
  climate: z.enum(['normal', 'hot', 'humid']),
  unit: z.enum(['metric', 'imperial']),
});

type WaterFormData = z.infer<typeof waterSchema>;

const WaterIntakeCalculator = () => {
  const [result, setResult] = useState<{ liters: number; cups: number; ounces: number } | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WaterFormData>({
    resolver: zodResolver(waterSchema),
    defaultValues: {
      weight: 70,
      activityLevel: 'moderate',
      climate: 'normal',
      unit: 'metric',
    },
  });

  const unit = watch('unit');

  const onSubmit = (data: WaterFormData) => {
    const waterResult = calculateWaterIntake(
      data.weight,
      data.activityLevel,
      data.climate,
      data.unit
    );
    setResult(waterResult);
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
      name: 'TDEE Calculator',
      href: '/tdee-calculator',
      description: 'Calculate your Total Daily Energy Expenditure',
    },
  ];
  const activityOptions = [
    { value: 'low', label: 'Low (minimal exercise)' },
    { value: 'moderate', label: 'Moderate (regular exercise)' },
    { value: 'high', label: 'High (intense exercise/training)' },
  ];

  const climateOptions = [
    { value: 'normal', label: 'Normal (temperate climate)' },
    { value: 'hot', label: 'Hot (high temperature)' },
    { value: 'humid', label: 'Humid (high humidity)' },
  ];

  return (
    <ToolLayout
        title="Water Intake Calculator - Daily Water Needs Calculator"
        description="Free water intake calculator to determine how much water you should drink daily based on your weight, activity level, and climate conditions."
        slug="water-intake-calculator"
        keywords={['water intake calculator', 'daily water needs', 'hydration calculator', 'water consumption', 'how much water']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Water Intake Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate how much water you should drink daily based on your body weight, activity level, 
              and environmental conditions. Stay properly hydrated for optimal health.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField label="Unit System" required>
                  <Select
                    {...register('unit')}
                    error={!!errors.unit}
                    options={[
                      { value: 'metric', label: 'Metric (kg)' },
                      { value: 'imperial', label: 'Imperial (lbs)' },
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

                <FormField label="Activity Level" required error={errors.activityLevel}>
                  <Select
                    {...register('activityLevel')}
                    error={!!errors.activityLevel}
                    options={activityOptions}
                  />
                </FormField>

                <FormField label="Climate" required error={errors.climate}>
                  <Select
                    {...register('climate')}
                    error={!!errors.climate}
                    options={climateOptions}
                  />
                </FormField>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Calculate Water Intake
              </Button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <ResultBlock
              title="Your Daily Water Intake"
              type="info"
              results={[
                {
                  label: 'Liters per day',
                  value: result.liters,
                  unit: 'L',
                  description: 'Recommended daily water intake',
                },
                {
                  label: 'Cups per day',
                  value: result.cups,
                  unit: 'cups',
                  description: '8 fl oz cups (240ml each)',
                },
                {
                  label: 'Fluid ounces per day',
                  value: result.ounces,
                  unit: 'fl oz',
                  description: 'US fluid ounces',
                },
              ]}
            >
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-medium text-gray-900 mb-2">Hydration Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Drink water throughout the day, not all at once</li>
                  <li>• Increase intake during exercise or hot weather</li>
                  <li>• Monitor urine color - pale yellow indicates good hydration</li>
                  <li>• Include water-rich foods like fruits and vegetables</li>
                </ul>
              </div>
            </ResultBlock>
          )}

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Water Intake</h2>
            <p className="text-gray-600 mb-4">
              Proper hydration is essential for optimal body function. Water helps regulate body temperature, 
              transport nutrients, remove waste, and maintain healthy skin. Your water needs depend on various 
              factors including body weight, activity level, and environmental conditions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors Affecting Water Needs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Body Weight</h4>
                <p className="text-blue-700">Larger bodies need more water for proper function</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Activity Level</h4>
                <p className="text-green-700">Exercise increases water loss through sweat</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Climate</h4>
                <p className="text-yellow-700">Hot and humid conditions increase water needs</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Signs of Dehydration</h3>
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <ul className="text-red-700 space-y-1">
                <li>• Dark yellow urine</li>
                <li>• Feeling thirsty or dry mouth</li>
                <li>• Fatigue or dizziness</li>
                <li>• Headache</li>
                <li>• Decreased urination</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Can I drink too much water?</h4>
                <p className="text-gray-600">
                  Yes, drinking excessive amounts of water can lead to water intoxication or hyponatremia. 
                  Stick to recommended amounts and listen to your body's thirst signals.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Do other beverages count toward water intake?</h4>
                <p className="text-gray-600">
                  Yes, all fluids contribute to hydration, but water is the best choice. Limit caffeinated 
                  and alcoholic beverages as they can have mild diuretic effects.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Should I drink more water when sick?</h4>
                <p className="text-gray-600">
                  Yes, fever, vomiting, and diarrhea increase fluid loss. Increase water intake when ill 
                  and consult a healthcare provider if symptoms persist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default WaterIntakeCalculator;
