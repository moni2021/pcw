import { VehicleServiceForm } from '@/components/vehicle-service-form';
import { Header } from '@/components/header';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
                    Robotic Precision Service Estimator
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get instant, accurate service estimates for your Maruti Suzuki vehicle. Our advanced system provides transparent pricing for all your maintenance needs.
                  </p>
                </div>
                <Card className="bg-card/50 backdrop-blur-sm">
                  <VehicleServiceForm />
                </Card>
              </div>
              <Image
                alt="Robot analyzing a car"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="robot car"
                height="550"
                src="https://placehold.co/550x550.png"
                width="550"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © Maruti Suzuki Service Estimator. An unofficial tool. Prices are indicative.
        </p>
      </footer>
    </div>
  );
}
