import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import HeaderProvider from "@/providers/HeaderProvider";
import { ToastContainer } from "react-toastify";

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
        <HeaderProvider>{children}</HeaderProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
