
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitCompareArrows, Loader2, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Workshop, PmsCharge } from '@/lib/types';
import { getFullDataFromFirebase } from '../data/actions';
import { useToast } from '@/hooks/use-toast';

type ComparisonRow = {
  model: string;
  labourDesc: string;
  priceA?: number;
  priceB?: number;
  difference: number;
};

export default function PmsComparisonPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [allPmsCharges, setAllPmsCharges] = useState<PmsCharge[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [workshopA, setWorkshopA] = useState<string>('');
  const [workshopB, setWorkshopB] = useState<string>('');

  useEffect(() => {
    async function loadData() {
        setIsLoading(true);
        try {
            const data = await getFullDataFromFirebase();
            const loadedWorkshops = data.workshops || [];
            setWorkshops(loadedWorkshops);
            setAllPmsCharges(data.pmsCharges || []);
            
            if (loadedWorkshops.length > 0) {
              setWorkshopA(loadedWorkshops[0].id);
              if (loadedWorkshops.length > 1) {
                setWorkshopB(loadedWorkshops[1].id);
              } else {
                setWorkshopB(loadedWorkshops[0].id);
              }
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error loading data', description: 'Could not fetch data from Firebase.' });
        } finally {
            setIsLoading(false);
        }
    }
    loadData();
  }, [toast]);


  const workshopAName = useMemo(() => workshops.find(w => w.id === workshopA)?.name || 'Workshop A', [workshopA, workshops]);
  const workshopBName = useMemo(() => workshops.find(w => w.id === workshopB)?.name || 'Workshop B', [workshopB, workshops]);

  const comparisonData = useMemo(() => {
    const dataMap = new Map<string, Partial<ComparisonRow>>();
    
    const chargesForA = allPmsCharges.filter(c => c.workshopId === workshopA);
    const chargesForB = allPmsCharges.filter(c => c.workshopId === workshopB);

    chargesForA.forEach(charge => {
        const key = `${charge.model}|${charge.labourDesc}`;
        if (!dataMap.has(key)) {
            dataMap.set(key, { model: charge.model, labourDesc: charge.labourDesc });
        }
        dataMap.get(key)!.priceA = charge.basicAmt;
    });

    chargesForB.forEach(charge => {
        const key = `${charge.model}|${charge.labourDesc}`;
        if (!dataMap.has(key)) {
            dataMap.set(key, { model: charge.model, labourDesc: charge.labourDesc });
        }
        dataMap.get(key)!.priceB = charge.basicAmt;
    });
    
    const combinedData: ComparisonRow[] = Array.from(dataMap.values()).map(row => {
        const priceA = row.priceA ?? 0;
        const priceB = row.priceB ?? 0;
        return {
            ...row,
            priceA,
            priceB,
            difference: priceA - priceB,
        } as ComparisonRow;
    });

    return combinedData.sort((a, b) => {
        if (a.model !== b.model) {
            return a.model.localeCompare(b.model);
        }
        const kmA = parseInt(a.labourDesc.match(/(\d+),000/)?.[1] || '0', 10);
        const kmB = parseInt(b.labourDesc.match(/(\d+),000/)?.[1] || '0', 10);
        return kmA - kmB;
    });
  }, [workshopA, workshopB, allPmsCharges]);
  
  const filteredData = useMemo(() => {
      if (!searchTerm) return comparisonData;
      return comparisonData.filter(row => 
          row.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.labourDesc.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [comparisonData, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <GitCompareArrows /> PMS Price Comparison
                </CardTitle>
                <CardDescription>
                    A side-by-side view of PMS labor charges for different workshops.
                </CardDescription>
            </div>
            <div className="relative w-full sm:w-auto max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input 
                    type="search"
                    placeholder="Search model or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                />
            </div>
        </div>
      </CardHeader>
      <CardContent>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border rounded-lg">
             <div className="space-y-2">
                <Label htmlFor="workshop-a">Workshop A</Label>
                 <Select value={workshopA} onValueChange={setWorkshopA} disabled={isLoading}>
                    <SelectTrigger id="workshop-a">
                        <SelectValue placeholder="Select Workshop A" />
                    </SelectTrigger>
                    <SelectContent>
                        {workshops.map(w => (
                            <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
             <div className="space-y-2">
                <Label htmlFor="workshop-b">Workshop B</Label>
                 <Select value={workshopB} onValueChange={setWorkshopB} disabled={isLoading}>
                    <SelectTrigger id="workshop-b">
                        <SelectValue placeholder="Select Workshop B" />
                    </SelectTrigger>
                    <SelectContent>
                        {workshops.map(w => (
                            <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
         </div>
        <ScrollArea className="h-[70vh] border rounded-md">
            <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Service Interval</TableHead>
                        <TableHead className="text-right">{workshopAName} (₹)</TableHead>
                        <TableHead className="text-right">{workshopBName} (₹)</TableHead>
                        <TableHead className="text-right">Difference (₹)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                    <span className="text-muted-foreground">Loading Comparison Data...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : filteredData.length > 0 ? filteredData.map((row, index) => (
                        <TableRow key={index} className={row.difference !== 0 ? 'bg-yellow-500/10' : ''}>
                            <TableCell className="font-medium">{row.model}</TableCell>
                            <TableCell>{row.labourDesc}</TableCell>
                            <TableCell className="text-right font-mono">{row.priceA?.toFixed(2) ?? 'N/A'}</TableCell>
                            <TableCell className="text-right font-mono">{row.priceB?.toFixed(2) ?? 'N/A'}</TableCell>
                            <TableCell className="text-right font-mono">
                                <span className={
                                    row.difference > 0 ? 'text-green-500' :
                                    row.difference < 0 ? 'text-destructive' : ''
                                }>
                                    {row.difference.toFixed(2)}
                                </span>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">
                                No matching data found for the selected workshops.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
