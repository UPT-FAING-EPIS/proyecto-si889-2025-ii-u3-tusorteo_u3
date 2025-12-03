import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderGate from "@/modules/common/components/HeaderGate";
import FooterGate from "@/modules/common/components/FooterGate";
// If HeaderGate.tsx is at src/modules/common/HeaderGate.tsx, use:

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuSorteo - La plataforma definitiva para sorteos y rifas en línea",
  description: "La plataforma definitiva para sorteos y rifas en línea. Crea, gestiona y gana con facilidad.",
  icons: {
    icon: "/isotipo.png", // o .svg
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <HeaderGate />
        {children}
        <FooterGate />
      </body>
    </html>
  );
}
