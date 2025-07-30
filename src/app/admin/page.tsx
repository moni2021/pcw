"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { serviceData, vehicles } from '@/lib/data';
import type { Part, Labor, Service } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Should be false in production
  const [editableServiceData, setEditableServiceData] = useState(JSON.parse(JSON.stringify(serviceData)));

  // In a real app, you would check for authentication status from a context or a hook
  // For now, we'll just redirect if not authenticated.
  // React.useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/admin/login');
  //   }
  // }, [isAuthenticated, router]);

  const handlePartPriceChange = (serviceType: string, partIndex: number, newPrice: string) => {
    const updatedData = { ...editableServiceData };
    updatedData[serviceType].parts[partIndex].price = parseFloat(newPrice) || 0;
    setEditableServiceData(updatedData);
  };

  const handleLaborChargeChange = (serviceType: string, laborIndex: number, newCharge: string) => {
    const updatedData = { ...editableServiceData };
    updatedData[serviceType].labor[laborIndex].charge = parseFloat(newCharge) || 0;
    setEditableServiceData(updatedData);
  };
  
  const handleSaveChanges = () => {
    // Here you would typically send the updated data to your backend/database
    console.log("Saving data:", editableServiceData);
    alert("Changes saved successfully! (Check console for data)");
  };

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Admin Panel
          </h1>
          <Button onClick={() => setIsAuthenticated(false)}>Logout</Button>
        </header>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Manage Service Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {Object.entries(editableServiceData).map(([serviceType, serviceDetails]) => (
              <div key={serviceType}>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">{serviceType}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold mb-2">Parts</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Part Name</TableHead>
                              <TableHead className="w-[120px]">Price (₹)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {(serviceDetails as Service).parts.map((part, index) => (
                              <TableRow key={index}>
                                <TableCell>{part.name}</TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={part.price}
                                    onChange={(e) => handlePartPriceChange(serviceType, index, e.target.value)}
                                    className="h-8"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Labor</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Labor Name</TableHead>
                              <TableHead className="w-[120px]">Charge (₹)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {(serviceDetails as Service).labor.map((labor, index) => (
                              <TableRow key={index}>
                                <TableCell>{labor.name}</TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={labor.charge}
                                    onChange={(e) => handleLaborChargeChange(serviceType, index, e.target.value)}
                                    className="h-8"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </div>
                </div>
              </div>
            ))}
          </CardContent>
           <CardFooter>
            <Button onClick={handleSaveChanges} className="w-full md:w-auto">Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
