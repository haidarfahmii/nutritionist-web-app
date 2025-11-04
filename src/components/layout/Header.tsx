"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-sidebar text-sidebar-foreground font-semibold">
      {/* 2. Main Navigation */}
      <nav
        className="container mx-auto max-w-7xl px-6 py-5 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={45}
            height={45}
            className="h-9 w-9 lg:h-11 lg:w-11"
          />
          <span className="text-xl lg:text-2xl font-bold">Nutritionist</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="py-2 text-sidebar-foreground/80 transition-colors hover:text-primary"
              aria-current={item.name === "Home" ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="hidden lg:inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          Login
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2"
          aria-label="Open main menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu className="h-7 w-7" />
        </button>
      </nav>

      {/* 3. Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-sidebar p-6 lg:hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/icons/logo.svg"
                  alt="Logo"
                  width={45}
                  height={45}
                  className="h-9 w-9"
                />
                <span className="text-xl font-bold">Nutritionist</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
                aria-label="Close main menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-lg text-sidebar-foreground/80 transition-colors hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
