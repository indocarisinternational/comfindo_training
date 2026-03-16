"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Pelatihan", href: "/training" },
  { name: "Cek Sertifikat", href: "/services" },
  { name: "Profil", href: "/about" },
  { name: "Kontak", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white border-b border-transparent",
      )}
    >
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 flex h-18 lg:h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(152,69%,31%)] to-[hsl(152,75%,22%)] text-white shadow-md group-hover:shadow-lg transition-shadow">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[hsl(152,69%,31%)] leading-tight">
              comfindo Management
            </span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight hidden sm:block">
              Lembaga Pelatihan & Sertifikasi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "text-[hsl(152,69%,31%)] bg-[hsl(152,69%,31%)]/8 font-semibold"
                    : "text-gray-600 hover:text-[hsl(152,69%,31%)] hover:bg-gray-50",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Account Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            className="bg-gradient-to-r from-[hsl(152,69%,31%)] to-[hsl(152,50%,35%)] hover:from-[hsl(152,75%,22%)] hover:to-[hsl(152,69%,31%)] text-white shadow-md hover:shadow-lg transition-all duration-200 gap-2"
            size="sm"
          >
            {/* <Link href="/login">
              <User className="h-4 w-4" />
              Akun Saya
            </Link> */}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-[hsl(152,69%,31%)] hover:bg-[hsl(152,69%,31%)]/5"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white">
            <SheetTitle className="text-left font-bold text-lg mb-6 text-[hsl(152,69%,31%)]">
              Menu
            </SheetTitle>
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-[hsl(152,69%,31%)] bg-[hsl(152,69%,31%)]/8 font-semibold"
                        : "text-gray-600 hover:text-[hsl(152,69%,31%)] hover:bg-gray-50",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="border-t border-gray-100 my-3" />
              <Button
                asChild
                className="bg-gradient-to-r from-[hsl(152,69%,31%)] to-[hsl(152,50%,35%)] text-white w-full gap-2"
              >
                {/* <Link href="/login" onClick={() => setIsOpen(false)}>
                  <User className="h-4 w-4" />
                  Akun Saya
                </Link> */}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
