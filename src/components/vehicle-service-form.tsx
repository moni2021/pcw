
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { vehicles, serviceDataLookup } from '@/lib/data';
import { ServiceEstimate } from './service-estimate';
import type { ServiceEstimateData } from '@/lib/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Car, Tag, Building, Building2, Droplets } from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';
import { threeMCareData } from '@/lib/3m-care-data';
import { pmsCharges } from '@/lib/pms-charges';
import { workshops } from '@/lib/workshops-data';
import { customLaborData } from '@/lib/custom-labor-data';

const commonServices = [
    { name: 'NITROGEN GAS FILLING', charge: 200 },
    { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
    { name: 'ENGINE ROOM PAINTING', charge: 400 },
    { name: 'STRUT GREASING', charge: 1650 },
    { name: 'HEADLAMP FOCUSSING', charge: 400 },
].map(l => ({ ...l, workshopId: 'default' })); // These are common and don't need workshop-specific pricing for now

const serviceTypes = [
  '1st Free Service (1,000 km)',
  '2nd Free Service (5,000 km)',
  '3rd Free Service (10,000 km)',
  'Paid Service (20,000 km)',
  'Paid Service (30,000 km)',
  'Paid Service (40,000 km)',
  'Paid Service (50,000 km)',
  'Paid Service (60,000 km)',
  'Paid Service (70,000 km)',
  'Paid Service (80,000 km)',
  'Paid Service (90,000 km)',
  'Paid Service (100,000 km)',
  'Paid Service (110,000 km)',
  'Paid Service (120,000 km)',
];

export function VehicleServiceForm() {
  const { setTheme } = useTheme();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [estimate, setEstimate] = useState<ServiceEstimateData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If there's only one workshop, auto-select it.
    if (workshops.length === 1) {
      setSelectedWorkshop(workshops[0].id);
    }
  }, []);

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
  
  const resetSelections = () => {
    setSelectedModel('');
    setSelectedFuelType('');
    setSelectedYear('');
    setSelectedServiceType('');
    setEstimate(null);
    setError('');
  }

  const handleWorkshopChange = (workshopId: string) => {
    setSelectedWorkshop(workshopId);
    resetSelections();
  };
  
  const handleModelChange = (model: string) => {
    const vehicle = vehicles.find(v => v.model === model);
    setSelectedModel(model);
    setSelectedFuelType('');
    setSelectedYear('');
    setSelectedServiceType('');
    setEstimate(null);
    setError('');
    
    if (vehicle && vehicle.fuelTypes.length === 1) {
      setSelectedFuelType(vehicle.fuelTypes[0]);
    }
  };

  const handleFuelTypeChange = (fuelType: string) => {
    setSelectedFuelType(fuelType);
    setSelectedYear('');
    setSelectedServiceType('');
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
      
      let suggestedService = '';

      if (vehicleAge <= 0) { // Current year or future
          suggestedService = '1st Free Service (1,000 km)';
      } else if (vehicleAge === 1) {
          suggestedService = '3rd Free Service (10,000 km)';
      } else {
          const estimatedKm = vehicleAge * 10000;
          // Find the closest paid service
          const paidServices = serviceTypes.filter(s => s.startsWith('Paid Service'));
          let closestService = paidServices[0];
          let smallestDiff = Infinity;

          paidServices.forEach(service => {
              const serviceKm = parseInt(service.match(/\(([\d,]+)\s*km\)/)?.[1].replace(/,/g, '') || '0', 10);
              const diff = Math.abs(estimatedKm - serviceKm);
              if (diff < smallestDiff) {
                  smallestDiff = diff;
                  closestService = service;
              }
          });
          suggestedService = closestService;
      }
      setSelectedServiceType(suggestedService);
  }

  const handleServiceTypeChange = (serviceType: string) => {
    setSelectedServiceType(serviceType);
    setEstimate(null);
    setError('');
  }


  const handleSearch = () => {
    if (!selectedWorkshop || !selectedModel || !selectedFuelType || !selectedYear || !selectedServiceType) {
      setError('Please fill all the fields to get an estimate.');
      setEstimate(null);
      return;
    }
    
    setIsLoading(true);
    setEstimate(null);
    setError('');

    setTimeout(() => {
       const vehicleInfo = vehicles.find(v => v.model === selectedModel);
       if (!vehicleInfo) {
           setError('Vehicle data not found.');
           setEstimate(null);
           setIsLoading(false);
           return;
       }

      const serviceLookupKey = `${selectedModel} ${selectedFuelType} ${selectedServiceType}`;
      const serviceDetails = serviceDataLookup[serviceLookupKey];
      
      let pmsLabor = [];
      if (selectedServiceType.startsWith('Paid Service')) {
          const pmsCharge = pmsCharges.find(p => p.model === selectedModel && p.labourDesc === selectedServiceType && p.workshopId === selectedWorkshop);
          if (pmsCharge) {
              pmsLabor.push({ name: 'Periodic Maintenance Service', charge: pmsCharge.basicAmt });
          } else {
              console.warn(`No PMS charge found for ${selectedModel} at workshop ${selectedWorkshop} for service ${selectedServiceType}`);
          }
      }

      const newEstimate: ServiceEstimateData = {
        workshopId: selectedWorkshop,
        vehicle: {
          model: selectedModel,
          fuelType: selectedFuelType,
          productionYear: parseInt(selectedYear, 10),
          brand: vehicleInfo.brand,
          category: vehicleInfo.category,
        },
        serviceType: selectedServiceType,
        parts: serviceDetails?.parts || [],
        labor: pmsLabor,
        recommendedLabor: commonServices,
        optionalServices: threeMCareData[selectedModel] || [],
        totalPrice: 0, // This will be calculated in the ServiceEstimate component
      };
      
      setEstimate(newEstimate);
      setIsLoading(false);
    }, 1500);
  };


  return (
    <>
      <div className="no-print">
        <CardHeader>
          <CardTitle>Create an Estimate</CardTitle>
          <CardDescription>Select your vehicle and service type to get an estimate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {workshops.length > 1 && (
            <div className="space-y-2">
              <Label htmlFor="workshop">Workshop</Label>
              <Select onValueChange={handleWorkshopChange} value={selectedWorkshop} >
                <SelectTrigger id="workshop">
                  <SelectValue placeholder="Select Workshop" />
                </SelectTrigger>
                <SelectContent>
                  {workshops.map(workshop => (
                    <SelectItem key={workshop.id} value={workshop.id}>
                      {workshop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
              <Label htmlFor="vehicle-model">Vehicle Model</Label>
               <Select onValueChange={handleModelChange} value={selectedModel} disabled={!selectedWorkshop}>
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
 <p className="text-sm text-muted-foreground mt-1">Note: Until data is available for all workshops, all estimates are currently based on Bijangar workshop.</p>

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
                  {currentVehicle.engineOilQuantity && (
                    <Badge variant="outline">
                        <Droplets className="mr-1 h-3 w-3" />
                        Engine Oil: {currentVehicle.engineOilQuantity}
                    </Badge>
                  )}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-type">Service Type</Label>
            <Select onValueChange={handleServiceTypeChange} value={selectedServiceType} disabled={!selectedYear}>
              <SelectTrigger id="service-type">
                <SelectValue placeholder="Select Service Type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch} className="w-full" disabled={isLoading || !selectedServiceType}>
             {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Estimate'}
          </Button>
        </CardFooter>
      </div>

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
