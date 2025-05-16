import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import StarfieldCanvas from '@/components/portfolio/StarfieldCanvas';
import NavigationBar from '@/components/portfolio/NavigationBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Starlight Folio - Ritik Thakur',
  description: 'Portfolio of Ritik Thakur, a MERN stack and Next.js fullstack developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <StarfieldCanvas />
        <NavigationBar />
        <main className="relative z-10">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
