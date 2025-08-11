
"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, PlusCircle, Trash2, Pencil, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { allParts as initialAllParts } from '@/lib/parts-data';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Part } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function PartsManagementPage() {
  const [allParts] = useState<Part[]>(initialAllParts);
  const [isPartsDialogOpen, setIsPartsDialogOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState<Part | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddPart = () => {
     toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
  };

  const handleEditPart = (part: Part) => {
    toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
  };

  const handleDeletePart = (partName: string) => {
     toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
  };

  const handleSavePart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      variant: 'destructive',
      title: 'Feature Under Development',
      description: 'This function will be activated after as per management permission.',
    });
  }

  const filteredParts = allParts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
        <Dialog open={isPartsDialogOpen} onOpenChange={setIsPartsDialogOpen}>
        <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2">
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-2"><Package /> Manage Parts and Pricing</CardTitle>
                <CardDescription>Add, edit, or remove parts from the central price list.</CardDescription>
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
                <Button onClick={handleAddPart} className="shrink-0" disabled>
                    <PlusCircle /> Add New
                </Button>
            </div>
        </CardHeader>
        <DialogContent>
            <form onSubmit={handleSavePart}>
                <DialogHeader>
                <DialogTitle>{currentPart?.name && currentPart.name !== '' ? 'Edit Part' : 'Add New Part'}</DialogTitle>
                <DialogDescription>
                    Fill in the details for the part. Part names must be unique.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" defaultValue={currentPart?.name} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price (₹)</Label>
                        <Input id="price" name="price" type="number" defaultValue={currentPart?.price} className="col-span-3" required />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled>Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
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
                {filteredParts.map((part) => (
                    <TableRow key={part.name}>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditPart(part)} disabled>
                        <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePart(part.name)} disabled>
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
