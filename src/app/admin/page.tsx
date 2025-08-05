
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

export default function AdminDashboard() {
  return (
    <div className="flex-1">
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
                Add, edit, or remove labour charges for different services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Labour management interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <CardTitle>Manage Parts and Pricing</CardTitle>
              <CardDescription>
                Update parts information and their prices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
               <p className="text-sm text-muted-foreground">Parts and pricing management interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Manage Vehicle Models</CardTitle>
              <CardDescription>
                Add new vehicle models and manage existing ones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
               <p className="text-sm text-muted-foreground">Vehicle model management interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>
                Bulk upload data from a CSV or Excel file.
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
                    <SelectItem value="3m">3M Care Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileUpload">Upload File</Label>
                <Input id="fileUpload" type="file" />
                 <p className="text-sm text-muted-foreground">
                  Please upload a CSV or Excel file.
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
