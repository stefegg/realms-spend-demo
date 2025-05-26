import type { Metadata } from "next";
import { Cutive } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const cutiveFont = Cutive({
  variable: "--font-cutive",
  subsets: ["latin"],
  weight: ['400'],

})

export const metadata: Metadata = {
  title: "Realms Spend Demo",
  description: "Realms Spend Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cutiveFont.variable} bg-gray-50`}
      >
        <SidebarProvider>
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

