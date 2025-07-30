import { EstimatorForm } from "@/components/estimator-form";
import { Car } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center rounded-xl bg-primary p-4 mb-4 shadow-md">
            <Car className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
            Maruti Service Estimator
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
            Get an instant cost estimate for your next Maruti Suzuki service. Select your vehicle, service type, and let our AI do the rest. For a more accurate estimate, you can optionally upload a CSV file with past service data.
          </p>
        </header>
        <EstimatorForm />
      </div>
    </main>
  );
}
