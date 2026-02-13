import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

export const metadata: Metadata = {
  title: "comfindo Management | Lembaga Pelatihan dan Sertifikasi",
  description: "Lembaga pelatihan dan sertifikasi. Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Kompetensi Bersertifikat BNSP dan Non BNSP.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://comfindomanagement.com",
    siteName: "comfindo Management",
    title: "comfindo Management | Lembaga Pelatihan dan Sertifikasi",
    description: "Lembaga pelatihan dan sertifikasi. Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Kompetensi Bersertifikat BNSP dan Non BNSP.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
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
