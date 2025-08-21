
"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, PlusCircle, Trash2, Pencil, Search, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Part } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { addPart, updatePart, deletePart, getFullDataFromFirebase } from '../data/actions';

export default function PartsManagementPage() {
  const [allParts, setAllParts] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [isPartsDialogOpen, setIsPartsDialogOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState<Partial<Part> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
        setIsLoading(true);
        try {
            const data = await getFullDataFromFirebase();
            setAllParts(data.parts || []);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error loading data', description: 'Could not fetch parts from Firebase.' });
        } finally {
            setIsLoading(false);
        }
    }
    loadData();
  }, [toast]);

  const handleAddPart = () => {
    setIsEditing(false);
    setCurrentPart({});
    setIsPartsDialogOpen(true);
  };

  const handleEditPart = (part: Part) => {
    setIsEditing(true);
    setCurrentPart({ ...part });
    setIsPartsDialogOpen(true);
  };

  const handleDeletePart = async (partToDelete: Part) => {
    setIsMutating(true);
    const result = await deletePart(partToDelete);
    if (result.success) {
      setAllParts(prev => prev.filter(p => p.name !== partToDelete.name));
      toast({ title: 'Part Deleted', description: 'The part has been removed from the database.' });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsMutating(false);
  };

  const handleSavePart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPart || !currentPart.name || !currentPart.price) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill all fields.' });
        return;
    }
    setIsMutating(true);

    const newPart: Part = {
        name: currentPart.name,
        price: Number(currentPart.price)
    };

    if (isEditing) {
        const result = await updatePart(newPart);
        if (result.success) {
            setAllParts(prev => prev.map(p => p.name === newPart.name ? newPart : p));
            toast({ title: 'Success', description: 'Part updated.' });
            setIsPartsDialogOpen(false);
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    } else {
        if (allParts.some(p => p.name.toLowerCase() === newPart.name.toLowerCase())) {
            toast({ variant: 'destructive', title: 'Error', description: 'A part with this name already exists.' });
            setIsMutating(false);
            return;
        }
        const result = await addPart(newPart);
        if (result.success) {
            setAllParts(prev => [...prev, newPart].sort((a,b) => a.name.localeCompare(b.name)));
            toast({ title: 'Success', description: 'New part added.' });
            setIsPartsDialogOpen(false);
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    }
    setIsMutating(false);
  };

  const handleDialogInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPart(prev => ({...prev, [name]: value}));
  }

  const filteredParts = allParts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
        <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-2"><Package /> Manage Parts and Pricing</CardTitle>
                <CardDescription>Add, edit, or remove parts from the central price list. Changes are saved directly to the database.</CardDescription>
            </div>
             <div className="flex-1 flex justify-center sm:justify-end gap-2">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by part name..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={handleAddPart} className="shrink-0">
                    <PlusCircle className="mr-2 h-4 w-4"/> Add New
                </Button>
            </div>
        </CardHeader>
        <CardContent>
        <ScrollArea className="h-[70vh] relative">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Part Name</TableHead>
                    <TableHead className="text-right">Price (₹)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={3} className="h-48 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                <span className="text-muted-foreground">Loading parts data...</span>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : filteredParts.map((part) => (
                    <TableRow key={part.name}>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditPart(part)} disabled={isMutating}>
                        <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePart(part)} disabled={isMutating}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </ScrollArea>
        </CardContent>
        <Dialog open={isPartsDialogOpen} onOpenChange={setIsPartsDialogOpen}>
          <DialogContent>
              <form onSubmit={handleSavePart}>
                  <DialogHeader>
                  <DialogTitle>{isEditing ? 'Edit Part' : 'Add New Part'}</DialogTitle>
                  <DialogDescription>
                      Fill in the details for the part. Part names must be unique.
                  </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" name="name" value={currentPart?.name || ''} onChange={handleDialogInputChange} className="col-span-3" required disabled={isEditing}/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">Price (₹)</Label>
                          <Input id="price" name="price" type="number" step="0.01" value={currentPart?.price || ''} onChange={handleDialogInputChange} className="col-span-3" required />
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
