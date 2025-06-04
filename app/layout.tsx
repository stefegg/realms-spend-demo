import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { AppSidebar } from '@/components/Sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SiteModal from '@/components/SiteModal';
import { ModalProvider } from './_providers/modal-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <ModalProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main className="bg-content-bg min-h-[calc(100vh-4rem)]">
                {children}
                <SiteModal />
              </main>
            </SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ModalProvider>
  );
}
