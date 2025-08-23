
"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, PlusCircle, Trash2, Pencil, Search, Loader2, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Workshop } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { addWorkshop, deleteWorkshop, updateWorkshop, getFullDataFromFirebase } from '../data/actions';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';


export default function WorkshopManagementPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [isWorkshopDialogOpen, setIsWorkshopDialogOpen] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<Partial<Workshop> | null>(null);
  const [workshopPrefix, setWorkshopPrefix] = useState('');
  const [workshopName, setWorkshopName] = useState('');
  const [workshopCity, setWorkshopCity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTableOpen, setIsTableOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
        setIsLoading(true);
        try {
            const data = await getFullDataFromFirebase();
            setWorkshops(data.workshops || []);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error loading data', description: 'Could not fetch workshops from Firebase.' });
        } finally {
            setIsLoading(false);
        }
    }
    loadData();
  }, [toast]);

  const handleAddWorkshop = () => {
    setIsEditing(false);
    setCurrentWorkshop({});
    setWorkshopPrefix('');
    setWorkshopName('');
    setWorkshopCity('');
    setIsWorkshopDialogOpen(true);
  };

  const handleEditWorkshop = (workshop: Workshop) => {
    setIsEditing(true);
    setCurrentWorkshop({ ...workshop });
    setWorkshopCity(workshop.city || '');
    
    const parts = workshop.name.split(' - ');
    if (parts.length > 1 && ['SOW', 'ARENA', 'NEXA'].includes(parts[0])) {
        setWorkshopPrefix(parts[0]);
        setWorkshopName(parts.slice(1).join(' - '));
    } else {
        setWorkshopPrefix('');
        setWorkshopName(workshop.name);
    }
    
    setIsWorkshopDialogOpen(true);
  };

  const handleDeleteWorkshop = async (workshopToDelete: Workshop) => {
    setIsMutating(true);
    const result = await deleteWorkshop(workshopToDelete);
    if (result.success) {
      setWorkshops(prev => prev.filter(w => w.id !== workshopToDelete.id));
      toast({ title: 'Workshop Deleted', description: 'The workshop has been removed from the database.' });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsMutating(false);
  };

  const handleSaveWorkshop = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!workshopName || !workshopCity || (!isEditing && !workshopPrefix)) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please select a type, enter a name, and a city.' });
        return;
    }
    setIsMutating(true);
    setIsWorkshopDialogOpen(false);

    const finalName = workshopPrefix ? `${workshopPrefix} - ${workshopName}` : workshopName;
    
    if (isEditing && currentWorkshop) {
        const updatedWorkshop: Workshop = { ...currentWorkshop, name: finalName, city: workshopCity } as Workshop;
        if (workshops.some(w => w.name.toLowerCase() === finalName.toLowerCase() && w.id !== updatedWorkshop.id)) {
             toast({ variant: 'destructive', title: 'Error', description: 'A workshop with this name already exists.' });
             setIsMutating(false);
            return;
        }
        const result = await updateWorkshop(updatedWorkshop);
        if (result.success) {
            setWorkshops(prev => prev.map(w => w.id === updatedWorkshop.id ? updatedWorkshop : w));
            toast({ title: 'Success', description: 'Workshop updated.' });
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    } else {
        const newWorkshopId = finalName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const newWorkshop: Workshop = { id: newWorkshopId, name: finalName, city: workshopCity };
        if (workshops.some(w => w.id === newWorkshop.id || w.name.toLowerCase() === newWorkshop.name.toLowerCase())) {
            toast({ variant: 'destructive', title: 'Error', description: 'A workshop with this name or ID already exists.' });
            setIsMutating(false);
            return;
        }
        const result = await addWorkshop(newWorkshop);
        if (result.success) {
            setWorkshops(prev => [...prev, newWorkshop].sort((a,b) => a.name.localeCompare(b.name)));
            toast({ title: 'Success', description: 'New workshop added.' });
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    }

    setIsMutating(false);
  };
  
  const filteredWorkshops = workshops.filter(workshop => 
    workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workshop.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (workshop.city || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
              <CardTitle className="flex items-center gap-2"><Building /> Manage Workshops</CardTitle>
              <CardDescription>Add, edit, or remove workshops. Changes are saved directly to the database.</CardDescription>
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
                <Button onClick={handleAddWorkshop} className="shrink-0">
                  <PlusCircle className="mr-2 h-4 w-4"/> Add New
                </Button>
            </div>
      </CardHeader>
      <CardContent>
        <Collapsible open={isTableOpen} onOpenChange={setIsTableOpen}>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="mb-4">
                    {isTableOpen ? <ChevronsRight className="mr-2 h-4 w-4" /> : <ChevronsLeft className="mr-2 h-4 w-4" />}
                    {isTableOpen ? 'Hide' : 'Show'} Table ({filteredWorkshops.length} items)
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ScrollArea className="h-[60vh] relative border rounded-md">
                <div className="relative">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                            <TableHead>Workshop ID</TableHead>
                            <TableHead>Workshop Name</TableHead>
                            <TableHead>Dealer City</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-48 text-center">
                                <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                        <span className="text-muted-foreground">Loading Workshop Data...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredWorkshops.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">No workshops found.</TableCell>
                            </TableRow>
                        ) : filteredWorkshops.map((workshop) => (
                            <TableRow key={workshop.id}>
                            <TableCell className="font-mono">{workshop.id}</TableCell>
                            <TableCell className="font-medium">{workshop.name}</TableCell>
                            <TableCell>{workshop.city || 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => handleEditWorkshop(workshop)} disabled={isMutating}>
                                <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteWorkshop(workshop)} disabled={isMutating}>
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
      <Dialog open={isWorkshopDialogOpen} onOpenChange={setIsWorkshopDialogOpen}>
        <DialogContent>
            <form onSubmit={handleSaveWorkshop}>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Workshop' : 'Add New Workshop'}</DialogTitle>
                    <DialogDescription>
                        Select the workshop type and enter the name. The ID will be automatically generated.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Type</Label>
                         <Select value={workshopPrefix} onValueChange={setWorkshopPrefix} required disabled={isEditing}>
                             <SelectTrigger className="col-span-3">
                                 <SelectValue placeholder="Select workshop type" />
                             </SelectTrigger>
                             <SelectContent>
                                 <SelectItem value="SOW">SOW</SelectItem>
                                 <SelectItem value="ARENA">ARENA</SelectItem>
                                 <SelectItem value="NEXA">NEXA</SelectItem>
                             </SelectContent>
                         </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" value={workshopName} onChange={(e) => setWorkshopName(e.target.value)} className="col-span-3" required placeholder="e.g., Downtown Service Center" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="city" className="text-right">City</Label>
                        <Input id="city" name="city" value={workshopCity} onChange={(e) => setWorkshopCity(e.target.value)} className="col-span-3" required placeholder="e.g., BIJOYNAGAR" />
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
