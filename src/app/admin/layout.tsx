

'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bot,
  Home,
  PanelLeft,
  Settings,
  LogOut,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_UIDS } from '@/lib/admins';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    if (loading) return; 

    if (!user) {
      router.replace('/');
      return;
    }

    if (!ADMIN_UIDS.includes(user.uid)) {
        toast({
            variant: 'destructive',
            title: 'Unauthorized',
            description: 'You do not have permission to access this page.',
        });
        router.replace('/estimator');
    }

  }, [user, loading, router, toast]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Signed Out', description: 'You have been successfully signed out.' });
      router.push('/');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to sign out.' });
    }
  };

  if (loading || !user || !ADMIN_UIDS.includes(user.uid)) {
    return null;
  }

  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-background transition-colors duration-500")}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
             <Button variant="ghost" size="icon" asChild>
                <Link href="/estimator">
                  <Bot />
                </Link>
              </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin" isActive>
                  <Home />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href="/admin">
                  <Users />
                  User Management
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut />
              </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="w-full flex-1">
                    <h1 className="text-lg font-semibold">Admin Panel</h1>
                </div>
                 <Button asChild size="sm">
                    <Link href="/estimator">Back to Estimator</Link>
                </Button>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
