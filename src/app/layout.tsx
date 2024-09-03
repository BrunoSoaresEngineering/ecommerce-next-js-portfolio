import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'My web store',
  description: 'Site where you can buy good stuff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        'bg-background min-h-screen font-sans antialiased',
        fontSans.variable,
      )}
      >
        {children}
      </body>
    </html>
  );
}
