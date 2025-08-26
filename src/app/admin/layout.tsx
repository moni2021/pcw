
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bot,
  Home,
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
  AreaChart,
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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

  const isDataActive = pathname.startsWith('/admin/workshops') ||
                       pathname.startsWith('/admin/parts') ||
                       pathname.startsWith('/admin/labour') ||
                       pathname.startsWith('/admin/pms-charges') ||
                       pathname.startsWith('/admin/vehicles');

  const isReportsActive = pathname.startsWith('/admin/compare') ||
                          pathname.startsWith('/admin/pms-gaps');

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
              
              <SidebarGroup>
                <SidebarMenuItem>
                  <SidebarMenuButton data-state={isDataActive ? 'open' : 'closed'}>
                    <Database />
                    Data Management
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <Link href="/admin/workshops" passHref>
                      <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/workshops')}>
                        <div><Building />Workshops</div>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link href="/admin/parts" passHref>
                      <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/parts')}>
                        <div><Package />Parts</div>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link href="/admin/labour" passHref>
                      <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/labour')}>
                        <div><Wrench />Labour</div>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link href="/admin/pms-charges" passHref>
                      <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/pms-charges')}>
                        <div><Banknote />PMS Charges</div>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link href="/admin/vehicles" passHref>
                      <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/vehicles')}>
                        <div><Car />Vehicles</div>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarMenuItem>
                  <SidebarMenuButton data-state={isReportsActive ? 'open' : 'closed'}>
                    <AreaChart />
                    Reports
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <Link href="/admin/compare" passHref>
                      <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/compare')}>
                        <div><GitCompareArrows />Price Comparison</div>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                   <SidebarMenuSubItem>
                    <Link href="/admin/pms-gaps" passHref>
                      <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/pms-gaps')}>
                        <div><FileWarning />PMS Gaps</div>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarGroup>
              
              <SidebarMenuItem>
                <Link href="/admin/feedback" passHref>
                    <SidebarMenuButton isActive={pathname === '/admin/feedback'}>
                      <MessageSquareHeart />
                      Feedback
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
            </SidebarMenu>
          </SidebarContent>
           <SidebarFooter>
              <SidebarMenu>
                 <SidebarMenuItem>
                   <Link href="/admin/data" passHref>
                      <SidebarMenuButton isActive={pathname === '/admin/data'}>
                        <Settings />
                        Setup & Sync
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
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
