
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Database, KeyRound, Save, UploadCloud, ShieldCheck, Loader2, Upload, FileJson, AlertCircle, Building, Sparkles, BrainCircuit, Github } from 'lucide-react';
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
import Link from 'next/link';
import { workshops } from '@/lib/data/workshops';

type DataType = 'workshops' | 'vehicles' | 'parts' | 'customLabor' | 'pmsCharges' | 'threeMCare' | 'feedback';
type JsonFormatType = 'workshops' | 'vehicles' | 'parts' | 'customLabor' | 'pmsCharges' | 'threeMCare';


export default function DataManagementPage() {
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(true);
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
    const setupCardRef = useRef<HTMLDivElement>(null);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a simple client-side check. For real security, use proper authentication.
        if (password === 'HIRUMANIDALOI') {
            setIsAuthenticated(true);
            setIsPasswordDialogOpen(false);
            toast({
                title: 'Access Granted',
                description: 'Welcome to the Data Management section.',
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Access Denied',
                description: 'The password you entered is incorrect.',
            });
        }
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
            const result = await syncToFirebase();
            if (result.success) {
                toast({
                    title: 'Sync Successful',
                    description: 'All local data has been successfully synced to Firebase.',
                });
            } else {
                 if (result.error?.includes("Service account key is not configured")) {
                    toast({
                        variant: "destructive",
                        title: 'Action Required',
                        description: "Please upload your Firebase service account key to enable syncing.",
                    });
                    setupCardRef.current?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error(result.error || 'An unknown error occurred.');
                }
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
                     if (result.error?.includes("Service account key is not configured")) {
                        toast({
                            variant: "destructive",
                            title: 'Action Required',
                            description: "Please upload your Firebase service account key first.",
                        });
                        setupCardRef.current?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        throw new Error(result.error || `An unknown error occurred during ${dataType} upload.`);
                    }
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
                        description: 'Configuration updated for this session only. Redeploy for permanent changes.',
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

    if (!isAuthenticated) {
        return (
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handlePasswordSubmit}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <ShieldCheck /> Authentication Required
                            </DialogTitle>
                            <DialogDescription>
                                Please enter the password to access the data management section.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password-input" className="text-right">
                                    Password
                                </Label>
                                <Input
                                    id="password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">
                                <KeyRound className="mr-2 h-4 w-4" />
                                Unlock
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div className="space-y-6">
            <Dialog open={isConverterOpen} onOpenChange={setIsConverterOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><BrainCircuit /> AI JSON Converter</DialogTitle>
                        <DialogDescription>
                            Paste unstructured text (e.g., from a spreadsheet) and convert it to structured JSON for upload. Requires a Google AI API Key.
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

            <Card className="border-destructive" ref={setupCardRef}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertCircle /> Action Required: API Key Setup
                    </CardTitle>
                    <CardDescription>
                        To enable all admin features like AI tools and syncing to the database, you must provide your project's API keys.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Alert>
                        <AlertTitle>How to Set Up Keys for Deployment (e.g., Vercel)</AlertTitle>
                       <AlertDescription>
                            <ol className="list-decimal list-inside space-y-4">
                                <li>
                                    <strong>For Local Development:</strong> Create a file named `.env.local` in your project's root folder and add your keys there. This file is secure and will not be pushed to GitHub.
                                </li>
                                <li>
                                    <strong>For Production/Live Site:</strong> You must add the keys to your hosting provider's (e.g., Vercel, Firebase App Hosting) Environment Variables settings in their dashboard.
                                </li>
                                <li>
                                    <strong>Required Keys:</strong> You need two keys.
                                    <div className="my-2 p-2 bg-muted rounded-md text-xs overflow-x-auto font-mono">
                                        <p>GOOGLE_GENAI_API_KEY="YOUR_GEMINI_API_KEY_HERE"</p>
                                        <p>SERVICE_ACCOUNT_KEY='&#123;"type": "service_account", ...&#125;'</p>
                                    </div>
                                    <ul className="list-disc list-inside pl-4 mt-2 text-sm space-y-2">
                                        <li>
                                            Get your <strong>Google AI (Gemini) API Key</strong> from <a href="https://aistudio.google.com/app/keys" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Google AI Studio</a>. This enables AI features.
                                        </li>
                                        <li>
                                            Get your <strong>Firebase Service Account Key</strong> from your <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Firebase project</a> settings under `Project settings &gt; Service accounts &gt; Generate new private key`. This allows the admin panel to write data to your database. **Paste the entire content of the downloaded JSON file**.
                                        </li>
                                    </ul>
                                </li>
                                 <li>
                                    <strong>Restart or Redeploy:</strong> After setting your keys, you must **restart the local server** or **redeploy your live site** for the changes to take effect.
                                </li>
                            </ol>
                        </AlertDescription>
                   </Alert>
                   <Separator />
                   <div className="space-y-2">
                       <Label htmlFor="service-account-file" className="font-semibold">Or: Upload Firebase Key for Current Session Only</Label>
                       <p className="text-sm text-muted-foreground">If you cannot set environment variables, you can upload the Firebase Service Account JSON file here. This will only work for your current browser session and will be forgotten when the server restarts.</p>
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
                        Upload Firebase Key for Session
                    </Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database /> Master Data Sync
                    </CardTitle>
                    <CardDescription>
                       Push all local data (from `/src/lib/data`) to your live Firebase database. This is a one-time action to initialize the database. Subsequent changes should be made via the admin panels below.
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
                    <Button variant="secondary" asChild>
                        <Link href="/HOW_TO_PUSH_TO_GITHUB.md" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            How to Deploy
                        </Link>
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
