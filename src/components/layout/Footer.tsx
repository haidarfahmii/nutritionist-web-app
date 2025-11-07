"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
];
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* logo dan description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={45}
                height={45}
                className="h-9 w-9 lg:h-11 lg:w-11"
              />
              <span className="text-xl lg:text-2xl font-bold">
                Nutritionist
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional nutritionist services for healthy diet planning and
              lifestyle. Transform your health with expert guidance.
            </p>
          </div>

          {/* navigasi link */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact & scroll to  top */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              Email: info@nutrionist.com
              <br />
              Phone: +62 812-3456-7890
            </p>
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Scroll to Top
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} NutriLife. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
