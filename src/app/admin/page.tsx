
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Package, Car, Upload } from 'lucide-react';

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
            <CardContent className="space-y-2">
               <p className="text-sm text-muted-foreground">Data upload interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
