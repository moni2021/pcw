
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Package, Car, Upload, FileUp } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { vehicles } from '@/lib/data';
import { customLaborData } from '@/lib/custom-labor-data';
import { allParts } from '@/lib/parts-data';

export default function AdminDashboard() {
  return (
    <div className="flex-1 relative">
       <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-muted-foreground/20 -rotate-45 select-none pointer-events-none z-10 text-center p-8">
        Hiru Is Working on Admin page it will be Active soon
      </div>
      <Tabs defaultValue="labour" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="labour">
            <Wrench className="mr-2 h-4 w-4" />
            Labour
          </TabsTrigger>
          <TabsTrigger value="parts">
            <Package className="mr-2 h-4 w-4" />
            Parts and Price
          </TabsTrigger>
          <TabsTrigger value="models">
            <Car className="mr-2 h-4 w-4" />
            Vehicle Models
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Data
          </TabsTrigger>
        </TabsList>
        <TabsContent value="labour">
          <Card>
            <CardHeader>
              <CardTitle>Manage Labour Charges</CardTitle>
              <CardDescription>
                View custom labour charges for different services and models. Editing is currently disabled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Labour Name</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead className="text-right">Charge (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customLaborData.map((labor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{labor.name}</TableCell>
                        <TableCell>{labor.model}</TableCell>
                        <TableCell className="text-right">{labor.charge.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <CardTitle>Manage Parts and Pricing</CardTitle>
              <CardDescription>
                View all available parts and their prices. Editing is currently disabled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part Name</TableHead>
                      <TableHead className="text-right">Price (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allParts.map((part, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{part.name}</TableCell>
                        <TableCell className="text-right">{part.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Manage Vehicle Models</CardTitle>
              <CardDescription>
                View all vehicle models and their details. Editing is currently disabled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Fuel Types</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.model}>
                        <TableCell className="font-medium">{vehicle.model}</TableCell>
                        <TableCell>
                          <Badge variant={vehicle.brand === 'Nexa' ? 'default' : 'secondary'}>
                            {vehicle.brand}
                          </Badge>
                        </TableCell>
                        <TableCell>{vehicle.category}</TableCell>
                        <TableCell>
                            <div className="flex flex-wrap gap-1">
                                {vehicle.fuelTypes.map(fuel => <Badge key={fuel} variant="outline">{fuel}</Badge>)}
                            </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>
                Bulk upload data from a JSON file.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataType">Data Type</Label>
                <Select>
                  <SelectTrigger id="dataType">
                    <SelectValue placeholder="Select data type to upload" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="labour">Custom Labour</SelectItem>
                    <SelectItem value="parts">Parts and Price</SelectItem>
                    <SelectItem value="pms">PMS Labour Price</SelectItem>
                    <SelectItem value="models">Vehicle Models</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileUpload">Upload File</Label>
                <Input id="fileUpload" type="file" accept="application/json" />
                 <p className="text-sm text-muted-foreground">
                  Please upload a JSON file.
                </p>
              </div>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Upload and Process
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
