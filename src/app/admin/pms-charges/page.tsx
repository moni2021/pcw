
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, Pencil, Loader2, Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { PmsCharge, Vehicle, Workshop } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { getFullDataFromFirebase, addPmsCharge, updatePmsCharge } from '../data/actions';

const serviceIntervals = [
  '1st Free Service (1,000 km)',
  '2nd Free Service (5,000 km)',
  '3rd Free Service (10,000 km)',
  'Paid Service (20,000 km)', 'Paid Service (30,000 km)', 'Paid Service (40,000 km)', 
  'Paid Service (50,000 km)', 'Paid Service (60,000 km)', 'Paid Service (70,000 km)', 
  'Paid Service (80,000 km)', 'Paid Service (90,000 km)', 'Paid Service (100,000 km)',
  'Paid Service (110,000 km)', 'Paid Service (120,000 km)', 'Paid Service (130,000 km)',
  'Paid Service (140,000 km)', 'Paid Service (150,000 km)', 'Paid Service (160,000 km)',
  'Paid Service (170,000 km)', 'Paid Service (180,000 km)', 'Paid Service (190,000 km)',
  'Paid Service (200,000 km)', 'Paid Service (210,000 km)', 'Paid Service (220,000 km)',
];

export default function PmsChargesManagementPage() {
  const [pmsCharges, setPmsCharges] = useState<PmsCharge[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

  const [isChargeDialogOpen, setIsChargeDialogOpen] = useState(false);
  const [currentCharge, setCurrentCharge] = useState<PmsCharge | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
        setIsLoading(true);
        try {
            const data = await getFullDataFromFirebase();
            setPmsCharges(data.pmsCharges || []);
            setVehicles(data.vehicles || []);
            setWorkshops(data.workshops || []);
            if(data.workshops?.length > 0) {
              setSelectedWorkshop(data.workshops[0].id);
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error loading data', description: 'Could not fetch data from Firebase.' });
        } finally {
            setIsLoading(false);
        }
    }
    loadData();
  }, [toast]);
  
  const handleEditCharge = (labourDesc: string, existingCharge?: PmsCharge) => {
    if (existingCharge) {
      setCurrentCharge(existingCharge);
    } else {
      const newId = `${selectedWorkshop}-${selectedModel}-${labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '');
      setCurrentCharge({
        id: newId,
        workshopId: selectedWorkshop,
        model: selectedModel,
        labourDesc: labourDesc,
        labourCode: `pms-${labourDesc.split(' ')[2]?.replace(/,/g, '') || ''}`,
        basicAmt: 0,
      });
    }
    setIsChargeDialogOpen(true);
  };

  const handleSaveCharge = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentCharge) return;
    
    setIsMutating(true);
    const chargeToSave = { ...currentCharge, basicAmt: Number(currentCharge.basicAmt || 0) };

    const existing = pmsCharges.find(p => p.id === chargeToSave.id);
    const result = existing ? await updatePmsCharge(chargeToSave) : await addPmsCharge(chargeToSave);

    if (result.success) {
      if (existing) {
        setPmsCharges(prev => prev.map(p => p.id === chargeToSave.id ? chargeToSave : p));
      } else {
        setPmsCharges(prev => [...prev, chargeToSave]);
      }
      toast({ title: 'Success', description: 'PMS charge saved.' });
      setIsChargeDialogOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsMutating(false);
  };

  const displayedCharges = useMemo(() => {
    if (!selectedWorkshop || !selectedModel) return [];
    
    const chargesForModel = pmsCharges.filter(p => p.workshopId === selectedWorkshop && p.model === selectedModel);

    return serviceIntervals.map(interval => {
      const existingCharge = chargesForModel.find(p => p.labourDesc === interval);
      return {
        labourDesc: interval,
        basicAmt: existingCharge?.basicAmt,
        existingCharge: existingCharge,
      };
    });
  }, [pmsCharges, selectedWorkshop, selectedModel]);


  return (
    <Card>
      <CardHeader>
          <CardTitle className="flex items-center gap-2"><Banknote /> Manage PMS Charges</CardTitle>
          <CardDescription>Set the labour charges for Periodic Maintenance Services based on workshop and vehicle model.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="workshop-select">Workshop</Label>
                   <Select value={selectedWorkshop} onValueChange={setSelectedWorkshop} disabled={isLoading}>
                      <SelectTrigger id="workshop-select">
                          <SelectValue placeholder="Select a workshop" />
                      </SelectTrigger>
                      <SelectContent>
                          {workshops.map(w => <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}
                      </SelectContent>
                  </Select>
              </div>
               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="model-select">Vehicle Model</Label>
                   <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedWorkshop}>
                      <SelectTrigger id="model-select">
                          <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                          {vehicles.sort((a,b) => a.model.localeCompare(b.model)).map(v => <SelectItem key={v.model} value={v.model}>{v.model}</SelectItem>)}
                      </SelectContent>
                  </Select>
              </div>
          </div>

          <ScrollArea className="h-[60vh] relative">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Service Interval</TableHead>
                    <TableHead className="text-right">Charge (₹)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                 {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center h-24">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                    </TableRow>
                 ) : (!selectedWorkshop || !selectedModel) ? (
                     <TableRow>
                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                            Please select a workshop and model to view charges.
                        </TableCell>
                    </TableRow>
                 ) : (
                    displayedCharges.map(({ labourDesc, basicAmt, existingCharge }) => (
                      <TableRow key={labourDesc}>
                        <TableCell className="font-medium">{labourDesc}</TableCell>
                        <TableCell className="text-right">{basicAmt !== undefined ? `₹${basicAmt.toFixed(2)}` : 'Not set'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditCharge(labourDesc, existingCharge)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                 )}
                </TableBody>
            </Table>
          </ScrollArea>
      </CardContent>

       <Dialog open={isChargeDialogOpen} onOpenChange={setIsChargeDialogOpen}>
        <DialogContent>
            <form onSubmit={handleSaveCharge}>
                <DialogHeader>
                    <DialogTitle>Edit PMS Charge</DialogTitle>
                    <DialogDescription>
                        Set the labour charge for {currentCharge?.labourDesc} for the {currentCharge?.model} at {workshops.find(w=>w.id === currentCharge?.workshopId)?.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="charge" className="text-right">Charge (₹)</Label>
                        <Input 
                          id="charge" 
                          name="basicAmt" 
                          type="number"
                          value={currentCharge?.basicAmt || ''} 
                          onChange={(e) => setCurrentCharge(prev => prev ? {...prev, basicAmt: Number(e.target.value)} : null)} 
                          className="col-span-3" required 
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isMutating}>
                        {isMutating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Charge
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
       </Dialog>
    </Card>
  );
}
