"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <div>
            {children}
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
