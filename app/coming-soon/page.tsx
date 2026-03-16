"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Construction, ArrowLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-comfindo-green/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-comfindo-gold/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Logo/Icon Area */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-comfindo-green/10 rounded-full animate-pulse-glow" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-comfindo-green to-comfindo-green-dark text-white shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
              <GraduationCap className="h-12 w-12" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-comfindo-gold text-comfindo-navy p-1.5 rounded-lg shadow-lg rotate-12">
              <Construction className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-comfindo-green/10 text-comfindo-green text-sm font-semibold tracking-wide uppercase">
            Sedang Pengembangan
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-comfindo-navy tracking-tight">
            Sesuatu yang{" "}
            <span className="text-comfindo-green italic">Luar Biasa</span>{" "}
            Sedang Disiapkan
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            Kami sedang bekerja keras untuk memberikan pengalaman pelatihan dan
            sertifikasi terbaik bagi Anda. Sampai jumpa segera dengan
            fitur-fitur baru!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            className="w-full sm:w-auto px-8 bg-comfindo-green hover:bg-comfindo-green-dark text-white rounded-xl h-12 text-base font-semibold shadow-lg shadow-comfindo-green/20 transition-all hover:-translate-y-1"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Link>
          </Button>
          {/* <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto px-8 border-comfindo-green/20 text-comfindo-green hover:bg-comfindo-green/5 rounded-xl h-12 text-base font-semibold"
          >
            <Link href="/contact">
              Hubungi Kami
            </Link>
          </Button> */}
        </div>

        {/* Contact Info Shorthand */}
        <div className="pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-comfindo-green" />
            <span>info@comfindomanagement.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-comfindo-green" />
            <span>+62 821-xxxx-xxxx</span>
          </div>
        </div>
      </div>
    </div>
  );
}
