"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { serviceData, vehicles } from '@/lib/data';
import { ServiceEstimate } from './service-estimate';
import type { ServiceEstimateData, Vehicle } from '@/lib/types';

export function VehicleServiceForm() {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [estimate, setEstimate] = useState<ServiceEstimateData | null>(null);
  const [error, setError] = useState<string>('');

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

    const serviceInfo = serviceData[selectedService as keyof typeof serviceData];
    if (!serviceInfo) {
      setError('Service data not found.');
      setEstimate(null);
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
    setError('');
  };

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            
            {currentVehicle && currentVehicle.fuelTypes.length > 1 && (
                 <div className="space-y-2">
                    <Label htmlFor="fuel-type">Fuel Type</Label>
                    <Select onValueChange={setSelectedFuelType} value={selectedFuelType} disabled={!selectedModel}>
                        <SelectTrigger id="fuel-type">
                            <SelectValue placeholder="Select Fuel Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {currentVehicle.fuelTypes.map(fuel => (
                                <SelectItem key={fuel} value={fuel}>
                                    {fuel}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            
            <div className="space-y-2">
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
        
        <Button onClick={handleSearch} className="w-full md:w-auto">Get Estimate</Button>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {estimate && <ServiceEstimate estimate={estimate} />}
    </>
  );
}
