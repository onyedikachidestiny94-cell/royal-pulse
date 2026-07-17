import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
