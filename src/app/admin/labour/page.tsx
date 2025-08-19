
"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench, PlusCircle, Trash2, Pencil, Search, Check, ChevronsUpDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { workshopData } from '@/lib/workshop-data-loader';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { CustomLabor, Vehicle } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { vehicles as initialVehicles } from '@/lib/data';
import { workshops as initialWorkshops } from '@/lib/data/workshops';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

// Combine custom labor data from all workshops
const initialCustomLaborData = [...workshopData.customLabor];


export default function LabourManagementPage() {
  const [customLabor, setCustomLabor] = useState<CustomLabor[]>(initialCustomLaborData);
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [workshops] = useState(initialWorkshops);
  const [isLaborDialogOpen, setIsLaborDialogOpen] = useState(false);
  const [currentLabor, setCurrentLabor] = useState<Partial<CustomLabor> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);
  const { toast } = useToast();

  const handleAddLabor = () => {
    setIsEditing(false);
    setCurrentLabor({ workshopId: workshops[0]?.id || 'default' });
    setIsLaborDialogOpen(true);
  };

  const handleEditLabor = (labor: CustomLabor) => {
    setIsEditing(true);
    setCurrentLabor({ ...labor });
    setIsLaborDialogOpen(true);
  };

  const handleDeleteLabor = (workshopId: string, laborName: string, laborModel: string) => {
    setCustomLabor(prev => prev.filter(l => !(l.workshopId === workshopId && l.name === laborName && l.model === laborModel)));
    toast({
      title: 'Labour Charge Deleted',
      description: 'The labour charge has been removed from the list (local state).',
    });
  };

  const handleSaveLabor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentLabor || !currentLabor.name || !currentLabor.model || !currentLabor.charge || !currentLabor.workshopId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill all fields.' });
        return;
    }

    const newLabor: CustomLabor = {
        name: currentLabor.name,
        model: currentLabor.model,
        charge: Number(currentLabor.charge),
        workshopId: currentLabor.workshopId,
    };

    if (isEditing) {
        setCustomLabor(prev => prev.map(l => 
            (l.name === newLabor.name && l.model === newLabor.model && l.workshopId === newLabor.workshopId) 
            ? newLabor 
            : l
        ));
        toast({ title: 'Success', description: 'Labour charge updated.' });
    } else {
         // Check for duplicates before adding
        if (customLabor.some(l => l.name === newLabor.name && l.model === newLabor.model && l.workshopId === newLabor.workshopId)) {
            toast({ variant: 'destructive', title: 'Error', description: 'This labour charge already exists for the selected workshop and model.' });
            return;
        }
        setCustomLabor(prev => [...prev, newLabor]);
        toast({ title: 'Success', description: 'New labour charge added.' });
    }

    setIsLaborDialogOpen(false);
    setCurrentLabor(null);
  };
  
  const handleDialogInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentLabor(prev => ({...prev, [name]: value}));
  }

  const handleDialogSelectChange = (name: string, value: string) => {
    setCurrentLabor(prev => ({...prev, [name]: value}));
  }

  const filteredLabor = customLabor.filter(labor => 
    labor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labor.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
          <div className="space-y-1">
              <CardTitle className="flex items-center gap-2"><Wrench /> Manage Labour Charges</CardTitle>
              <CardDescription>Add, edit, or remove custom labour charges for each workshop.</CardDescription>
          </div>
            <div className="flex-1 flex justify-center sm:justify-end gap-2">
              <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search by name or model..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
                <Button onClick={handleAddLabor} className="shrink-0">
                  <PlusCircle /> Add New
              </Button>
            </div>
      </CardHeader>
      <CardContent>
          <ScrollArea className="h-[70vh] relative">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Labour Name</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Workshop</TableHead>
                    <TableHead className="text-right">Charge (₹)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredLabor.map((labor, index) => (
                    <TableRow key={`${labor.workshopId}-${labor.model}-${labor.name}-${index}`}>
                    <TableCell className="font-medium">{labor.name}</TableCell>
                    <TableCell>{labor.model}</TableCell>
                    <TableCell>{workshops.find(w => w.id === labor.workshopId)?.name || labor.workshopId}</TableCell>
                    <TableCell className="text-right">{labor.charge.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditLabor(labor)}>
                        <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteLabor(labor.workshopId, labor.name, labor.model)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </ScrollArea>
      </CardContent>
      <Dialog open={isLaborDialogOpen} onOpenChange={setIsLaborDialogOpen}>
        <DialogContent>
            <form onSubmit={handleSaveLabor}>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Labour Charge' : 'Add New Labour Charge'}</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the labour charge.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="workshopId" className="text-right">Workshop</Label>
                        <Select name="workshopId" value={currentLabor?.workshopId} onValueChange={(value) => handleDialogSelectChange('workshopId', value)} required>
                            <SelectTrigger id="workshopId" className="col-span-3">
                                <SelectValue placeholder="Select workshop" />
                            </SelectTrigger>
                            <SelectContent>
                                {workshops.map(w => <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" value={currentLabor?.name || ''} onChange={handleDialogInputChange} className="col-span-3" required />
                    </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="model" className="text-right">Model</Label>
                         <Popover open={isModelPopoverOpen} onOpenChange={setIsModelPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={isModelPopoverOpen}
                                    className="col-span-3 justify-between"
                                >
                                    {currentLabor?.model
                                        ? vehicles.find((vehicle) => vehicle.model === currentLabor.model)?.model
                                        : "Select vehicle model..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search model..." />
                                    <CommandEmpty>No vehicle found.</CommandEmpty>
                                    <CommandGroup>
                                        {vehicles.map((vehicle) => (
                                            <CommandItem
                                                key={vehicle.model}
                                                value={vehicle.model}
                                                onSelect={(currentValue) => {
                                                    const model = vehicles.find(v => v.model.toLowerCase() === currentValue.toLowerCase())?.model || '';
                                                    handleDialogSelectChange('model', model === currentLabor?.model ? '' : model);
                                                    setIsModelPopoverOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        currentLabor?.model === vehicle.model ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {vehicle.model}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="charge" className="text-right">Charge (₹)</Label>
                        <Input id="charge" name="charge" type="number" value={currentLabor?.charge || ''} onChange={handleDialogInputChange} className="col-span-3" required />
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
