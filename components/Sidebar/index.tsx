import type * as React from 'react';
import { Home, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const items = [
  {
    title: 'Invoice Match',
    url: '/',
    icon: Home,
  },
  {
    title: 'Reporting',
    url: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Clients',
    url: '/dashboard',
    icon: BarChart3,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="icon" className="bg-red-500">
      <SidebarHeader className="bg-gray-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="Realms Spend">
              <Link href="/">
                <Image
                  src="/realms_sm.png"
                  alt="Realms Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="">Realms Spend</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
