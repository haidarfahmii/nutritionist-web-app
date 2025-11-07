"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function HeaderFooterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const hideNavOn = ["/login", "/register"];
  return (
    <>
      {!hideNavOn.includes(path || "") && <Header />}
      {children}
      {!hideNavOn.includes(path || "") && <Footer />}
    </>
  );
}
