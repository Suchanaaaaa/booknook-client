'use client';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
export default function Providers({children}:{children:ReactNode}) { return <ThemeProvider attribute="class" defaultTheme="light" enableSystem><>{children}<Toaster richColors position="top-right" /></></ThemeProvider>; }
