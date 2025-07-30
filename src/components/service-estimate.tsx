"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Printer } from 'lucide-react';
import type { ServiceEstimateData } from '@/lib/types';

interface ServiceEstimateProps {
  estimate: ServiceEstimateData;
}

export function ServiceEstimate({ estimate }: ServiceEstimateProps) {
  const { vehicle, serviceType, parts, labor, totalPrice } = estimate;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="mt-8 shadow-lg print-container">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">Service Estimate</CardTitle>
        <Button onClick={handlePrint} variant="ghost" size="icon" className="no-print">
          <Printer className="h-5 w-5" />
          <span className="sr-only">Print</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold">Vehicle Model</p>
            <p>{vehicle.model}</p>
          </div>
          <div>
            <p className="font-semibold">Fuel Type</p>
            <p>{vehicle.fuelType}</p>
          </div>
          <div>
            <p className="font-semibold">Service Type</p>
            <p>{serviceType}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Parts Replacement</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part Name</TableHead>
              <TableHead className="text-right">Price (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part, index) => (
              <TableRow key={index}>
                <TableCell>{part.name}</TableCell>
                <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Labor Charges</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Labor Description</TableHead>
              <TableHead className="text-right">Charge (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labor.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.name}</TableCell>
                <TableCell className="text-right">{job.charge.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end items-center">
            <p className="text-xl font-bold">Total Estimate:</p>
            <p className="text-xl font-bold ml-4">₹{totalPrice.toFixed(2)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
