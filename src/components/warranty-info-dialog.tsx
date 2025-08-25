
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface WarrantyInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function WarrantyInfoDialog({
  isOpen,
  onOpenChange,
}: WarrantyInfoDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Maruti Suzuki Extended Warranty: An Overview</DialogTitle>
          <DialogDescription>
            A summary of warranty plans, coverage, and important conditions.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6 py-4">
                <section>
                    <h3 className="text-lg font-semibold mb-2">1. Warranty Plans and Coverage Periods</h3>
                    <p className="text-muted-foreground mb-4">
                        The standard warranty covers the first <strong>2 years or 40,000 kilometers</strong>, whichever comes first. The extended warranty program offers tiered plans to extend this coverage.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <p className="font-medium">Gold Plan</p>
                            <Badge variant="outline">3rd year or up to 60,000 km</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <p className="font-medium">Platinum Plan</p>
                            <Badge variant="outline">3rd & 4th years or up to 80,000 km</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <p className="font-medium">Royal Platinum Plan</p>
                            <Badge variant="outline">3rd, 4th & 5th years or up to 100,000 km</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <p className="font-medium">Solitaire Plan</p>
                            <Badge variant="secondary">NEXA Premium Plan</Badge>
                        </div>
                    </div>
                </section>
                
                <Separator />

                <section>
                    <h3 className="text-lg font-semibold mb-2">2. Scope of Coverage and Excluded Parts</h3>
                     <p className="text-muted-foreground mb-4">
                        The extended warranty provides full cover for risks against manufacturing defects, including parts and labor. However, it is not a comprehensive maintenance plan and specifically excludes a number of items:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted/50 p-4">
                            <h4 className="font-semibold mb-2">Routine Service Components</h4>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                <li>Engine oil</li>
                                <li>Fluids & coolants</li>
                                <li>Filters (Oil, Air, Fuel, A/C)</li>
                            </ul>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-4">
                            <h4 className="font-semibold mb-2">Wear-and-Tear Items</h4>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                <li>Brake pads & shoes</li>
                                <li>Clutch plates</li>
                                <li>Bulbs, belts, and hoses</li>
                                <li>Wiper blades & bearings</li>
                            </ul>
                        </div>
                        <div className="col-span-1 sm:col-span-2 rounded-lg bg-muted/50 p-4">
                             <h4 className="font-semibold mb-2">Third-Party Items</h4>
                             <p className="text-sm text-muted-foreground">Components like the battery, tires, and music system are covered under their own separate warranties from their respective manufacturers, not the Maruti Suzuki extended warranty.</p>
                        </div>
                    </div>
                </section>
                
                <Separator />

                <section>
                    <h3 className="text-lg font-semibold text-destructive mb-2">3. Clauses That Can Void the Warranty</h3>
                     <p className="text-muted-foreground mb-4">
                        The warranty is a contractual agreement that requires the owner to adhere to specific conditions. The warranty can be voided under the following circumstances:
                    </p>
                    <ul className="space-y-3 list-decimal pl-5 text-muted-foreground">
                        <li>
                            <strong>Unauthorized Service:</strong> The vehicle is not serviced according to the manufacturer's recommendations or if servicing is done at an unauthorized workshop.
                        </li>
                         <li>
                            <strong>Use of Non-Genuine Parts:</strong> The use of counterfeit or non-genuine spare parts and accessories can void the warranty.
                        </li>
                         <li>
                            <strong>Electrical Modifications:</strong> Damage to the Electronic Control Unit (ECU) or other electrical components resulting from the installation of non-genuine accessories or by splicing/modifying the car's wiring system.
                        </li>
                         <li>
                            <strong>LPG/CNG Kits:</strong> Installation of an LPG or CNG kit can void the warranty unless the owner obtains written confirmation from the manufacturer stating that the warranty will remain valid.
                        </li>
                    </ul>
                </section>
            </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    