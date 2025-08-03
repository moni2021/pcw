
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bot,
  Home,
  PanelLeft,
  Settings,
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
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-background transition-colors duration-500", theme)}>
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
                <SidebarMenuButton href="/admin" isActive>
                  <Home />
                  Dashboard
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
            <p className="text-xs text-muted-foreground p-2 text-center group-data-[collapsible=icon]:hidden">© Maruti Service</p>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="w-full flex-1">
                    <h1 className="text-lg font-semibold">Admin Panel</h1>
                </div>
                 <Button asChild size="sm">
                    <Link href="/">Back to Site</Link>
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
