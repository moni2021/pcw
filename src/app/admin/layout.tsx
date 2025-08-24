
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bot,
  Home,
  PanelLeft,
  Settings,
  Users,
  Wrench,
  Package,
  Car,
  Database,
  Building,
  Banknote,
  GitCompareArrows,
  FileWarning,
  MessageSquareHeart,
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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-background transition-colors duration-500")}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
             <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <Bot />
                </Link>
              </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin'}>
                      <Home />
                      Dashboard
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/admin/workshops" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/workshops'}>
                      <Building />
                      Workshop Management
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/admin/parts" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/parts'}>
                      <Package />
                      Parts Management
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <Link href="/admin/labour" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/labour'}>
                      <Wrench />
                      Labour Management
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/admin/pms-charges" passHref>
                    <SidebarMenuButton isActive={pathname.startsWith('/admin/pms-charges')}>
                      <Banknote />
                      PMS Charges
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/admin/vehicles" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/vehicles'}>
                      <Car />
                      Vehicle Management
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/admin/feedback" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/feedback'}>
                      <MessageSquareHeart />
                      Feedback
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/data" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/data'}>
                      <Database />
                      Data Management
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/admin/compare" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/compare'}>
                      <GitCompareArrows />
                      Price Comparison
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/admin/pms-gaps" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/pms-gaps'}>
                      <FileWarning />
                      PMS Gaps
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
                 <SidebarMenuItem>
                <Link href="/admin/users" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/users'}>
                      <Users />
                      User Management
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="w-full flex-1">
                    <h1 className="text-lg font-semibold">Admin Panel</h1>
                </div>
                 <Button asChild size="sm">
                    <Link href="/">Back to Estimator</Link>
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
