"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Printer, Percent } from 'lucide-react';
import type { ServiceEstimateData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

interface ServiceEstimateProps {
  estimate: ServiceEstimateData;
}

export function ServiceEstimate({ estimate }: ServiceEstimateProps) {
  const { vehicle, serviceType, parts, labor } = estimate;

  const [discountType, setDiscountType] = useState<'percentage' | 'rupees'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState(estimate.totalPrice);
  
  const totalPartsPrice = useMemo(() => parts.reduce((sum, part) => sum + part.price, 0), [parts]);
  const totalLaborCharge = useMemo(() => labor.reduce((sum, job) => sum + job.charge, 0), [labor]);

  useEffect(() => {
    let laborDiscount = 0;
    const numericDiscountValue = Number(discountValue) || 0;

    if (discountType === 'percentage') {
      laborDiscount = totalLaborCharge * (numericDiscountValue / 100);
    } else {
      laborDiscount = numericDiscountValue;
    }
    
    laborDiscount = Math.min(laborDiscount, totalLaborCharge);

    const newTotal = totalPartsPrice + totalLaborCharge - laborDiscount;
    setFinalTotal(newTotal);

  }, [discountValue, discountType, totalLaborCharge, totalPartsPrice]);
  
  useEffect(() => {
    setDiscountValue(0);
    setDiscountType('percentage');
    setFinalTotal(estimate.totalPrice);
  }, [estimate]);


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-container">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">Service Estimate</CardTitle>
        <Button onClick={handlePrint} variant="ghost" size="icon" className="no-print">
          <Printer className="h-5 w-5" />
          <span className="sr-only">Print</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="font-semibold text-muted-foreground">Vehicle Model</p>
            <p>{vehicle.model}</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">Fuel Type</p>
            <p>{vehicle.fuelType}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold text-muted-foreground">Service Type</p>
            <p>{serviceType}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Parts Replacement</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Name</TableHead>
                    <TableHead className="text-right">Price (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parts.map((part, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{part.name}</TableCell>
                      <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Labor Charges</h3>
             <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Labor Description</TableHead>
                      <TableHead className="text-right">Charge (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labor.map((job, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{job.name}</TableCell>
                        <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-end space-y-4 no-print">
           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <Label className="mt-2 sm:mt-0">Discount on Labor</Label>
               <RadioGroup defaultValue="percentage" value={discountType} onValueChange={(value) => setDiscountType(value as 'percentage' | 'rupees')} className="flex items-center">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percentage" id="r-percentage" />
                        <Label htmlFor="r-percentage">Percentage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rupees" id="r-rupees" />
                        <Label htmlFor="r-rupees">Rupees</Label>
                    </div>
                </RadioGroup>
           </div>
            <div className="relative w-full sm:w-48">
                <Input 
                    type="number" 
                    placeholder="Enter Discount" 
                    value={discountValue || ''}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="pl-8"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {discountType === 'percentage' ? <Percent className="h-4 w-4 text-muted-foreground" /> : <p className="text-muted-foreground">₹</p>}
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter className="bg-muted/50 p-4 mt-6 rounded-b-lg">
        <div className="w-full flex justify-between items-center">
            <p className="text-xl font-bold">Total Estimate:</p>
            <p className="text-xl font-bold">₹{finalTotal.toFixed(2)}</p>
        </div>
      </CardFooter>
    </div>
  );
}
