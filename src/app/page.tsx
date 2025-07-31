
"use client";

import { VehicleServiceForm } from '@/components/vehicle-service-form';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';


export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-background transition-colors duration-500", theme)}>
      <Header />
      <main className="flex-1">
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Service Estimator</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get instant, accurate service estimates for your Maruti Suzuki vehicle. Our advanced system provides transparent pricing for all your maintenance needs.
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-2xl pt-10">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <VehicleServiceForm />
                </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © Maruti Suzuki Service Estimator. An unofficial tool. Prices are indicative. Made By Hiru Mani And His Team
        </p>
      </footer>
      <div className="fixed bottom-4 right-4 z-50">
        <Button asChild size="icon" variant="secondary" className="rounded-full shadow-lg">
          <Link href="/admin">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Go to Admin</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
