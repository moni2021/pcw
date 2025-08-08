
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
import { Wrench, Package, Car, Upload, FileUp, PlusCircle, Trash2, Pencil, Bot, Loader2, Copy } from 'lucide-react';
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
import { convertToJson } from '@/ai/flows/json-converter-flow';
import type { ConvertToJsonInput } from '@/ai/flows/json-converter-flow';


export default function AdminDashboard() {
  const [allParts, setAllParts] = useState<Part[]>(initialAllParts);
  const [customLabor, setCustomLabor] = useState<CustomLabor[]>(initialCustomLaborData);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [pmsCharges, setPmsCharges] = useState(initialPmsCharges);

  const [isPartsDialogOpen, setIsPartsDialogOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState<Part | null>(null);
  const [isLaborDialogOpen, setIsLaborDialogOpen] = useState(false);
  const [currentLabor, setCurrentLabor] = useState<CustomLabor | null>(null);
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Partial<Vehicle> | null>(null);


  const [selectedDataType, setSelectedDataType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  // State for JSON Converter
  const [rawText, setRawText] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [targetJsonFormat, setTargetJsonFormat] = useState<ConvertToJsonInput['jsonFormat'] | ''>('');
  const [isConverting, setIsConverting] = useState(false);


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
        // Check for duplicate name before adding
        if (allParts.some(p => p.name === updatedPart.name)) {
             toast({ variant: "destructive", title: "Error", description: `Part with name "${updatedPart.name}" already exists.` });
             return;
        }
        setAllParts([...allParts, updatedPart]);
        toast({ title: "Part Added", description: `Successfully added "${updatedPart.name}".` });
    }

    setIsPartsDialogOpen(false);
    setCurrentPart(null);
  }

  const handleAddLabor = () => {
    setCurrentLabor({ name: '', model: '', charge: 0 });
    setIsLaborDialogOpen(true);
  };

  const handleEditLabor = (labor: CustomLabor) => {
    setCurrentLabor(labor);
    setIsLaborDialogOpen(true);
  };

  const handleDeleteLabor = (laborName: string, laborModel: string) => {
    setCustomLabor(customLabor.filter(l => !(l.name === laborName && l.model === laborModel)));
    toast({
        title: "Labour Charge Deleted",
        description: `Successfully deleted "${laborName}" for ${laborModel}.`,
    });
  };

  const handleSaveLabor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentLabor) return;

    const formData = new FormData(e.currentTarget);
    const updatedLabor: CustomLabor = {
        name: formData.get('name') as string,
        model: formData.get('model') as string,
        charge: Number(formData.get('charge'))
    };
    
    const isEditing = customLabor.some(l => l.name === currentLabor.name && l.model === currentLabor.model && currentLabor.name !== '');

    if (isEditing) {
        setCustomLabor(customLabor.map(l => (l.name === currentLabor.name && l.model === currentLabor.model) ? updatedLabor : l));
        toast({ title: "Labour Updated", description: `Successfully updated "${updatedLabor.name}".` });
    } else {
        if (customLabor.some(l => l.name === updatedLabor.name && l.model === updatedLabor.model)) {
            toast({ variant: "destructive", title: "Error", description: `Labour charge for "${updatedLabor.name}" on ${updatedLabor.model} already exists.` });
            return;
        }
        setCustomLabor([...customLabor, updatedLabor]);
        toast({ title: "Labour Added", description: `Successfully added "${updatedLabor.name}".` });
    }

    setIsLaborDialogOpen(false);
    setCurrentLabor(null);
  };
  
    const handleAddVehicle = () => {
        setCurrentVehicle({ model: '', brand: 'Arena', category: '', fuelTypes: [], productionYears: [] });
        setIsVehicleDialogOpen(true);
    };

    const handleEditVehicle = (vehicle: Vehicle) => {
        setCurrentVehicle(vehicle);
        setIsVehicleDialogOpen(true);
    };
  
  const handleDeleteVehicle = (model: string) => {
    setVehicles(vehicles.filter(v => v.model !== model));
    toast({
        title: "Vehicle Deleted",
        description: `Successfully deleted model "${model}".`,
    });
  };

  const handleSaveVehicle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentVehicle) return;

    const formData = new FormData(e.currentTarget);
    const fuelTypesString = formData.get('fuelTypes') as string;
    const productionYearsString = formData.get('productionYears') as string;

    const updatedVehicle: Vehicle = {
        model: formData.get('model') as string,
        brand: formData.get('brand') as 'Arena' | 'Nexa' | 'Commercial',
        category: formData.get('category') as string,
        variants: currentVehicle.variants || [],
        fuelTypes: fuelTypesString.split(',').map(s => s.trim()).filter(Boolean),
        productionYears: productionYearsString.split(',').map(s => parseInt(s.trim())).filter(s => !isNaN(s)),
    };
    
    const isEditing = vehicles.some(v => v.model === currentVehicle.model && currentVehicle.model !== '');
    
    if (isEditing) {
        setVehicles(vehicles.map(v => v.model === currentVehicle.model ? updatedVehicle : v));
        toast({ title: "Vehicle Updated", description: `Successfully updated "${updatedVehicle.model}".` });
    } else {
        if (vehicles.some(v => v.model === updatedVehicle.model)) {
            toast({ variant: "destructive", title: "Error", description: `Vehicle with model name "${updatedVehicle.model}" already exists.` });
            return;
        }
        setVehicles([...vehicles, updatedVehicle]);
        toast({ title: "Vehicle Added", description: `Successfully added "${updatedVehicle.model}".` });
    }

    setIsVehicleDialogOpen(false);
    setCurrentVehicle(null);
  };


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
            title: "File ReadError",
            description: "Could not read the selected file.",
        });
    }
    reader.readAsText(selectedFile);
  };

  const handleConvert = async () => {
    if (!rawText || !targetJsonFormat) {
        toast({
            variant: "destructive",
            title: "Conversion Failed",
            description: "Please provide raw text and select a target format.",
        });
        return;
    }
    setIsConverting(true);
    setJsonOutput('');
    try {
        const result = await convertToJson({ rawText, jsonFormat: targetJsonFormat });
        // Attempt to pretty-print the JSON
        try {
            const parsed = JSON.parse(result.jsonString);
            setJsonOutput(JSON.stringify(parsed, null, 2));
        } catch {
            // If parsing fails, just show the raw string from AI
            setJsonOutput(result.jsonString);
        }
    } catch (error) {
         toast({
            variant: "destructive",
            title: "AI Conversion Failed",
            description: "An error occurred while communicating with the AI. Please try again.",
        });
    } finally {
        setIsConverting(false);
    }
  };

  const handleCopyJson = () => {
      if (!jsonOutput) {
          toast({ variant: "destructive", title: "Nothing to Copy", description: "Generate JSON before copying." });
          return;
      }
      navigator.clipboard.writeText(jsonOutput);
      toast({ title: "Copied!", description: "JSON output copied to clipboard." });
  };


  return (
    <div className="flex-1">
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
            <Dialog open={isLaborDialogOpen} onOpenChange={setIsLaborDialogOpen}>
                <CardHeader>
                    <CardTitle>Manage Labour Charges</CardTitle>
                    <CardDescription>
                        Add, edit, or remove custom labour charges.
                    </CardDescription>
                    <div className="flex justify-end">
                        <Button onClick={handleAddLabor}>
                            <PlusCircle /> Add New Labour
                        </Button>
                    </div>
                </CardHeader>
                <DialogContent>
                    <form onSubmit={handleSaveLabor}>
                        <DialogHeader>
                            <DialogTitle>{currentLabor?.name && currentLabor.name !== '' ? 'Edit Labour' : 'Add New Labour'}</DialogTitle>
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
            <CardContent className="space-y-2">
              <ScrollArea className="h-[60vh]">
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
                    {customLabor.map((labor, index) => (
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
            <Dialog open={isVehicleDialogOpen} onOpenChange={setIsVehicleDialogOpen}>
                <CardHeader>
                <CardTitle>Manage Vehicle Models</CardTitle>
                <CardDescription>
                    Add, edit, or remove vehicle models.
                </CardDescription>
                 <div className="flex justify-end">
                        <Button onClick={handleAddVehicle}>
                            <PlusCircle /> Add New Vehicle
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

            <CardContent className="space-y-2 pt-6">
              <ScrollArea className="h-[60vh]">
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
                        <Textarea id="rawText" placeholder="Paste your comma-separated, tab-separated, or unstructured text here..." rows={10} value={rawText} onChange={(e) => setRawText(e.target.value)} />
                    </div>
                    <div className="space-y-2 relative">
                        <Label htmlFor="jsonOutput">Generated JSON Output</Label>
                        <Textarea id="jsonOutput" readOnly placeholder="AI-generated JSON will appear here..." rows={10} className="bg-muted" value={jsonOutput} />
                         {isConverting && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jsonDataType">Target JSON Format</Label>
                    <Select onValueChange={(value) => setTargetJsonFormat(value as any)} value={targetJsonFormat}>
                      <SelectTrigger id="jsonDataType">
                        <SelectValue placeholder="Select target data format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parts">Parts and Price</SelectItem>
                        <SelectItem value="labour">Custom Labour</SelectItem>
                        <SelectItem value="pms">PMS Labour Price</SelectItem>
                        <SelectItem value="models">Vehicle Models</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleConvert} disabled={isConverting || !rawText || !targetJsonFormat}>
                        {isConverting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                        Convert with AI
                    </Button>
                    <Button variant="outline" onClick={handleCopyJson}>
                        <Copy className="mr-2 h-4 w-4" />
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
