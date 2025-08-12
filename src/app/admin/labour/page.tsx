
"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench, PlusCircle, Trash2, Pencil, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { customLaborData as initialCustomLaborData } from '@/lib/custom-labor-data';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { CustomLabor, Vehicle } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { vehicles as initialVehicles } from '@/lib/data';

export default function LabourManagementPage() {
  const [customLabor, setCustomLabor] = useState<CustomLabor[]>(initialCustomLaborData);
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [isLaborDialogOpen, setIsLaborDialogOpen] = useState(false);
  const [currentLabor, setCurrentLabor] = useState<Partial<CustomLabor> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddLabor = () => {
    setCurrentLabor({});
    setIsLaborDialogOpen(true);
  };

  const handleEditLabor = (labor: CustomLabor) => {
    setCurrentLabor(labor);
    setIsLaborDialogOpen(true);
  };

  const handleDeleteLabor = (laborName: string, laborModel: string) => {
    // In a real app, you'd call a server action here.
    // For now, we'll just show a toast.
    toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
  };

  const handleSaveLabor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd call a server action here.
    // For now, we'll just show a toast.
    toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
    setIsLaborDialogOpen(false);
    setCurrentLabor(null);
  };
  
  const filteredLabor = customLabor.filter(labor => 
    labor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labor.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
        <Dialog open={isLaborDialogOpen} onOpenChange={setIsLaborDialogOpen}>
            <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2"><Wrench /> Manage Labour Charges</CardTitle>
                    <CardDescription>Add, edit, or remove custom labour charges.</CardDescription>
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
            <DialogContent>
                <form onSubmit={handleSaveLabor}>
                    <DialogHeader>
                        <DialogTitle>{currentLabor?.name ? 'Edit Labour' : 'Add New Labour'}</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the labour charge. The combination of name and model must be unique.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="name" defaultValue={currentLabor?.name} className="col-span-3" required />
                        </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">Model</Label>
                            <Select name="model" defaultValue={currentLabor?.model} required>
                                <SelectTrigger id="model" className="col-span-3">
                                    <SelectValue placeholder="Select vehicle model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vehicles.map(v => <SelectItem key={v.model} value={v.model}>{v.model}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="charge" className="text-right">Charge (₹)</Label>
                            <Input id="charge" name="charge" type="number" defaultValue={currentLabor?.charge} className="col-span-3" required />
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
                      <TableHead>Labour Name</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead className="text-right">Charge (₹)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {filteredLabor.map((labor, index) => (
                      <TableRow key={index}>
                      <TableCell className="font-medium">{labor.name}</TableCell>
                      <TableCell>{labor.model}</TableCell>
                      <TableCell className="text-right">{labor.charge.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditLabor(labor)}>
                          <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteLabor(labor.name, labor.model)}>
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
