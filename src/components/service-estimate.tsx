
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Printer, Percent, PlusCircle, Sparkles, Wrench } from 'lucide-react';
import type { ServiceEstimateData, Labor, CustomLabor as CustomLaborType } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { customLaborData } from '@/lib/custom-labor-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface ServiceEstimateProps {
  estimate: ServiceEstimateData;
}

export function ServiceEstimate({ estimate }: ServiceEstimateProps) {
  const { vehicle, serviceType, parts, labor, recommendedLabor, optionalServices } = estimate;
  const GST_RATE = 0.18;

  const [discountType, setDiscountType] = useState<'percentage' | 'rupees'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [selectedRecommended, setSelectedRecommended] = useState<Labor[]>([]);
  const [selectedOptional, setSelectedOptional] = useState<Labor[]>([]);
  const [customLabor, setCustomLabor] = useState<Labor[]>([]);
  const [finalTotal, setFinalTotal] = useState(estimate.totalPrice);
  
  const totalPartsPrice = useMemo(() => parts.reduce((sum, part) => sum + part.price, 0), [parts]);
  const baseLaborCharge = useMemo(() => labor.reduce((sum, job) => sum + job.charge, 0), [labor]);
  const recommendedLaborCharge = useMemo(() => selectedRecommended.reduce((sum, job) => sum + job.charge, 0), [selectedRecommended]);
  const optionalServiceCharge = useMemo(() => selectedOptional.reduce((sum, job) => sum + job.charge, 0), [selectedOptional]);
  const customLaborCharge = useMemo(() => customLabor.reduce((sum, job) => sum + job.charge, 0), [customLabor]);

  const availableCustomLabor = useMemo(() => {
    return customLaborData.filter(item => item.model === vehicle.model);
  }, [vehicle.model]);
  
  const totalLaborCharge = useMemo(() => baseLaborCharge + recommendedLaborCharge + optionalServiceCharge + customLaborCharge, [baseLaborCharge, recommendedLaborCharge, optionalServiceCharge, customLaborCharge]);
  const gstOnLabor = useMemo(() => totalLaborCharge * GST_RATE, [totalLaborCharge]);

  useEffect(() => {
    let laborDiscount = 0;
    const numericDiscountValue = Number(discountValue) || 0;

    // Discount is only applied to base labor + recommended, not premium optional services
    const discountableLabor = baseLaborCharge + recommendedLaborCharge + customLaborCharge;

    if (discountType === 'percentage') {
      laborDiscount = discountableLabor * (numericDiscountValue / 100);
    } else {
      laborDiscount = numericDiscountValue;
    }
    
    laborDiscount = Math.min(laborDiscount, discountableLabor);

    const newTotal = totalPartsPrice + totalLaborCharge + gstOnLabor - laborDiscount;
    setFinalTotal(newTotal);

  }, [discountValue, discountType, totalLaborCharge, totalPartsPrice, gstOnLabor, baseLaborCharge, recommendedLaborCharge, customLaborCharge]);
  
  useEffect(() => {
    // Reset state when a new estimate is received
    setDiscountValue(0);
    setDiscountType('percentage');
    setSelectedRecommended([]);
    setSelectedOptional([]);
    setCustomLabor([]);
  }, [estimate]);


  const handlePrint = () => {
    window.print();
  };

  const handleOptionalChange = (job: Labor, type: 'recommended' | 'optional') => {
    const setter = type === 'recommended' ? setSelectedRecommended : setSelectedOptional;
    
    setter(prev => {
        const isSelected = prev.find(item => item.name === job.name);
        if (isSelected) {
            return prev.filter(item => item.name !== job.name);
        } else {
            return [...prev, job];
        }
    })
  }

  const handleCustomLaborAdd = (laborName: string) => {
      const selectedJob = availableCustomLabor.find(job => job.name === laborName);
      if (selectedJob && !customLabor.some(l => l.name === selectedJob.name)) {
          setCustomLabor(prev => [...prev, {name: selectedJob.name, charge: selectedJob.charge}]);
      }
  }
   const handleCustomLaborRemove = (laborName: string) => {
    setCustomLabor(prev => prev.filter(job => job.name !== laborName));
  };


  return (
    <div className="print-container">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="print:hidden">
                <CardTitle>Service Estimate</CardTitle>
            </div>
            <div className="hidden print:block">
                <CardTitle>Service Estimate</CardTitle>
            </div>
            <Button onClick={handlePrint} variant="ghost" size="icon" className="no-print" type="button">
                <Printer className="h-5 w-5" />
                <span className="sr-only">Print</span>
            </Button>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="font-semibold text-muted-foreground">Vehicle Model</p>
            <p>{vehicle.model} ({vehicle.productionYear})</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">Fuel Type</p>
            <p>{vehicle.fuelType}</p>
          </div>
           <div>
            <p className="font-semibold text-muted-foreground">Brand</p>
             <Badge variant="secondary">{vehicle.brand}</Badge>
          </div>
           <div>
            <p className="font-semibold text-muted-foreground">Category</p>
            <Badge variant="secondary">{vehicle.category}</Badge>
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
            <h3 className="text-lg font-semibold mb-2">Standard Labor Charges</h3>
             <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Labor Description</TableHead>
                      <TableHead className="text-right">Charge (₹)</TableHead>
                      <TableHead className="text-right">GST (18%)</TableHead>
                      <TableHead className="text-right">Total (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labor.map((job, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{job.name}</TableCell>
                        <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{(job.charge * GST_RATE).toFixed(2)}</TableCell>
                        <TableCell className="text-right font-semibold">{(job.charge * (1 + GST_RATE)).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </div>
          </div>

          {availableCustomLabor.length > 0 && (
            <div className="space-y-4 rounded-lg border border-dashed p-4 no-print">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-primary"><Wrench className="h-5 w-5"/> Custom Labor</h3>
              <p className="text-sm text-muted-foreground">Add custom labor charges for this vehicle.</p>
              <div className="flex flex-col gap-4">
                  <Select onValueChange={handleCustomLaborAdd}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select a custom labor item" />
                      </SelectTrigger>
                      <SelectContent>
                          {availableCustomLabor.map((job, index) => (
                              <SelectItem key={`${job.name}-${index}`} value={job.name} disabled={customLabor.some(l => l.name === job.name)}>
                                  {job.name} - ₹{job.charge.toFixed(2)}
                              </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>

                  {customLabor.length > 0 && (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Custom Labor</TableHead>
                              <TableHead className="text-right">Charge (₹)</TableHead>
                              <TableHead className="text-right"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {customLabor.map((job, index) => (
                              <TableRow key={`custom-${index}`}>
                                <TableCell className="font-medium">{job.name}</TableCell>
                                <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="icon" onClick={() => handleCustomLaborRemove(job.name)}>
                                    <PlusCircle className="h-4 w-4 rotate-45 text-destructive"/>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                  )}
              </div>
            </div>
          )}
            
          {recommendedLabor && recommendedLabor.length > 0 && (
             <div className="space-y-4 rounded-lg border border-dashed p-4 no-print">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-primary"> <PlusCircle className="h-5 w-5"/> Recommended Services</h3>
                <p className="text-sm text-muted-foreground">Select any additional services you would like to include.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedLabor.map((job, index) => (
                        <div key={index} className="flex items-center space-x-3 rounded-md bg-muted/30 p-3">
                             <Checkbox 
                                id={`rec-${index}`} 
                                onCheckedChange={() => handleOptionalChange(job, 'recommended')}
                                checked={!!selectedRecommended.find(item => item.name === job.name)}
                            />
                            <label
                                htmlFor={`rec-${index}`}
                                className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {job.name}
                                <span className="block text-xs text-muted-foreground">
                                    (₹{job.charge.toFixed(2)} + ₹{(job.charge * GST_RATE).toFixed(2)} GST)
                                </span>
                            </label>
                            <p className="text-sm font-semibold">₹{(job.charge * (1 + GST_RATE)).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {optionalServices && optionalServices.length > 0 && (
             <div className="space-y-4 rounded-lg border border-dashed p-4 no-print border-primary/50 bg-primary/5">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-primary"> <Sparkles className="h-5 w-5"/> 3M Optional Services</h3>
                <p className="text-sm text-muted-foreground">Select any premium 3M services to add.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {optionalServices.map((job, index) => (
                        <div key={index} className="flex items-center space-x-3 rounded-md bg-muted/30 p-3">
                             <Checkbox 
                                id={`opt-${index}`} 
                                onCheckedChange={() => handleOptionalChange(job, 'optional')}
                                checked={!!selectedOptional.find(item => item.name === job.name)}
                            />
                            <label
                                htmlFor={`opt-${index}`}
                                className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {job.name}
                                <span className="block text-xs text-muted-foreground">
                                    (₹{job.charge.toFixed(2)} + ₹{(job.charge * GST_RATE).toFixed(2)} GST)
                                </span>
                            </label>
                            <p className="text-sm font-semibold">₹{(job.charge * (1 + GST_RATE)).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
          )}

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
        
         <div className="print-only mt-4 space-y-4 hidden">
              {[...customLabor, ...selectedRecommended, ...selectedOptional].length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Additional Services</h3>
                    <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Service Description</TableHead>
                              <TableHead className="text-right">Charge (₹)</TableHead>
                              <TableHead className="text-right">GST (18%)</TableHead>
                              <TableHead className="text-right">Total (₹)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[...customLabor, ...selectedRecommended, ...selectedOptional].map((job, index) => (
                              <TableRow key={`print-rec-${index}`}>
                                <TableCell className="font-medium">{job.name}</TableCell>
                                <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
                                <TableCell className="text-right">{(job.charge * GST_RATE).toFixed(2)}</TableCell>
                                <TableCell className="text-right font-semibold">{(job.charge * (1 + GST_RATE)).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </div>
                  </div>
              )}
         </div>


      </CardContent>
      <CardFooter className="bg-muted/50 p-4 mt-6 rounded-b-lg flex-col items-stretch gap-2 print:mt-2 print:p-2">
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground no-print">
              <p>Subtotal (Parts):</p>
              <p>₹{totalPartsPrice.toFixed(2)}</p>
          </div>
           <div className="w-full flex justify-between items-center text-sm text-muted-foreground no-print">
              <p>Subtotal (Labor):</p>
              <p>₹{totalLaborCharge.toFixed(2)}</p>
          </div>
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground no-print">
              <p>Total GST on Labor (18%):</p>
              <p>₹{gstOnLabor.toFixed(2)}</p>
          </div>
        <Separator className="my-1 no-print"/>
        <div className="w-full flex justify-between items-center">
            <p className="text-xl font-bold">Total Estimate:</p>
            <p className="text-xl font-bold">₹{finalTotal.toFixed(2)}</p>
        </div>
      </CardFooter>
      <style jsx global>{`
        @media print {
            body {
                background: #fff;
                color: #000;
            }
            .no-print {
                display: none !important;
            }
            .print-only {
                display: block !important;
            }
            .print-container, .print-container .card-content, .print-container .card-header, .print-container .card-footer {
                box-shadow: none !important;
                border: none !important;
                padding-left: 0;
                padding-right: 0;
            }
            .print-container .card-footer {
                background: #f8f8f8 !important;
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact;
            }
        }
      `}</style>
    </div>
  );
}
