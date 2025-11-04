"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const contactInfo = [
  {
    icon: Mail,
    text: "hello@nutritionist.com",
    href: "mailto:hello@nutritionist.com",
  },
  {
    icon: Phone,
    text: "+91 91813 23 2309",
    href: "tel:+9191813232309",
  },
  {
    icon: MapPin,
    text: "Somewhere in the World",
    href: "#",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-sidebar text-sidebar-foreground border-t border-sidebar-border/50">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Top Section: Logo, Links, Go to Top */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={45}
              height={45}
              className="h-11 w-11"
            />
            <span className="text-2xl font-bold">Nutritionist</span>
          </Link>

          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 lg:gap-x-8"
            aria-label="Footer navigation"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sidebar-foreground/80 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 rounded-full bg-sidebar/50 p-2 pr-4 transition-colors hover:bg-white/10"
            aria-label="Scroll to top"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUp className="h-5 w-5" />
            </span>
            <span className="font-semibold">Go To Top</span>
          </button>
        </div>

        {/* Bottom Section: Contact & Copyright */}
        <div className="mt-12 border-t border-sidebar-border/50 pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-lg bg-black/10 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group flex items-center gap-2.5 rounded-lg border border-sidebar-border p-3 px-4 transition-colors hover:bg-white/5"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.text}</span>
                </a>
              ))}
            </div>

            <div className="text-center lg:text-right text-sm text-sidebar-foreground/70">
              © {new Date().getFullYear()} Nutritionist. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
