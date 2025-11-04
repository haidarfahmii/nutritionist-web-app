import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import HeaderProvider from "@/providers/HeaderProvider";
import AuthProvider from "@/providers/AuthProvider";

const urbanist = Urbanist({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Nutritionist - Personalized Nutrition Coaching",
  description: "Transform your health with personalized nutrition coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} antialiased`}>
        <AuthProvider>
          <HeaderProvider>{children}</HeaderProvider>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
