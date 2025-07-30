"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { serviceData } from '@/lib/data';
import type { Part, Labor, Service, ServiceData } from '@/lib/types';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Loader2, ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { updateServiceData } from '@/ai/flows/updateDataFlow';
import Link from 'next/link';


export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editableServiceData, setEditableServiceData] = useState<ServiceData>(() => JSON.parse(JSON.stringify(serviceData)));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/admin/login');
    } catch (error) {
      console.error("Logout Error:", error);
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    }
  };
  
    const handleDataChange = (serviceType: string, itemType: 'parts' | 'labor', index: number, field: 'name' | 'price' | 'charge', value: string) => {
        const updatedData = { ...editableServiceData };
        const service = updatedData[serviceType] as Service;
        const item = service[itemType][index];

        if (field === 'name') {
            item.name = value;
        } else if ((field === 'price' && itemType === 'parts') || (field === 'charge' && itemType === 'labor')) {
            (item as any)[field] = parseFloat(value) || 0;
        }
        
        setEditableServiceData(updatedData);
    };

    const handleAddItem = (serviceType: string, itemType: 'parts' | 'labor') => {
        const updatedData = { ...editableServiceData };
        const service = updatedData[serviceType] as Service;
        if (itemType === 'parts') {
            service.parts.push({ name: 'New Part', price: 0 });
        } else {
            service.labor.push({ name: 'New Labor', charge: 0 });
        }
        setEditableServiceData(updatedData);
    };

    const handleRemoveItem = (serviceType: string, itemType: 'parts' | 'labor', index: number) => {
        const updatedData = { ...editableServiceData };
        const service = updatedData[serviceType] as Service;
        service[itemType].splice(index, 1);
        setEditableServiceData(updatedData);
    };

  
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const result = await updateServiceData(editableServiceData);
      if (result.success) {
        toast({
            title: "Changes Saved!",
            description: "Your updates have been saved successfully. Reload the homepage to see changes.",
        });
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error: any) {
       toast({
            title: "Error Saving Changes",
            description: error.message || "Could not write to data file.",
            variant: "destructive",
       });
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading || !user) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-lg">Loading Admin Panel...</p>
        </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 bg-muted/20">
      <div className="w-full max-w-7xl mx-auto">
        <header className="mb-8 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-4">
                 <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Admin Panel
                </h1>
            </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild size="sm">
                <Link href="/">
                    <ArrowLeft />
                    <span>Go to Homepage</span>
                </Link>
            </Button>
            <Button onClick={handleLogout} size="sm">Logout</Button>
          </div>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Manage Service Data</CardTitle>
            <CardDescription>Update the prices for parts and labor for each service type.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {Object.entries(editableServiceData).map(([serviceType, serviceDetails]) => (
              <div key={serviceType}>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 capitalize">{serviceType.replace(/_/g, ' ')}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">Parts</h4>
                            <Button size="sm" variant="outline" onClick={() => handleAddItem(serviceType, 'parts')}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Part
                            </Button>
                        </div>
                        <div className="overflow-x-auto border rounded-lg">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Part Name</TableHead>
                                  <TableHead className="w-[120px] text-right">Price (₹)</TableHead>
                                  <TableHead className="w-[50px] text-right">Action</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(serviceDetails as Service).parts.map((part, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <Input
                                        type="text"
                                        value={part.name}
                                        onChange={(e) => handleDataChange(serviceType, 'parts', index, 'name', e.target.value)}
                                        className="h-9"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        value={part.price}
                                        onChange={(e) => handleDataChange(serviceType, 'parts', index, 'price', e.target.value)}
                                        className="h-9 w-24 ml-auto text-right"
                                      />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(serviceType, 'parts', index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div>
                         <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">Labor</h4>
                            <Button size="sm" variant="outline" onClick={() => handleAddItem(serviceType, 'labor')}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Labor
                            </Button>
                        </div>
                        <div className="overflow-x-auto border rounded-lg">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Labor Name</TableHead>
                                  <TableHead className="w-[120px] text-right">Charge (₹)</TableHead>
                                  <TableHead className="w-[50px] text-right">Action</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(serviceDetails as Service).labor.map((labor, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                       <Input
                                        type="text"
                                        value={labor.name}
                                        onChange={(e) => handleDataChange(serviceType, 'labor', index, 'name', e.target.value)}
                                        className="h-9"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        value={labor.charge}
                                        onChange={(e) => handleDataChange(serviceType, 'labor', index, 'charge', e.target.value)}
                                        className="h-9 w-24 ml-auto text-right"
                                      />
                                    </TableCell>
                                     <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(serviceType, 'labor', index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </CardContent>
           <CardFooter>
            <Button onClick={handleSaveChanges} disabled={isSaving} className="w-full sm:w-auto">
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save All Changes'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
