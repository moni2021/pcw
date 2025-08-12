
"use client";

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, PlusCircle, Trash2, Pencil, Search, Droplets } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { vehicles as initialVehicles } from '@/lib/data';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Vehicle } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function VehicleManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Partial<Vehicle> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddVehicle = () => {
    setIsEditing(false);
    setCurrentVehicle({});
    setIsVehicleDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setIsEditing(true);
    setCurrentVehicle({ ...vehicle });
    setIsVehicleDialogOpen(true);
  };

  const handleDeleteVehicle = (model: string) => {
    setVehicles(prev => prev.filter(v => v.model !== model));
    toast({
      title: 'Vehicle Deleted',
      description: 'The vehicle has been removed from the list (local state).',
    });
  };

  const handleSaveVehicle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentVehicle || !currentVehicle.model || !currentVehicle.brand || !currentVehicle.category || !currentVehicle.fuelTypes || !currentVehicle.productionYears) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill all required fields.' });
        return;
    }
    
    // Convert comma-separated strings to arrays
    const fuelTypesArray = typeof currentVehicle.fuelTypes === 'string' 
        ? (currentVehicle.fuelTypes as string).split(',').map(s => s.trim()) 
        : currentVehicle.fuelTypes;
    const productionYearsArray = typeof currentVehicle.productionYears === 'string'
        ? (currentVehicle.productionYears as string).split(',').map(s => parseInt(s.trim(), 10)).filter(y => !isNaN(y))
        : currentVehicle.productionYears;

    const newVehicle: Vehicle = {
        model: currentVehicle.model,
        brand: currentVehicle.brand as any,
        category: currentVehicle.category,
        variants: currentVehicle.variants || [],
        fuelTypes: fuelTypesArray,
        productionYears: productionYearsArray,
        engineOilQuantity: currentVehicle.engineOilQuantity || '',
    };

    if (isEditing) {
        setVehicles(prev => prev.map(v => v.model === newVehicle.model ? newVehicle : v));
        toast({ title: 'Success', description: 'Vehicle updated.' });
    } else {
        if (vehicles.some(v => v.model.toLowerCase() === newVehicle.model.toLowerCase())) {
            toast({ variant: 'destructive', title: 'Error', description: 'A vehicle with this model name already exists.' });
            return;
        }
        setVehicles(prev => [...prev, newVehicle]);
        toast({ title: 'Success', description: 'New vehicle added.' });
    }

    setIsVehicleDialogOpen(false);
    setCurrentVehicle(null);
  };
  
  const handleDialogInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentVehicle(prev => ({...prev, [name]: value}));
  }

  const handleDialogSelectChange = (name: string, value: string) => {
    setCurrentVehicle(prev => ({...prev, [name]: value}));
  }
  
  const sortedAndFilteredVehicles = useMemo(() => {
    const brandOrder: { [key: string]: number } = { 'Nexa': 1, 'Arena': 2, 'Commercial': 3 };
    
    return vehicles
      .sort((a, b) => {
        const orderA = brandOrder[a.brand] || 99;
        const orderB = brandOrder[b.brand] || 99;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return a.model.localeCompare(b.model); // a secondary sort by model name
      })
      .filter(vehicle =>
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [vehicles, searchTerm]);


  return (
    <Card>
        <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-2"><Car /> Manage Vehicle Models</CardTitle>
                <CardDescription>Add, edit, or remove vehicle models and their properties.</CardDescription>
            </div>
              <div className="flex-1 flex justify-center sm:justify-end gap-2">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by model name..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                  <Button onClick={handleAddVehicle} className="shrink-0">
                    <PlusCircle /> Add New
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[70vh] relative">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Engine Oil</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {sortedAndFilteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.model}>
                    <TableCell className="font-medium">{vehicle.model}</TableCell>
                    <TableCell>
                        <Badge variant={vehicle.brand === 'Nexa' ? 'default' : 'secondary'}>
                        {vehicle.brand}
                        </Badge>
                    </TableCell>
                    <TableCell>{vehicle.category}</TableCell>
                    <TableCell>{vehicle.engineOilQuantity || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditVehicle(vehicle)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteVehicle(vehicle.model)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </ScrollArea>
        </CardContent>
        <Dialog open={isVehicleDialogOpen} onOpenChange={setIsVehicleDialogOpen}>
            <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleSaveVehicle}>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the vehicle model. Model names must be unique.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">Model</Label>
                            <Input id="model" name="model" value={currentVehicle?.model || ''} onChange={handleDialogInputChange} className="col-span-3" required disabled={isEditing} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right">Brand</Label>
                            <Select name="brand" value={currentVehicle?.brand} onValueChange={(value) => handleDialogSelectChange('brand', value)} required>
                                <SelectTrigger id="brand" className="col-span-3">
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Arena">Arena</SelectItem>
                                    <SelectItem value="Nexa">Nexa</SelectItem>
                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Input id="category" name="category" value={currentVehicle?.category || ''} onChange={handleDialogInputChange} className="col-span-3" required />
                        </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fuelTypes" className="text-right">Fuel Types</Label>
                            <Input id="fuelTypes" name="fuelTypes" value={Array.isArray(currentVehicle?.fuelTypes) ? currentVehicle.fuelTypes.join(', ') : ''} onChange={handleDialogInputChange} className="col-span-3" placeholder="e.g. Petrol, CNG" required />
                        </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="productionYears" className="text-right">Prod. Years</Label>
                            <Input id="productionYears" name="productionYears" value={Array.isArray(currentVehicle?.productionYears) ? currentVehicle.productionYears.join(', ') : ''} onChange={handleDialogInputChange} className="col-span-3" placeholder="e.g. 2022, 2023" required />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="engineOilQuantity" className="text-right">Engine Oil</Label>
                            <Input id="engineOilQuantity" name="engineOilQuantity" value={currentVehicle?.engineOilQuantity || ''} onChange={handleDialogInputChange} className="col-span-3" placeholder="e.g. 3.1 Liters" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </Card>
  );
}
