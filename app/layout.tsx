import type { Metadata } from 'next';
import { Cutive } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { AppSidebar } from '@/components/Sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

const cutive = Cutive({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cutive',
});

export const metadata: Metadata = {
  title: 'Realms Spend Demo',
  description: 'Realms Spend Demo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cutive.variable} ${cutive.className} bg-gray-50`}>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
