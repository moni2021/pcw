
"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench, PlusCircle, Trash2, Pencil, Search, Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { CustomLabor, Vehicle, Workshop } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { addCustomLabor, updateCustomLabor, deleteCustomLabor, getFullDataFromFirebase } from '../data/actions';

export default function LabourManagementPage() {
  const [customLabor, setCustomLabor] = useState<CustomLabor[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [isLaborDialogOpen, setIsLaborDialogOpen] = useState(false);
  const [currentLabor, setCurrentLabor] = useState<Partial<CustomLabor> | null>(null);
  const [originalLabor, setOriginalLabor] = useState<CustomLabor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
        setIsLoading(true);
        try {
            const data = await getFullDataFromFirebase();
            setCustomLabor(data.customLabor || []);
            setVehicles(data.vehicles || []);
            setWorkshops(data.workshops || []);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error loading data', description: 'Could not fetch data from Firebase.' });
        } finally {
            setIsLoading(false);
        }
    }
    loadData();
  }, [toast]);

  const handleAddLabor = () => {
    setIsEditing(false);
    setCurrentLabor({ workshopId: workshops[0]?.id || '' });
    setOriginalLabor(null);
    setIsLaborDialogOpen(true);
  };

  const handleEditLabor = (labor: CustomLabor) => {
    setIsEditing(true);
    setCurrentLabor({ ...labor });
    setOriginalLabor(labor);
    setIsLaborDialogOpen(true);
  };

  const handleDeleteLabor = async (laborToDelete: CustomLabor) => {
    setIsMutating(true);
    const result = await deleteCustomLabor(laborToDelete);
    if (result.success) {
      setCustomLabor(prev => prev.filter(l => 
          !(l.workshopId === laborToDelete.workshopId && 
            l.name === laborToDelete.name && 
            l.model === laborToDelete.model)
      ));
      toast({ title: 'Labour Charge Deleted', description: 'The labour charge has been removed from the database.' });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsMutating(false);
  };

  const handleSaveLabor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentLabor || !currentLabor.name || !currentLabor.model || !currentLabor.charge || !currentLabor.workshopId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill all fields.' });
        return;
    }
    setIsMutating(true);

    const newLabor: CustomLabor = {
        name: currentLabor.name,
        model: currentLabor.model,
        charge: Number(currentLabor.charge),
        workshopId: currentLabor.workshopId,
    };

    if (isEditing && originalLabor) {
        // Since we don't have a unique ID, we delete the old one and add the new one to simulate an update.
        const deleteResult = await deleteCustomLabor(originalLabor);
        if (deleteResult.success) {
            const addResult = await addCustomLabor(newLabor);
            if (addResult.success) {
                setCustomLabor(prev => {
                    const filtered = prev.filter(l => 
                        !(l.workshopId === originalLabor.workshopId && 
                          l.name === originalLabor.name && 
                          l.model === originalLabor.model)
                    );
                    return [...filtered, newLabor].sort((a,b) => a.name.localeCompare(b.name));
                });
                toast({ title: 'Success', description: 'Labour charge updated.' });
                setIsLaborDialogOpen(false);
            } else {
                toast({ variant: 'destructive', title: 'Update Failed', description: addResult.error });
                // Attempt to add the original back
                await addCustomLabor(originalLabor);
            }
        } else {
             toast({ variant: 'destructive', title: 'Update Failed', description: deleteResult.error });
        }
    } else {
        if (customLabor.some(l => l.name.toLowerCase() === newLabor.name.toLowerCase() && l.model === newLabor.model && l.workshopId === newLabor.workshopId)) {
            toast({ variant: 'destructive', title: 'Error', description: 'This labour charge already exists for the selected workshop and model.' });
            setIsMutating(false);
            return;
        }
        const result = await addCustomLabor(newLabor);
        if (result.success) {
            setCustomLabor(prev => [...prev, newLabor].sort((a,b) => a.name.localeCompare(b.name)));
            toast({ title: 'Success', description: 'New labour charge added.' });
            setIsLaborDialogOpen(false);
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    }

    setIsMutating(false);
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
    labor.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (workshops.find(w => w.id === labor.workshopId)?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
          <div className="space-y-1">
              <CardTitle className="flex items-center gap-2"><Wrench /> Manage Labour Charges</CardTitle>
              <CardDescription>Add, edit, or remove custom labour charges. Changes are saved directly to the database.</CardDescription>
          </div>
            <div className="flex-1 flex justify-center sm:justify-end gap-2">
              <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search by name, model, workshop..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
                <Button onClick={handleAddLabor} className="shrink-0">
                  <PlusCircle className="mr-2 h-4 w-4"/> Add New
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
                 {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-48 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                <span className="text-muted-foreground">Loading labour data...</span>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : filteredLabor.map((labor, index) => (
                    <TableRow key={`${labor.workshopId}-${labor.model}-${labor.name}-${index}`}>
                    <TableCell className="font-medium">{labor.name}</TableCell>
                    <TableCell>{labor.model}</TableCell>
                    <TableCell>{workshops.find(w => w.id === labor.workshopId)?.name || labor.workshopId}</TableCell>
                    <TableCell className="text-right">{labor.charge.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditLabor(labor)} disabled={isMutating}>
                        <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteLabor(labor)} disabled={isMutating}>
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
