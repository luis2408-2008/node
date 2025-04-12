import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import BmiResult from "./BmiResult";
import BmiInfo from "./BmiInfo";
import { calculateBMI, getBMICategory, calculateBMIPosition } from "@/lib/bmi";

// Define form schema with validation
const formSchema = z.object({
  height: z.coerce.number()
    .positive({ message: "La altura debe ser un número positivo" })
    .refine((val) => !isNaN(val), { message: "Ingrese un valor numérico" }),
  weight: z.coerce.number()
    .positive({ message: "El peso debe ser un número positivo" })
    .refine((val) => !isNaN(val), { message: "Ingrese un valor numérico" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function BmiCalculator() {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [showResults, setShowResults] = useState(false);
  const [bmiResult, setBmiResult] = useState<{
    value: number;
    category: string;
    color: string;
    position: string;
  } | null>(null);

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(getValidationSchema()),
    defaultValues: {
      height: undefined,
      weight: undefined,
    },
  });

  // Get appropriate validation schema based on the unit system
  function getValidationSchema() {
    if (units === 'metric') {
      return formSchema
        .refine((data) => data.height >= 50 && data.height <= 250, {
          message: "La altura debe estar entre 50 y 250 cm",
          path: ["height"],
        })
        .refine((data) => data.weight >= 20 && data.weight <= 500, {
          message: "El peso debe estar entre 20 y 500 kg",
          path: ["weight"],
        });
    } else {
      return formSchema
        .refine((data) => data.height >= 20 && data.height <= 100, {
          message: "La altura debe estar entre 20 y 100 pulgadas",
          path: ["height"],
        })
        .refine((data) => data.weight >= 45 && data.weight <= 1100, {
          message: "El peso debe estar entre 45 y 1100 libras",
          path: ["weight"],
        });
    }
  }

  // Handle unit toggle
  const handleUnitToggle = (value: string) => {
    if (value === 'metric' || value === 'imperial') {
      setUnits(value);
      form.reset();
      setShowResults(false);
    }
  };

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    const bmi = calculateBMI(data.height, data.weight, units);
    const category = getBMICategory(bmi);
    const position = calculateBMIPosition(bmi);
    
    setBmiResult({
      value: bmi,
      category: category.name,
      color: category.color,
      position: position,
    });
    
    setShowResults(true);
  };

  return (
    <motion.div 
      className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Calculadora de IMC</h1>
        <p className="text-center opacity-90 mt-1">Índice de Masa Corporal</p>
      </div>

      <div className="p-6">
        {/* Unit Toggle */}
        <div className="mb-6 flex justify-center">
          <ToggleGroup type="single" value={units} onValueChange={handleUnitToggle} className="inline-flex bg-slate-100 p-1 rounded-lg">
            <ToggleGroupItem 
              value="metric" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${units === 'metric' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600'}`}
            >
              Métrico (kg/cm)
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="imperial" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${units === 'imperial' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600'}`}
            >
              Imperial (lb/in)
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Height Input */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <FormControl>
                        <Input
                          type="number"
                          id="height"
                          placeholder=" "
                          className="block w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary-500 focus:ring-primary-500 bg-white transition peer"
                          {...field}
                        />
                      </FormControl>
                      <Label 
                        htmlFor="height" 
                        className="absolute left-4 top-3 text-slate-500 pointer-events-none transition-all duration-200 ease-in-out peer-focus:-translate-y-5 peer-focus:scale-[0.85] peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-primary-600"
                      >
                        Altura
                      </Label>
                    </div>
                    <div className="ml-3 min-w-[60px] text-center text-slate-600 font-medium">
                      {units === 'metric' ? 'cm' : 'in'}
                    </div>
                  </div>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />

            {/* Weight Input */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <FormControl>
                        <Input
                          type="number"
                          id="weight"
                          placeholder=" "
                          className="block w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary-500 focus:ring-primary-500 bg-white transition peer"
                          {...field}
                        />
                      </FormControl>
                      <Label 
                        htmlFor="weight" 
                        className="absolute left-4 top-3 text-slate-500 pointer-events-none transition-all duration-200 ease-in-out peer-focus:-translate-y-5 peer-focus:scale-[0.85] peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-primary-600"
                      >
                        Peso
                      </Label>
                    </div>
                    <div className="ml-3 min-w-[60px] text-center text-slate-600 font-medium">
                      {units === 'metric' ? 'kg' : 'lb'}
                    </div>
                  </div>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />

            {/* Calculate Button */}
            <Button 
              type="submit" 
              className="w-full py-6 px-6 rounded-lg bg-primary-600 text-white font-semibold shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out"
            >
              Calcular IMC
            </Button>
          </form>
        </Form>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && bmiResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <BmiResult bmiResult={bmiResult} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* BMI Information */}
        <BmiInfo />
      </div>
    </motion.div>
  );
}
