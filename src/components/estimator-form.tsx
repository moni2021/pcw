'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Car, Fuel, Loader2, PlusCircle, Trash2, Wrench, FileUp, X } from 'lucide-react';
import { getBillEstimate } from '@/app/actions';
import { vehicleModels, serviceTypes, type VehicleModel } from '@/lib/data';
import type { EstimateBillOutput } from '@/ai/flows/estimate-bill';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from '@/components/ui/progress';
import * as XLSX from 'xlsx';

const formSchema = z.object({
  vehicleModel: z.string({ required_error: 'Please select a vehicle model.' }).min(1, 'Please select a vehicle model.'),
  serviceType: z.string({ required_error: 'Please select a service type.' }).min(1, 'Please select a service type.'),
  fuelType: z.string({ required_error: 'Please select a fuel type.' }).min(1, 'Please select a fuel type.'),
  uploadedData: z.string().optional(),
});

type CustomLaborItem = { id: number; description: string; cost: string };

export function EstimatorForm() {
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [estimation, setEstimation] = useState<EstimateBillOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customLaborItems, setCustomLaborItems] = useState<CustomLaborItem[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { vehicleModel: '', serviceType: '', fuelType: '', uploadedData: '' },
  });

  const selectedModelName = form.watch('vehicleModel');

  useEffect(() => {
    if (selectedModelName) {
      const model = vehicleModels.find(m => m.name === selectedModelName);
      setSelectedModel(model || null);
      form.setValue('fuelType', model?.fuels.length === 1 ? model.fuels[0] : '', { shouldValidate: true });
    } else {
      setSelectedModel(null);
    }
  }, [selectedModelName, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadProgress(0); // Start progress
      setUploadedFileName(file.name);

      if (file.size > 1024 * 1024) { // 1MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload a file smaller than 1MB.',
        });
        removeUploadedFile();
        return;
      }

      const allowedExtensions = ['.csv', '.xls', '.xlsx', '.html'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedExtensions.includes(fileExtension)) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload a CSV, Excel, or HTML file.',
        });
        removeUploadedFile();
        return;
      }

      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentage);
        }
      };

      reader.onloadstart = () => {
        setUploadProgress(0);
      };

      reader.onload = (e) => {
        setUploadProgress(100);
        const data = e.target?.result;
        let fileContent = '';

        try {
          if (fileExtension === '.xls' || fileExtension === '.xlsx') {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            fileContent = XLSX.utils.sheet_to_csv(worksheet);
          } else {
            fileContent = data as string;
          }
          form.setValue('uploadedData', fileContent);
        } catch (error) {
          console.error("File parsing error:", error);
          toast({
            variant: "destructive",
            title: "File Read Error",
            description: "Could not read the uploaded file. It might be corrupted or in an unsupported format.",
          });
          removeUploadedFile();
          return;
        }

        // Hide progress bar after a short delay
        setTimeout(() => {
          setUploadProgress(null);
        }, 500);
      };

      reader.onerror = () => {
        toast({
          variant: 'destructive',
          title: 'File Read Error',
          description: 'There was an error reading the file.',
        });
        removeUploadedFile();
      };
      
      if (fileExtension === '.xls' || fileExtension === '.xlsx') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    }
  };


  const removeUploadedFile = () => {
    form.setValue('uploadedData', '');
    setUploadedFileName(null);
    setUploadProgress(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setEstimation(null);
    setError(null);
    setCustomLaborItems([]);

    const result = await getBillEstimate(values);

    if (result.success) {
      setEstimation(result.data);
    } else {
      setError(result.error);
      toast({
        variant: 'destructive',
        title: 'Estimation Failed',
        description: result.error,
      });
    }
    setIsLoading(false);
  };

  const addCustomLaborItem = () => {
    setCustomLaborItems(prev => [...prev, { id: Date.now(), description: '', cost: '' }]);
  };

  const updateCustomLaborItem = (id: number, field: 'description' | 'cost', value: string) => {
    if(field === 'cost' && !/^\d*\.?\d*$/.test(value)) return;
    setCustomLaborItems(prev => prev.map(item => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeCustomLaborItem = (id: number) => {
    setCustomLaborItems(prev => prev.filter(item => item.id !== id));
  };
  
  const totalCustomLaborCost = useMemo(() => {
    return customLaborItems.reduce((acc, item) => acc + (Number(item.cost) || 0), 0);
  }, [customLaborItems]);

  const grandTotal = useMemo(() => {
    return (estimation?.totalCost || 0) + totalCustomLaborCost;
  }, [estimation, totalCustomLaborCost]);

  const partsSubtotal = useMemo(() => {
    return estimation?.parts.reduce((acc, part) => acc + part.cost, 0) || 0;
  }, [estimation]);

  const laborSubtotal = useMemo(() => {
    return estimation?.laborItems.reduce((acc, item) => acc + item.cost, 0) || 0;
  }, [estimation]);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-2 border-border/50 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Service Details</CardTitle>
          <CardDescription>Fill in the details below to get your service estimate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleModels.map(model => (
                            <SelectItem key={model.name} value={model.name}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {selectedModel && selectedModel.fuels.length > 1 && (
                <FormField
                  control={form.control}
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Fuel Type</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                          {selectedModel.fuels.map(fuel => (
                            <FormItem key={fuel} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={fuel} />
                              </FormControl>
                              <FormLabel className="font-normal">{fuel}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormItem>
                <FormLabel>Upload Service Data (Optional)</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                     <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" id="file-upload" accept=".csv,.xls,.xlsx,.html"/>
                  </FormControl>
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload File
                  </Button>
                  {uploadedFileName && uploadProgress === null && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
                      <span>{uploadedFileName}</span>
                      <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={removeUploadedFile}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                 <p className="text-xs text-muted-foreground mt-1">Accepts CSV, Excel, and HTML files.</p>
                <FormMessage />
              </FormItem>

              {uploadProgress !== null && (
                 <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{uploadedFileName}</span>
                        <span className="text-sm font-medium text-primary">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full h-2" />
                 </div>
              )}
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:w-auto">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wrench className="mr-2 h-4 w-4" />}
                  Get Estimate
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && <EstimationSkeleton />}
      
      {error && !isLoading && (
        <Alert variant="destructive" className="animate-in fade-in-50 duration-500">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {estimation && !isLoading && (
        <div className="animate-in fade-in-50 duration-500">
          <Card className="shadow-lg border-2 border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Estimated Bill</CardTitle>
              <CardDescription>Here is the breakdown of your estimated service costs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Wrench className="mr-2 h-5 w-5 text-primary"/>Parts & Consumables</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Part Name</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {estimation.parts.map((part, index) => (
                        <TableRow key={index}>
                          <TableCell>{part.name}</TableCell>
                          <TableCell className="text-right">₹{part.cost.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                 <p className="text-right mt-2 font-medium">Subtotal for Parts: ₹{partsSubtotal.toLocaleString()}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Car className="mr-2 h-5 w-5 text-primary"/>AI Generated Labor</h3>
                <div className="rounded-md border">
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Labor Name</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {estimation.laborItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">₹{item.cost.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-right mt-2 font-medium">Subtotal for Labor: ₹{laborSubtotal.toLocaleString()}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center"><Fuel className="mr-2 h-5 w-5 text-primary"/>Custom Labor</h3>
                <div className="space-y-4">
                  {customLaborItems.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-2 animate-in fade-in-50 duration-300">
                      <Input
                        placeholder={`Custom Job ${index + 1}`}
                        value={item.description}
                        onChange={(e) => updateCustomLaborItem(item.id, 'description', e.target.value)}
                        className="flex-grow"
                      />
                      <Input
                        type="text"
                        placeholder="Cost"
                        value={item.cost}
                        onChange={(e) => updateCustomLaborItem(item.id, 'cost', e.target.value)}
                        className="w-28"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeCustomLaborItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={addCustomLaborItem} className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Custom Job
                </Button>
                 {customLaborItems.length > 0 && <p className="text-right mt-2 font-medium">Subtotal for Custom Labor: ₹{totalCustomLaborCost.toLocaleString()}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
                <Separator />
                <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">Estimated Total</p>
                    <p className="text-2xl font-bold text-primary">₹{grandTotal.toLocaleString()}</p>
                </div>
                <p className="text-xs text-muted-foreground text-center">This is an estimate. Actual costs may vary based on vehicle condition and additional repairs.</p>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

function EstimationSkeleton() {
  return (
    <Card className="shadow-lg border-2 border-border/50 rounded-2xl">
      <CardHeader>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
        </div>
        <Separator />
         <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-16 w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

    