import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import HeaderProvider from "@/providers/HeaderProvider";
import { ToastContainer } from "react-toastify";

const urbanist = Urbanist({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Nutritionist - Personalized Nutrition Coaching",
  description: "Transform your health with personalized nutrition coaching.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#CBEA7B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://backendlessappcontent.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://randomuser.me"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
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
