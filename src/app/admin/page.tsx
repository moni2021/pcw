
'use client';

import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { vehicles } from "@/lib/data"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileCode, Upload, Users, ExternalLink, ShieldCheck, ShieldOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { listAllUsers, toggleUserStatus, UserRecord } from '@/ai/flows/user-management';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';


const partsFormatExample = `
[
  { "name": "Engine Oil", "price": 1250 },
  { "name": "Oil Filter", "price": 85 }
]
`;

const pmsChargesFormatExample = `
[
  { "model": "Alto 800", "labourDesc": "Paid Service (20,000 km)", "basicAmt": 1500 },
  { "model": "Swift", "labourDesc": "Paid Service (40,000 km)", "basicAmt": 2000 }
]
`;

const customLaborFormatExample = `
[
  { "name": "BATTERY GROUND CABLE", "model": "Ertiga", "charge": 315 },
  { "name": "FRONT STRUT (ONE SIDE)", "model": "Alto K10", "charge": 880 }
]
`;


export default function AdminDashboard() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [updatingUids, setUpdatingUids] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const result = await listAllUsers();
      if (result.error) throw new Error(result.error);
      setUsers(result.users || []);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error fetching users', description: error.message });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleUser = async (uid: string, currentStatus: boolean) => {
    setUpdatingUids(prev => [...prev, uid]);
    try {
      const result = await toggleUserStatus({ uid, disabled: !currentStatus });
       if (result.error) throw new Error(result.error);
       toast({ title: 'Success', description: `User status updated successfully.` });
       // Refresh the list
       fetchUsers();
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error updating user', description: error.message });
    } finally {
        setUpdatingUids(prev => prev.filter(id => id !== uid));
    }
  };


  return (
    <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>
              Manage vehicle data, service schedules, and user access.
            </CardDescription>
          </CardHeader>
        </Card>

        <Accordion type="single" collapsible className="w-full" defaultValue="item-5">
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <h3 className="text-lg font-medium">User Management</h3>
            </AccordionTrigger>
            <AccordionContent>
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardDescription>
                      Enable or disable user accounts. New users are disabled by default and require activation.
                    </CardDescription>
                     <Button onClick={fetchUsers} disabled={loadingUsers} size="sm" className="w-fit">
                        {loadingUsers ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Refresh Users
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {loadingUsers ? (
                         <div className="flex justify-center items-center h-24">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                         </div>
                    ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Created On</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.uid}>
                            <TableCell className="font-medium">{user.email}</TableCell>
                            <TableCell>{new Date(user.creationTime).toLocaleDateString()}</TableCell>
                            <TableCell>
                               <Badge variant={!user.disabled ? 'default' : 'destructive'} className="gap-1 pl-1.5 pr-2.5">
                                 {!user.disabled ? <ShieldCheck className="h-3.5 w-3.5"/> : <ShieldOff className="h-3.5 w-3.5"/>}
                                 {!user.disabled ? 'Enabled' : 'Disabled'}
                               </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <span>Disable</span>
                                    <Switch
                                        checked={!user.disabled}
                                        onCheckedChange={() => handleToggleUser(user.uid, !user.disabled)}
                                        disabled={updatingUids.includes(user.uid)}
                                        aria-label="Toggle user status"
                                    />
                                    <span>Enable</span>
                                    {updatingUids.includes(user.uid) && <Loader2 className="h-4 w-4 animate-spin" />}
                                </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    )}
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="text-lg font-medium">Vehicle Management</h3>
            </AccordionTrigger>
            <AccordionContent>
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardDescription>
                      A list of all vehicles currently configured in the application. This data is managed directly in the source code.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Model</TableHead>
                          <TableHead>Brand</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Fuel Types</TableHead>
                          <TableHead>Production Years</TableHead>
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
                            <TableCell>{vehicle.productionYears.join(', ')}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>
               <h3 className="text-lg font-medium">Update Parts & Pricing</h3>
            </AccordionTrigger>
            <AccordionContent>
                 <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardDescription>
                      Paste the new data for parts and their prices. The data must be in the correct JSON format.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Textarea placeholder="Paste parts data here..." rows={10} />
                      <Button disabled><Upload className="mr-2"/> Update Parts Data (Coming Soon)</Button>
                    </div>
                    <Alert>
                        <FileCode className="h-4 w-4" />
                        <AlertTitle>Required Data Format</AlertTitle>
                        <AlertDescription>
                            <pre className="mt-2 w-full overflow-x-auto text-xs rounded-md bg-muted p-2">
                                <code>{partsFormatExample.trim()}</code>
                            </pre>
                        </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
               <h3 className="text-lg font-medium">Update PMS Labor Charges</h3>
            </AccordionTrigger>
            <AccordionContent>
                 <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardDescription>
                      Paste the new data for Periodic Maintenance Service (PMS) labor charges.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Textarea placeholder="Paste PMS charges data here..." rows={10} />
                      <Button disabled><Upload className="mr-2"/> Update PMS Data (Coming Soon)</Button>
                    </div>
                    <Alert>
                        <FileCode className="h-4 w-4" />
                        <AlertTitle>Required Data Format</AlertTitle>
                        <AlertDescription>
                            <pre className="mt-2 w-full overflow-x-auto text-xs rounded-md bg-muted p-2">
                                <code>{pmsChargesFormatExample.trim()}</code>
                            </pre>
                        </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
               <h3 className="text-lg font-medium">Update Custom Labor Charges</h3>
            </AccordionTrigger>
            <AccordionContent>
                 <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardDescription>
                     Paste the new data for additional custom labor charges.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Textarea placeholder="Paste custom labor data here..." rows={10} />
                      <Button disabled><Upload className="mr-2"/> Update Labor Data (Coming Soon)</Button>
                    </div>
                    <Alert>
                        <FileCode className="h-4 w-4" />
                        <AlertTitle>Required Data Format</AlertTitle>
                        <AlertDescription>
                            <pre className="mt-2 w-full overflow-x-auto text-xs rounded-md bg-muted p-2">
                                <code>{customLaborFormatExample.trim()}</code>
                            </pre>
                        </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
    </div>
  )
}
