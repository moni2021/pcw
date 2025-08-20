
"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, PlusCircle, Trash2, Pencil, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { workshops as initialWorkshopsData } from '@/lib/data/workshops';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Workshop } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function WorkshopManagementPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>(initialWorkshopsData);
  const [isWorkshopDialogOpen, setIsWorkshopDialogOpen] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<Partial<Workshop> | null>(null);
  const [workshopPrefix, setWorkshopPrefix] = useState('');
  const [workshopName, setWorkshopName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddWorkshop = () => {
    setIsEditing(false);
    setCurrentWorkshop({});
    setWorkshopPrefix('');
    setWorkshopName('');
    setIsWorkshopDialogOpen(true);
  };

  const handleEditWorkshop = (workshop: Workshop) => {
    setIsEditing(true);
    setCurrentWorkshop({ ...workshop });
    
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

  const handleDeleteWorkshop = (workshopId: string) => {
    setWorkshops(prev => prev.filter(w => w.id !== workshopId));
    toast({
      title: 'Workshop Deleted',
      description: 'The workshop has been removed. Sync to Firebase to make this change permanent.',
    });
  };

  const handleSaveWorkshop = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!workshopName || (!isEditing && !workshopPrefix)) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please select a type and enter a workshop name.' });
        return;
    }

    const finalName = workshopPrefix ? `${workshopPrefix} - ${workshopName}` : workshopName;
    const newWorkshopId = finalName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (isEditing && currentWorkshop) {
        if (workshops.some(w => w.name.toLowerCase() === finalName.toLowerCase() && w.id !== currentWorkshop.id)) {
             toast({ variant: 'destructive', title: 'Error', description: 'A workshop with this name already exists.' });
            return;
        }
        setWorkshops(prev => prev.map(w => w.id === (currentWorkshop as Workshop).id ? { ...w, name: finalName } : w));
        toast({ title: 'Success', description: 'Workshop updated.' });
    } else {
        const newWorkshop: Workshop = {
            id: newWorkshopId,
            name: finalName,
        };
        if (workshops.some(w => w.id === newWorkshop.id || w.name.toLowerCase() === newWorkshop.name.toLowerCase())) {
            toast({ variant: 'destructive', title: 'Error', description: 'A workshop with this name or ID already exists.' });
            return;
        }
        setWorkshops(prev => [...prev, newWorkshop].sort((a,b) => a.name.localeCompare(b.name)));
        toast({ title: 'Success', description: 'New workshop added.' });
    }

    setIsWorkshopDialogOpen(false);
    setCurrentWorkshop(null);
  };
  
  const filteredWorkshops = workshops.filter(workshop => 
    workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workshop.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
          <div className="space-y-1">
              <CardTitle className="flex items-center gap-2"><Building /> Manage Workshops</CardTitle>
              <CardDescription>Add, edit, or remove workshops. The Workshop ID is auto-generated from the name. Remember to sync to Firebase to save changes.</CardDescription>
          </div>
            <div className="flex-1 flex justify-center sm:justify-end gap-2">
              <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search by name or ID..."
                      className="pl-8"
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
          <ScrollArea className="h-[70vh] relative">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Workshop ID</TableHead>
                    <TableHead>Workshop Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredWorkshops.map((workshop) => (
                    <TableRow key={workshop.id}>
                    <TableCell className="font-mono">{workshop.id}</TableCell>
                    <TableCell className="font-medium">{workshop.name}</TableCell>
                        <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditWorkshop(workshop)}>
                        <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteWorkshop(workshop.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </ScrollArea>
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
                         <Select value={workshopPrefix} onValueChange={setWorkshopPrefix} required>
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
