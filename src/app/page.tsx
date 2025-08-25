
"use client";

import React, { useState } from 'react';
import { VehicleServiceForm } from '@/components/vehicle-service-form';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Separator } from '@/components/ui/separator';
import { FeedbackForm } from '@/components/feedback-form';
import { LiveFeedbackTicker } from '@/components/live-feedback-ticker';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function EstimatorPage() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-background transition-colors duration-500")}>
      <Header className="no-print" />
      <main className="flex-1">
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center no-print">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Service Estimator</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get instant, accurate service estimates for your Maruti Suzuki vehicle. Our advanced system provides transparent pricing for all your maintenance needs.
                </p>
              </div>
            </div>
            
            <div className="mx-auto w-full max-w-4xl pt-10">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <VehicleServiceForm />
                </Card>
            </div>
          </div>
        </section>

        <Separator className="my-8 no-print" />

        <section className="w-full pb-12 md:pb-24 lg:pb-32 no-print">
          <div className="container px-4 md:px-6">
            <Collapsible open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Feedback & Suggestions</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Have a suggestion or found an issue? Let us know! Your feedback helps us improve.
                    </p>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline">
                            {isFeedbackOpen ? 'Hide Form' : 'Provide Feedback'}
                            <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", isFeedbackOpen && "rotate-180")} />
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                    <div className="mx-auto w-full max-w-2xl pt-10">
                        <Card>
                            <FeedbackForm />
                        </Card>
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <div className="mt-12">
              <LiveFeedbackTicker />
            </div>
          </div>
        </section>

      </main>
      <footer className="flex py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t no-print overflow-hidden">
        <div className="relative w-full">
            <p className="absolute whitespace-nowrap text-xs text-muted-foreground animate-marquee">
              © Maruti Suzuki Service Estimator. An unofficial tool for all call center and SMRE team. Made By Hiru Mani And His Team
            </p>
        </div>
      </footer>
    </div>
  );
}
