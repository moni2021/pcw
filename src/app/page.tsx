import { VehicleServiceForm } from '@/components/vehicle-service-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Maruti Suzuki Service Estimator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Get an instant estimate for your vehicle's service
          </p>
        </header>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <VehicleServiceForm />
        </div>
        <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            This is an unofficial estimator. Prices are indicative and may vary.
          </p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>
    </main>
  );
}
