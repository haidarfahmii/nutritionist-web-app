"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";
import { usePathname } from "next/navigation";

// export default function NavbarProvider({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathName = usePathname();
//   console.log(pathName);
//   return (
//     <>
//       {pathName === "/login" || pathName === "/register" ? null : <Nav />}
//       {children}
//     </>
//   );
// }

export default function NavbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const hideOn = ["/login", "/register"];
  return (
    <>
      {!hideOn.includes(path || "") && <TopBanner />}
      {!hideOn.includes(path || "") && <Header />}
      {children}
      {!hideOn.includes(path || "") && <Footer />}
    </>
  );
}
