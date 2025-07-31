'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import Loading from '@/components/ui/Loading';
import { ArrowUpDown, Calculator, Ruler } from 'lucide-react';

const unitSchema = z.object({
  value: z.number().min(0, 'Value must be positive'),
  fromUnit: z.string().min(1, 'From unit is required'),
  toUnit: z.string().min(1, 'To unit is required'),
  category: z.string().min(1, 'Category is required'),
});

type UnitFormData = z.infer<typeof unitSchema>;

interface ConversionResult {
  originalValue: number;
  convertedValue: number;
  fromUnit: string;
  toUnit: string;
  category: string;
  formula: string;
}

const UnitConverter = () => {
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('length');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      value: 1,
      fromUnit: 'meter',
      toUnit: 'feet',
      category: 'length',
    },
  });

  const categories = {
    length: {
      name: 'Length',
      units: {
        meter: { name: 'Meters', factor: 1 },
        kilometer: { name: 'Kilometers', factor: 1000 },
        centimeter: { name: 'Centimeters', factor: 0.01 },
        millimeter: { name: 'Millimeters', factor: 0.001 },
        inch: { name: 'Inches', factor: 0.0254 },
        feet: { name: 'Feet', factor: 0.3048 },
        yard: { name: 'Yards', factor: 0.9144 },
        mile: { name: 'Miles', factor: 1609.344 },
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilogram: { name: 'Kilograms', factor: 1 },
        gram: { name: 'Grams', factor: 0.001 },
        pound: { name: 'Pounds', factor: 0.453592 },
        ounce: { name: 'Ounces', factor: 0.0283495 },
        ton: { name: 'Tons', factor: 1000 },
        stone: { name: 'Stones', factor: 6.35029 },
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { name: 'Celsius', factor: 1 },
        fahrenheit: { name: 'Fahrenheit', factor: 1 },
        kelvin: { name: 'Kelvin', factor: 1 },
      }
    },
    volume: {
      name: 'Volume',
      units: {
        liter: { name: 'Liters', factor: 1 },
        milliliter: { name: 'Milliliters', factor: 0.001 },
        gallon: { name: 'Gallons (US)', factor: 3.78541 },
        quart: { name: 'Quarts', factor: 0.946353 },
        pint: { name: 'Pints', factor: 0.473176 },
        cup: { name: 'Cups', factor: 0.236588 },
        fluid_ounce: { name: 'Fluid Ounces', factor: 0.0295735 },
      }
    },
    area: {
      name: 'Area',
      units: {
        square_meter: { name: 'Square Meters', factor: 1 },
        square_kilometer: { name: 'Square Kilometers', factor: 1000000 },
        square_centimeter: { name: 'Square Centimeters', factor: 0.0001 },
        square_inch: { name: 'Square Inches', factor: 0.00064516 },
        square_feet: { name: 'Square Feet', factor: 0.092903 },
        acre: { name: 'Acres', factor: 4046.86 },
        hectare: { name: 'Hectares', factor: 10000 },
      }
    },
    speed: {
      name: 'Speed',
      units: {
        meter_per_second: { name: 'Meters/Second', factor: 1 },
        kilometer_per_hour: { name: 'Kilometers/Hour', factor: 0.277778 },
        mile_per_hour: { name: 'Miles/Hour', factor: 0.44704 },
        feet_per_second: { name: 'Feet/Second', factor: 0.3048 },
        knot: { name: 'Knots', factor: 0.514444 },
      }
    },
  };

  const convertUnits = async (data: UnitFormData) => {
    setIsConverting(true);
    
    // Simulate conversion delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let convertedValue: number;
    let formula: string;
    
    const category = categories[data.category as keyof typeof categories];
    
    if (data.category === 'temperature') {
      // Special handling for temperature conversions
      convertedValue = convertTemperature(data.value, data.fromUnit, data.toUnit);
      formula = getTemperatureFormula(data.fromUnit, data.toUnit);
    } else {
      // Standard unit conversions using factors
      const fromFactor = category.units[data.fromUnit as keyof typeof category.units].factor;
      const toFactor = category.units[data.toUnit as keyof typeof category.units].factor;
      
      // Convert to base unit, then to target unit
      const baseValue = data.value * fromFactor;
      convertedValue = baseValue / toFactor;
      
      formula = `${data.value} × ${fromFactor} ÷ ${toFactor} = ${convertedValue.toFixed(6)}`;
    }
    
    setResult({
      originalValue: data.value,
      convertedValue,
      fromUnit: category.units[data.fromUnit as keyof typeof category.units].name,
      toUnit: category.units[data.toUnit as keyof typeof category.units].name,
      category: category.name,
      formula,
    });
    
    setIsConverting(false);
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const getTemperatureFormula = (from: string, to: string): string => {
    if (from === 'celsius' && to === 'fahrenheit') {
      return '°C × 9/5 + 32 = °F';
    } else if (from === 'fahrenheit' && to === 'celsius') {
      return '(°F - 32) × 5/9 = °C';
    } else if (from === 'celsius' && to === 'kelvin') {
      return '°C + 273.15 = K';
    } else if (from === 'kelvin' && to === 'celsius') {
      return 'K - 273.15 = °C';
    } else if (from === 'fahrenheit' && to === 'kelvin') {
      return '(°F - 32) × 5/9 + 273.15 = K';
    } else if (from === 'kelvin' && to === 'fahrenheit') {
      return '(K - 273.15) × 9/5 + 32 = °F';
    }
    return 'Direct conversion';
  };

  const onSubmit = (data: UnitFormData) => {
    convertUnits(data);
  };

  const swapUnits = () => {
    const fromUnit = watch('fromUnit');
    const toUnit = watch('toUnit');
    setValue('fromUnit', toUnit);
    setValue('toUnit', fromUnit);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setValue('category', category);
    
    // Set default units for the category
    const categoryData = categories[category as keyof typeof categories];
    const units = Object.keys(categoryData.units);
    setValue('fromUnit', units[0]);
    setValue('toUnit', units[1] || units[0]);
    
    // Clear previous result
    setResult(null);
  };

  const currentCategory = categories[selectedCategory as keyof typeof categories];
  const unitOptions = Object.entries(currentCategory.units).map(([key, unit]) => ({
    value: key,
    label: unit.name,
  }));

  const relatedTools = [
    {
      name: 'BMI Calculator',
      href: '/bmi-calculator',
      description: 'Calculate Body Mass Index with unit conversion',
    },
    {
      name: 'Calorie Calculator',
      href: '/calorie-calculator',
      description: 'Calculate daily calorie needs',
    },
    {
      name: 'TDEE Calculator',
      href: '/tdee-calculator',
      description: 'Total Daily Energy Expenditure calculator',
    },
  ];

  return (
    <ToolLayout
      title="Unit Converter - Convert Length, Weight, Temperature & More"
      description="Free unit converter for length, weight, temperature, volume, area & speed. Convert meters to feet, pounds to kilograms, Celsius to Fahrenheit & more with instant results."
      slug="unit-converter"
      keywords={['unit converter', 'metric converter', 'length converter', 'weight converter', 'temperature converter', 'feet to meters', 'pounds to kg', 'celsius to fahrenheit']}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Converter</h1>
          <p className="text-lg text-gray-600">
            Convert between different units of measurement including length, weight, temperature, 
            volume, area, and speed. Get instant, accurate conversions with detailed formulas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Converter Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Category Selection */}
              <FormField label="Conversion Category" required>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(categories).map(([key, category]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleCategoryChange(key)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedCategory === key
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </FormField>

              {/* Value Input */}
              <FormField label="Value to Convert" required error={errors.value}>
                <Input
                  type="number"
                  step="any"
                  {...register('value', { valueAsNumber: true })}
                  placeholder="Enter value"
                  error={!!errors.value}
                />
              </FormField>

              {/* Unit Selection */}
              <div className="grid grid-cols-5 gap-2 items-end">
                <div className="col-span-2">
                  <FormField label="From" required error={errors.fromUnit}>
                    <Select
                      {...register('fromUnit')}
                      options={unitOptions}
                      error={!!errors.fromUnit}
                    />
                  </FormField>
                </div>

                <div className="col-span-1 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={swapUnits}
                    className="p-2"
                    title="Swap units"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="col-span-2">
                  <FormField label="To" required error={errors.toUnit}>
                    <Select
                      {...register('toUnit')}
                      options={unitOptions}
                      error={!!errors.toUnit}
                    />
                  </FormField>
                </div>
              </div>

              <Button type="submit" disabled={isConverting} className="w-full">
                {isConverting ? <Loading size="sm" text="Converting..." /> : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Convert Units
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <ResultBlock
                title="Conversion Result"
                type="success"
                results={[
                  {
                    label: 'Original Value',
                    value: `${result.originalValue.toLocaleString()} ${result.fromUnit}`,
                  },
                  {
                    label: 'Converted Value',
                    value: `${result.convertedValue.toLocaleString()} ${result.toUnit}`,
                  },
                  {
                    label: 'Category',
                    value: result.category,
                  },
                  {
                    label: 'Formula',
                    value: result.formula,
                  },
                ]}
              >
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-green-900 mb-2">Quick Reference</h4>
                  <p className="text-green-700 text-lg font-bold">
                    {result.originalValue} {result.fromUnit} = {result.convertedValue.toFixed(6)} {result.toUnit}
                  </p>
                </div>
              </ResultBlock>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <Ruler className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter a value and select units to see conversion results</p>
              </div>
            )}

            {/* Common Conversions */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Common {currentCategory.name} Conversions</h3>
              <div className="space-y-2 text-sm">
                {selectedCategory === 'length' && (
                  <>
                    <div className="flex justify-between">
                      <span>1 meter</span>
                      <span>3.28084 feet</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 kilometer</span>
                      <span>0.621371 miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 inch</span>
                      <span>2.54 centimeters</span>
                    </div>
                  </>
                )}
                {selectedCategory === 'weight' && (
                  <>
                    <div className="flex justify-between">
                      <span>1 kilogram</span>
                      <span>2.20462 pounds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 pound</span>
                      <span>16 ounces</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 ton</span>
                      <span>1000 kilograms</span>
                    </div>
                  </>
                )}
                {selectedCategory === 'temperature' && (
                  <>
                    <div className="flex justify-between">
                      <span>0°C</span>
                      <span>32°F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>100°C</span>
                      <span>212°F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>0 Kelvin</span>
                      <span>-273.15°C</span>
                    </div>
                  </>
                )}
                {selectedCategory === 'volume' && (
                  <>
                    <div className="flex justify-between">
                      <span>1 liter</span>
                      <span>0.264172 gallons</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 gallon</span>
                      <span>4 quarts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 cup</span>
                      <span>8 fluid ounces</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Unit Conversion</h2>
          <p className="text-gray-600 mb-4">
            Unit conversion is essential for international communication, scientific calculations, 
            cooking, construction, and many other daily activities. Our converter supports the most 
            commonly used units across different measurement systems.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Supported Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Length & Distance</h4>
              <p className="text-blue-700">Meters, feet, inches, kilometers, miles, and more</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900">Weight & Mass</h4>
              <p className="text-green-700">Kilograms, pounds, ounces, tons, stones</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900">Temperature</h4>
              <p className="text-yellow-700">Celsius, Fahrenheit, Kelvin with precise formulas</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900">Volume & Capacity</h4>
              <p className="text-purple-700">Liters, gallons, cups, fluid ounces</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Conversion Accuracy</h3>
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <strong>Precise Calculations:</strong> All conversions use internationally accepted conversion factors
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Formula Display:</strong> See the exact formula used for each conversion
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Multiple Decimals:</strong> Results shown with high precision for accuracy
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">How accurate are the conversions?</h4>
              <p className="text-gray-600">
                Our conversions use internationally accepted conversion factors and are accurate 
                to 6 decimal places, suitable for most practical and scientific applications.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Can I convert between different measurement systems?</h4>
              <p className="text-gray-600">
                Yes, you can convert between metric and imperial systems, as well as other 
                measurement systems like Kelvin for temperature.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Why do temperature conversions work differently?</h4>
              <p className="text-gray-600">
                Temperature conversions require special formulas because temperature scales 
                have different zero points and intervals, unlike linear measurements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;
