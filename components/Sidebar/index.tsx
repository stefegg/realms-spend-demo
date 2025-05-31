'use client';
import type * as React from 'react';
import {
  BetweenHorizontalStart,
  ClipboardPlus,
  UserRoundPen,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { RealmsLogo } from '../RealmsLogo';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Invoice Match',
    url: '/invoice-match',
    icon: BetweenHorizontalStart,
  },
  {
    title: 'Reporting',
    url: '/reporting',
    icon: ClipboardPlus,
  },
  {
    title: 'Clients',
    url: '/clients',
    icon: UserRoundPen,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const { setOpenMobile } = useSidebar();

  const handleItemClick = () => {
    setOpenMobile(false);
  };
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader className="bg-gray-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="Realms Spend">
              <Link href="/" onClick={handleItemClick}>
                <RealmsLogo size={24} />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-md pt-1">Realms Spend</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-gray-50">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="cursor-pointer">
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-red-100
                    data-[active=true]:bg-realms data-[active=true]:text-white
                    "
                    isActive={pathName === item.url}
                  >
                    <Link href={item.url} onClick={handleItemClick}>
                      <item.icon />
                      <span className="pt-1">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
