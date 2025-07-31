// Health and wellness calculation utilities

export interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
}

export const calculateBMI = (weight: number, height: number, unit: 'metric' | 'imperial' = 'metric'): BMIResult => {
  let bmi: number;
  
  if (unit === 'imperial') {
    // Convert pounds and inches to metric
    const weightKg = weight * 0.453592;
    const heightM = (height * 2.54) / 100;
    bmi = weightKg / (heightM * heightM);
  } else {
    // Height in meters, weight in kg
    const heightM = height / 100;
    bmi = weight / (heightM * heightM);
  }

  const category = getBMICategory(bmi);
  const description = getBMIDescription(bmi);
  const healthyWeightRange = getHealthyWeightRange(height, unit);

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    description,
    healthyWeightRange
  };
};

const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

const getBMIDescription = (bmi: number): string => {
  if (bmi < 18.5) return 'You may be underweight. Consider consulting with a healthcare provider.';
  if (bmi < 25) return 'You have a healthy weight for your height.';
  if (bmi < 30) return 'You may be overweight. Consider a balanced diet and regular exercise.';
  return 'You may be obese. Consider consulting with a healthcare provider for guidance.';
};

const getHealthyWeightRange = (height: number, unit: 'metric' | 'imperial'): { min: number; max: number } => {
  let heightM: number;
  
  if (unit === 'imperial') {
    heightM = (height * 2.54) / 100;
  } else {
    heightM = height / 100;
  }

  const minWeight = 18.5 * (heightM * heightM);
  const maxWeight = 24.9 * (heightM * heightM);

  if (unit === 'imperial') {
    return {
      min: Math.round(minWeight * 2.20462),
      max: Math.round(maxWeight * 2.20462)
    };
  }

  return {
    min: Math.round(minWeight),
    max: Math.round(maxWeight)
  };
};

export interface CalorieResult {
  bmr: number;
  tdee: number;
  weightLoss: {
    mild: number;
    moderate: number;
    aggressive: number;
  };
  weightGain: {
    mild: number;
    moderate: number;
  };
}

export const calculateCalories = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
  unit: 'metric' | 'imperial' = 'metric'
): CalorieResult => {
  let weightKg = weight;
  let heightCm = height;

  if (unit === 'imperial') {
    weightKg = weight * 0.453592;
    heightCm = height * 2.54;
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Calculate TDEE based on activity level
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const tdee = bmr * activityMultipliers[activityLevel];

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    weightLoss: {
      mild: Math.round(tdee - 250),
      moderate: Math.round(tdee - 500),
      aggressive: Math.round(tdee - 750)
    },
    weightGain: {
      mild: Math.round(tdee + 250),
      moderate: Math.round(tdee + 500)
    }
  };
};

export const calculateWaterIntake = (
  weight: number,
  activityLevel: 'low' | 'moderate' | 'high',
  climate: 'normal' | 'hot' | 'humid',
  unit: 'metric' | 'imperial' = 'metric'
): { liters: number; cups: number; ounces: number } => {
  let weightKg = weight;
  
  if (unit === 'imperial') {
    weightKg = weight * 0.453592;
  }

  // Base water intake: 35ml per kg of body weight
  let baseIntake = weightKg * 35;

  // Adjust for activity level
  const activityMultipliers = {
    low: 1,
    moderate: 1.2,
    high: 1.5
  };

  // Adjust for climate
  const climateMultipliers = {
    normal: 1,
    hot: 1.2,
    humid: 1.15
  };

  const totalIntake = baseIntake * activityMultipliers[activityLevel] * climateMultipliers[climate];

  return {
    liters: Math.round((totalIntake / 1000) * 10) / 10,
    cups: Math.round((totalIntake / 240) * 10) / 10,
    ounces: Math.round((totalIntake / 29.5735) * 10) / 10
  };
};
