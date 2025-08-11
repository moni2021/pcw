
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Database, KeyRound, Save, UploadCloud, ShieldCheck, Loader2, Upload, FileJson, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syncToFirebase, uploadAndSyncToFirebase, downloadSampleJson } from './actions';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription as AlertDescriptionComponent } from '@/components/ui/alert';
import { uploadServiceAccountKey } from '@/ai/flows/secure-key-uploader';


// Import all data sources for the "Master" sync
import { vehicles } from '@/lib/data';
import { allParts } from '@/lib/parts-data';
import { customLaborData } from '@/lib/custom-labor-data';
import { pmsCharges } from '@/lib/pms-charges';
import { threeMCareData } from '@/lib/3m-care-data';

type DataType = 'vehicles' | 'parts' | 'customLabor' | 'pmsCharges' | 'threeMCareData';

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

    useEffect(() => {
        setIsAuthenticated(false);
        setIsPasswordDialogOpen(true);
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a simple client-side check. For real security, use proper authentication.
        if (password === 'Hirudaloi') {
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

    const allData = {
        vehicles,
        parts: allParts,
        customLabor: customLaborData,
        pmsCharges,
        threeMCareData,
    };

    const handleMasterDownload = () => {
        try {
            const jsonString = JSON.stringify(allData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'maruti_service_master_data.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast({
                title: 'Download Started',
                description: 'Your master data file is being downloaded.',
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
    
    const handleSampleDownload = async (dataType: DataType) => {
        try {
            const jsonString = await downloadSampleJson(dataType);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${dataType}_sample.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
             toast({
                variant: "destructive",
                title: 'Sample Download Failed',
                description: 'Could not download the sample file.',
            });
        }
    }


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
    
    const renderUploadTab = (dataType: DataType, title: string, description: string) => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileJson /> {title}</CardTitle>
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
                        Upload & Sync
                    </Button>
                    <Button onClick={() => handleSampleDownload(dataType)} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Sample
                    </Button>
                  </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
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
                   <AlertDescriptionComponent>
                        Download the key from your Firebase project settings (Service Accounts tab), then upload it here. This is a one-time setup step.
                   </AlertDescriptionComponent>
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
                        <Database /> Master Data Management
                    </CardTitle>
                    <CardDescription>
                       Download the application's current local data or push it to Firebase. This is useful for backups or initializing the database.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Button onClick={handleMasterDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            Download All Data
                        </Button>
                         <Button onClick={handleSync} disabled={isSyncing} variant="secondary">
                            {isSyncing ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <UploadCloud className="mr-2 h-4 w-4" />
                            )}
                            Sync Local to Firebase
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Separator />

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload /> Structured Data Upload
                    </CardTitle>
                    <CardDescription>
                       Upload a JSON file for a specific data type to update it in Firebase. Use the sample files to ensure correct formatting.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="vehicles">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="vehicles">Vehicle Models</TabsTrigger>
                            <TabsTrigger value="parts">Parts</TabsTrigger>
                            <TabsTrigger value="customLabor">Custom Labour</TabsTrigger>
                            <TabsTrigger value="pmsCharges">PMS Charges</TabsTrigger>
                        </TabsList>
                        <TabsContent value="vehicles" className="pt-4">
                           {renderUploadTab('vehicles', 'Vehicle Models Data', 'Upload a JSON file containing the list of all vehicle models and their properties.')}
                        </TabsContent>
                         <TabsContent value="parts" className="pt-4">
                           {renderUploadTab('parts', 'Parts Data', 'Upload a JSON file with the master list of all parts and their prices.')}
                        </TabsContent>
                         <TabsContent value="customLabor" className="pt-4">
                            {renderUploadTab('customLabor', 'Custom Labour Data', 'Upload a JSON file with all custom labour charges specific to vehicle models.')}
                        </TabsContent>
                          <TabsContent value="pmsCharges" className="pt-4">
                           {renderUploadTab('pmsCharges', 'PMS Charges Data', 'Upload a JSON file defining the periodic maintenance service (PMS) labour charges.')}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

    