import type { Metadata } from 'next';
import { Fredoka, Nunito, JetBrains_Mono, Geist } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatWidget from '@/components/AIChatWidget';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CodeKids — Belajar Coding Interaktif untuk Anak',
  description:
    'Website edukasi interaktif untuk siswa sekolah dasar (SD). Pelajari logika coding, algoritma, HTML, CSS, dan JavaScript dengan mudah dan menyenangkan!',
  keywords: ['CodeKids', 'belajar coding anak', 'coding SD', 'HTML', 'CSS', 'JavaScript', 'edukasi web'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", fredoka.variable, nunito.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <link rel="preconnect" href="https://lottie.host" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://lottie.host" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F6F8FC] text-[#17233C] relative">
        <Navbar />
        {children}
        <Footer />
        <AIChatWidget />
      </body>
    </html>
  );
}
