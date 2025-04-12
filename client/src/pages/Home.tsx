import BmiCalculator from "@/components/BmiCalculator";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 bg-[radial-gradient(#e2e8f0_0.5px,transparent_0.5px),radial-gradient(#e2e8f0_0.5px,#f8fafc_0.5px)] bg-[length:20px_20px] bg-[0_0,10px_10px]">
      <BmiCalculator />
    </div>
  );
}
