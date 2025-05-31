'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { RealmsLogo } from '../RealmsLogo';

export function Header() {
  const pathName = usePathname();
  const getHeaderText = (pathName: string) => {
    switch (pathName) {
      case '/':
        return '';
      case '/reporting':
        return ' - Reporting';
      case '/clients':
        return ' - Clients';
      case '/invoice-match':
        return ' - Invoice Match';
      default:
        return '';
    }
  };
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-white px-4">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <div className="flex items-center gap-2">
        <RealmsLogo size={32} />
        <h1 className="text-lg font-semibold pt-1.5">
          Realms Spend{getHeaderText(pathName)}
        </h1>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer hover:bg-red-50"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer hover:bg-red-50"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer hover:bg-red-50"
        >
          <User className="h-4 w-4" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  );
}
