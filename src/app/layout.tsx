import type { Metadata } from 'next'; import './globals.css'; import Navbar from '@/components/navbar'; import Footer from '@/components/footer'; import Providers from '@/components/providers';
export const metadata:Metadata={title:'BookNook | A Small Online Library',description:'Discover, borrow, and share your next favorite book.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><Providers><Navbar/><main className="main-content">{children}</main><Footer/></Providers></body></html>}
