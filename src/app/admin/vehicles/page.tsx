
"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, PlusCircle, Trash2, Pencil, Search } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddVehicle = () => {
    setCurrentVehicle({});
    setIsVehicleDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setCurrentVehicle(vehicle);
    setIsVehicleDialogOpen(true);
  };

  const handleDeleteVehicle = (model: string) => {
    toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
  };

  const handleSaveVehicle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
    setIsVehicleDialogOpen(false);
    setCurrentVehicle(null);
  };
  
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Card>
        <Dialog open={isVehicleDialogOpen} onOpenChange={setIsVehicleDialogOpen}>
            <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2"><Car /> Manage Vehicle Models</CardTitle>
                    <CardDescription>Add, edit, or remove vehicle models.</CardDescription>
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
            <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSaveVehicle}>
                    <DialogHeader>
                        <DialogTitle>{currentVehicle?.model ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the vehicle model. Model names must be unique.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">Model</Label>
                            <Input id="model" name="model" defaultValue={currentVehicle?.model} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right">Brand</Label>
                            <Select name="brand" defaultValue={currentVehicle?.brand} required>
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
                            <Input id="category" name="category" defaultValue={currentVehicle?.category} className="col-span-3" required />
                        </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fuelTypes" className="text-right">Fuel Types</Label>
                            <Input id="fuelTypes" name="fuelTypes" defaultValue={currentVehicle?.fuelTypes?.join(', ')} className="col-span-3" placeholder="e.g. Petrol, CNG" required />
                        </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="productionYears" className="text-right">Prod. Years</Label>
                            <Input id="productionYears" name="productionYears" defaultValue={currentVehicle?.productionYears?.join(', ')} className="col-span-3" placeholder="e.g. 2022, 2023" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <CardContent>
            <ScrollArea className="h-[70vh] relative">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Fuel Types</TableHead>
                    <TableHead>Prod. Years</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.model}>
                    <TableCell className="font-medium">{vehicle.model}</TableCell>
                    <TableCell>
                        <Badge variant={vehicle.brand === 'Nexa' ? 'default' : 'secondary'}>
                        {vehicle.brand}
                        </Badge>
                    </TableCell>
                    <TableCell>{vehicle.category}</TableCell>
                    <TableCell>
                        <div className="flex flex-wrap gap-1">
                            {vehicle.fuelTypes.map(fuel => <Badge key={fuel} variant="outline">{fuel}</Badge>)}
                        </div>
                    </TableCell>
                    <TableCell>
                        {vehicle.productionYears.join(', ')}
                    </TableCell>
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
    </Card>
  );
}
