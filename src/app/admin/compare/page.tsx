
"use client";

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitCompareArrows, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import pmsChargesArena from '@/lib/data/workshops/arena-bijoynagar/pms-charges';
import pmsChargesSow from '@/lib/data/workshops/sow-azara/pms-charges';
import { vehicles } from '@/lib/data';

type ComparisonRow = {
  model: string;
  labourDesc: string;
  arenaPrice?: number;
  sowPrice?: number;
  difference: number;
};

export default function PmsComparisonPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const comparisonData = useMemo(() => {
    const dataMap = new Map<string, Partial<ComparisonRow>>();

    const allModels = new Set(vehicles.map(v => v.model));
    const allServices = new Set([
        ...pmsChargesArena.map(p => p.labourDesc), 
        ...pmsChargesSow.map(p => p.labourDesc)
    ]);

    pmsChargesArena.forEach(charge => {
        const key = `${charge.model}|${charge.labourDesc}`;
        if (!dataMap.has(key)) {
            dataMap.set(key, { model: charge.model, labourDesc: charge.labourDesc });
        }
        dataMap.get(key)!.arenaPrice = charge.basicAmt;
    });

    pmsChargesSow.forEach(charge => {
        const key = `${charge.model}|${charge.labourDesc}`;
        if (!dataMap.has(key)) {
            dataMap.set(key, { model: charge.model, labourDesc: charge.labourDesc });
        }
        dataMap.get(key)!.sowPrice = charge.basicAmt;
    });
    
    const combinedData: ComparisonRow[] = Array.from(dataMap.values()).map(row => {
        const arenaPrice = row.arenaPrice ?? 0;
        const sowPrice = row.sowPrice ?? 0;
        return {
            ...row,
            arenaPrice,
            sowPrice,
            difference: arenaPrice - sowPrice,
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
  }, []);
  
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
            <Input 
                type="search"
                placeholder="Search model or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-sm"
            />
        </div>
      </CardHeader>
      <CardContent>
         <div className="mb-4">
            <h3 className="font-semibold">Workshops Compared:</h3>
            <div className="flex gap-2 mt-1">
                <Badge>ARENA - BIJOYNAGAR</Badge>
                <Badge variant="secondary">SOW - AZARA</Badge>
            </div>
        </div>
        <ScrollArea className="h-[70vh] border rounded-md">
            <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Service Interval</TableHead>
                        <TableHead className="text-right">Arena Price (₹)</TableHead>
                        <TableHead className="text-right">SOW Price (₹)</TableHead>
                        <TableHead className="text-right">Difference (₹)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.length > 0 ? filteredData.map((row, index) => (
                        <TableRow key={index} className={row.difference !== 0 ? 'bg-yellow-500/10' : ''}>
                            <TableCell className="font-medium">{row.model}</TableCell>
                            <TableCell>{row.labourDesc}</TableCell>
                            <TableCell className="text-right font-mono">{row.arenaPrice?.toFixed(2) ?? 'N/A'}</TableCell>
                            <TableCell className="text-right font-mono">{row.sowPrice?.toFixed(2) ?? 'N/A'}</TableCell>
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
                                No matching data found.
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
