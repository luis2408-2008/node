import { Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

export default function BmiInfo() {
  return (
    <div className="mt-8">
      <div className="flex items-center">
        <h3 className="font-semibold text-slate-800">Sobre el IMC</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-2">
                <Info className="h-4 w-4 text-slate-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-slate-800 text-white text-xs p-2">
              El IMC es una medida que utiliza su altura y peso para determinar si su peso es saludable.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        El Índice de Masa Corporal (IMC) es una medida que utiliza su altura y peso para determinar si su peso es saludable. 
        El IMC se calcula dividiendo su peso (en kg) por el cuadrado de su altura (en metros).
      </p>
      <div className="mt-3">
        <p className="text-sm text-slate-700 font-medium">Categorías de IMC:</p>
        <ul className="mt-1 text-sm space-y-1">
          <li className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span>Bajo peso: IMC menor a 18.5</span>
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span>Peso normal: IMC entre 18.5 y 24.9</span>
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            <span>Sobrepeso: IMC entre 25 y 29.9</span>
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span>Obesidad: IMC de 30 o superior</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
