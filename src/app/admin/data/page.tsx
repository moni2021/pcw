
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Download, Database, KeyRound, Save, UploadCloud, ShieldCheck, Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syncToFirebase, uploadAndSyncToFirebase } from './actions';

// Import all data sources
import { vehicles } from '@/lib/data';
import { allParts } from '@/lib/parts-data';
import { customLaborData } from '@/lib/custom-labor-data';
import { pmsCharges } from '@/lib/pms-charges';
import { threeMCareData } from '@/lib/3m-care-data';
import { Separator } from '@/components/ui/separator';

export default function DataManagementPage() {
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const handleDownload = () => {
        try {
            const jsonString = JSON.stringify(allData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'maruti_service_data.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast({
                title: 'Download Started',
                description: 'Your data file is being downloaded.',
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

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const result = await syncToFirebase(allData);
            if (result.success) {
                toast({
                    title: 'Sync Successful',
                    description: 'All data has been successfully synced to Firebase.',
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

     const handleFileUpload = async () => {
        if (!selectedFile) {
            toast({
                variant: 'destructive',
                title: 'No File Selected',
                description: 'Please select a JSON file to upload.',
            });
            return;
        }

        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result as string;
            try {
                const result = await uploadAndSyncToFirebase(text);
                if (result.success) {
                    toast({
                        title: 'Upload & Sync Successful',
                        description: 'Your JSON file has been successfully synced to Firebase.',
                    });
                     setSelectedFile(null); // Clear the file input
                } else {
                    throw new Error(result.error || 'An unknown error occurred during upload.');
                }
            } catch (error: any) {
                 toast({
                    variant: 'destructive',
                    title: 'Upload Failed',
                    description: error.message,
                });
            } finally {
                setIsUploading(false);
            }
        };
        reader.onerror = () => {
             toast({
                variant: 'destructive',
                title: 'File Read Error',
                description: 'Could not read the selected file.',
            });
            setIsUploading(false);
        }
        reader.readAsText(selectedFile);
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

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database /> Local Data Management
                    </CardTitle>
                    <CardDescription>
                       Download the application's current local data or push it to Firebase. This is useful for backups or initializing the database.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Button onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Data
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
                        <Upload /> Upload & Sync from File
                    </CardTitle>
                    <CardDescription>
                       Upload a master JSON file to overwrite the data in Firebase. This is the primary way to update live data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                            type="file"
                            accept=".json"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="max-w-xs"
                        />
                         <Button onClick={handleFileUpload} disabled={isUploading || !selectedFile}>
                            {isUploading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <UploadCloud className="mr-2 h-4 w-4" />
                            )}
                            Upload & Sync
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Firebase Configuration</CardTitle>
                    <CardDescription>
                       To enable database sync, ensure your hosting environment has the service account key configured correctly.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="projectId">Project ID</Label>
                        <Input id="projectId" placeholder="your-project-id" disabled value={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "maruti-service-estimator"} />
                    </div>
                     <div className="space-y-2">
                        <Label>Data Path</Label>
                        <Input id="data-path" disabled value="config/app_data" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
