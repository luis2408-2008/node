// BMI categories and their corresponding ranges, colors, positions
export const bmiCategories = [
  { min: 0, max: 18.5, name: 'Bajo peso', color: 'bg-blue-500 text-white', position: '12.5%' },
  { min: 18.5, max: 25, name: 'Peso normal', color: 'bg-green-500 text-white', position: '37.5%' },
  { min: 25, max: 30, name: 'Sobrepeso', color: 'bg-yellow-500 text-white', position: '62.5%' },
  { min: 30, max: Infinity, name: 'Obesidad', color: 'bg-red-500 text-white', position: '87.5%' }
];

// BMI recommendations by category
export const bmiRecommendations = {
  'Bajo peso': [
    'Consulte a un profesional de la salud para una evaluación',
    'Considere aumentar la ingesta calórica con alimentos nutritivos',
    'Incorpore ejercicios de fortalecimiento muscular'
  ],
  'Peso normal': [
    'Mantenga una dieta equilibrada y variada',
    'Realice al menos 150 minutos de actividad física moderada a la semana',
    'Monitoree su peso regularmente'
  ],
  'Sobrepeso': [
    'Reduzca gradualmente la ingesta calórica',
    'Aumente la actividad física a 150-300 minutos por semana',
    'Enfóquese en hábitos sostenibles, no en dietas rápidas'
  ],
  'Obesidad': [
    'Consulte a un profesional de la salud para un plan personalizado',
    'Establezca metas pequeñas y alcanzables de pérdida de peso',
    'Combine cambios en la dieta con actividad física regular'
  ]
};

// BMI descriptions by category
export const bmiDescriptions = {
  'Bajo peso': 'Su IMC indica que está por debajo del peso considerado saludable. Esto podría asociarse con ciertos problemas de salud como deficiencias nutricionales, debilidad inmunológica o problemas hormonales.',
  'Peso normal': 'Su IMC indica que tiene un peso normal. Mantener un peso saludable puede reducir el riesgo de enfermedades crónicas asociadas con el sobrepeso y la obesidad.',
  'Sobrepeso': 'Su IMC indica sobrepeso. Esto puede aumentar el riesgo de desarrollar ciertas condiciones de salud como diabetes tipo 2, enfermedades cardíacas y presión arterial alta.',
  'Obesidad': 'Su IMC indica obesidad. Esto incrementa significativamente el riesgo de varios problemas de salud incluyendo diabetes tipo 2, enfermedades cardíacas, apnea del sueño y ciertos tipos de cáncer.'
};

// Calculate BMI based on height, weight and unit system
export function calculateBMI(height: number, weight: number, units: 'metric' | 'imperial'): number {
  let bmi: number;
  
  if (units === 'metric') {
    // Metric formula: weight (kg) / height (m)²
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    // Imperial formula: (weight (lb) / height (in)²) x 703
    bmi = (weight / (height * height)) * 703;
  }
  
  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
}

// Get BMI category based on BMI value
export function getBMICategory(bmi: number) {
  for (const category of bmiCategories) {
    if (bmi < category.max) {
      return category;
    }
  }
  return bmiCategories[bmiCategories.length - 1];
}

// Calculate position percentage for the BMI indicator
export function calculateBMIPosition(bmi: number): string {
  if (bmi < 16) {
    return '0%';
  } else if (bmi > 40) {
    return '100%';
  } else {
    // Map BMI value (16-40) to position (0-100%)
    const percentage = ((bmi - 16) / (40 - 16)) * 100;
    return `${percentage}%`;
  }
}
