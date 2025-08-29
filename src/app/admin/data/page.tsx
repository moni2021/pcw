
"use client";

import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Database, KeyRound, Save, UploadCloud, ShieldCheck, Loader2, Upload, FileJson, AlertCircle, Building, Sparkles, BrainCircuit, Github, GitCompareArrows, CircleAlert, CircleCheck, CirclePlus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syncToFirebase, uploadAndSyncToFirebase, downloadMasterJson, compareLocalAndFirebaseData, ComparisonResult } from './actions';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { uploadServiceAccountKey } from '@/ai/flows/secure-key-uploader';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertToJson } from '@/ai/flows/json-converter-flow';
import Link from 'next/link';
import { workshops } from '@/lib/data/workshops';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type DataType = 'workshops' | 'vehicles' | 'parts' | 'customLabor' | 'pmsCharges' | 'threeMCare';
type JsonFormatType = 'workshops' | 'vehicles' | 'parts' | 'customLabor' | 'pmsCharges' | 'threeMCare';


export default function DataManagementPage() {
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const [comparisonData, setComparisonData] = useState<ComparisonResult | null>(null);
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

    const handleCompare = async () => {
        setIsComparing(true);
        setComparisonData(null);
        try {
            const result = await compareLocalAndFirebaseData();
            if (result.success && result.data) {
                setComparisonData(result.data);
                 toast({ title: 'Comparison Complete', description: 'Review the changes below before syncing.' });
            } else {
                 toast({
                    variant: "destructive",
                    title: 'Comparison Failed',
                    description: result.error || 'An unknown error occurred.',
                });
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: 'Comparison Failed',
                description: error.message,
            });
        } finally {
            setIsComparing(false);
        }
    }


    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const result = await syncToFirebase();
            if (result.success) {
                toast({
                    title: 'Sync Successful',
                    description: 'All local data has been successfully synced to Firebase.',
                });
                setComparisonData(null); // Reset comparison view
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
    
    const hasChanges = comparisonData && Object.values(comparisonData).some(v => v.added.length > 0 || v.updated.length > 0 || v.removed.length > 0);


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
                        <AlertCircle /> Action Required: API Key Setup for Production
                    </CardTitle>
                    <CardDescription>
                        To enable all admin features on your live Vercel deployment, you must set your API keys as Environment Variables.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Alert>
                        <AlertTitle>How to Set Environment Variables on Vercel</AlertTitle>
                       <AlertDescription>
                            <ol className="list-decimal list-inside space-y-4">
                                <li>
                                    <strong>Log in to Vercel:</strong> Go to your Vercel dashboard and select the project for this application.
                                </li>
                                <li>
                                    <strong>Go to Settings:</strong> Navigate to the "Settings" tab for your project, then select "Environment Variables" from the side menu.
                                </li>
                                <li>
                                    <strong>Add Required Keys:</strong> You need to add two keys. For each key, enter the name and paste the value exactly as shown below.
                                    <div className="my-4 p-4 bg-muted rounded-md text-sm font-mono space-y-4">
                                        <div>
                                            <p><strong>Key Name:</strong> <code className="font-bold bg-muted-foreground/10 px-1 py-0.5 rounded">GOOGLE_GENAI_API_KEY</code></p>
                                            <p><strong>Value:</strong> <code className="break-all text-muted-foreground">Your Gemini API key here</code></p>
                                        </div>
                                        <Separator/>
                                        <div>
                                            <p><strong>Key Name:</strong> <code className="font-bold bg-muted-foreground/10 px-1 py-0.5 rounded">SERVICE_ACCOUNT_KEY</code></p>
                                            <p className="mt-1"><strong>Value:</strong> Paste the <strong className="text-destructive">entire content</strong> of your downloaded service account JSON file here. It must start with <code className="text-muted-foreground">{`{"type": "service_account", ...}`}</code> and end with <code className="text-muted-foreground">{`...}`}</code>.</p>
                                            <p className="mt-2 text-xs text-muted-foreground">Example: <code className='break-all'>{"{...private_key:\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\",...}"}</code></p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-inside pl-4 mt-2 text-sm space-y-2">
                                        <li>
                                            Get your <strong>Google AI (Gemini) API Key</strong> from <a href="https://aistudio.google.com/app/keys" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Google AI Studio</a>. This enables the AI JSON Converter.
                                        </li>
                                        <li>
                                            Get your <strong>Firebase Service Account Key</strong> from your <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Firebase project settings</a> under `Project settings &gt; Service accounts &gt; Generate new private key`.
                                        </li>
                                    </ul>
                                </li>
                                 <li>
                                    <strong>Redeploy:</strong> After adding both keys, you must trigger a new deployment for the changes to take effect. Go to the "Deployments" tab and redeploy the latest commit.
                                </li>
                            </ol>
                        </AlertDescription>
                   </Alert>
                   <Separator />
                   <div className="space-y-2">
                       <Label htmlFor="service-account-file" className="font-semibold">Or: Upload Firebase Key for Current Session Only</Label>
                       <p className="text-sm text-muted-foreground">This option is for temporary local testing. Upload your Firebase Service Account JSON file here to configure the app for your current browser session only. This change will NOT persist.</p>
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
                       Push local data changes to Firebase. It is highly recommended to compare data first to see what will change.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-2">
                     <Button onClick={handleCompare} disabled={isComparing || isSyncing}>
                        {isComparing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <GitCompareArrows className="mr-2 h-4 w-4" />
                        )}
                        Compare Local & Firebase Data
                    </Button>
                     <Button onClick={() => setIsConverterOpen(true)} variant="outline">
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        AI JSON Converter
                    </Button>
                     <Button variant="secondary" asChild>
                       <Link href="https://github.com/moni2021/estimatortest/blob/main/HOW_TO_PUSH_TO_GITHUB.md" target="_blank" rel="noopener noreferrer">
                           <Github className="mr-2 h-4 w-4" /> How to Deploy
                       </Link>
                    </Button>
                </CardContent>

                {isComparing && (
                     <CardFooter className="flex items-center justify-center p-6">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Comparing data...
                     </CardFooter>
                )}

                {comparisonData && (
                     <CardFooter className="flex-col items-start p-6 space-y-4">
                        <Separator />
                        <h3 className="text-lg font-semibold">Comparison Results</h3>
                        {hasChanges ? (
                            <Alert>
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle>Changes Detected!</AlertTitle>
                                <AlertDescription>
                                    There are differences between your local data and the data in Firebase. Review the changes below. Once you are ready, you can push the changes to Firebase.
                                </AlertDescription>
                            </Alert>
                        ) : (
                             <Alert variant="default" className="bg-green-500/10 border-green-500/50">
                                <CircleCheck className="h-4 w-4 text-green-500" />
                                <AlertTitle className="text-green-700">Data is in Sync</AlertTitle>
                                <AlertDescription className="text-green-700/80">
                                   Your local data files and Firebase data are identical. No action is needed.
                                </AlertDescription>
                            </Alert>
                        )}
                        <ScrollArea className="h-[40vh] w-full">
                          <Accordion type="multiple" className="w-full">
                            {Object.entries(comparisonData).map(([key, value]) => {
                                const totalChanges = value.added.length + value.updated.length + value.removed.length;
                                if (totalChanges === 0 && value.unchanged === 0) return null;

                                return (
                                <AccordionItem value={key} key={key}>
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <span className="capitalize font-semibold">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <Badge variant={totalChanges > 0 ? "destructive" : "secondary"}>{totalChanges} changes</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CirclePlus className="h-4 w-4"/> {value.added.length} Added
                                        </div>
                                        {value.added.length > 0 && 
                                            <pre className="p-2 bg-muted rounded-md text-xs max-h-40 overflow-auto">{JSON.stringify(value.added, null, 2)}</pre>
                                        }
                                         <div className="flex items-center gap-2 text-yellow-600">
                                            <Pencil className="h-4 w-4"/> {value.updated.length} Updated
                                        </div>
                                        {value.updated.length > 0 && 
                                            <pre className="p-2 bg-muted rounded-md text-xs max-h-40 overflow-auto">{JSON.stringify(value.updated.map(u => ({ id: (u.local as any).id || (u.local as any).name || (u.local as any).model, local: u.local, remote: u.remote })), null, 2)}</pre>
                                        }
                                         <div className="flex items-center gap-2 text-red-600">
                                            <Trash2 className="h-4 w-4"/> {value.removed.length} Removed (will be added back from local)
                                        </div>
                                         <div className="flex items-center gap-2 text-gray-500">
                                            <CircleCheck className="h-4 w-4"/> {value.unchanged} Unchanged
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                )
                            })}
                          </Accordion>
                        </ScrollArea>

                        <div className="pt-4">
                             <Button onClick={handleSync} disabled={isSyncing}>
                                {isSyncing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <UploadCloud className="mr-2 h-4 w-4" />
                                )}
                                Confirm and Push Changes to Firebase
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>

            <Separator />

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload /> Individual Data Upload
                    </CardTitle>
                    <CardDescription>
                       Upload a JSON file for a specific data type to update it in Firebase. This is useful for migrating data from another system. This will bypass the comparison check.
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

    