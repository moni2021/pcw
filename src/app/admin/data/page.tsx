
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Database, KeyRound, Save, UploadCloud, ShieldCheck, Loader2, Upload, FileJson, AlertCircle, Building, Sparkles, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syncToFirebase, uploadAndSyncToFirebase, downloadMasterJson } from './actions';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { uploadServiceAccountKey } from '@/ai/flows/secure-key-uploader';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertToJson } from '@/ai/flows/json-converter-flow';


// Import all data sources for the "Master" sync
import { workshops } from '@/lib/data/workshops';
import { vehicles } from '@/lib/data';
import { allParts } from '@/lib/data/parts';
import { threeMCareData } from '@/lib/data/3m';
import { workshopData } from '@/lib/workshop-data-loader';

const allCustomLabor = [...workshopData.customLabor];
const allPmsCharges = [...workshopData.pmsCharges];

type DataType = 'workshops' | 'vehicles' | 'parts' | 'customLabor' | 'pmsCharges' | 'threeMCare';
type JsonFormatType = 'workshops' | 'vehicles' | 'parts' | 'customLabor' | 'pmsCharges' | 'threeMCare';


export default function DataManagementPage() {
    const { toast } = useToast();
    const [isSyncing, setIsSyncing] = useState(false);
    const [isUploading, setIsUploading] = useState<{ [key in DataType]?: boolean }>({});
    const [selectedFile, setSelectedFile] = useState<{ [key in DataType]?: File | null }>({});
    const [isUploadingKey, setIsUploadingKey] = useState(false);
    const [serviceAccountFile, setServiceAccountFile] = useState<File | null>(null);
    const [isConverterOpen, setIsConverterOpen] = useState(false);
    const [rawText, setRawText] = useState('');
    const [jsonFormat, setJsonFormat] = useState<JsonFormatType>('parts');
    const [convertedJson, setConvertedJson] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [converterWorkshop, setConverterWorkshop] = useState('');

    const allData = {
        workshops,
        vehicles,
        parts: allParts,
        customLabor: allCustomLabor,
        pmsCharges: allPmsCharges,
        threeMCare: threeMCareData,
    };

    const handleMasterDownload = async (dataType: DataType) => {
        try {
            const jsonString = await downloadMasterJson(dataType);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${dataType}_master_data.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast({
                title: 'Download Started',
                description: `Your ${dataType} master data file is being downloaded.`,
            });
        } catch (error) {
            console.error("Failed to prepare data for download:", error);
            toast({
                variant: "destructive",
                title: 'Download Failed',
                description: 'There was an error preparing the data for download.',
            });
        }
    };
    
    const handleConvertText = async () => {
        if (!rawText) {
            toast({ variant: 'destructive', title: 'Error', description: 'Raw text input cannot be empty.' });
            return;
        }
        if ((jsonFormat === 'customLabor' || jsonFormat === 'pmsCharges') && !converterWorkshop) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a workshop for this data type.' });
            return;
        }
        setIsConverting(true);
        setConvertedJson('');
        try {
            const result = await convertToJson({ rawText, jsonFormat, workshopId: converterWorkshop });
            setConvertedJson(result.jsonString);
            toast({ title: 'Success', description: 'Text converted to JSON successfully.' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Conversion Failed', description: error.message || 'An unknown error occurred.' });
        } finally {
            setIsConverting(false);
        }
    };


    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const result = await syncToFirebase(allData);
            if (result.success) {
                toast({
                    title: 'Sync Successful',
                    description: 'All local data has been successfully synced to Firebase.',
                });
            } else {
                throw new Error(result.error || 'An unknown error occurred.');
            }
        } catch (error: any) {
             console.error("Failed to sync data with Firebase:", error);
            toast({
                variant: "destructive",
                title: 'Sync Failed',
                description: error.message || 'Could not sync data. Check server logs for details.',
            });
        } finally {
            setIsSyncing(false);
        }
    };

     const handleFileUpload = async (dataType: DataType) => {
        const file = selectedFile[dataType];
        if (!file) {
            toast({
                variant: 'destructive',
                title: 'No File Selected',
                description: 'Please select a JSON file to upload.',
            });
            return;
        }

        setIsUploading(prev => ({...prev, [dataType]: true}));
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result as string;
            try {
                const result = await uploadAndSyncToFirebase(text, dataType);
                if (result.success) {
                    toast({
                        title: 'Upload & Sync Successful',
                        description: `Your ${dataType} JSON file has been successfully synced to Firebase.`,
                    });
                     setSelectedFile(prev => ({...prev, [dataType]: null})); 
                } else {
                    throw new Error(result.error || `An unknown error occurred during ${dataType} upload.`);
                }
            } catch (error: any) {
                 toast({
                    variant: 'destructive',
                    title: 'Upload Failed',
                    description: error.message,
                });
            } finally {
                setIsUploading(prev => ({...prev, [dataType]: false}));
            }
        };
        reader.onerror = () => {
             toast({
                variant: 'destructive',
                title: 'File Read Error',
                description: 'Could not read the selected file.',
            });
            setIsUploading(prev => ({...prev, [dataType]: false}));
        }
        reader.readAsText(file);
    };

    const handleServiceAccountUpload = async () => {
        if (!serviceAccountFile) {
            toast({
                variant: 'destructive',
                title: 'No File Selected',
                description: 'Please select your service account JSON file.',
            });
            return;
        }
        setIsUploadingKey(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            const content = e.target?.result as string;
            try {
                const result = await uploadServiceAccountKey({ jsonContent: content });
                if (result.success) {
                    toast({
                        title: 'Service Account Key Uploaded',
                        description: 'Configuration updated. You can now sync your data.',
                    });
                    setServiceAccountFile(null);
                } else {
                    throw new Error(result.error || 'An unknown error occurred.');
                }
            } catch (error: any) {
                toast({
                    variant: 'destructive',
                    title: 'Upload Failed',
                    description: error.message,
                });
            } finally {
                setIsUploadingKey(false);
            }
        };
        reader.readAsText(serviceAccountFile);
    };

    const renderUploadTab = (dataType: DataType, title: string, description: string, icon: React.ReactNode) => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor={`${dataType}-file-input`}>Upload JSON File</Label>
                    <Input
                        id={`${dataType}-file-input`}
                        type="file"
                        accept=".json"
                        onChange={(e) => setSelectedFile(prev => ({...prev, [dataType]: e.target.files?.[0] || null}))}
                        className="max-w-xs"
                    />
                 </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                     <Button onClick={() => handleFileUpload(dataType)} disabled={isUploading[dataType] || !selectedFile[dataType]}>
                        {isUploading[dataType] ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <UploadCloud className="mr-2 h-4 w-4" />
                        )}
                        Upload & Sync to Firebase
                    </Button>
                    <Button onClick={() => handleMasterDownload(dataType)} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Master File
                    </Button>
                  </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <Dialog open={isConverterOpen} onOpenChange={setIsConverterOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><BrainCircuit /> AI JSON Converter</DialogTitle>
                        <DialogDescription>
                            Paste unstructured text (e.g., from a spreadsheet) and convert it to structured JSON for upload.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="raw-text">Raw Text Input</Label>
                                <Textarea id="raw-text" placeholder="Paste your data here..." className="h-64" value={rawText} onChange={(e) => setRawText(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="json-format">Target JSON Format</Label>
                                    <Select value={jsonFormat} onValueChange={(v) => setJsonFormat(v as JsonFormatType)}>
                                        <SelectTrigger id="json-format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="workshops">Workshops</SelectItem>
                                            <SelectItem value="vehicles">Vehicles</SelectItem>
                                            <SelectItem value="parts">Parts</SelectItem>
                                            <SelectItem value="customLabor">Custom Labour</SelectItem>
                                            <SelectItem value="pmsCharges">PMS Charges</SelectItem>
                                            <SelectItem value="threeMCare">3M Care</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {(jsonFormat === 'customLabor' || jsonFormat === 'pmsCharges') && (
                                    <div className="space-y-2">
                                        <Label htmlFor="converter-workshop">Workshop</Label>
                                        <Select value={converterWorkshop} onValueChange={setConverterWorkshop}>
                                            <SelectTrigger id="converter-workshop">
                                                <SelectValue placeholder="Select Workshop" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {workshops.map(w => (
                                                    <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="converted-json">Converted JSON Output</Label>
                            <div className="relative h-full">
                                <Textarea id="converted-json" readOnly value={convertedJson} className="h-full" placeholder="JSON output will appear here..." />
                                {isConverting && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                         <Button onClick={() => navigator.clipboard.writeText(convertedJson)} variant="outline" disabled={!convertedJson}>Copy JSON</Button>
                        <Button onClick={handleConvertText} disabled={isConverting}>
                            {isConverting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                            Convert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertCircle /> Action Required: Firebase Setup
                    </CardTitle>
                    <CardDescription>
                        To enable live data synchronization with Firebase, you must first upload your project's service account key.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <AlertDescription>
                        Download the key from your Firebase project settings (Service Accounts tab), then upload it here. This is a one-time setup step.
                   </AlertDescription>
                   <div className="space-y-2">
                       <Label htmlFor="service-account-file">Service Account JSON File</Label>
                        <Input 
                           id="service-account-file"
                           type="file"
                           accept=".json"
                           onChange={(e) => setServiceAccountFile(e.target.files?.[0] || null)}
                        />
                   </div>
                    <Button onClick={handleServiceAccountUpload} disabled={isUploadingKey || !serviceAccountFile}>
                        {isUploadingKey ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <UploadCloud className="mr-2 h-4 w-4" />
                        )}
                        Upload & Configure Key
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database /> Master Data Sync
                    </CardTitle>
                    <CardDescription>
                       Push all data modified in the admin panels (Parts, Labour, etc.) to your live Firebase database. This overwrites the existing data in Firebase.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-2">
                     <Button onClick={handleSync} disabled={isSyncing}>
                        {isSyncing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <UploadCloud className="mr-2 h-4 w-4" />
                        )}
                        Sync All Local Data to Firebase
                    </Button>
                     <Button onClick={() => setIsConverterOpen(true)} variant="outline">
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        AI JSON Converter
                    </Button>
                </CardContent>
            </Card>

            <Separator />

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload /> Individual Data Upload
                    </CardTitle>
                    <CardDescription>
                       Upload a JSON file for a specific data type to update it in Firebase. This is useful for migrating data from another system.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="workshops">
                        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                            <TabsTrigger value="workshops">Workshops</TabsTrigger>
                            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                            <TabsTrigger value="parts">Parts</TabsTrigger>
                            <TabsTrigger value="customLabor">Custom Labour</TabsTrigger>
                            <TabsTrigger value="pmsCharges">PMS Charges</TabsTrigger>
                            <TabsTrigger value="threeMCare">3M Care</TabsTrigger>
                        </TabsList>
                        <TabsContent value="workshops" className="pt-4">
                           {renderUploadTab('workshops', 'Workshops Data', 'Upload a JSON file with the list of all workshops.', <Building />)}
                        </TabsContent>
                        <TabsContent value="vehicles" className="pt-4">
                           {renderUploadTab('vehicles', 'Vehicle Models Data', 'Upload a JSON file containing the list of all vehicle models and their properties.', <FileJson />)}
                        </TabsContent>
                         <TabsContent value="parts" className="pt-4">
                           {renderUploadTab('parts', 'Parts Data', 'Upload a JSON file with the master list of all parts and their prices.', <FileJson />)}
                        </TabsContent>
                         <TabsContent value="customLabor" className="pt-4">
                            {renderUploadTab('customLabor', 'Custom Labour Data', 'Upload a JSON file with all custom labour charges specific to vehicle models and workshops.', <FileJson />)}
                        </TabsContent>
                          <TabsContent value="pmsCharges" className="pt-4">
                           {renderUploadTab('pmsCharges', 'PMS Charges Data', 'Upload a JSON file defining the periodic maintenance service (PMS) labour charges per workshop.', <FileJson />)}
                        </TabsContent>
                        <TabsContent value="threeMCare" className="pt-4">
                           {renderUploadTab('threeMCare', '3M Care Data', 'Upload a JSON file with the 3M care services and prices per model.', <Sparkles />)}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
