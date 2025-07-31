
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { serviceData, vehicles, serviceDataLookup } from '@/lib/data';
import { pmsCharges } from '@/lib/pms-charges';
import { ServiceEstimate } from './service-estimate';
import type { ServiceEstimateData, Vehicle, Labor, Service } from '@/lib/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Car, Tag, Building2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';
import { threeMCareData } from '@/lib/3m-care-data';

const commonServices: Labor[] = [
    { name: 'NITROGEN GAS FILLING', charge: 200 },
    { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
    { name: 'ENGINE ROOM PAINTING', charge: 400 },
    { name: 'STRUT GREASING', charge: 1650 },
    { name: 'HEADLAMP FOCUSSING', charge: 400 },
];

export function VehicleServiceForm() {
  const { setTheme } = useTheme();
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [estimate, setEstimate] = useState<ServiceEstimateData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const currentVehicle = useMemo(() => {
    return vehicles.find(v => v.model === selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    if (currentVehicle && currentVehicle.brand) {
      setTheme(currentVehicle.brand.toLowerCase() as 'arena' | 'nexa');
    } else {
      setTheme('default');
    }
  }, [currentVehicle, setTheme]);

  const handleModelChange = (model: string) => {
    const vehicle = vehicles.find(v => v.model === model);
    setSelectedModel(model);
    setSelectedFuelType('');
    setSelectedYear('');
    setSelectedService('');
    setEstimate(null);
    setError('');
    
    if (vehicle && vehicle.fuelTypes.length === 1) {
      setSelectedFuelType(vehicle.fuelTypes[0]);
    }
  };

  const handleFuelTypeChange = (fuelType: string) => {
    setSelectedFuelType(fuelType);
    setSelectedYear('');
    setSelectedService('');
    setEstimate(null);
    setError('');
  }
  
  const handleYearChange = (yearStr: string) => {
      const year = parseInt(yearStr, 10);
      setSelectedYear(yearStr);
      setEstimate(null);
      setError('');

      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - year;
      
      let autoSelectedService = '';

      if (vehicleAge <= 0) { // Current year or future
          autoSelectedService = '1st Free Service (1,000 km)';
      } else if (vehicleAge === 1) {
          autoSelectedService = '3rd Free Service (10,000 km)';
      } else {
          const mileageKey = vehicleAge * 10000;
          
          const serviceKeys = Object.keys(serviceData);
          let closestService = '';
          let smallestDiff = Infinity;

          for (const key of serviceKeys) {
              const kmMatch = key.match(/\((\d{1,3}(,\d{3})*|\d+)\s?km\)/);
              if (kmMatch) {
                  const km = parseInt(kmMatch[1].replace(/,/g, ''), 10);
                  const diff = Math.abs(mileageKey - km);
                  if (diff < smallestDiff) {
                      smallestDiff = diff;
                      closestService = key;
                  }
              }
          }
          autoSelectedService = closestService || `Paid Service (${(vehicleAge * 10).toString()},000 km)`;
      }
      
      if (serviceData[autoSelectedService as keyof typeof serviceData]) {
        setSelectedService(autoSelectedService);
      } else {
        const firstPaidService = Object.keys(serviceData).find(s => s.startsWith('Paid'));
        setSelectedService(firstPaidService || '');
      }
  }

  const handleSearch = () => {
    if (!selectedModel || !selectedFuelType || !selectedService) {
      setError('Please fill all the fields to get an estimate.');
      setEstimate(null);
      return;
    }
    
    setIsLoading(true);
    setEstimate(null);
    setError('');

    // Simulate API call
    setTimeout(() => {
       const vehicleInfo = vehicles.find(v => v.model === selectedModel);
       if (!vehicleInfo) {
           setError('Vehicle data not found.');
           setEstimate(null);
           setIsLoading(false);
           return;
       }

      const lookupKey = `${selectedService}-${selectedModel.toUpperCase()}-${selectedFuelType.toUpperCase()}`;
      let serviceInfo: Service | undefined = serviceDataLookup[lookupKey];

      const pmsServiceRegex = /Paid Service \((\d+),000 km\)/;
      const match = selectedService.match(pmsServiceRegex);

      let pmsCharge = 0;
      if (match) {
        const km = parseInt(match[1], 10);
        const pmsEntry = pmsCharges.find(p => p.model.toUpperCase() === selectedModel.toUpperCase() && p.labourDesc.includes(`${km}K`));
        if (pmsEntry) {
            pmsCharge = pmsEntry.basicAmt;
        }
      }
      
      if (!serviceInfo) {
        // Fallback for generic services like 1st and 2nd free service
        const genericService = serviceData[selectedService as keyof typeof serviceData];
        if (genericService) {
             const labor = pmsCharge > 0 ? [{ name: 'Periodic Maintenance Service', charge: pmsCharge }] : genericService.labor;
             const totalPartsPrice = genericService.parts.reduce((sum, part) => sum + part.price, 0);
             const totalLaborCharge = labor.reduce((sum, job) => sum + job.charge, 0);
             const newEstimate: ServiceEstimateData = {
                vehicle: {
                    model: selectedModel,
                    fuelType: selectedFuelType,
                    productionYear: parseInt(selectedYear, 10),
                    brand: vehicleInfo.brand,
                    category: vehicleInfo.category,
                },
                serviceType: selectedService,
                parts: genericService.parts,
                labor: labor,
                recommendedLabor: [...(genericService.recommendedLabor || []), ...commonServices],
                optionalServices: threeMCareData[selectedModel] || [],
                totalPrice: totalPartsPrice + totalLaborCharge,
            };
            setEstimate(newEstimate);
        } else {
            setError('Service data not found for the selected vehicle model, fuel type, and service. Please check our database or contact support.');
            setEstimate(null);
        }
        setIsLoading(false);
        return;
      }
      
      const { parts } = serviceInfo;

      const labor = pmsCharge > 0 ? [{ name: 'Periodic Maintenance Service', charge: pmsCharge }] : serviceInfo.labor;

      const totalPartsPrice = parts.reduce((sum, part) => sum + part.price, 0);
      const totalLaborCharge = labor.reduce((sum, job) => sum + job.charge, 0);

      const newEstimate: ServiceEstimateData = {
        vehicle: {
          model: selectedModel,
          fuelType: selectedFuelType,
          productionYear: parseInt(selectedYear, 10),
          brand: vehicleInfo.brand,
          category: vehicleInfo.category,
        },
        serviceType: selectedService,
        parts,
        labor,
        recommendedLabor: [...(serviceInfo.recommendedLabor || []), ...commonServices],
        optionalServices: threeMCareData[selectedModel] || [],
        totalPrice: totalPartsPrice + totalLaborCharge,
      };
      
      setEstimate(newEstimate);
      setIsLoading(false);
    }, 1500);
  };


  return (
    <>
      <CardHeader>
        <CardTitle>Create an Estimate</CardTitle>
        <CardDescription>Select your vehicle and service type to get an instant price quote.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="vehicle-model">Vehicle Model</Label>
             <Select onValueChange={handleModelChange} value={selectedModel}>
                <SelectTrigger id="vehicle-model">
                    <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                    {vehicles.map(vehicle => (
                        <SelectItem key={vehicle.model} value={vehicle.model}>
                            {vehicle.model}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        {currentVehicle && (
             <div className="flex flex-wrap gap-2 items-center">
                 <Badge variant="outline">
                    <Building2 className="mr-1 h-3 w-3" />
                    {currentVehicle.brand}
                </Badge>
                <Badge variant="outline">
                    <Tag className="mr-1 h-3 w-3" />
                    {currentVehicle.category}
                </Badge>
             </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="fuel-type">Fuel Type</Label>
                <Select onValueChange={handleFuelTypeChange} value={selectedFuelType} disabled={!currentVehicle || currentVehicle.fuelTypes.length <= 1}>
                    <SelectTrigger id="fuel-type">
                        <SelectValue placeholder="Select Fuel Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {currentVehicle?.fuelTypes.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>
                                {fuel}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
             <div className="space-y-2">
                <Label htmlFor="production-year">Production Year</Label>
                <Select onValueChange={handleYearChange} value={selectedYear} disabled={!selectedFuelType}>
                    <SelectTrigger id="production-year">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {currentVehicle?.productionYears.slice().reverse().map(year => (
                            <SelectItem key={year} value={String(year)}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>


            <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="service-type">Service Type</Label>
                <Select onValueChange={setSelectedService} value={selectedService} disabled={!selectedYear}>
                    <SelectTrigger id="service-type">
                        <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(serviceData).map(service => (
                            <SelectItem key={service} value={service}>
                                {service}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSearch} className="w-full" disabled={isLoading || !selectedService}>
           {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Estimate'}
        </Button>
      </CardFooter>

      {isLoading && (
         <div className="relative p-6 overflow-x-hidden">
            <Separator />
            <div className="flex flex-col items-center justify-center space-y-4 h-48">
                 <div className="absolute left-0 w-full">
                    <div className="animate-drive-off">
                        <Car className="h-12 w-12 text-primary" />
                    </div>
                </div>
                <p className="text-lg font-semibold animate-pulse">Generating estimate for your {selectedModel}...</p>
            </div>
         </div>
      )}

      {estimate && !isLoading && (
        <div className="animate-fade-in-up">
            <Separator />
            <ServiceEstimate estimate={estimate} />
        </div>
      )}
    </>
  );
}
