
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserPlus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

type UserRole = 'Admin' | 'User' | 'Developer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
  status: 'Active' | 'Inactive';
}

// Mock user data based on the request. Passwords should be handled by a real auth system.
const initialUsers: User[] = [
  { id: 'usr_1', name: 'Yash Poddar', email: 'admin@example.com', role: 'Admin', isAdmin: true, status: 'Active' },
  { id: 'usr_2', name: 'Hiru Mani', email: 'daloihiru8@gmail.com', role: 'Developer', isAdmin: true, status: 'Active' },
  { id: 'usr_3', name: 'Editor User', email: 'editor@example.com', role: 'User', isAdmin: false, status: 'Active' },
  { id: 'usr_4', name: 'Viewer User', email: 'viewer@example.com', role: 'User', isAdmin: false, status: 'Inactive' },
];


export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleAddNewUser = () => {
    setIsEditing(false);
    setCurrentUser({ id: `usr_${Date.now()}`, name: '', email: '', role: 'User', isAdmin: false, status: 'Active' });
    setIsUserDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setIsEditing(true);
    setCurrentUser({ ...user });
    setIsUserDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would be an API call to Firebase Auth and Firestore.
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    toast({
      title: 'User Deleted',
      description: 'The user has been removed from the local mock data.',
    });
  };

  const handleSaveUser = () => {
    if (!currentUser || !currentUser.email || !currentUser.name) {
      toast({ variant: 'destructive', title: 'Error', description: 'Name and Email are required.' });
      return;
    }
    
    // In a real app, you would not set the role like this. It would be managed by custom claims in Firebase.
    const finalUser = { ...currentUser, role: currentUser.isAdmin ? 'Admin' : currentUser.role === 'Admin' ? 'User' : currentUser.role } as User;


    if (isEditing) {
      setUsers(prevUsers => prevUsers.map(user => (user.id === finalUser.id ? finalUser : user)));
      toast({ title: 'User Updated', description: 'Local mock data has been updated.' });
    } else {
      if (users.some(user => user.email === finalUser.email)) {
        toast({ variant: 'destructive', title: 'Error', description: 'A user with this email already exists.' });
        return;
      }
      setUsers(prevUsers => [...prevUsers, finalUser]);
      toast({ title: 'User Added', description: 'New user added to local mock data.' });
    }

    setIsUserDialogOpen(false);
    setCurrentUser(null);
  };
  
  const handleDialogInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser(prev => prev ? {...prev, [name]: value} : null);
  };
  
  const handleDialogSwitchChange = (checked: boolean) => {
    setCurrentUser(prev => prev ? {...prev, isAdmin: checked} : null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage all user accounts in the system. (Currently using mock data)</CardDescription>
          </div>
          <Button onClick={handleAddNewUser}>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Admin' ? 'default' : user.role === 'Developer' ? 'secondary' : 'outline'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant={user.status === 'Active' ? 'outline' : 'destructive'} className={user.status === 'Active' ? 'text-green-500 border-green-500' : ''}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit User' : 'Add a New User'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the user\'s details.' : 'Enter the details for the new user. Full integration requires setting up Firebase Authentication.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" placeholder="Full Name" className="col-span-3" value={currentUser?.name || ''} onChange={handleDialogInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" placeholder="user@example.com" className="col-span-3" value={currentUser?.email || ''} onChange={handleDialogInputChange} disabled={isEditing} />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="role" className="text-right">Role</Label>
                 <select
                    id="role"
                    name="role"
                    className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={currentUser?.role || 'User'}
                    onChange={(e) => setCurrentUser(prev => prev ? {...prev, role: e.target.value as UserRole, isAdmin: e.target.value === 'Admin' || e.target.value === 'Developer' } : null)}
                    >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                </select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is-admin" className="text-right">Admin Privileges</Label>
              <Switch id="is-admin" name="isAdmin" checked={currentUser?.isAdmin || false} onCheckedChange={handleDialogSwitchChange}/>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
