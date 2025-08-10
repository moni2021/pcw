
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Download, Database, KeyRound, Save, UploadCloud, ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syncToFirebase } from './actions';

// Import all data sources
import { vehicles } from '@/lib/data';
import { allParts } from '@/lib/parts-data';
import { customLaborData } from '@/lib/custom-labor-data';
import { pmsCharges } from '@/lib/pms-charges';
import { threeMCareData } from '@/lib/3m-care-data';

export default function DataManagementPage() {
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        // On component mount, we assume the user is not authenticated.
        setIsAuthenticated(false);
        setIsPasswordDialogOpen(true);
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                        <Database /> Data Export & Sync
                    </CardTitle>
                    <CardDescription>
                        Export all application data as a single JSON file or sync it directly with your Firebase Firestore database.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-sm text-muted-foreground">
                            Download the complete dataset or sync it to Firestore. The data will be stored in a collection named `config` under a document named `app_data`.
                        </p>
                        <div className="flex gap-2">
                            <Button onClick={handleDownload}>
                                <Download className="mr-2 h-4 w-4" />
                                Download All Data
                            </Button>
                             <Button onClick={handleSync} disabled={isSyncing} variant="secondary">
                                {isSyncing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <UploadCloud className="mr-2 h-4 w-4" />
                                )}
                                Sync to Firebase
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Firebase Configuration</CardTitle>
                    <CardDescription>
                       The application is configured to use Firebase. To enable database sync, ensure your hosting environment has the `GOOGLE_APPLICATION_CREDENTIALS` variable set with your service account key.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="apiKey">Project ID</Label>
                        <Input id="projectId" placeholder="your-project-id" disabled value="maruti-service-estimator" />
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
