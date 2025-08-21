
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Percent, PlusCircle, Sparkles, Wrench, Package, Hammer, MinusCircle, ChevronDown, ChevronUp, Printer, Bot, AlertCircle } from 'lucide-react';
import type { ServiceEstimateData, Labor, Part } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from './ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allParts } from '@/lib/data/parts';
import { generateCustomerScript } from '@/ai/flows/customer-script-flow';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { Skeleton } from './ui/skeleton';
import { getAvailableCustomLabor } from '@/lib/workshop-data-loader';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


interface ServiceEstimateProps {
  estimate: ServiceEstimateData;
}

const allEngineOilsFromImage = [
    "ECSTAR PREMIUM 0W20-SHELL",
    "MGGO(75W90)-SHELL",
    "SYNTHETIC OIL (0W40)-IOCL",
    "ECSTAR PETROL 0W16 - SHELL",
    "ECSTAR PETROL 0W20 - IOCL",
    "ECSTAR DIESEL 5W30-IOCL",
    "DEFAULT ENGINE OIL"
];

const allEngineOilParts = allParts.filter(part => allEngineOilsFromImage.includes(part.name));
const petrolEngineOils = allEngineOilParts.filter(part => !part.name.includes('DIESEL'));
const dieselEngineOil = allEngineOilParts.find(part => part.name.includes('DIESEL'));
const dieselFilter = allParts.find(p => p.name === 'Diesel Filter');

const allCoolantParts = allParts.filter(part => part.name.toLowerCase().includes('coolant'));


export function ServiceEstimate({ estimate }: ServiceEstimateProps) {
  const { toast } = useToast();
  const { vehicle, serviceType, parts: initialParts, labor, recommendedLabor, optionalServices, workshopId } = estimate;
  const GST_RATE = 0.18;

  const [currentParts, setCurrentParts] = useState<Part[]>(initialParts);
  const [discountType, setDiscountType] = useState<'percentage' | 'rupees'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [calculatedDiscount, setCalculatedDiscount] = useState<number>(0);
  const [selectedRecommended, setSelectedRecommended] = useState<Labor[]>([]);
  const [selectedOptional, setSelectedOptional] = useState<Labor[]>([]);
  const [customLabor, setCustomLabor] = useState<Labor[]>([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const [showRecommended, setShowRecommended] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [customerScript, setCustomerScript] = useState('');
  
  useEffect(() => {
    let partsWithCorrectEngineOil = [...initialParts];
    const hasEngineOilPlaceholder = initialParts.some(p => allEngineOilParts.some(eo => eo.name === p.name));
    
    if (hasEngineOilPlaceholder) {
        const nonEngineOilParts = initialParts.filter(p => !allEngineOilParts.some(eo => eo.name === p.name));
        
        if (vehicle.fuelType === 'Diesel' && dieselEngineOil) {
            partsWithCorrectEngineOil = [...nonEngineOilParts, dieselEngineOil];
        } else {
            // Use the vehicle's default oil if specified, otherwise fall back
            const defaultOilName = vehicle.defaultEngineOil || 'ECSTAR PETROL 0W16 - SHELL';
            const defaultPetrolOil = petrolEngineOils.find(p => p.name === defaultOilName) || petrolEngineOils[0];
            if(defaultPetrolOil) {
                partsWithCorrectEngineOil = [...nonEngineOilParts, defaultPetrolOil];
            }
        }
    }

    // Add diesel filter if applicable
    if (vehicle.fuelType === 'Diesel' && serviceType.startsWith('Paid Service') && dieselFilter) {
       const serviceKm = parseInt(serviceType.match(/\(([\d,]+)\s*km\)/)?.[1].replace(/,/g, '') || '0', 10);
       if (serviceKm >= 20000 && serviceKm % 20000 === 0 && !partsWithCorrectEngineOil.some(p => p.name === 'Diesel Filter')) {
           partsWithCorrectEngineOil.push(dieselFilter);
       }
    }
    setCurrentParts(partsWithCorrectEngineOil);
    
    setDiscountValue(0);
    setDiscountType('percentage');
    setSelectedRecommended([]);
    setSelectedOptional([]);
    setCustomLabor([]);
  }, [estimate, initialParts, vehicle.fuelType, serviceType, vehicle.defaultEngineOil]);


  const pmsLaborCharge = useMemo(() => labor.reduce((sum, job) => sum + job.charge, 0), [labor]);
  
  const calculatePartPrice = (part: Part) => {
    const isEngineOil = allEngineOilParts.some(eo => eo.name === part.name);
    if (isEngineOil && vehicle.engineOilLiters) {
        return part.price * vehicle.engineOilLiters;
    }
    return part.price;
  };

  const partsTotal = useMemo(() => currentParts.reduce((sum, part) => sum + calculatePartPrice(part), 0), [currentParts, vehicle.engineOilLiters]);
  
  const recommendedLaborCharge = useMemo(() => selectedRecommended.reduce((sum, job) => sum + job.charge, 0), [selectedRecommended]);
  const optionalServiceCharge = useMemo(() => selectedOptional.reduce((sum, job) => sum + job.charge, 0), [selectedOptional]);
  const customLaborCharge = useMemo(() => customLabor.reduce((sum, job) => sum + job.charge, 0), [customLabor]);

  const availableCustomLabor = useMemo(() => {
    return getAvailableCustomLabor(vehicle.model, workshopId);
  }, [vehicle.model, workshopId]);
  
  const totalLaborCharge = useMemo(() => pmsLaborCharge + recommendedLaborCharge + optionalServiceCharge + customLaborCharge, [pmsLaborCharge, recommendedLaborCharge, optionalServiceCharge, customLaborCharge]);
  const gstOnLabor = useMemo(() => (totalLaborCharge - optionalServiceCharge) * GST_RATE, [totalLaborCharge, optionalServiceCharge]);
  
  const discountableLaborCharge = useMemo(() => {
    const pms = pmsLaborCharge;
    const specificRecommended = selectedRecommended
      .filter(job => job.name === 'NITROGEN GAS FILLING' || job.name.startsWith('WHEEL'))
      .reduce((sum, job) => sum + job.charge, 0);
    return pms + specificRecommended;
  }, [pmsLaborCharge, selectedRecommended]);

  useEffect(() => {
    let laborDiscount = 0;
    const numericDiscountValue = Number(discountValue) || 0;

    if (discountType === 'percentage') {
      laborDiscount = discountableLaborCharge * (numericDiscountValue / 100);
    } else {
      laborDiscount = numericDiscountValue;
    }
    
    laborDiscount = Math.min(laborDiscount, discountableLaborCharge);
    setCalculatedDiscount(laborDiscount);

    const newTotal = totalLaborCharge + gstOnLabor + partsTotal - laborDiscount;
    setFinalTotal(newTotal);

  }, [discountValue, discountType, totalLaborCharge, gstOnLabor, partsTotal, discountableLaborCharge]);


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
  
  const handleEngineOilChange = (newOilName: string) => {
      const newOilPart = petrolEngineOils.find(p => p.name === newOilName);
      if (!newOilPart) return;

      setCurrentParts(prevParts => {
          const otherParts = prevParts.filter(p => !allEngineOilParts.some(eo => eo.name === p.name));
          return [...otherParts, newOilPart];
      });
  };
  
  const handleCoolantChange = (newCoolantName: string) => {
      const newCoolantPart = allCoolantParts.find(p => p.name === newCoolantName);
      if (!newCoolantPart) return;

      setCurrentParts(prevParts => {
          const otherParts = prevParts.filter(p => !allCoolantParts.some(c => c.name === p.name));
          return [...otherParts, newCoolantPart];
      });
  };

  const handleGenerateScript = async () => {
    setIsGeneratingScript(true);
    setCustomerScript('');
    try {
        const result = await generateCustomerScript({
            vehicleModel: vehicle.model,
            serviceType: serviceType,
            totalCost: finalTotal,
            parts: currentParts.map(p => ({...p, price: calculatePartPrice(p)})),
            labor: [...labor, ...customLabor, ...selectedRecommended, ...selectedOptional],
        });
        setCustomerScript(result.script);
    } catch (error) {
        console.error("Error generating script:", error);
        toast({
            variant: "destructive",
            title: 'Script Generation Failed',
            description: 'Could not generate the customer script. Please try again.',
        });
    } finally {
        setIsGeneratingScript(false);
    }
  }

  const isPmsPriceMissing = labor.length === 0 && serviceType.startsWith('Paid Service');

  return (
    <div>
        <CardHeader>
            <CardTitle>Service Estimate</CardTitle>
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

           {currentParts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Package className="h-5 w-5"/> Scheduled Service Parts</h3>
                <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Part Description</TableHead>
                          <TableHead className="text-right">Price (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentParts.map((part, index) => {
                           const isEngineOil = allEngineOilParts.some(eo => eo.name === part.name);
                           const isCoolant = allCoolantParts.some(c => c.name === part.name);
                           const isDiesel = vehicle.fuelType === 'Diesel';
                           const finalPrice = calculatePartPrice(part);

                           if (isEngineOil && !isDiesel) {
                            return (
                               <TableRow key={`part-${index}`}>
                                <TableCell className="font-medium">
                                    <Select value={part.name} onValueChange={handleEngineOilChange}>
                                        <SelectTrigger className="w-full sm:w-[300px]">
                                            <SelectValue placeholder="Select Engine Oil" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {petrolEngineOils.map(oil => (
                                                <SelectItem key={oil.name} value={oil.name}>
                                                    {oil.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {vehicle.engineOilLiters} L @ ₹{part.price.toFixed(2)}/L
                                    </p>
                                </TableCell>
                                <TableCell className="text-right">{finalPrice.toFixed(2)}</TableCell>
                            </TableRow>
                            )
                          }
                          
                          if (isCoolant) {
                             return (
                               <TableRow key={`part-${index}`}>
                                <TableCell className="font-medium">
                                     <Select value={part.name} onValueChange={handleCoolantChange}>
                                        <SelectTrigger className="w-full sm:w-[300px]">
                                            <SelectValue placeholder="Select Coolant" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allCoolantParts.map(coolant => (
                                                <SelectItem key={coolant.name} value={coolant.name}>
                                                    {coolant.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
                               </TableRow>
                             )
                          }

                          return (
                            <TableRow key={`part-${index}`}>
                                <TableCell className="font-medium">
                                    {part.name}
                                    {isEngineOil && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {vehicle.engineOilLiters} L @ ₹{part.price.toFixed(2)}/L
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">{finalPrice.toFixed(2)}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                </div>
              </div>
          )}

           <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Hammer className="h-5 w-5"/> Scheduled Service Labor</h3>
            {isPmsPriceMissing ? (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>PMS Labor Price Not Set</AlertTitle>
                    <AlertDescription>The labor charge for this service has not been defined for this workshop. The total estimate will be inaccurate.</AlertDescription>
                </Alert>
            ) : labor.length > 0 ? (
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
                          <TableRow key={`labor-${index}`}>
                            <TableCell className="font-medium">{job.name}</TableCell>
                            <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </div>
            ) : null}
          </div>
          
          {[...customLabor, ...selectedRecommended, ...selectedOptional].length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 mt-4">Additional Services</h3>
                <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service Description</TableHead>
                          <TableHead className="text-right">Charge (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...customLabor, ...selectedRecommended, ...selectedOptional].map((job, index) => (
                          <TableRow key={`additional-${index}`}>
                            <TableCell className="font-medium">{job.name}</TableCell>
                            <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </div>
              </div>
          )}

        <div className="no-print">
            {availableCustomLabor.length > 0 && (
            <div className="space-y-4 rounded-lg border border-dashed p-4 mt-4">
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
                                    <MinusCircle className="h-4 w-4 text-destructive"/>
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
             <div className="space-y-4 rounded-lg border border-dashed p-4">
                <Button variant="link" onClick={() => setShowRecommended(!showRecommended)} className="p-0 h-auto text-lg font-semibold mb-2 flex items-center gap-2 text-primary">
                    <PlusCircle className="h-5 w-5"/> Recommended Services
                    {showRecommended ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
                {showRecommended && (
                  <div className="animate-accordion-down">
                    <p className="text-sm text-muted-foreground mb-4">Select any additional services you would like to include.</p>
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
                                </label>
                                <p className="text-sm font-semibold">₹{job.charge.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {optionalServices && optionalServices.length > 0 && (
             <div className="space-y-4 rounded-lg border border-dashed p-4 border-primary/50 bg-primary/5">
                <Button variant="link" onClick={() => setShowOptional(!showOptional)} className="p-0 h-auto text-lg font-semibold mb-2 flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5"/> 3M Optional Services
                    {showOptional ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
                {showOptional && (
                  <div className="animate-accordion-down">
                    <p className="text-sm text-muted-foreground mb-4">Select any premium 3M services to add.</p>
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
                                </label>
                                <p className="text-sm font-semibold">₹{job.charge.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          )}
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
      <CardFooter className="bg-muted/50 p-4 mt-6 rounded-b-lg flex-col items-stretch gap-2">
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
              <p>Subtotal (Parts):</p>
              <p>₹{partsTotal.toFixed(2)}</p>
          </div>
           <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
              <p>Subtotal (Labor):</p>
              <p>₹{totalLaborCharge.toFixed(2)}</p>
          </div>
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
              <p>GST on Labor (18%):</p>
              <p>₹{gstOnLabor.toFixed(2)}</p>
          </div>
          {calculatedDiscount > 0 && (
             <div className="w-full flex justify-between items-center text-sm text-green-600">
                <p>Discount on Labor:</p>
                <p>- ₹{calculatedDiscount.toFixed(2)}</p>
            </div>
          )}
        <Separator className="my-1"/>
        <div className="w-full flex justify-between items-center">
            <p className="text-xl font-bold">Total Estimate:</p>
            <p className="text-xl font-bold">₹{finalTotal.toFixed(2)}</p>
        </div>
        <div className="w-full mt-4 no-print space-y-4">
            <Button onClick={() => window.print()} className="w-full">
                <Printer className="mr-2 h-4 w-4" />
                Print Estimate
            </Button>
            <Button onClick={handleGenerateScript} className="w-full" variant="secondary" disabled={isGeneratingScript}>
               {isGeneratingScript ? <Bot className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                Generate Customer Script
            </Button>
        </div>
      </CardFooter>
      
      {(isGeneratingScript || customerScript) && (
        <div className="mt-4 no-print px-6 pb-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot /> AI-Generated Customer Script
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isGeneratingScript && (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/6" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    )}
                    {customerScript && (
                        <Textarea 
                            value={customerScript}
                            readOnly
                            className="min-h-[200px] text-base"
                        />
                    )}
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
