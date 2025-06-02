import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '@/context/AuthContext';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moodsinger Analyzer',
  description: 'Moodsinger Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastContainer />
          <AuthContextProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </AuthContextProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}