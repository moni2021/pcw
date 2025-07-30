"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { serviceData, vehicles } from '@/lib/data';
import { ServiceEstimate } from './service-estimate';
import type { ServiceEstimateData, Vehicle } from '@/lib/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export function VehicleServiceForm() {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [estimate, setEstimate] = useState<ServiceEstimateData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const currentVehicle = useMemo(() => {
    return vehicles.find(v => v.model === selectedModel);
  }, [selectedModel]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedFuelType('');
    setEstimate(null);
    setError('');
    const vehicle = vehicles.find(v => v.model === model);
    if (vehicle && vehicle.fuelTypes.length === 1) {
      setSelectedFuelType(vehicle.fuelTypes[0]);
    }
  };

  const handleSearch = () => {
    if (!selectedModel || !selectedFuelType || !selectedService) {
      setError('Please fill all the fields to get an estimate.');
      setEstimate(null);
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const serviceInfo = serviceData[selectedService as keyof typeof serviceData];
      if (!serviceInfo) {
        setError('Service data not found.');
        setEstimate(null);
        setIsLoading(false);
        return;
      }
      
      const { parts, labor } = serviceInfo;
      const totalPartsPrice = parts.reduce((sum, part) => sum + part.price, 0);
      const totalLaborCharge = labor.reduce((sum, job) => sum + job.charge, 0);

      const newEstimate: ServiceEstimateData = {
        vehicle: {
          model: selectedModel,
          fuelType: selectedFuelType,
        },
        serviceType: selectedService,
        parts,
        labor,
        totalPrice: totalPartsPrice + totalLaborCharge,
      };
      
      setEstimate(newEstimate);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Create an Estimate</CardTitle>
        <CardDescription>Select your vehicle and service type to get an instant price quote.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="space-y-2">
                <Label htmlFor="fuel-type">Fuel Type</Label>
                <Select onValueChange={setSelectedFuelType} value={selectedFuelType} disabled={!currentVehicle || currentVehicle.fuelTypes.length <= 1}>
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
            
            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="service-type">Service Type</Label>
                <Select onValueChange={setSelectedService} value={selectedService}>
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
        <Button onClick={handleSearch} className="w-full" disabled={isLoading}>
           {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Estimate'}
        </Button>
      </CardFooter>

      {estimate && <ServiceEstimate estimate={estimate} />}
    </>
  );
}
