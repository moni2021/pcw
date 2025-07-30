"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Printer, Minus, Percent } from 'lucide-react';
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
    
    // Ensure discount doesn't exceed total labor charge
    laborDiscount = Math.min(laborDiscount, totalLaborCharge);

    const newTotal = totalPartsPrice + totalLaborCharge - laborDiscount;
    setFinalTotal(newTotal);

  }, [discountValue, discountType, totalLaborCharge, totalPartsPrice]);
  
  // Reset discount when estimate changes
  useEffect(() => {
    setDiscountValue(0);
    setDiscountType('percentage');
    setFinalTotal(estimate.totalPrice);
  }, [estimate]);


  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="mt-8 shadow-lg print-container">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">Service Estimate</CardTitle>
        <Button onClick={handlePrint} variant="ghost" size="icon" className="no-print">
          <Printer className="h-5 w-5" />
          <span className="sr-only">Print</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold">Vehicle Model</p>
            <p>{vehicle.model}</p>
          </div>
          <div>
            <p className="font-semibold">Fuel Type</p>
            <p>{vehicle.fuelType}</p>
          </div>
          <div>
            <p className="font-semibold">Service Type</p>
            <p>{serviceType}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Parts Replacement</h3>
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
                <TableCell>{part.name}</TableCell>
                <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Labor Charges</h3>
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
                <TableCell>{job.name}</TableCell>
                <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 flex flex-col items-end space-y-4 no-print">
           <div className="flex items-center gap-4">
              <Label>Discount on Labor</Label>
               <RadioGroup defaultValue="percentage" value={discountType} onValueChange={(value) => setDiscountType(value as 'percentage' | 'rupees')} className="flex items-center">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percentage" id="r-percentage" />
                        <Label htmlFor="r-percentage">Percentage (%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rupees" id="r-rupees" />
                        <Label htmlFor="r-rupees">Rupees (₹)</Label>
                    </div>
                </RadioGroup>
           </div>
            <div className="relative w-48">
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
      <CardFooter>
        <div className="w-full flex justify-end items-center">
            <p className="text-xl font-bold">Total Estimate:</p>
            <p className="text-xl font-bold ml-4">₹{finalTotal.toFixed(2)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
