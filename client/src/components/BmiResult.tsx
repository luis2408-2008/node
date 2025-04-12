import { bmiDescriptions, bmiRecommendations } from "@/lib/bmi";
import BmiScale from "./BmiScale";
import { Check } from "lucide-react";

interface BmiResultProps {
  bmiResult: {
    value: number;
    category: string;
    color: string;
    position: string;
  };
}

export default function BmiResult({ bmiResult }: BmiResultProps) {
  const { value, category, color, position } = bmiResult;
  
  return (
    <div className="animate-slide-up">
      {/* BMI Result Value */}
      <div className="text-center">
        <p className="text-lg text-slate-600">Su IMC es</p>
        <div className="flex justify-center items-baseline">
          <h2 className="text-4xl font-bold">{value}</h2>
          <span className="ml-1 text-lg text-slate-500">kg/m²</span>
        </div>
        <p className={`mt-2 py-1 px-4 rounded-full inline-block font-medium ${color}`}>
          {category}
        </p>
      </div>

      {/* BMI Scale Visualization */}
      <div className="mt-8">
        <p className="text-sm text-slate-600 mb-2">Clasificación del IMC:</p>
        <BmiScale bmiPosition={position} />
      </div>

      {/* Health Information */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-slate-800">¿Qué significa esto?</h3>
        <p className="mt-2 text-sm text-slate-600">
          {bmiDescriptions[category as keyof typeof bmiDescriptions]}
        </p>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-700">Recomendaciones:</p>
          <ul className="mt-2 text-sm space-y-1 text-slate-600">
            {bmiRecommendations[category as keyof typeof bmiRecommendations].map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-6 text-xs text-slate-500 text-center">
        <p>El IMC es solo un indicador general y no considera la composición corporal individual.</p>
        <p>Consulte a un profesional de la salud para una evaluación completa.</p>
      </div>
    </div>
  );
}
