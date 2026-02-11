import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSI Consulting - Jasa Konsultasi & Training ISO Terpercaya",
  description: "MSI Consulting menyediakan layanan konsultasi ISO 9001, ISO 27001, ISO 45001, dan training internal audit bersertifikat. Solusi terbaik untuk sertifikasi bisnis Anda.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://msiconsulting.com",
    siteName: "MSI Consulting",
    title: "MSI Consulting - Jasa Konsultasi ISO",
    description: "Layanan Konsultasi dan Training ISO Profesional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Toaster />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
