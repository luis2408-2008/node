interface BmiScaleProps {
  bmiPosition: string;
}

export default function BmiScale({ bmiPosition }: BmiScaleProps) {
  return (
    <div className="relative h-16">
      <div className="absolute left-0 top-0 w-full h-8 flex">
        <div className="h-full w-1/4 bg-blue-500 rounded-l-lg flex items-center justify-center">
          <span className="text-xs text-white font-medium">Bajo peso</span>
        </div>
        <div className="h-full w-1/4 bg-green-500 flex items-center justify-center">
          <span className="text-xs text-white font-medium">Normal</span>
        </div>
        <div className="h-full w-1/4 bg-yellow-500 flex items-center justify-center">
          <span className="text-xs text-white font-medium">Sobrepeso</span>
        </div>
        <div className="h-full w-1/4 bg-red-500 rounded-r-lg flex items-center justify-center">
          <span className="text-xs text-white font-medium">Obesidad</span>
        </div>
      </div>
      <div className="absolute top-8 left-0 w-full">
        <div className="relative w-full h-2 bg-slate-100">
          <div 
            className="absolute w-3 h-4 bg-black top-[-16px] transform -translate-x-1/2" 
            style={{ left: bmiPosition }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-slate-500">
          <span>16</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>40</span>
        </div>
      </div>
    </div>
  );
}
