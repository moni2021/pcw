
"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Package, Car, Upload, FileUp, PlusCircle, Trash2, Pencil, Bot } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { vehicles as initialVehicles } from '@/lib/data';
import { customLaborData as initialCustomLaborData } from '@/lib/custom-labor-data';
import { allParts as initialAllParts } from '@/lib/parts-data';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Part, CustomLabor, Vehicle } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { pmsCharges as initialPmsCharges } from '@/lib/pms-charges';
import { Textarea } from '@/components/ui/textarea';


export default function AdminDashboard() {
  const [allParts, setAllParts] = useState<Part[]>(initialAllParts);
  const [customLabor, setCustomLabor] = useState<CustomLabor[]>(initialCustomLaborData);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [pmsCharges, setPmsCharges] = useState(initialPmsCharges);

  const [isPartsDialogOpen, setIsPartsDialogOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState<Part | null>(null);

  const [selectedDataType, setSelectedDataType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();


  const handleAddPart = () => {
    setCurrentPart({ name: '', price: 0 });
    setIsPartsDialogOpen(true);
  };

  const handleEditPart = (part: Part) => {
    setCurrentPart(part);
    setIsPartsDialogOpen(true);
  };
  
  const handleDeletePart = (partName: string) => {
    setAllParts(allParts.filter(p => p.name !== partName));
     toast({
        title: "Part Deleted",
        description: `Successfully deleted "${partName}".`,
    });
  };

  const handleSavePart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPart) return;

    const formData = new FormData(e.currentTarget);
    const updatedPart: Part = {
        name: formData.get('name') as string,
        price: Number(formData.get('price'))
    };

    const isEditing = allParts.some(p => p.name === currentPart.name && currentPart.name !== '');

    if (isEditing) {
        setAllParts(allParts.map(p => p.name === currentPart.name ? updatedPart : p));
        toast({ title: "Part Updated", description: `Successfully updated "${updatedPart.name}".` });
    } else {
        setAllParts([...allParts, updatedPart]);
        toast({ title: "Part Added", description: `Successfully added "${updatedPart.name}".` });
    }

    setIsPartsDialogOpen(false);
    setCurrentPart(null);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedDataType) {
        toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "Please select a data type and a file.",
        });
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const content = e.target?.result;
            if (typeof content !== 'string') {
                throw new Error("Failed to read file content.");
            }
            const data = JSON.parse(content);
            
            switch(selectedDataType) {
                case 'labour':
                    setCustomLabor(data);
                    break;
                case 'parts':
                    setAllParts(data);
                    break;
                case 'pms':
                    setPmsCharges(data);
                    break;
                case 'models':
                    setVehicles(data);
                    break;
                default:
                    throw new Error("Invalid data type selected.");
            }

            toast({
                title: "Upload Successful",
                description: `Successfully uploaded and updated ${selectedDataType} data.`,
            });

        } catch (error) {
             toast({
                variant: "destructive",
                title: "Upload Failed",
                description: error instanceof Error ? error.message : "An unknown error occurred during file processing.",
            });
        }
    };
    reader.onerror = () => {
         toast({
            variant: "destructive",
            title: "File Read Error",
            description: "Could not read the selected file.",
        });
    }
    reader.readAsText(selectedFile);
  };


  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-muted-foreground/20 -rotate-45 select-none pointer-events-none z-10 text-center p-8">
        Hiru Is Working on Admin page it will be Active soon
      </div>
      <Tabs defaultValue="parts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="labour">
            <Wrench className="mr-2 h-4 w-4" />
            Labour
          </TabsTrigger>
          <TabsTrigger value="parts">
            <Package className="mr-2 h-4 w-4" />
            Parts and Price
          </TabsTrigger>
          <TabsTrigger value="models">
            <Car className="mr-2 h-4 w-4" />
            Vehicle Models
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Data
          </TabsTrigger>
           <TabsTrigger value="converter">
            <Bot className="mr-2 h-4 w-4" />
            JSON Converter
          </TabsTrigger>
        </TabsList>
        <TabsContent value="labour">
          <Card>
            <CardHeader>
              <CardTitle>Manage Labour Charges</CardTitle>
              <CardDescription>
                View and manage custom labour charges for different services and models.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Labour Name</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead className="text-right">Charge (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customLabor.map((labor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{labor.name}</TableCell>
                        <TableCell>{labor.model}</TableCell>
                        <TableCell className="text-right">{labor.charge.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parts">
          <Card>
             <Dialog open={isPartsDialogOpen} onOpenChange={setIsPartsDialogOpen}>
                <CardHeader>
                    <CardTitle>Manage Parts and Pricing</CardTitle>
                    <CardDescription>
                        Add, edit, or remove parts from the central price list.
                    </CardDescription>
                    <div className="flex justify-end">
                        <Button onClick={handleAddPart}>
                            <PlusCircle /> Add New Part
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
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part Name</TableHead>
                      <TableHead className="text-right">Price (₹)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allParts.map((part) => (
                      <TableRow key={part.name}>
                        <TableCell className="font-medium">{part.name}</TableCell>
                        <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditPart(part)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeletePart(part.name)}>
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
        </TabsContent>
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Manage Vehicle Models</CardTitle>
              <CardDescription>
                View all vehicle models and their details. Editing is currently disabled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Fuel Types</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>
                Bulk upload data from a JSON file.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataType">Data Type</Label>
                <Select onValueChange={setSelectedDataType} value={selectedDataType}>
                  <SelectTrigger id="dataType">
                    <SelectValue placeholder="Select data type to upload" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="labour">Custom Labour</SelectItem>
                    <SelectItem value="parts">Parts and Price</SelectItem>
                    <SelectItem value="pms">PMS Labour Price</SelectItem>
                    <SelectItem value="models">Vehicle Models</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileUpload">Upload File</Label>
                <Input id="fileUpload" type="file" accept="application/json" onChange={handleFileChange} />
                 <p className="text-sm text-muted-foreground">
                  Please upload a JSON file.
                </p>
              </div>
              <Button onClick={handleUpload} disabled={!selectedDataType || !selectedFile}>
                <FileUp className="mr-2 h-4 w-4" />
                Upload and Process
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="converter">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered JSON Converter</CardTitle>
              <CardDescription>
                Paste raw text (like from Excel or a text file) and convert it to a valid JSON format for uploading.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="rawText">Raw Text Input</Label>
                        <Textarea id="rawText" placeholder="Paste your comma-separated, tab-separated, or unstructured text here..." rows={10} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jsonOutput">Generated JSON Output</Label>
                        <Textarea id="jsonOutput" readOnly placeholder="AI-generated JSON will appear here..." rows={10} className="bg-muted" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jsonDataType">Target JSON Format</Label>
                    <Select>
                      <SelectTrigger id="jsonDataType">
                        <SelectValue placeholder="Select target data format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="labour">Custom Labour</SelectItem>
                        <SelectItem value="parts">Parts and Price</SelectItem>
                        <SelectItem value="pms">PMS Labour Price</SelectItem>
                        <SelectItem value="models">Vehicle Models</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2">
                    <Button>
                        <Bot className="mr-2 h-4 w-4" />
                        Convert with AI
                    </Button>
                    <Button variant="outline">
                        Copy JSON
                    </Button>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
