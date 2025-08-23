
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, PlusCircle, Trash2, Pencil, Search, Loader2, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Vehicle } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { addVehicle, updateVehicle, deleteVehicle, getFullDataFromFirebase } from '../data/actions';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';


export default function VehicleManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Partial<Vehicle> & { model_original?: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTableOpen, setIsTableOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
        setIsLoading(true);
        try {
            const data = await getFullDataFromFirebase();
            setVehicles(data.vehicles || []);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error loading data', description: 'Could not fetch vehicles from Firebase.' });
        } finally {
            setIsLoading(false);
        }
    }
    loadData();
  }, [toast]);

  const handleAddVehicle = () => {
    setIsEditing(false);
    setCurrentVehicle({ fuelTypes: [], productionYears: [], variants: [] });
    setIsVehicleDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setIsEditing(true);
    setCurrentVehicle({ ...vehicle, model_original: vehicle.model });
    setIsVehicleDialogOpen(true);
  };

  const handleDeleteVehicle = async (vehicleToDelete: Vehicle) => {
    setIsMutating(true);
    const result = await deleteVehicle(vehicleToDelete);
    if (result.success) {
      setVehicles(prev => prev.filter(v => v.model !== vehicleToDelete.model));
      toast({ title: 'Vehicle Deleted', description: 'The vehicle has been removed from the database.' });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsMutating(false);
  };

  const handleSaveVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentVehicle || !currentVehicle.model || !currentVehicle.brand || !currentVehicle.category || !currentVehicle.fuelTypes || !currentVehicle.productionYears) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill all required fields.' });
        return;
    }
    setIsMutating(true);
    setIsVehicleDialogOpen(false);
    
    const fuelTypesArray = typeof currentVehicle.fuelTypes === 'string' 
        ? (currentVehicle.fuelTypes as string).split(',').map(s => s.trim()).filter(Boolean)
        : currentVehicle.fuelTypes;
    const productionYearsArray = typeof currentVehicle.productionYears === 'string'
        ? (currentVehicle.productionYears as string).split(',').map(s => parseInt(s.trim(), 10)).filter(y => !isNaN(y))
        : currentVehicle.productionYears;

    const newVehicle: Vehicle = {
        model: currentVehicle.model,
        brand: currentVehicle.brand as any,
        category: currentVehicle.category,
        variants: typeof currentVehicle.variants === 'string' ? (currentVehicle.variants as string).split(',').map(s => s.trim()).filter(Boolean) : (currentVehicle.variants || []),
        fuelTypes: fuelTypesArray,
        productionYears: productionYearsArray.sort((a,b) => a - b),
        engineOilQuantity: currentVehicle.engineOilQuantity || '',
        engineOilLiters: Number(currentVehicle.engineOilLiters) || undefined,
        defaultEngineOil: currentVehicle.defaultEngineOil || '',
    };

    if (isEditing) {
        const result = await updateVehicle(newVehicle);
        if (result.success) {
            setVehicles(prev => prev.map(v => v.model === currentVehicle.model_original ? newVehicle : v));
            toast({ title: 'Success', description: 'Vehicle updated.' });
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    } else {
        if (vehicles.some(v => v.model.toLowerCase() === newVehicle.model.toLowerCase())) {
            toast({ variant: 'destructive', title: 'Error', description: 'A vehicle with this model name already exists.' });
            setIsMutating(false);
            return;
        }
        const result = await addVehicle(newVehicle);
        if (result.success) {
            setVehicles(prev => [...prev, newVehicle].sort((a, b) => a.model.localeCompare(b.model)));
            toast({ title: 'Success', description: 'New vehicle added.' });
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    }
    setIsMutating(false);
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
    
    return [...vehicles]
      .filter(vehicle =>
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const orderA = brandOrder[a.brand] || 99;
        const orderB = brandOrder[b.brand] || 99;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return a.model.localeCompare(b.model);
      });
  }, [vehicles, searchTerm]);


  return (
    <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-2"><Car /> Manage Vehicle Models</CardTitle>
                <CardDescription>Add, edit, or remove vehicle models. Changes are saved directly to the database.</CardDescription>
            </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative w-full sm:w-auto flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-8 w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                  <Button onClick={handleAddVehicle} className="shrink-0">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <Collapsible open={isTableOpen} onOpenChange={setIsTableOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="mb-4">
                        {isTableOpen ? <ChevronsRight className="mr-2 h-4 w-4" /> : <ChevronsLeft className="mr-2 h-4 w-4" />}
                        {isTableOpen ? 'Hide' : 'Show'} Table ({sortedAndFilteredVehicles.length} items)
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <ScrollArea className="h-[60vh] relative border rounded-md">
                        <div className="relative">
                            <Table>
                                <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Engine Oil</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-48 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                                <span className="text-muted-foreground">Loading Vehicle Data...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : sortedAndFilteredVehicles.length === 0 ? (
                                     <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">No vehicles found.</TableCell>
                                    </TableRow>
                                ) : sortedAndFilteredVehicles.map((vehicle) => (
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
                                        <Button variant="ghost" size="icon" onClick={() => handleEditVehicle(vehicle)} disabled={isMutating}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteVehicle(vehicle)} disabled={isMutating}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            {(isMutating || isLoading) && (
                                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                        <span className="text-muted-foreground">{isLoading ? 'Loading...' : 'Updating...'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CollapsibleContent>
            </Collapsible>
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
                            <Input id="model" name="model" value={currentVehicle?.model || ''} onChange={handleDialogInputChange} className="col-span-3" required disabled={isEditing}/>
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
                            <Label htmlFor="engineOilQuantity" className="text-right">Engine Oil (Desc)</Label>
                            <Input id="engineOilQuantity" name="engineOilQuantity" value={currentVehicle?.engineOilQuantity || ''} onChange={handleDialogInputChange} className="col-span-3" placeholder="e.g. 3.1 Liters" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="engineOilLiters" className="text-right">Engine Oil (Liters)</Label>
                            <Input id="engineOilLiters" name="engineOilLiters" type="number" step="0.1" value={currentVehicle?.engineOilLiters || ''} onChange={handleDialogInputChange} className="col-span-3" placeholder="e.g. 3.1" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="defaultEngineOil" className="text-right">Default Oil Part</Label>
                            <Input id="defaultEngineOil" name="defaultEngineOil" value={currentVehicle?.defaultEngineOil || ''} onChange={handleDialogInputChange} className="col-span-3" placeholder="Part name from Parts list" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isMutating}>
                            {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </Card>
  );
}
