
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import all data sources
import { vehicles } from '@/lib/data';
import { allParts } from '@/lib/parts-data';
import { customLaborData } from '@/lib/custom-labor-data';
import { pmsCharges } from '@/lib/pms-charges';
import { threeMCareData } from '@/lib/3m-care-data';

export default function DataManagementPage() {
    const { toast } = useToast();

    const handleDownload = () => {
        try {
            // Aggregate all data into a single object
            const allData = {
                vehicles,
                parts: allParts,
                customLabor: customLaborData,
                pmsCharges,
                threeMCareData,
            };

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

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Database /> Data Management
                </CardTitle>
                <CardDescription>
                    Export all application data as a single JSON file. This file can be used for backups or for importing into a Firebase database.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-start gap-4">
                    <p className="text-sm text-muted-foreground">
                        Click the button below to download the complete dataset for vehicles, parts, labor charges, and service data.
                    </p>
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download All Data
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
