
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileWarning, Loader2, Search } from 'lucide-react';
import { serviceSchedules } from '@/lib/data/service-schedules';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Workshop, Vehicle, PmsCharge } from '@/lib/types';
import { getFullDataFromFirebase } from '../data/actions';
import { useToast } from '@/hooks/use-toast';

type MissingPmsCharge = {
  workshopId: string;
  workshopName: string;
  model: string;
  serviceType: string;
};

const allServiceTypes = Object.keys(serviceSchedules.schedules.default);

export default function PmsGapsPage() {
  const [allData, setAllData] = useState<{ pmsCharges: PmsCharge[], vehicles: Vehicle[], workshops: Workshop[] }>({
    pmsCharges: [],
    vehicles: [],
    workshops: [],
  });
  const [missingCharges, setMissingCharges] = useState<MissingPmsCharge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
        setIsLoading(true);
        try {
            const data = await getFullDataFromFirebase();
            setAllData({
              pmsCharges: data.pmsCharges || [],
              vehicles: data.vehicles || [],
              workshops: data.workshops || [],
            });
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error loading data', description: 'Could not fetch data from Firebase.' });
        }
    }
    loadData();
  }, [toast]);
  
  useEffect(() => {
    if (allData.workshops.length > 0 && allData.vehicles.length > 0) {
      const findMissing = () => {
        const missing: MissingPmsCharge[] = [];
        allData.workshops.forEach(workshop => {
          allData.vehicles.forEach(vehicle => {
            allServiceTypes.forEach(serviceType => {
                  // Only check for paid services as free services have 0 cost by default
                  if (!serviceType.toLowerCase().includes('free')) {
                      const hasCharge = allData.pmsCharges.some(pms => 
                          pms.workshopId === workshop.id &&
                          pms.model === vehicle.model &&
                          pms.labourDesc === serviceType
                      );

                      if (!hasCharge) {
                          missing.push({
                              workshopId: workshop.id,
                              workshopName: workshop.name,
                              model: vehicle.model,
                              serviceType: serviceType,
                          });
                      }
                  }
            });
          });
        });
        setMissingCharges(missing);
        setIsLoading(false);
      };
      findMissing();
    }
  }, [allData]);
  
  const filteredAndGroupedData = useMemo(() => {
    const filtered = missingCharges.filter(item => 
        item.workshopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return allData.workshops.map(workshop => ({
        ...workshop,
        missing: filtered.filter(item => item.workshopId === workshop.id)
                          .sort((a,b) => a.model.localeCompare(b.model) || a.serviceType.localeCompare(b.serviceType))
    })).filter(w => w.missing.length > 0);

  }, [missingCharges, searchTerm, allData.workshops]);


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <FileWarning /> Missing PMS Charges Report
                </CardTitle>
                <CardDescription>
                    A list of all models and services that do not have a defined PMS labor charge in the live database.
                </CardDescription>
            </div>
             <div className="relative w-full sm:w-auto max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    type="search"
                    placeholder="Search workshop or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <div className="flex flex-col items-center gap-2 h-48 justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Analyzing pricing data from Firebase...</span>
            </div>
        ) : (
            <ScrollArea className="h-[70vh]">
                <Accordion type="multiple" defaultValue={filteredAndGroupedData.map(w => w.id)} className="pr-4">
                    {filteredAndGroupedData.length > 0 ? filteredAndGroupedData.map(workshop => (
                        <AccordionItem value={workshop.id} key={workshop.id}>
                            <AccordionTrigger className="text-lg font-medium">
                                <div className="flex items-center gap-4">
                                    <span>{workshop.name}</span>
                                    <Badge variant="destructive">{workshop.missing.length} missing</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="space-y-1 list-disc pl-5 text-muted-foreground">
                                    {workshop.missing.map((item, index) => (
                                        <li key={index}>
                                            <span className="font-semibold text-foreground">{item.model}:</span> {item.serviceType}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    )) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p className="text-lg font-semibold">All Good!</p>
                            <p>No missing PMS charges were found for your search criteria.</p>
                        </div>
                    )}
                </Accordion>
            </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
